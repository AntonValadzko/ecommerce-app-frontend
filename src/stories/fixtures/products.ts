import type { ProductListItem } from '@/lib/types';

export const mockProduct: ProductListItem = {
  id: 1,
  sku: 'ELEC-001',
  name: 'Wireless Noise-Cancelling Headphones',
  slug: 'wireless-noise-cancelling-headphones',
  brand: 'SoundMax',
  categoryId: 10,
  categoryName: 'Electronics',
  categorySlug: 'electronics',
  price: 149.99,
  compareAtPrice: 199.99,
  currency: 'USD',
  rating: 4.6,
  reviewCount: 1284,
  inStock: true,
  imageUrl: 'https://picsum.photos/seed/headphones/600/600',
  popularityScore: 92,
};

export const mockOutOfStockProduct: ProductListItem = {
  ...mockProduct,
  id: 2,
  sku: 'ELEC-002',
  name: 'Portable Bluetooth Speaker',
  slug: 'portable-bluetooth-speaker',
  inStock: false,
  compareAtPrice: null,
  imageUrl: 'https://picsum.photos/seed/speaker/600/600',
};
