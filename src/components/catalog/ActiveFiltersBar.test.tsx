import { render, screen, fireEvent } from '@testing-library/react';
import { ActiveFiltersBar } from './ActiveFiltersBar';
import { filteredCatalogQuery, mockCategories } from '@/stories/fixtures/catalog';

describe('ActiveFiltersBar', () => {
  it('shows chips for active filters', () => {
    render(
      <ActiveFiltersBar
        query={filteredCatalogQuery}
        categories={mockCategories}
        onChange={jest.fn()}
        onClearAll={jest.fn()}
      />
    );

    expect(screen.getByText(/Your selection/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Active filters')).toBeInTheDocument();
  });

  it('shows empty state when no filters', () => {
    render(
      <ActiveFiltersBar
        query={{ page: 1, limit: 24, sort: 'relevance' }}
        categories={mockCategories}
        onChange={jest.fn()}
        onClearAll={jest.fn()}
      />
    );

    expect(screen.getByText(/No filters applied/i)).toBeInTheDocument();
  });

  it('clears all filters', () => {
    const onClearAll = jest.fn();
    render(
      <ActiveFiltersBar
        query={filteredCatalogQuery}
        categories={mockCategories}
        onChange={jest.fn()}
        onClearAll={onClearAll}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /clear all/i }));
    expect(onClearAll).toHaveBeenCalled();
  });
});
