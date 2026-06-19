import { render, type RenderOptions } from '@testing-library/react';
import { SWRConfig } from 'swr';
import type { ReactElement, ReactNode } from 'react';
import { navigationMock } from '@/testing/navigation-mock';

export function setMockSearchParams(params: Record<string, string | string[]>) {
  navigationMock.searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      value.forEach((v) => navigationMock.searchParams.append(key, v));
    } else {
      navigationMock.searchParams.set(key, value);
    }
  }
}

function Providers({ children }: { children: ReactNode }) {
  return (
    <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>{children}</SWRConfig>
  );
}

export function renderWithProviders(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: Providers, ...options });
}

export { navigationMock };
