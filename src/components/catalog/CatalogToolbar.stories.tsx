import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import {
  defaultCatalogQuery,
  filteredCatalogQuery,
  mockPagination,
} from '@/stories/fixtures/catalog';
import { CatalogToolbar } from './CatalogToolbar';

const meta = {
  title: 'Catalog/CatalogToolbar',
  component: CatalogToolbar,
  tags: ['autodocs'],
  args: {
    query: defaultCatalogQuery,
    pagination: mockPagination,
    onChange: fn(),
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof CatalogToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSearchQuery: Story = {
  args: {
    query: filteredCatalogQuery,
  },
};

export const Loading: Story = {
  args: {
    pagination: undefined,
  },
};

export const InfiniteScrollEnabled: Story = {
  args: {
    query: { ...defaultCatalogQuery, scroll: true },
  },
};
