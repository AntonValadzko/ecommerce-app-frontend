import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { api, ApiError } from '@/lib/api';
import { ServiceUnavailable } from '@/components/ui/ServiceUnavailable';
import { logger } from '@/lib/logger';
import { serializeJsonLd } from '@/lib/json-ld';
import { isValidSlug } from '@/lib/validation';
import { formatPrice, discountPercent } from '@/lib/format';
import { StarRating } from '@/components/ui/StarRating';
import { ProductDetailClient } from '@/components/products/ProductDetailClient';
import { RelatedProducts } from '@/components/products/RelatedProducts';

interface PageProps {
  params: Promise<{ slug: string }>;
}

type ProductLoadResult =
  | { status: 'ok'; result: Awaited<ReturnType<typeof api.getProductBySlug>> }
  | { status: 'not_found' }
  | { status: 'unavailable' };

async function loadProduct(slug: string): Promise<ProductLoadResult> {
  try {
    const result = await api.getProductBySlug(slug);
    return { status: 'ok', result };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return { status: 'not_found' };
    }
    logger.warn('Product failed to load', {
      slug,
      error: error instanceof Error ? error.message : String(error),
    });
    return { status: 'unavailable' };
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isValidSlug(slug)) return { title: 'Product not found' };

  const loaded = await loadProduct(slug);
  if (loaded.status === 'not_found') return { title: 'Product not found' };
  if (loaded.status === 'unavailable') return { title: 'Service unavailable' };

  const seo = loaded.result.meta.seo;
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: seo.canonicalUrl },
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: 'website',
      images: loaded.result.data.imageUrl ? [{ url: loaded.result.data.imageUrl }] : [],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  if (!isValidSlug(slug)) notFound();

  const loaded = await loadProduct(slug);
  if (loaded.status === 'not_found') notFound();
  if (loaded.status === 'unavailable') {
    return <ServiceUnavailable />;
  }

  const { data: product } = loaded.result;
  const related = await api.getRelated(product.id).catch((error) => {
    logger.warn('Failed to load related products', {
      productId: product.id,
      error: error instanceof Error ? error.message : String(error),
    });
    return { data: [] };
  });
  const discount = discountPercent(product.price, product.compareAtPrice);
  const seo = loaded.result.meta.seo;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(seo.structuredData) }}
      />

      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/" className="hover:text-brand-600">
          Catalog
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/?category=${product.categorySlug}`} className="hover:text-brand-600">
          {product.categoryName}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900">{product.name}</span>
      </nav>

      <article className="grid gap-8 rounded-xl border border-surface-border bg-white p-6 shadow-card lg:grid-cols-2">
        <section className="relative aspect-square overflow-hidden rounded-xl bg-slate-100">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {discount && (
            <span className="absolute left-3 top-3 rounded-md bg-red-500 px-2 py-1 text-sm font-semibold text-white">
              -{discount}%
            </span>
          )}
        </section>

        <section>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            {product.brand}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">{product.name}</h1>
          <p className="mt-1 text-sm text-slate-500">SKU: {product.sku}</p>

          <section className="mt-4">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} size="md" />
          </section>

          <section className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-slate-900">
              {formatPrice(product.price, product.currency)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xl text-slate-400 line-through">
                {formatPrice(product.compareAtPrice, product.currency)}
              </span>
            )}
          </section>

          <p
            className={`mt-3 text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}
          >
            {product.inStock
              ? `In stock (${product.stockQuantity} available)`
              : 'Currently out of stock'}
          </p>

          <p className="mt-6 leading-relaxed text-slate-600">{product.description}</p>

          {product.attributes.length > 0 && (
            <section className="mt-6">
              <h2 className="text-sm font-semibold text-slate-800">Specifications</h2>
              <dl className="mt-2 grid grid-cols-2 gap-2 text-sm">
                {product.attributes.map((a) => (
                  <section key={`${a.name}-${a.value}`} className="contents">
                    <dt className="capitalize text-slate-500">{a.name}</dt>
                    <dd className="font-medium text-slate-800">{a.value}</dd>
                  </section>
                ))}
              </dl>
            </section>
          )}

          <ProductDetailClient productId={product.id} />
        </section>
      </article>

      <RelatedProducts products={related.data} />
    </>
  );
}
