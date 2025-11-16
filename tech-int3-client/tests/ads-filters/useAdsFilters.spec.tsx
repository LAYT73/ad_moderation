/*
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import { describe, it, expect } from '@jest/globals';
import { renderHook, act } from '@testing-library/react';
import { type ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { useAdsFilters } from '@/features/ads-filters/hooks/useAdsFilters';

const wrapper = ({ children }: { children: ReactNode }) => <BrowserRouter>{children}</BrowserRouter>;

describe('useAdsFilters', () => {
  it('должен инициализироваться с дефолтными значениями', () => {
    const { result } = renderHook(() => useAdsFilters(), { wrapper });

    expect(result.current.filters.page).toBe(1);
    expect(result.current.filters.search).toBe('');
    expect(result.current.filters.statuses).toEqual([]);
    expect(result.current.filters.sortBy).toBe('createdAt');
    expect(result.current.filters.sortOrder).toBe('desc');
  });

  it('должен обновлять поисковый запрос', () => {
    const { result } = renderHook(() => useAdsFilters(), { wrapper });

    act(() => {
      result.current.updateFilters({ search: 'iPhone' });
    });

    expect(result.current.filters.search).toBe('iPhone');
  });

  it('должен обновлять статусы', () => {
    const { result } = renderHook(() => useAdsFilters(), { wrapper });

    act(() => {
      result.current.updateFilters({ statuses: ['pending', 'approved'] });
    });

    expect(result.current.filters.statuses).toEqual(['pending', 'approved']);
  });

  it('должен сбрасывать страницу при изменении фильтров', () => {
    const { result } = renderHook(() => useAdsFilters(), { wrapper });

    act(() => {
      result.current.updateFilters({ page: 3 });
    });

    expect(result.current.filters.page).toBe(3);

    act(() => {
      result.current.updateFilters({ search: 'test' });
    });

    expect(result.current.filters.page).toBe(1);
  });

  it('должен обновлять диапазон цен', () => {
    const { result } = renderHook(() => useAdsFilters(), { wrapper });

    act(() => {
      result.current.updateFilters({ minPrice: 1000, maxPrice: 5000 });
    });

    expect(result.current.filters.minPrice).toBe(1000);
    expect(result.current.filters.maxPrice).toBe(5000);
  });

  it('должен очищать все фильтры', () => {
    const { result } = renderHook(() => useAdsFilters(), { wrapper });

    act(() => {
      result.current.updateFilters({
        search: 'test',
        statuses: ['pending'],
        minPrice: 100,
      });
    });

    act(() => {
      result.current.resetFilters();
    });

    expect(result.current.filters.search).toBe('');
    expect(result.current.filters.statuses).toEqual([]);
    expect(result.current.filters.minPrice).toBeUndefined();
  });
});
