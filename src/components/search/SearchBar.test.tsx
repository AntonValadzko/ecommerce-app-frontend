import { render, screen, fireEvent, act } from '@testing-library/react';
import { SearchBar } from './SearchBar';

jest.mock('@/lib/api', () => {
  const { mockAutocomplete } = jest.requireActual('@/stories/fixtures/catalog') as typeof import('@/stories/fixtures/catalog');
  return {
    api: {
      autocomplete: jest.fn().mockResolvedValue({ data: mockAutocomplete }),
    },
  };
});

describe('SearchBar', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('submits search query', () => {
    const onSearch = jest.fn();
    render(
      <SearchBar
        query={{ page: 1, limit: 24, sort: 'relevance' }}
        onSearch={onSearch}
        onSelectSuggestion={jest.fn()}
      />
    );

    fireEvent.change(screen.getByLabelText(/search products/i), {
      target: { value: 'headphones' },
    });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(onSearch).toHaveBeenCalledWith('headphones');
  });

  it('shows autocomplete suggestions after debounce', async () => {
    render(
      <SearchBar
        query={{ page: 1, limit: 24, sort: 'relevance' }}
        onSearch={jest.fn()}
        onSelectSuggestion={jest.fn()}
      />
    );

    fireEvent.change(screen.getByLabelText(/search products/i), {
      target: { value: 'wire' },
    });

    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    expect(await screen.findByText('Wireless Headphones')).toBeInTheDocument();
  });
});
