import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { type AdStatus } from '@/shared/api';
import { useDebounce } from '@/shared/hooks/useDebounce';

export interface AdsFiltersState {
  search: string;
  statuses: AdStatus[];
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy: 'createdAt' | 'price' | 'priority';
  sortOrder: 'asc' | 'desc';
  page: number;
}

export const useAdsFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: AdsFiltersState = useMemo(() => {
    const search = searchParams.get('search') || '';
    const statusesParam = searchParams.get('statuses');
    const statuses = statusesParam ? (statusesParam.split(',') as AdStatus[]) : [];
    const categoryId = searchParams.get('categoryId') ? Number(searchParams.get('categoryId')) : undefined;
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
    const sortBy = (searchParams.get('sortBy') as 'createdAt' | 'price' | 'priority') || 'createdAt';
    const sortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc';
    const page = Number(searchParams.get('page')) || 1;

    return { search, statuses, categoryId, minPrice, maxPrice, sortBy, sortOrder, page };
  }, [searchParams]);

  // Дебаунсим только то, что триггерит частые запросы
  const debouncedSearch = useDebounce(filters.search, 500);
  const debouncedMinPrice = useDebounce(filters.minPrice, 500);
  const debouncedMaxPrice = useDebounce(filters.maxPrice, 500);

  const updateFilters = useCallback(
    (updates: Partial<AdsFiltersState>) => {
      const newParams = new URLSearchParams(searchParams);

      Object.entries({ ...filters, ...updates }).forEach(([key, value]) => {
        if (value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
          newParams.delete(key);
        } else if (Array.isArray(value)) {
          newParams.set(key, value.join(','));
        } else {
          newParams.set(key, String(value));
        }
      });

      // При изменении фильтров сбрасываем на первую страницу
      if (updates.page === undefined) {
        newParams.set('page', '1');
      }

      setSearchParams(newParams);
    },
    [filters, searchParams, setSearchParams],
  );

  const resetFilters = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  return {
    filters,
    debouncedFilters: {
      ...filters,
      search: debouncedSearch,
      minPrice: debouncedMinPrice,
      maxPrice: debouncedMaxPrice,
    },
    updateFilters,
    resetFilters,
  };
};
