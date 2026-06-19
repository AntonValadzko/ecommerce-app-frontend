import { render, screen } from '@testing-library/react';
import { CatalogPage } from './CatalogPage';

jest.mock('@/hooks/use-catalog', () => ({
  useCatalog: () => ({
    query: { page: 1, limit: 24, sort: 'relevance' },
    setQuery: jest.fn(),
    products: [],
    pagination: undefined,
    facets: undefined,
    isLoading: false,
    loadMore: jest.fn(),
  }),
}));

jest.mock('@/lib/api', () => ({
  api: {
    getCategories: jest.fn().mockResolvedValue({ data: [] }),
    autocomplete: jest.fn().mockResolvedValue({ data: [] }),
    getSavedSearches: jest.fn().mockResolvedValue({ data: [] }),
  },
}));

describe('CatalogPage', () => {
  it('renders catalog shell', async () => {
    render(<CatalogPage />);
    expect(await screen.findByText('Product Catalog')).toBeInTheDocument();
    expect(screen.getByLabelText(/search products/i)).toBeInTheDocument();
  });
});
