import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StarRating } from './StarRating';

const meta = {
  title: 'UI/StarRating',
  component: StarRating,
  tags: ['autodocs'],
  args: {
    rating: 4.6,
    reviewCount: 1284,
    size: 'sm',
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    rating: { control: { type: 'range', min: 0, max: 5, step: 0.1 } },
  },
} satisfies Meta<typeof StarRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutReviewCount: Story = {
  args: {
    reviewCount: undefined,
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    rating: 3.2,
    reviewCount: 42,
  },
};

export const PerfectRating: Story = {
  args: {
    rating: 5,
    reviewCount: 9,
  },
};
