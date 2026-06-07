import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { PriceRangeSlider } from './PriceRangeSlider';

const meta = {
  title: 'Filters/PriceRangeSlider',
  component: PriceRangeSlider,
  tags: ['autodocs'],
  args: {
    min: 10,
    max: 500,
    valueMin: 50,
    valueMax: 200,
    onChange: fn(),
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PriceRangeSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FullRange: Story = {
  args: {
    valueMin: 10,
    valueMax: 500,
  },
};
