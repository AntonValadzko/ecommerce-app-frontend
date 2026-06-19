import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SavedSearchesPanel } from './SavedSearchesPanel';
import { navigationMock } from '@/test-utils';

jest.mock('@/lib/api', () => {
  const { mockSavedSearches } = jest.requireActual('@/stories/fixtures/catalog') as typeof import('@/stories/fixtures/catalog');
  return {
    api: {
      getSavedSearches: jest.fn().mockResolvedValue({ data: mockSavedSearches }),
      deleteSavedSearch: jest.fn().mockResolvedValue(undefined),
    },
  };
});

describe('SavedSearchesPanel', () => {
  it('returns null when closed', () => {
    const { container } = render(<SavedSearchesPanel open={false} onClose={jest.fn()} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('lists saved searches and applies one', async () => {
    const onClose = jest.fn();
    render(<SavedSearchesPanel open onClose={onClose} />);

    expect(await screen.findByText('Electronics under $200')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Electronics under $200' }));
    expect(navigationMock.replace).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('deletes a saved search', async () => {
    const { api } = jest.requireMock('@/lib/api') as {
      api: { deleteSavedSearch: jest.Mock };
    };
    render(<SavedSearchesPanel open onClose={jest.fn()} />);

    fireEvent.click((await screen.findAllByRole('button', { name: /delete/i }))[0]);
    await waitFor(() => expect(api.deleteSavedSearch).toHaveBeenCalledWith('1'));
  });
});
