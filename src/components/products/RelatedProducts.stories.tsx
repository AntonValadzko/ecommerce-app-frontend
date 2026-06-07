import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { mockOutOfStockProduct, mockProduct } from '@/stories/fixtures/products';
import { mockQuickViewProduct } from '@/stories/fixtures/catalog';
import { swrKey, withSwrFallback } from '@/stories/decorators/swr-fallback';
import { RelatedProducts } from './RelatedProducts';

const meta = {
  title: 'Products/RelatedProducts',
  component: RelatedProducts,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    withSwrFallback({
      [swrKey(['quick-view', mockProduct.id])]: { data: mockQuickViewProduct },
      [swrKey(['quick-view', mockOutOfStockProduct.id])]: {
        data: { ...mockQuickViewProduct, id: mockOutOfStockProduct.id, name: mockOutOfStockProduct.name },
      },
    }),
  ],
} satisfies Meta<typeof RelatedProducts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    products: [mockProduct, mockOutOfStockProduct],
  },
};

export const HiddenWhenEmpty: Story = {
  args: {
    products: [],
  },
};
