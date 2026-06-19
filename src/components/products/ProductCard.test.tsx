import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from './ProductCard';
import { mockProduct } from '@/stories/fixtures/products';

describe('ProductCard', () => {
  it('renders product details and quick view action', () => {
    const onQuickView = jest.fn();
    render(<ProductCard product={mockProduct} onQuickView={onQuickView} />);

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /quick view/i }));
    expect(onQuickView).toHaveBeenCalledWith(mockProduct.id);
  });
});
