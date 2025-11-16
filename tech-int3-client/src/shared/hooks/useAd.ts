import { useQuery } from '@tanstack/react-query';

import { adsApi } from '@/shared/api/resources/ads';

export function useAd(adId: number) {
  return useQuery({
    queryKey: ['ads', 'item', adId],
    queryFn: () => adsApi.getById(adId),
    enabled: Number.isInteger(adId) && adId > 0,
  });
}
