'use client';

import { useCallback, useEffect, useMemo, useState, useTransition } from 'react';
import useSWR from 'swr';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import { logger } from '@/lib/logger';
import { catalogParamsToUrl, hasActiveFilters, parseCatalogParams } from '@/lib/catalog-params';
import type { CatalogQuery, ProductListItem } from '@/lib/types';
import { usePreserveScroll } from './use-preserve-scroll';

export function useCatalog() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const query = useMemo(() => {
    const params: Record<string, string | string[] | undefined> = {};
    searchParams.forEach((value, key) => {
      const existing = params[key];
      if (existing === undefined) params[key] = value;
      else if (Array.isArray(existing)) existing.push(value);
      else params[key] = [existing, value];
    });
    return parseCatalogParams(params);
  }, [searchParams]);

  const queryKey = useMemo(() => JSON.stringify(query), [query]);

  const { data, error: productsError, isLoading, mutate } = useSWR(
    ['products', queryKey],
    () => api.getProducts(query),
    { keepPreviousData: true }
  );

  const { data: categoriesData, isLoading: categoriesLoading } = useSWR('categories', () =>
    api.getCategories()
  );

  const { captureScroll } = usePreserveScroll(queryKey, !isLoading);

  const setQuery = useCallback(
    (
      patch: Partial<CatalogQuery>,
      options?: { resetPage?: boolean; scrollToTop?: boolean }
    ) => {
      const shouldResetPage = options?.resetPage ?? !('page' in patch);
      const next: CatalogQuery = {
        ...query,
        ...patch,
        ...(shouldResetPage ? { page: 1, cursor: undefined } : {}),
      };
      const url = catalogParamsToUrl(next);

      if (!options?.scrollToTop) {
        captureScroll();
      }

      const navigate = () => {
        if (options?.scrollToTop) {
          router.push(url);
        } else {
          router.replace(url, { scroll: false });
        }
      };

      startTransition(navigate);
    },
    [query, router, captureScroll, startTransition]
  );

  const { data: facetsData } = useSWR(['facets', queryKey], () =>
    api.getFacets({
      ...query,
      brand: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      minRating: undefined,
      attributes: undefined,
    })
  );

  const [accumulated, setAccumulated] = useState<ProductListItem[]>([]);

  useEffect(() => {
    if (productsError) {
      logger.error('Failed to load catalog products', {
        query: queryKey,
        error: productsError instanceof Error ? productsError.message : String(productsError),
      });
    }
  }, [productsError, queryKey]);

  useEffect(() => {
    if (!data) return;

    if (query.scroll && query.cursor) {
      setAccumulated((prev) => {
        const ids = new Set(prev.map((p) => p.id));
        const merged = [...prev];
        for (const item of data.data) {
          if (!ids.has(item.id)) merged.push(item);
        }
        return merged;
      });
    } else {
      setAccumulated(data.data);
    }
  }, [data, query.scroll, query.cursor]);

  const loadMore = useCallback(() => {
    if (data?.pagination.nextCursor) {
      setQuery({ cursor: data.pagination.nextCursor, scroll: true }, { resetPage: false });
    }
  }, [data, setQuery]);

  const products = query.scroll ? accumulated : (data?.data ?? []);

  const isEmptyCatalogUnavailable =
    !productsError &&
    !isLoading &&
    !categoriesLoading &&
    data !== undefined &&
    !hasActiveFilters(query) &&
    (data.pagination?.total ?? 0) === 0 &&
    products.length === 0 &&
    (categoriesData?.data?.length ?? 0) === 0;

  const isUnavailable = Boolean(productsError) || isEmptyCatalogUnavailable;

  return {
    query,
    setQuery,
    products,
    pagination: data?.pagination,
    seo: data?.meta.seo,
    facets: facetsData?.data,
    categories: categoriesData?.data ?? [],
    isLoading,
    isUnavailable,
    loadMore,
    refresh: mutate,
  };
}
