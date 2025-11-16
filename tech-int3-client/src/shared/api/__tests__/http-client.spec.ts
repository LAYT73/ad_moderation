/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

import { httpClient } from '@/shared/api/http-client';
import { adsApi } from '@/shared/api/resources/advertisements/ads.api';

jest.mock('@/shared/api/http-client');

jest.mock('@/shared/config/env', () => ({
  getRawEnv: () => ({
    VITE_API_URL: 'http://test-api',
  }),
}));

describe('adsApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('list', () => {
    it('должен вызывать GET /ads с корректными параметрами', async () => {
      const mockResponse = {
        ads: [
          {
            id: 1,
            title: 'Test Ad',
            status: 'pending',
            price: 1000,
            category: 'Электроника',
            categoryId: 1,
            description: 'Test',
            priority: 'normal',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            images: [],
            seller: {
              id: 1,
              name: 'Test',
              rating: '5.0',
              totalAds: 10,
              registeredAt: new Date().toISOString(),
            },
            characteristics: {},
            moderationHistory: [],
          },
        ],
        pagination: { currentPage: 1, totalPages: 1, totalItems: 1, itemsPerPage: 10 },
      };

      jest.mocked(httpClient.get).mockResolvedValue(mockResponse);

      const result = await adsApi.list({ page: 1, limit: 10 });

      expect(httpClient.get).toHaveBeenCalledWith('/ads', {
        params: { page: 1, limit: 10, sortBy: 'createdAt', sortOrder: 'desc' },
      });
      expect(result).toEqual(mockResponse);
    });

    it('должен выбрасывать ошибку при невалидных параметрах', async () => {
      await expect(adsApi.list({ page: -1 } as any)).rejects.toThrow('Неверные параметры запроса');
    });
  });

  const mockAd = {
    id: 1,
    title: 'Test Ad',
    status: 'approved',
    price: 1000,
    category: 'Электроника',
    categoryId: 1,
    description: 'Test',
    priority: 'normal',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    images: [],
    seller: {
      id: 1,
      name: 'Test',
      rating: '5.0',
      totalAds: 10,
      registeredAt: new Date().toISOString(),
    },
    characteristics: {},
    moderationHistory: [],
  };

  describe('approve', () => {
    it('должен вызывать POST /ads/{id}/approve', async () => {
      const mockResponse = {
        message: 'Одобрено',
        ad: mockAd,
      };

      jest.mocked(httpClient.post).mockResolvedValue(mockResponse);

      const result = await adsApi.approve(1);

      expect(httpClient.post).toHaveBeenCalledWith('/ads/1/approve');
      expect(result.message).toBe('Одобрено');
    });

    it('должен выбрасывать ошибку для невалидного ID', async () => {
      await expect(adsApi.approve(0)).rejects.toThrow('id должен быть положительным целым числом');
      await expect(adsApi.approve(-5)).rejects.toThrow('id должен быть положительным целым числом');
    });
  });

  describe('reject', () => {
    it('должен отклонять объявление с причиной', async () => {
      const mockResponse = {
        message: 'Отклонено',
        ad: mockAd,
      };

      jest.mocked(httpClient.post).mockResolvedValue(mockResponse);

      const result = await adsApi.reject(1, {
        reason: 'Запрещенный товар',
        comment: 'Тестовый комментарий',
      });

      expect(httpClient.post).toHaveBeenCalledWith('/ads/1/reject', {
        data: { reason: 'Запрещенный товар', comment: 'Тестовый комментарий' },
      });
      expect(result.message).toBe('Отклонено');
    });

    it('должен выбрасывать ошибку при отсутствии причины', async () => {
      await expect(adsApi.reject(1, { reason: '' } as any)).rejects.toThrow('Неверное тело запроса');
    });
  });
});
