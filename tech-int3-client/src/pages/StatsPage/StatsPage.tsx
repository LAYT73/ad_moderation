import { Alert, Center, Container, Group, Loader, Stack, Title } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useState } from 'react';

import {
  ActivityChart,
  CategoriesChart,
  DecisionsChart,
  ExportButtons,
  PeriodFilter,
  StatsCards,
} from '@/pages/StatsPage/components';
import { useActivityChart, useCategoriesChart, useDecisionsChart, useStatsSummary } from '@/shared/api';

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

  // Проверяем наличие всех данных для экспорта
  const canExport = summary && activity && decisions && categories;

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Group justify="space-between" align="center">
          <Title order={1}>Статистика модератора</Title>
          {canExport && (
            <ExportButtons
              summary={summary}
              activity={activity}
              decisions={decisions}
              categories={categories}
              period={period}
            />
          )}
        </Group>

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
