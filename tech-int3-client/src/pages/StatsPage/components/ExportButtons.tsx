import { Button, Group } from '@mantine/core';
import { IconFileDownload, IconFileTypePdf } from '@tabler/icons-react';
import { memo } from 'react';

import type { ActivityData, CategoriesData, DecisionsData, StatsSummary } from '@/shared/api/resources/stats';
import { exportStatsToCSV, exportStatsToPDF, getPeriodName } from '@/shared/lib/utils';

interface ExportButtonsProps {
  summary: StatsSummary;
  activity: ActivityData[];
  decisions: DecisionsData;
  categories: CategoriesData;
  period: 'today' | 'week' | 'month';
  disabled?: boolean;
}

export const ExportButtons = memo(
  ({ summary, activity, decisions, categories, period, disabled = false }: ExportButtonsProps) => {
    const handleExportCSV = () => {
      exportStatsToCSV({
        summary,
        activity,
        decisions,
        categories,
        period: getPeriodName(period),
      });
    };

    const handleExportPDF = async () => {
      await exportStatsToPDF({
        summary,
        activity,
        decisions,
        categories,
        period: getPeriodName(period),
      });
    };

    return (
      <Group>
        <Button
          leftSection={<IconFileDownload size={18} />}
          variant="outline"
          onClick={handleExportCSV}
          disabled={disabled}
        >
          Экспорт в CSV
        </Button>
        <Button
          leftSection={<IconFileTypePdf size={18} />}
          variant="outline"
          color="red"
          onClick={handleExportPDF}
          disabled={disabled}
        >
          Экспорт в PDF
        </Button>
      </Group>
    );
  },
);

ExportButtons.displayName = 'ExportButtons';
