import { render, screen, fireEvent } from '@testing-library/react';
import { CatalogToolbar } from './CatalogToolbar';
import { mockPagination } from '@/stories/fixtures/catalog';

describe('CatalogToolbar', () => {
  it('shows product count and sort controls', () => {
    const onChange = jest.fn();
    render(
      <CatalogToolbar
        query={{ page: 1, limit: 24, sort: 'relevance', q: 'phone' }}
        pagination={mockPagination}
        onChange={onChange}
      />
    );

    expect(screen.getByText(/240/)).toBeInTheDocument();
    fireEvent.change(screen.getByDisplayValue('Relevance'), { target: { value: 'rating' } });
    expect(onChange).toHaveBeenCalledWith({ sort: 'rating' });
  });
});
