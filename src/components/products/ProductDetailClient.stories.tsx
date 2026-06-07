import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { mockQuickViewProduct } from '@/stories/fixtures/catalog';
import { swrKey, withSwrFallback } from '@/stories/decorators/swr-fallback';
import { ProductDetailClient } from './ProductDetailClient';

const meta = {
  title: 'Products/ProductDetailClient',
  component: ProductDetailClient,
  tags: ['autodocs'],
  args: {
    productId: mockQuickViewProduct.id,
  },
  parameters: {
    layout: 'padded',
  },
  decorators: [
    withSwrFallback({
      [swrKey(['quick-view', mockQuickViewProduct.id])]: { data: mockQuickViewProduct },
    }),
  ],
} satisfies Meta<typeof ProductDetailClient>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
