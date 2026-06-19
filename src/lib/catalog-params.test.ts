import { catalogParamsToUrl, parseCatalogParams } from './catalog-params';
import { logger } from './logger';

jest.mock('./logger', () => ({
  logger: { warn: jest.fn(), error: jest.fn(), info: jest.fn(), debug: jest.fn() },
}));

describe('catalog-params', () => {
  it('parses defaults', () => {
    expect(parseCatalogParams({})).toEqual({
      q: undefined,
      category: undefined,
      brand: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      minRating: undefined,
      inStock: undefined,
      sort: 'relevance',
      page: 1,
      limit: 24,
      cursor: undefined,
      scroll: false,
      attributes: undefined,
    });
  });

  it('parses filters and multi-value brand', () => {
    expect(
      parseCatalogParams({
        q: 'headphones',
        brand: ['SoundMax', 'TechPro'],
        sort: 'price_asc',
        limit: '48',
        inStock: 'true',
        scroll: 'true',
      })
    ).toMatchObject({
      q: 'headphones',
      brand: ['SoundMax', 'TechPro'],
      sort: 'price_asc',
      limit: 48,
      inStock: true,
      scroll: true,
    });
  });

  it('ignores invalid sort and limit', () => {
    expect(parseCatalogParams({ sort: 'invalid', limit: '12' }).sort).toBe('relevance');
    expect(parseCatalogParams({ limit: '12' }).limit).toBe(24);
  });

  it('warns and ignores invalid attributes JSON', () => {
    const result = parseCatalogParams({ attributes: '{bad json' });
    expect(result.attributes).toBeUndefined();
    expect(logger.warn).toHaveBeenCalled();
  });

  it('serializes query to URL', () => {
    expect(
      catalogParamsToUrl({
        q: 'test',
        brand: ['A'],
        page: 2,
        limit: 48,
        sort: 'rating',
      })
    ).toContain('q=test');
    expect(catalogParamsToUrl({ page: 1, limit: 24, sort: 'relevance' })).toBe('/');
  });
});
