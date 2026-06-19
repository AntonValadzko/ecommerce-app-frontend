import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('returns null for single page', () => {
    const { container } = render(
      <Pagination
        pagination={{ total: 10, page: 1, limit: 24, totalPages: 1, hasMore: false, nextCursor: null }}
        onPageChange={jest.fn()}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('changes page on click', () => {
    const onPageChange = jest.fn();
    render(
      <Pagination
        pagination={{ total: 100, page: 2, limit: 24, totalPages: 5, hasMore: true, nextCursor: null }}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
