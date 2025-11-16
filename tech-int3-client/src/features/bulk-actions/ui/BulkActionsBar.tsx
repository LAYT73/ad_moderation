import { Badge, Button, Group, Modal, Select, Stack, Text, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import { DecisionReasonEnum, type DecisionReason } from '@/shared/api/resources/ads/ads.schemas';

interface BulkActionsBarProps {
  selectedCount: number;
  pageTotal: number;
  disabled?: boolean;
  onClear: () => void;
  onSelectAllOnPage: () => void;
  onApprove: () => Promise<void> | void;
  onReject: (reason: DecisionReason, comment?: string) => Promise<void> | void;
}

export const BulkActionsBar = ({
  selectedCount,
  pageTotal,
  disabled,
  onClear,
  onSelectAllOnPage,
  onApprove,
  onReject,
}: BulkActionsBarProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [reason, setReason] = useState<DecisionReason | ''>('');
  const [comment, setComment] = useState('');
  const reasonOptions = DecisionReasonEnum.options.map((r) => ({ value: r, label: r }));

  const submitReject = async () => {
    if (!reason) return;
    await onReject(reason, comment || undefined);
    setReason('');
    setComment('');
    close();
  };

  if (selectedCount === 0) return null;

  return (
    <>
      <Group justify="space-between" align="center" className="fixed z-10 bg-[#2e2e2e] w-full left-0 top-0 h-16 px-16">
        <Group>
          <Text>
            Выбрано объявлений: <Badge color="blue">{selectedCount}</Badge>
          </Text>
          <Text size="sm" c="dimmed">
            На странице: {pageTotal}
          </Text>
        </Group>

        <Group>
          <Button variant="light" color="gray" onClick={onSelectAllOnPage} disabled={disabled}>
            Выбрать все на странице
          </Button>
          <Button color="green" onClick={onApprove} disabled={disabled}>
            Одобрить выбранные
          </Button>
          <Button color="red" onClick={open} disabled={disabled}>
            Отклонить выбранные
          </Button>
          <Button variant="subtle" color="gray" onClick={onClear} disabled={disabled}>
            Сбросить выбор
          </Button>
        </Group>
      </Group>

      <Modal opened={opened} onClose={close} title="Укажите причину отклонения" centered>
        <Stack>
          <Select
            label="Причина"
            placeholder="Выберите причину"
            data={reasonOptions}
            value={reason || null}
            onChange={(v) => setReason((v as DecisionReason) || '')}
            required
          />
          <Textarea
            label="Комментарий (опционально)"
            value={comment}
            onChange={(e) => setComment(e.currentTarget.value)}
          />
          <Group justify="flex-end">
            <Button variant="default" onClick={close}>
              Отмена
            </Button>
            <Button color="red" onClick={submitReject} disabled={!reason || disabled}>
              Отклонить
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};
