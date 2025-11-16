import { ZodError } from 'zod';

import { httpClient } from '@/shared/api';

import {
  AdsListQuerySchema,
  AdsListResponseSchema,
  AdvertisementSchema,
  DecisionRequestSchema,
  DecisionResponseSchema,
  type AdsListQueryInput,
  type AdsListResponse,
  type Advertisement,
  type DecisionRequest,
  type DecisionResponse,
} from './ads.schemas';

function zodErrorMessage(err: unknown) {
  if (err instanceof ZodError) {
    return err.issues.map((issue) => issue.message).join('; ') || 'Validation error';
  }
  if (err instanceof Error) return err.message;
  return 'Validation error';
}

export const adsApi = {
  /** GET /ads — список объявлений с фильтрами/сортировкой/пагинацией */
  async list(params?: AdsListQueryInput): Promise<AdsListResponse> {
    const parsedParams = AdsListQuerySchema.safeParse(params ?? {});
    if (!parsedParams.success) throw new Error(`Неверные параметры запроса: ${zodErrorMessage(parsedParams.error)}`);

    const data = await httpClient.get<AdsListResponse>('/ads', { params: parsedParams.data });
    return AdsListResponseSchema.parse(data);
  },

  /** GET /ads/{id} — детальная карточка */
  async getById(id: number): Promise<Advertisement> {
    if (!Number.isInteger(id) || id <= 0) throw new Error('id должен быть положительным целым числом');
    const data = await httpClient.get<Advertisement>(`/ads/${id}`);
    return AdvertisementSchema.parse(data);
  },

  /** POST /ads/{id}/approve — одобрение */
  async approve(id: number): Promise<DecisionResponse> {
    if (!Number.isInteger(id) || id <= 0) throw new Error('id должен быть положительным целым числом');
    const data = await httpClient.post<DecisionResponse>(`/ads/${id}/approve`);
    return DecisionResponseSchema.parse(data);
  },

  /** POST /ads/{id}/reject — отклонение с причиной/комментом */
  async reject(id: number, payload: DecisionRequest): Promise<DecisionResponse> {
    if (!Number.isInteger(id) || id <= 0) throw new Error('id должен быть положительным целым числом');
    const parsed = DecisionRequestSchema.safeParse(payload);
    if (!parsed.success) throw new Error(`Неверное тело запроса: ${zodErrorMessage(parsed.error)}`);

    const data = await httpClient.post<DecisionResponse>(`/ads/${id}/reject`, { data: parsed.data });
    return DecisionResponseSchema.parse(data);
  },

  /** POST /ads/{id}/request-changes — вернуть на доработку */
  async requestChanges(id: number, payload: DecisionRequest): Promise<DecisionResponse> {
    if (!Number.isInteger(id) || id <= 0) throw new Error('id должен быть положительным целым числом');
    const parsed = DecisionRequestSchema.safeParse(payload);
    if (!parsed.success) throw new Error(`Неверное тело запроса: ${zodErrorMessage(parsed.error)}`);

    const data = await httpClient.post<DecisionResponse>(`/ads/${id}/request-changes`, { data: parsed.data });
    return DecisionResponseSchema.parse(data);
  },
};

export type {
  AdsListQueryInput,
  AdsListResponse,
  Advertisement,
  DecisionRequest,
  DecisionResponse,
} from './ads.schemas';
