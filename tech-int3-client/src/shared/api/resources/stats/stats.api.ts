import { z } from 'zod';

import { httpClient } from '@/shared/api';

import {
  ActivityDataSchema,
  CategoriesDataSchema,
  DecisionsDataSchema,
  StatsSummarySchema,
  type ActivityData,
  type CategoriesData,
  type DecisionsData,
  type StatsSummary,
  type StatsQuery,
} from './stats.schemas';

export const statsApi = {
  /** GET /stats/summary — общая статистика */
  async getSummary(params?: StatsQuery): Promise<StatsSummary> {
    const data = await httpClient.get<StatsSummary>('/stats/summary', { params });
    return StatsSummarySchema.parse(data);
  },

  /** GET /stats/chart/activity — данные графика активности */
  async getActivityChart(params?: StatsQuery): Promise<ActivityData[]> {
    const data = await httpClient.get<ActivityData[]>('/stats/chart/activity', { params });
    return z.array(ActivityDataSchema).parse(data);
  },

  /** GET /stats/chart/decisions — данные графика решений */
  async getDecisionsChart(params?: StatsQuery): Promise<DecisionsData> {
    const data = await httpClient.get<DecisionsData>('/stats/chart/decisions', { params });
    return DecisionsDataSchema.parse(data);
  },

  /** GET /stats/chart/categories — данные графика категорий */
  async getCategoriesChart(params?: StatsQuery): Promise<CategoriesData> {
    const data = await httpClient.get<CategoriesData>('/stats/chart/categories', { params });
    return CategoriesDataSchema.parse(data);
  },
};

export type { StatsSummary, ActivityData, DecisionsData, CategoriesData, StatsQuery };
