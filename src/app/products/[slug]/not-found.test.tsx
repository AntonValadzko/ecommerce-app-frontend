import { render, screen } from '@testing-library/react';
import ProductNotFound from './not-found';

describe('ProductNotFound', () => {
  it('renders not found message and link', () => {
    render(<ProductNotFound />);
    expect(screen.getByText('Product not found')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to catalog/i })).toHaveAttribute('href', '/');
  });
});
