import type {
  AutocompleteSuggestion,
  CatalogQuery,
  Category,
  Facets,
  Pagination,
  QuickViewProduct,
  SavedSearch,
} from '@/lib/types';
import { mockProduct } from './products';

export const mockCategories: Category[] = [
  {
    id: 1,
    slug: 'electronics',
    name: 'Electronics',
    parentId: null,
    description: null,
    productCount: 128,
  },
  {
    id: 2,
    slug: 'home',
    name: 'Home & Garden',
    parentId: null,
    description: null,
    productCount: 84,
  },
  {
    id: 3,
    slug: 'sports',
    name: 'Sports',
    parentId: null,
    description: null,
    productCount: 56,
  },
];

export const mockFacets: Facets = {
  brands: [
    { name: 'SoundMax', count: 42 },
    { name: 'TechPro', count: 31 },
    { name: 'HomeStyle', count: 18 },
  ],
  priceRange: { min: 10, max: 500 },
  ratings: [
    { threshold: 4, count: 88 },
    { threshold: 3, count: 124 },
    { threshold: 2, count: 12 },
    { threshold: 1, count: 3 },
  ],
  attributes: {
    color: [
      { value: 'Black', count: 45 },
      { value: 'White', count: 32 },
    ],
  },
  categories: mockCategories.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    count: c.productCount ?? 0,
  })),
};

export const defaultCatalogQuery: CatalogQuery = {
  page: 1,
  limit: 24,
  sort: 'relevance',
};

export const filteredCatalogQuery: CatalogQuery = {
  ...defaultCatalogQuery,
  q: 'headphones',
  category: 'electronics',
  brand: ['SoundMax'],
  minPrice: 50,
  maxPrice: 200,
  minRating: 4,
  inStock: true,
};

export const mockPagination: Pagination = {
  total: 240,
  page: 1,
  limit: 24,
  totalPages: 10,
  hasMore: true,
  nextCursor: null,
};

export const mockAutocomplete: AutocompleteSuggestion[] = [
  { type: 'product', id: 1, label: 'Wireless Headphones', slug: 'wireless-headphones' },
  { type: 'brand', id: 'soundmax', label: 'SoundMax' },
  { type: 'category', id: 1, label: 'Electronics', slug: 'electronics' },
];

export const mockQuickViewProduct: QuickViewProduct = {
  id: mockProduct.id,
  sku: mockProduct.sku,
  name: mockProduct.name,
  slug: mockProduct.slug,
  brand: mockProduct.brand,
  price: mockProduct.price,
  compareAtPrice: mockProduct.compareAtPrice,
  currency: mockProduct.currency,
  rating: mockProduct.rating,
  reviewCount: mockProduct.reviewCount,
  inStock: mockProduct.inStock,
  imageUrl: mockProduct.imageUrl,
  attributes: [
    { name: 'color', value: 'Black' },
    { name: 'connectivity', value: 'Bluetooth 5.3' },
  ],
};

export const mockSavedSearches: SavedSearch[] = [
  {
    id: '1',
    sessionId: 'demo-session',
    name: 'Electronics under $200',
    query: {
      category: 'electronics',
      maxPrice: 200,
      minRating: 4,
      page: 1,
      limit: 24,
      sort: 'rating',
    },
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-01-15T10:00:00Z',
  },
  {
    id: '2',
    sessionId: 'demo-session',
    name: 'SoundMax deals',
    query: {
      brand: ['SoundMax'],
      inStock: true,
      page: 1,
      limit: 48,
      sort: 'price_asc',
    },
    createdAt: '2026-02-01T14:30:00Z',
    updatedAt: '2026-02-01T14:30:00Z',
  },
];
