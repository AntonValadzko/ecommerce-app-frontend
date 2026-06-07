import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { mockQuickViewProduct } from '@/stories/fixtures/catalog';
import { swrKey, withSwrFallback } from '@/stories/decorators/swr-fallback';
import { QuickViewModal } from './QuickViewModal';

const meta = {
  title: 'Products/QuickViewModal',
  component: QuickViewModal,
  tags: ['autodocs'],
  args: {
    productId: mockQuickViewProduct.id,
    onClose: fn(),
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof QuickViewModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  decorators: [
    withSwrFallback({
      [swrKey(['quick-view', mockQuickViewProduct.id])]: { data: mockQuickViewProduct },
    }),
  ],
};

export const Loading: Story = {};
