import { Card, Title } from '@mantine/core';
import { memo } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import type { DecisionsData } from '@/shared/api/resources/stats';

interface DecisionsChartProps {
  data: DecisionsData;
}

const COLORS = ['#51cf66', '#ff6b6b', '#ffd43b'];

export const DecisionsChart = memo(({ data }: DecisionsChartProps) => {
  const chartData = [
    { name: 'Одобрено', value: Number(data.approved.toFixed(2)) },
    { name: 'Отклонено', value: Number(data.rejected.toFixed(2)) },
    { name: 'На доработку', value: Number(data.requestChanges.toFixed(2)) },
  ];

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={4} mb="md">
        Распределение решений
      </Title>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
});

DecisionsChart.displayName = 'DecisionsChart';
