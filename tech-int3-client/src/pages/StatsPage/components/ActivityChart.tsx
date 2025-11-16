import { Card, Title } from '@mantine/core';
import { memo } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import type { ActivityData } from '@/shared/api/resources/stats';

interface ActivityChartProps {
  data: ActivityData[];
}

export const ActivityChart = memo(({ data }: ActivityChartProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={4} mb="md">
        График активности за неделю
      </Title>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="approved" fill="#51cf66" name="Одобрено" />
          <Bar dataKey="rejected" fill="#ff6b6b" name="Отклонено" />
          <Bar dataKey="requestChanges" fill="#ffd43b" name="На доработку" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
});

ActivityChart.displayName = 'ActivityChart';
