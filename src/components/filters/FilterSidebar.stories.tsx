import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import {
  defaultCatalogQuery,
  filteredCatalogQuery,
  mockCategories,
  mockFacets,
} from '@/stories/fixtures/catalog';
import { FilterSidebar } from './FilterSidebar';

const meta = {
  title: 'Filters/FilterSidebar',
  component: FilterSidebar,
  tags: ['autodocs'],
  args: {
    query: defaultCatalogQuery,
    facets: mockFacets,
    categories: mockCategories,
    onChange: fn(),
    onClear: fn(),
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FilterSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSelections: Story = {
  args: {
    query: filteredCatalogQuery,
  },
};

export const WithoutFacets: Story = {
  args: {
    facets: undefined,
  },
};
