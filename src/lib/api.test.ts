/**
 * @jest-environment jsdom
 */

import { buildQueryString, api } from './api';

jest.mock('./env', () => ({
  publicEnv: { NEXT_PUBLIC_API_BASE: '/api/v1' },
  getServerEnv: () => ({ API_URL: 'http://localhost:3000' }),
}));

jest.mock('./logger', () => ({
  logger: { error: jest.fn(), warn: jest.fn(), info: jest.fn(), debug: jest.fn() },
}));

describe('api', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    localStorage.clear();
  });

  describe('buildQueryString', () => {
    it('builds query string from catalog query', () => {
      const qs = buildQueryString({
        q: 'phone',
        brand: ['A', 'B'],
        page: 2,
        limit: 48,
        sort: 'rating',
        inStock: true,
      });
      expect(qs).toContain('q=phone');
      expect(qs).toContain('brand=A');
      expect(qs).toContain('page=2');
    });

    it('includes default pagination fields in query string', () => {
      expect(buildQueryString({ page: 1, limit: 24, sort: 'relevance' })).toBe(
        '?sort=relevance&page=1&limit=24'
      );
    });
  });

  describe('apiFetch', () => {
    it('fetches products and stores session id', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'x-session-id': 'server-session' }),
        json: async () => ({
          data: [],
          pagination: { total: 0, page: 1, limit: 24, totalPages: 0, hasMore: false, nextCursor: null },
          meta: { sort: 'relevance', pageSizeOptions: [24], infiniteScroll: false, seo: {} },
        }),
      });

      await api.getProducts({ page: 1, limit: 24, sort: 'relevance' });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/products'),
        expect.objectContaining({
          headers: expect.any(Headers),
        })
      );
      expect(localStorage.getItem('catalog-session-id')).toBe('server-session');
    });

    it('throws on failed response', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 404,
        headers: new Headers(),
        json: async () => ({ message: 'Not found' }),
      });

      await expect(api.getProduct(1)).rejects.toThrow('Not found');
    });

    it('validates slug and id in path', () => {
      expect(() => api.getProductBySlug('bad slug')).toThrow('Invalid slug format');
      expect(() => api.getProduct(0)).toThrow('Invalid product id');
    });
  });
});
