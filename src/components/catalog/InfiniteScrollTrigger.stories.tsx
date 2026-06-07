import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { InfiniteScrollTrigger } from './InfiniteScrollTrigger';

const meta = {
  title: 'Catalog/InfiniteScrollTrigger',
  component: InfiniteScrollTrigger,
  tags: ['autodocs'],
  args: {
    hasMore: true,
    isLoading: false,
    onLoadMore: fn(),
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof InfiniteScrollTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ready: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const NoMore: Story = {
  args: {
    hasMore: false,
  },
};
