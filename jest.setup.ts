import '@testing-library/jest-dom';
import React from 'react';
import { navigationMock } from './src/testing/navigation-mock';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: navigationMock.push,
    replace: navigationMock.replace,
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => navigationMock.searchParams,
  usePathname: () => '/',
  notFound: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage({
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean }) {
    return React.createElement('img', { alt: alt ?? '', ...props });
  },
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
  }) => React.createElement('a', { href, ...rest }, children),
}));

jest.mock('next/font/google', () => ({
  Inter: () => ({ variable: '--font-inter' }),
}));

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin = '';
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(private callback: IntersectionObserverCallback) {}

  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
  takeRecords = jest.fn().mockReturnValue([]);

  trigger(isIntersecting: boolean) {
    this.callback([{ isIntersecting } as IntersectionObserverEntry], this);
  }
}

global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: () => 'test-session-uuid',
  },
});

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(global, 'localStorage', { value: localStorageMock });

beforeEach(() => {
  navigationMock.push.mockReset();
  navigationMock.replace.mockReset();
  navigationMock.searchParams = new URLSearchParams();
  localStorage.clear();
});
