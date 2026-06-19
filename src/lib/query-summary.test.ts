import {
  buildActiveFilterChips,
  hasActiveFilters,
  summarizeQuery,
  toSavableQuery,
} from './query-summary';
import { filteredCatalogQuery, mockCategories } from '@/stories/fixtures/catalog';

describe('query-summary', () => {
  it('detects active filters', () => {
    expect(hasActiveFilters({ page: 1, limit: 24, sort: 'relevance' })).toBe(false);
    expect(hasActiveFilters(filteredCatalogQuery)).toBe(true);
  });

  it('builds filter chips', () => {
    const chips = buildActiveFilterChips(filteredCatalogQuery, mockCategories);
    expect(chips.some((c) => c.id === 'q')).toBe(true);
    expect(chips.some((c) => c.id === 'category')).toBe(true);
    expect(chips.some((c) => c.id.startsWith('brand-'))).toBe(true);
  });

  it('summarizes query labels', () => {
    expect(summarizeQuery({ page: 1, limit: 24, sort: 'relevance' })).toBe('All products');
    expect(summarizeQuery(filteredCatalogQuery)).toContain('Search:');
  });

  it('strips pagination fields for saved searches', () => {
    expect(
      toSavableQuery({ ...filteredCatalogQuery, page: 3, cursor: 'abc', scroll: true })
    ).toEqual(expect.not.objectContaining({ page: 3, cursor: 'abc', scroll: true }));
  });
});
