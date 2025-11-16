import { Alert, Center, Container, Loader, Stack, Title } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useState } from 'react';

import { ActivityChart } from '@/pages/StatsPage/components/ActivityChart';
import { CategoriesChart } from '@/pages/StatsPage/components/CategoriesChart';
import { DecisionsChart } from '@/pages/StatsPage/components/DecisionsChart';
import { PeriodFilter } from '@/pages/StatsPage/components/PeriodFilter';
import { StatsCards } from '@/pages/StatsPage/components/StatsCards';
import { useActivityChart, useCategoriesChart, useDecisionsChart, useStatsSummary } from '@/shared/api/resources/stats';

const StatsPage = () => {
  const [period, setPeriod] = useState<'today' | 'week' | 'month'>('week');

  const {
    data: summary,
    isLoading: summaryLoading,
    isError: summaryError,
    error: summaryErrorData,
  } = useStatsSummary({ period });
  const { data: activity, isLoading: activityLoading, isError: activityError } = useActivityChart({ period });
  const { data: decisions, isLoading: decisionsLoading, isError: decisionsError } = useDecisionsChart({ period });
  const { data: categories, isLoading: categoriesLoading, isError: categoriesError } = useCategoriesChart({ period });

  const isLoading = summaryLoading || activityLoading || decisionsLoading || categoriesLoading;
  const isError = summaryError || activityError || decisionsError || categoriesError;

  if (isLoading) {
    return (
      <Center py="xl">
        <Loader size="xl" color="green" />
      </Center>
    );
  }

  if (isError) {
    return (
      <Container size="md" py="xl">
        <Alert icon={<IconAlertCircle size={16} />} title="Ошибка загрузки статистики" color="red">
          {summaryErrorData instanceof Error ? summaryErrorData.message : 'Не удалось загрузить данные статистики'}
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Title order={1}>Статистика модератора</Title>

        <PeriodFilter period={period} onChange={setPeriod} />

        {summary && <StatsCards summary={summary} />}

        {activity && <ActivityChart data={activity} />}

        <Stack gap="md">
          {decisions && <DecisionsChart data={decisions} />}
          {categories && <CategoriesChart data={categories} />}
        </Stack>
      </Stack>
    </Container>
  );
};

export default StatsPage;
