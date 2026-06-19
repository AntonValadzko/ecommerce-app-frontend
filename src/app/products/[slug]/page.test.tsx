import { generateMetadata } from './page';
import { api } from '@/lib/api';

jest.mock('@/lib/api', () => ({
  api: {
    getProductBySlug: jest.fn(),
    getRelated: jest.fn(),
  },
}));

jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

const mockProductResponse = {
  data: {
    id: 1,
    sku: 'ELEC-001',
    name: 'Wireless Headphones',
    slug: 'wireless-headphones',
    brand: 'SoundMax',
    categoryId: 1,
    categoryName: 'Electronics',
    categorySlug: 'electronics',
    price: 149.99,
    compareAtPrice: null,
    currency: 'USD',
    rating: 4.5,
    reviewCount: 10,
    inStock: true,
    imageUrl: 'https://example.com/img.jpg',
    popularityScore: 1,
    description: 'Great headphones',
    stockQuantity: 5,
    attributes: [],
    createdAt: '2026-01-01',
    updatedAt: '2026-01-01',
  },
  meta: {
    seo: {
      title: 'Wireless Headphones',
      description: 'Buy wireless headphones',
      canonicalUrl: 'https://example.com/products/wireless-headphones',
      ogType: 'product',
      structuredData: { '@type': 'Product' },
    },
  },
};

describe('ProductPage metadata', () => {
  it('returns not found title for invalid slug', async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: 'bad slug' }) });
    expect(metadata.title).toBe('Product not found');
  });

  it('returns seo metadata for valid product', async () => {
    (api.getProductBySlug as jest.Mock).mockResolvedValue(mockProductResponse);
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'wireless-headphones' }),
    });
    expect(metadata.title).toBe('Wireless Headphones');
    expect(metadata.description).toBe('Buy wireless headphones');
  });
});
