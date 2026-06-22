import { render, screen } from '@testing-library/react';
import { CatalogPage } from './CatalogPage';

jest.mock('@/hooks/use-catalog', () => ({
  useCatalog: jest.fn(() => ({
    query: { page: 1, limit: 24, sort: 'relevance' },
    setQuery: jest.fn(),
    products: [],
    pagination: undefined,
    facets: undefined,
    categories: [],
    isLoading: false,
    isUnavailable: false,
    loadMore: jest.fn(),
    refresh: jest.fn(),
  })),
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

  it('shows unavailable message when catalog fails to load', async () => {
    const { useCatalog } = jest.requireMock('@/hooks/use-catalog');
    useCatalog.mockReturnValueOnce({
      query: { page: 1, limit: 24, sort: 'relevance' },
      setQuery: jest.fn(),
      products: [],
      pagination: undefined,
      facets: undefined,
      categories: [],
      isLoading: false,
      isUnavailable: true,
      loadMore: jest.fn(),
      refresh: jest.fn(),
    });

    render(<CatalogPage />);
    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Service temporarily unavailable')).toBeInTheDocument();
    expect(screen.queryByText('No products found')).not.toBeInTheDocument();
  });
});
