import { z } from 'zod';

/** Схемы для статистики */
export const StatsSummarySchema = z.object({
  totalReviewed: z.number().int(),
  totalReviewedToday: z.number().int(),
  totalReviewedThisWeek: z.number().int(),
  totalReviewedThisMonth: z.number().int(),
  approvedPercentage: z.number(),
  rejectedPercentage: z.number(),
  requestChangesPercentage: z.number(),
  averageReviewTime: z.number().int(),
});
export type StatsSummary = z.infer<typeof StatsSummarySchema>;

export const ActivityDataSchema = z.object({
  date: z.string(),
  approved: z.number().int(),
  rejected: z.number().int(),
  requestChanges: z.number().int(),
});
export type ActivityData = z.infer<typeof ActivityDataSchema>;

export const DecisionsDataSchema = z.object({
  approved: z.number(),
  rejected: z.number(),
  requestChanges: z.number(),
});
export type DecisionsData = z.infer<typeof DecisionsDataSchema>;

export const CategoriesDataSchema = z.record(z.string(), z.number().int());
export type CategoriesData = z.infer<typeof CategoriesDataSchema>;

export const StatsQuerySchema = z.object({
  period: z.enum(['today', 'week', 'month', 'custom']).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});
export type StatsQuery = z.infer<typeof StatsQuerySchema>;
