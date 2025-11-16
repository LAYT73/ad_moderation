import { Card, Stack, Text } from '@mantine/core';

import type { Advertisement } from '@/shared/api';
import { formatDate } from '@/shared/lib/utils';

interface Props {
  ad: Advertisement;
}

export function AdSeller({ ad }: Props) {
  return (
    <Card shadow="sm" radius="md" withBorder>
      <Stack gap="xs">
        <Text fw={600}>Продавец: {ad.seller.name}</Text>
        <Text size="sm">Рейтинг: {ad.seller.rating}</Text>
        <Text size="sm">Всего объявлений: {ad.seller.totalAds}</Text>
        <Text size="sm">Дата регистрации: {formatDate(ad.seller.registeredAt)}</Text>
      </Stack>
    </Card>
  );
}
