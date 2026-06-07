import type { Preview } from '@storybook/nextjs-vite';
import { Inter } from 'next/font/google';
import '../src/app/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-geist-sans' });

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className={`${inter.variable} min-h-screen bg-surface-muted p-6 font-sans text-slate-900`}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;