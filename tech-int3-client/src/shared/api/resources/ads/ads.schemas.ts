import { z } from 'zod';

/** Enums из схемы OpenAPI */
export const AdStatusEnum = z.enum(['pending', 'approved', 'rejected', 'draft']);
export type AdStatus = z.infer<typeof AdStatusEnum>;

export const AdPriorityEnum = z.enum(['normal', 'urgent']);
export type AdPriority = z.infer<typeof AdPriorityEnum>;

export const ModerationActionEnum = z.enum(['approved', 'rejected', 'requestChanges']);
export type ModerationAction = z.infer<typeof ModerationActionEnum>;

/** Причины для отклонения/запроса изменений (из задания) */
export const DecisionReasonEnum = z.enum([
  'Запрещенный товар',
  'Неверная категория',
  'Некорректное описание',
  'Проблемы с фото',
  'Подозрение на мошенничество',
  'Другое',
]);
export type DecisionReason = z.infer<typeof DecisionReasonEnum>;

/** Сущности */
export const SellerSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  rating: z.string(),
  totalAds: z.number().int(),
  registeredAt: z.iso.datetime(),
});
export type Seller = z.infer<typeof SellerSchema>;

export const ModerationHistorySchema = z.object({
  id: z.number().int(),
  moderatorId: z.number().int(),
  moderatorName: z.string(),
  action: ModerationActionEnum,
  reason: z.string().nullable().optional(),
  comment: z.string().optional(),
  timestamp: z.iso.datetime(),
});
export type ModerationHistory = z.infer<typeof ModerationHistorySchema>;

export const AdvertisementSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  categoryId: z.number().int(),
  status: AdStatusEnum,
  priority: AdPriorityEnum,
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  images: z.array(z.string()),
  seller: SellerSchema,
  characteristics: z.record(z.string(), z.string()),
  moderationHistory: z.array(ModerationHistorySchema),
});
export type Advertisement = z.infer<typeof AdvertisementSchema>;

export const PaginationSchema = z.object({
  currentPage: z.number().int(),
  totalPages: z.number().int(),
  totalItems: z.number().int(),
  itemsPerPage: z.number().int(),
});
export type Pagination = z.infer<typeof PaginationSchema>;

/** Ответы API */
export const AdsListResponseSchema = z.object({
  ads: z.array(AdvertisementSchema),
  pagination: PaginationSchema,
});
export type AdsListResponse = z.infer<typeof AdsListResponseSchema>;

export const DecisionResponseSchema = z.object({
  message: z.string(),
  ad: AdvertisementSchema,
});
export type DecisionResponse = z.infer<typeof DecisionResponseSchema>;

/** Входные параметры запросов */
export const AdsListQuerySchema = z
  .object({
    page: z.number().int().min(1).default(1).optional(),
    limit: z.number().int().min(1).max(100).default(10).optional(),
    status: z.array(AdStatusEnum).optional(),
    categoryId: z.number().int().optional(),
    minPrice: z.number().nonnegative().optional(),
    maxPrice: z.number().nonnegative().optional(),
    search: z.string().optional(),
    sortBy: z.enum(['createdAt', 'price', 'priority']).default('createdAt').optional(),
    sortOrder: z.enum(['asc', 'desc']).default('desc').optional(),
  })
  .refine((v) => !(typeof v.minPrice === 'number' && typeof v.maxPrice === 'number' && v.minPrice > v.maxPrice), {
    message: 'minPrice не может быть больше maxPrice',
    path: ['minPrice'],
  });

export type AdsListQueryInput = z.input<typeof AdsListQuerySchema>;
export type AdsListQuery = z.output<typeof AdsListQuerySchema>;

export const DecisionRequestSchema = z.object({
  reason: DecisionReasonEnum,
  comment: z.string().optional(),
});
export type DecisionRequest = z.infer<typeof DecisionRequestSchema>;
