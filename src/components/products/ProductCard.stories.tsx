import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { mockOutOfStockProduct, mockProduct } from '@/stories/fixtures/products';
import { ProductCard } from './ProductCard';

const meta = {
  title: 'Products/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  args: {
    onQuickView: fn(),
  },
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InStock: Story = {
  args: {
    product: mockProduct,
  },
};

export const OutOfStock: Story = {
  args: {
    product: mockOutOfStockProduct,
  },
};

export const NoDiscount: Story = {
  args: {
    product: {
      ...mockProduct,
      compareAtPrice: null,
      name: 'USB-C Charging Cable (2m)',
      slug: 'usb-c-charging-cable',
    },
  },
};
