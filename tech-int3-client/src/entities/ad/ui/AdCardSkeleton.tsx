import { Card, Skeleton, Stack, Group } from '@mantine/core';
import { m } from 'framer-motion';
import { memo } from 'react';

export const AdCardSkeleton = memo(() => {
  return (
    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Skeleton height={200} />
        </Card.Section>

        <Stack gap="sm" mt="md">
          <Group justify="space-between" align="flex-start">
            <Skeleton height={24} width="70%" />
            <Skeleton height={24} width={60} />
          </Group>

          <Group justify="space-between">
            <Skeleton height={28} width={100} />
            <Skeleton height={22} width={90} />
          </Group>

          <Skeleton height={18} width="50%" />
          <Skeleton height={14} width="40%" />
        </Stack>
      </Card>
    </m.div>
  );
});

AdCardSkeleton.displayName = 'AdCardSkeleton';
