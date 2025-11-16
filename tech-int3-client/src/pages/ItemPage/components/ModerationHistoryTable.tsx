import { Card, Table, Title, Badge } from '@mantine/core';

import { formatDate } from '@/shared/lib/utils';

interface HistoryItem {
  id: number;
  timestamp: string;
  moderatorId: number;
  moderatorName: string;
  action: 'approved' | 'rejected' | 'requestChanges';
  reason?: string | null;
  comment?: string;
}

interface Props {
  history: HistoryItem[];
}

export function ModerationHistoryTable({ history }: Props) {
  return (
    <Card shadow="sm" radius="md" withBorder>
      <Title order={4}>История модерации</Title>
      <Table striped highlightOnHover withTableBorder>
        <Table.Tbody>
          {history.length === 0 ? (
            <Table.Tr>
              <Table.Td colSpan={5}>Нет истории модерации</Table.Td>
            </Table.Tr>
          ) : (
            history.map((h) => (
              <Table.Tr key={h.id}>
                <Table.Td>{formatDate(h.timestamp)}</Table.Td>
                <Table.Td>{h.moderatorName}</Table.Td>
                <Table.Td>
                  <Badge color={h.action === 'approved' ? 'green' : h.action === 'rejected' ? 'red' : 'yellow'}>
                    {h.action === 'approved' ? 'Одобрено' : h.action === 'rejected' ? 'Отклонено' : 'На доработку'}
                  </Badge>
                </Table.Td>
                <Table.Td>{h.reason ?? '-'}</Table.Td>
                <Table.Td>{h.comment ?? '-'}</Table.Td>
              </Table.Tr>
            ))
          )}
        </Table.Tbody>
      </Table>
    </Card>
  );
}
