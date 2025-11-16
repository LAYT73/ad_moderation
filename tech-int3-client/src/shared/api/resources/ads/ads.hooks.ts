import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { adsApi, type AdsListQueryInput, type AdsListResponse } from './ads.api';

export const useAdsList = (params?: AdsListQueryInput): UseQueryResult<AdsListResponse> => {
  return useQuery({
    queryKey: ['ads', 'list', params],
    queryFn: () => adsApi.list(params),
    staleTime: 30 * 1000, // 30 секунд
  });
};
