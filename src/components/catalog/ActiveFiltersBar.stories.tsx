import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import {
  defaultCatalogQuery,
  filteredCatalogQuery,
  mockCategories,
} from '@/stories/fixtures/catalog';
import { ActiveFiltersBar } from './ActiveFiltersBar';

const meta = {
  title: 'Catalog/ActiveFiltersBar',
  component: ActiveFiltersBar,
  tags: ['autodocs'],
  args: {
    query: defaultCatalogQuery,
    categories: mockCategories,
    onChange: fn(),
    onClearAll: fn(),
    onOpenSavedSearches: fn(),
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof ActiveFiltersBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoFilters: Story = {};

export const WithActiveFilters: Story = {
  args: {
    query: filteredCatalogQuery,
  },
};
