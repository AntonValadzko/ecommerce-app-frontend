import { render, screen, fireEvent } from '@testing-library/react';
import { ProductDetailClient } from './ProductDetailClient';

jest.mock('./QuickViewModal', () => ({
  QuickViewModal: ({ onClose }: { onClose: () => void }) => (
    <div>
      Quick view open
      <button type="button" onClick={onClose}>
        Close
      </button>
    </div>
  ),
}));

describe('ProductDetailClient', () => {
  it('opens quick view preview', () => {
    render(<ProductDetailClient productId={42} />);
    fireEvent.click(screen.getByRole('button', { name: /quick view preview/i }));
    expect(screen.getByText('Quick view open')).toBeInTheDocument();
  });
});
