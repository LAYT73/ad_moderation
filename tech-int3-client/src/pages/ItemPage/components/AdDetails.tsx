import { Stack, Title, Text, Badge, Group } from '@mantine/core';

import { type Advertisement } from '@/shared/api/resources/advertisements';
import { formatPrice, formatDate } from '@/shared/lib/utils';

interface Props {
  ad: Advertisement;
}

const statusLabels: Record<Advertisement['status'], string> = {
  pending: 'На модерации',
  approved: 'Одобрено',
  rejected: 'Отклонено',
};

const priorityLabels: Record<Advertisement['priority'], string> = {
  normal: 'Обычный',
  urgent: 'Срочный',
};

export function AdDetails({ ad }: Props) {
  return (
    <Stack gap="md">
      <Title order={2}>{ad.title}</Title>
      <Text size="lg" fw={600} c="blue">
        {formatPrice(ad.price)}
      </Text>
      <Group>
        <Badge color={ad.priority === 'urgent' ? 'red' : 'gray'}>{priorityLabels[ad.priority]}</Badge>
        <Badge color={ad.status === 'approved' ? 'green' : ad.status === 'rejected' ? 'red' : 'yellow'}>
          {statusLabels[ad.status]}
        </Badge>
        <Text size="sm" c="dimmed">
          {ad.category}
        </Text>
        <Text size="sm" c="dimmed">
          {formatDate(ad.createdAt)}
        </Text>
      </Group>
      <Text>{ad.description}</Text>
    </Stack>
  );
}
