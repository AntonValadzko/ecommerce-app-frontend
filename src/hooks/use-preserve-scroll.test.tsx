import { renderHook } from '@testing-library/react';
import { usePreserveScroll } from './use-preserve-scroll';

describe('usePreserveScroll', () => {
  it('returns captureScroll callback', () => {
    Object.defineProperty(window, 'scrollY', { value: 120, configurable: true });
    const { result } = renderHook(() => usePreserveScroll('key', true));
    expect(typeof result.current.captureScroll).toBe('function');
    result.current.captureScroll();
  });
});
