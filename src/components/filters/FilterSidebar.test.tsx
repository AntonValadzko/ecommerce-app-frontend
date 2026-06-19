import { render, screen, fireEvent } from '@testing-library/react';
import { FilterSidebar } from './FilterSidebar';
import { mockCategories, mockFacets } from '@/stories/fixtures/catalog';

describe('FilterSidebar', () => {
  it('renders categories and toggles brand filter', () => {
    const onChange = jest.fn();
    render(
      <FilterSidebar
        query={{ page: 1, limit: 24, sort: 'relevance' }}
        facets={mockFacets}
        categories={mockCategories}
        onChange={onChange}
        onClear={jest.fn()}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /electronics/i }));
    expect(onChange).toHaveBeenCalledWith({ category: 'electronics' });

    fireEvent.click(screen.getByLabelText(/SoundMax/i));
    expect(onChange).toHaveBeenCalledWith({ brand: ['SoundMax'] });
  });
});
