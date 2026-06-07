import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import {
  defaultCatalogQuery,
  mockAutocomplete,
} from '@/stories/fixtures/catalog';
import { swrKey, withSwrFallback } from '@/stories/decorators/swr-fallback';
import { SearchBar } from './SearchBar';

const meta = {
  title: 'Search/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  args: {
    query: defaultCatalogQuery,
    onSearch: fn(),
    onSelectSuggestion: fn(),
  },
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithPrefilledQuery: Story = {
  args: {
    query: { ...defaultCatalogQuery, q: 'headphones' },
  },
};

export const WithAutocompleteSuggestions: Story = {
  args: {
    query: { ...defaultCatalogQuery, q: 'head' },
  },
  decorators: [
    withSwrFallback({
      [swrKey(['autocomplete', 'head'])]: { data: mockAutocomplete },
    }),
  ],
};
