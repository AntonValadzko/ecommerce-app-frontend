import { render, screen } from '@testing-library/react';
import { ProductGrid } from './ProductGrid';
import { mockProduct } from '@/stories/fixtures/products';

describe('ProductGrid', () => {
  it('shows loading skeletons', () => {
    const { container } = render(
      <ProductGrid products={[]} onQuickView={jest.fn()} isLoading />
    );
    expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0);
  });

  it('shows empty state', () => {
    render(<ProductGrid products={[]} onQuickView={jest.fn()} />);
    expect(screen.getByText('No products found')).toBeInTheDocument();
  });

  it('renders product cards', () => {
    render(<ProductGrid products={[mockProduct]} onQuickView={jest.fn()} />);
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
  });
});
