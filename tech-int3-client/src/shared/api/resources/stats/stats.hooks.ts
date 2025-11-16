import { useQuery } from '@tanstack/react-query';

import { statsApi, type StatsQuery } from './stats.api';

export const useStatsSummary = (params?: StatsQuery) => {
  return useQuery({
    queryKey: ['stats', 'summary', params],
    queryFn: () => statsApi.getSummary(params),
    staleTime: 60_000,
  });
};

export const useActivityChart = (params?: StatsQuery) => {
  return useQuery({
    queryKey: ['stats', 'activity', params],
    queryFn: () => statsApi.getActivityChart(params),
    staleTime: 60_000,
  });
};

export const useDecisionsChart = (params?: StatsQuery) => {
  return useQuery({
    queryKey: ['stats', 'decisions', params],
    queryFn: () => statsApi.getDecisionsChart(params),
    staleTime: 60_000,
  });
};

export const useCategoriesChart = (params?: StatsQuery) => {
  return useQuery({
    queryKey: ['stats', 'categories', params],
    queryFn: () => statsApi.getCategoriesChart(params),
    staleTime: 60_000,
  });
};
