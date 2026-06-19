import { render } from '@testing-library/react';
import { InfiniteScrollTrigger } from './InfiniteScrollTrigger';

describe('InfiniteScrollTrigger', () => {
  it('returns null when no more items', () => {
    const { container } = render(
      <InfiniteScrollTrigger hasMore={false} isLoading={false} onLoadMore={jest.fn()} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders sentinel when more items exist', () => {
    const { container } = render(
      <InfiniteScrollTrigger hasMore isLoading={false} onLoadMore={jest.fn()} />
    );
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
    expect(global.IntersectionObserver).toBeDefined();
  });
});
