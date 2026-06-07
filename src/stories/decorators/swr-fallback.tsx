import { SWRConfig, unstable_serialize } from 'swr';
import type { Decorator } from '@storybook/nextjs-vite';

export function withSwrFallback(
  fallback: Record<string, unknown>
): Decorator {
  return (Story) => (
    <SWRConfig value={{ fallback, dedupingInterval: 0, revalidateOnMount: false }}>
      <Story />
    </SWRConfig>
  );
}

export function swrKey(key: string | unknown[]): string {
  return unstable_serialize(key);
}
