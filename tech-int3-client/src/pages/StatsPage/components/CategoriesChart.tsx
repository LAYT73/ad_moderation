import { Card, Title } from '@mantine/core';
import { memo } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import type { CategoriesData } from '@/shared/api/resources/ads';

interface CategoriesChartProps {
  data: CategoriesData;
}

export const CategoriesChart = memo(({ data }: CategoriesChartProps) => {
  const chartData = Object.entries(data).map(([name, value]) => ({ name, value }));

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={4} mb="md">
        Распределение по категориям
      </Title>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#339af0" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
});

CategoriesChart.displayName = 'CategoriesChart';
