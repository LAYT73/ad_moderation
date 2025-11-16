import { Badge, Card, Group, Image, Stack, Text, Skeleton, Checkbox } from '@mantine/core';
import { m } from 'framer-motion';
import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { type Advertisement } from '@/shared/api';
import { formatDate, formatPrice } from '@/shared/lib/utils';

interface AdCardProps {
  ad: Advertisement;
  selectable?: boolean;
  selected?: boolean;
  onToggleSelect?: (id: number, next: boolean) => void;
}

const statusLabels: Record<Advertisement['status'], string> = {
  pending: 'На модерации',
  approved: 'Одобрено',
  rejected: 'Отклонено',
  draft: 'Черновик',
};

const statusColors: Record<Advertisement['status'], string> = {
  pending: 'yellow',
  approved: 'green',
  rejected: 'red',
  draft: 'gray',
};

const priorityLabels: Record<Advertisement['priority'], string> = {
  normal: 'Обычный',
  urgent: 'Срочный',
};

export const AdCard = memo(({ ad, selectable, selected, onToggleSelect }: AdCardProps) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClick = () => {
    if (!selectable) navigate(`/item/${ad.id}`);
  };

  const handleCheckClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onToggleSelect?.(ad.id, e.currentTarget.checked);
  };

  return (
    <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className="cursor-pointer hover:shadow-md transition-shadow relative"
        onClick={handleClick}
      >
        <Card.Section>
          {!imageLoaded && <Skeleton height={200} />}
          <Image
            src={ad.images[0] || 'https://placehold.co/600x400?text=No+Image'}
            height={200}
            alt={ad.title}
            fallbackSrc="https://placehold.co/600x400?text=No+Image"
            onLoad={() => setImageLoaded(true)}
            style={{ display: imageLoaded ? 'block' : 'none' }}
          />
        </Card.Section>

        <Stack gap="sm" mt="md">
          <Group justify="space-between" align="flex-start">
            <Text fw={700} size="lg" lineClamp={2} className="flex-1">
              {ad.title}
            </Text>
            {ad.priority === 'urgent' && (
              <Badge color="red" variant="filled">
                {priorityLabels[ad.priority]}
              </Badge>
            )}
          </Group>

          <Group justify="space-between">
            <Text fw={600} size="xl" c="blue">
              {formatPrice(ad.price)}
            </Text>
            <Badge color={statusColors[ad.status]} variant="light">
              {statusLabels[ad.status]}
            </Badge>
          </Group>

          <Text size="sm" c="dimmed">
            {ad.category}
          </Text>

          <Text size="xs" c="dimmed">
            {formatDate(ad.createdAt)}
          </Text>
        </Stack>
        {selectable && (
          <button className="absolute right-2 bottom-2 z-10 cursor-pointer" onClick={handleCheckClick}>
            <Checkbox checked={!!selected} onChange={handleToggle} aria-label="Выбрать объявление" />
          </button>
        )}
      </Card>
    </m.div>
  );
});

AdCard.displayName = 'AdCard';
