import { render, screen, fireEvent } from '@testing-library/react';
import { QuickViewModal } from './QuickViewModal';

jest.mock('@/lib/api', () => {
  const { mockQuickViewProduct } = jest.requireActual('@/stories/fixtures/catalog') as typeof import('@/stories/fixtures/catalog');
  return {
    api: {
      getQuickView: jest.fn().mockResolvedValue({ data: mockQuickViewProduct }),
    },
  };
});

const { mockQuickViewProduct } = jest.requireActual('@/stories/fixtures/catalog') as typeof import('@/stories/fixtures/catalog');

describe('QuickViewModal', () => {
  it('returns null without product id', () => {
    const { container } = render(<QuickViewModal productId={null} onClose={jest.fn()} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('loads and displays product details', async () => {
    const onClose = jest.fn();
    render(<QuickViewModal productId={1} onClose={onClose} />);

    expect(await screen.findByText(mockQuickViewProduct.name)).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText(/close quick view/i));
    expect(onClose).toHaveBeenCalled();
  });
});
