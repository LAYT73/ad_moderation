import { Card, Group, SimpleGrid, Stack, Text, ThemeIcon } from '@mantine/core';
import { IconChecks, IconClock, IconUserCheck, IconX } from '@tabler/icons-react';
import { memo } from 'react';

import type { StatsSummary } from '@/shared/api/resources/stats';

interface StatsCardsProps {
  summary: StatsSummary;
}

export const StatsCards = memo(({ summary }: StatsCardsProps) => {
  const metrics = [
    {
      title: 'Проверено сегодня',
      value: summary.totalReviewedToday,
      icon: IconUserCheck,
      color: 'blue',
    },
    {
      title: 'Проверено за неделю',
      value: summary.totalReviewedThisWeek,
      icon: IconUserCheck,
      color: 'cyan',
    },
    {
      title: 'Проверено за месяц',
      value: summary.totalReviewedThisMonth,
      icon: IconUserCheck,
      color: 'teal',
    },
    {
      title: 'Среднее время (сек)',
      value: summary.averageReviewTime,
      icon: IconClock,
      color: 'orange',
    },
    {
      title: 'Одобрено',
      value: `${summary.approvedPercentage.toFixed(1)}%`,
      icon: IconChecks,
      color: 'green',
    },
    {
      title: 'Отклонено',
      value: `${summary.rejectedPercentage.toFixed(1)}%`,
      icon: IconX,
      color: 'red',
    },
  ];

  return (
    <SimpleGrid cols={3} spacing="lg">
      {metrics.map((metric) => (
        <Card key={metric.title} shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="xs">
            <Group justify="space-between">
              <Text size="sm" c="dimmed" fw={500}>
                {metric.title}
              </Text>
              <ThemeIcon color={metric.color} variant="light" size="lg" radius="md">
                <metric.icon size={20} />
              </ThemeIcon>
            </Group>
            <Text size="xl" fw={700}>
              {metric.value}
            </Text>
          </Stack>
        </Card>
      ))}
    </SimpleGrid>
  );
});

StatsCards.displayName = 'StatsCards';
