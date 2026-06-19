import { renderHook } from '@testing-library/react';
import { useCatalog } from './use-catalog';
import { setMockSearchParams } from '@/test-utils';

jest.mock('@/lib/api', () => ({
  api: {
    getProducts: jest.fn().mockResolvedValue({
      data: [],
      pagination: { total: 0, page: 1, limit: 24, totalPages: 0, hasMore: false, nextCursor: null },
      meta: { sort: 'relevance', pageSizeOptions: [24], infiniteScroll: false, seo: {} },
    }),
    getFacets: jest.fn().mockResolvedValue({ data: { brands: [], priceRange: { min: 0, max: 0 }, ratings: [], attributes: {}, categories: [] } }),
  },
}));

describe('useCatalog', () => {
  it('parses search params into query state', () => {
    setMockSearchParams({ q: 'headphones', sort: 'rating' });
    const { result } = renderHook(() => useCatalog());
    expect(result.current.query.q).toBe('headphones');
    expect(result.current.query.sort).toBe('rating');
  });
});
