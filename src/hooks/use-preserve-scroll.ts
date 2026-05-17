'use client';

import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

/**
 * Snapshots window scroll before URL updates and restores it after React re-renders.
 * A scroll event listener holds the position until the async data settles, preventing
 * Next.js post-navigation scrolls from overriding the restoration.
 */
export function usePreserveScroll(dependencyKey: string, isSettled = true) {
  const targetY = useRef<number | null>(null);

  const applyScroll = useCallback(() => {
    if (targetY.current === null) return;
    const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const y = Math.min(targetY.current, maxY);
    if (Math.abs(window.scrollY - y) > 1) {
      window.scrollTo({ top: y, left: 0, behavior: 'instant' });
    }
  }, []);

  useLayoutEffect(() => {
    applyScroll();

    if (isSettled) {
      const id = requestAnimationFrame(() => {
        applyScroll();
        targetY.current = null;
      });
      return () => cancelAnimationFrame(id);
    }
  }, [dependencyKey, isSettled, applyScroll]);

  useEffect(() => {
    history.scrollRestoration = 'manual';

    const onScroll = () => applyScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      history.scrollRestoration = 'auto';
    };
  }, [applyScroll]);

  const captureScroll = useCallback(() => {
    targetY.current = window.scrollY;
  }, []);

  return { captureScroll };
}
