import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { Pagination } from './Pagination';

const meta = {
  title: 'Catalog/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  args: {
    onPageChange: fn(),
    pagination: {
      total: 240,
      page: 1,
      limit: 24,
      totalPages: 10,
      hasMore: true,
      nextCursor: null,
    },
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstPage: Story = {};

export const MiddlePage: Story = {
  args: {
    pagination: {
      total: 240,
      page: 5,
      limit: 24,
      totalPages: 10,
      hasMore: true,
      nextCursor: null,
    },
  },
};

export const LastPage: Story = {
  args: {
    pagination: {
      total: 240,
      page: 10,
      limit: 24,
      totalPages: 10,
      hasMore: false,
      nextCursor: null,
    },
  },
};

export const FewPages: Story = {
  args: {
    pagination: {
      total: 72,
      page: 2,
      limit: 24,
      totalPages: 3,
      hasMore: true,
      nextCursor: null,
    },
  },
};
