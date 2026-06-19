import { render, screen } from '@testing-library/react';
import { RelatedProducts } from './RelatedProducts';
import { mockProduct } from '@/stories/fixtures/products';

jest.mock('@/lib/api', () => {
  const { mockProduct: product } = jest.requireActual('@/stories/fixtures/products') as typeof import('@/stories/fixtures/products');
  return {
    api: {
      getQuickView: jest.fn().mockResolvedValue({ data: product }),
    },
  };
});

describe('RelatedProducts', () => {
  it('returns null for empty list', () => {
    const { container } = render(<RelatedProducts products={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders related products section', () => {
    render(<RelatedProducts products={[mockProduct]} />);
    expect(screen.getByText('Related products')).toBeInTheDocument();
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
  });
});
