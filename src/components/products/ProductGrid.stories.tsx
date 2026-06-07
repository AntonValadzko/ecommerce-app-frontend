import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { mockOutOfStockProduct, mockProduct } from '@/stories/fixtures/products';
import { ProductGrid } from './ProductGrid';

const meta = {
  title: 'Products/ProductGrid',
  component: ProductGrid,
  tags: ['autodocs'],
  args: {
    onQuickView: fn(),
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof ProductGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithProducts: Story = {
  args: {
    products: [mockProduct, mockOutOfStockProduct, { ...mockProduct, id: 3, name: 'Smart Watch Pro' }],
  },
};

export const Loading: Story = {
  args: {
    products: [],
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    products: [],
    isLoading: false,
  },
};
