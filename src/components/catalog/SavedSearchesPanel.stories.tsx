import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { mockSavedSearches } from '@/stories/fixtures/catalog';
import { withSwrFallback } from '@/stories/decorators/swr-fallback';
import { SavedSearchesPanel } from './SavedSearchesPanel';

const meta = {
  title: 'Catalog/SavedSearchesPanel',
  component: SavedSearchesPanel,
  tags: ['autodocs'],
  args: {
    open: true,
    onClose: fn(),
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SavedSearchesPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  decorators: [
    withSwrFallback({
      'saved-searches': { data: [] },
    }),
  ],
};

export const WithSearches: Story = {
  decorators: [
    withSwrFallback({
      'saved-searches': { data: mockSavedSearches },
    }),
  ],
};

export const Closed: Story = {
  args: {
    open: false,
  },
};
