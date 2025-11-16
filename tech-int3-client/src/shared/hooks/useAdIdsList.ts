import { useQuery } from '@tanstack/react-query';

import { adsApi } from '@/shared/api/resources/ads';

export function useAdIdsList(page: number) {
  const { data } = useQuery({
    queryKey: ['ads', 'list', { page }],
    queryFn: () => adsApi.list({ page, limit: 10 }),
    staleTime: 60_000,
  });
  const ids = data?.ads.map((a) => a.id) ?? [];
  return ids;
}
