import { Button, Group } from '@mantine/core';
import { memo } from 'react';

interface PeriodFilterProps {
  period: 'today' | 'week' | 'month';
  onChange: (period: 'today' | 'week' | 'month') => void;
}

export const PeriodFilter = memo(({ period, onChange }: PeriodFilterProps) => {
  return (
    <Group>
      <Button variant={period === 'today' ? 'filled' : 'outline'} onClick={() => onChange('today')}>
        Сегодня
      </Button>
      <Button variant={period === 'week' ? 'filled' : 'outline'} onClick={() => onChange('week')}>
        Последние 7 дней
      </Button>
      <Button variant={period === 'month' ? 'filled' : 'outline'} onClick={() => onChange('month')}>
        Последние 30 дней
      </Button>
    </Group>
  );
});

PeriodFilter.displayName = 'PeriodFilter';
