import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import { IconCheck, IconX, IconEdit } from '@tabler/icons-react';
import { type UseMutationResult } from '@tanstack/react-query';
import React from 'react';

import { DecisionReasonEnum, type Advertisement } from '@/shared/api/resources/advertisements';

export type AdResponse = { message: string; ad: Advertisement };

interface ModeratorActionsPanelProps {
  adStatus: 'pending' | 'approved' | 'rejected' | 'draft';
  approveMutation: UseMutationResult<AdResponse, unknown, void, unknown>;
  rejectMutation: UseMutationResult<AdResponse, unknown, void, unknown>;
  requestChangesMutation: UseMutationResult<AdResponse, unknown, void, unknown>;
  rejectReason: (typeof DecisionReasonEnum.options)[number] | '';
  setRejectReason: (r: (typeof DecisionReasonEnum.options)[number] | '') => void;
  rejectComment: string;
  setRejectComment: (c: string) => void;
}

export function ModeratorActionsPanel({
  adStatus,
  approveMutation,
  rejectMutation,
  requestChangesMutation,
  rejectReason,
  setRejectReason,
  rejectComment,
  setRejectComment,
}: ModeratorActionsPanelProps) {
  const [rejectModal, setRejectModal] = React.useState(false);

  return (
    <>
      <Group gap="md">
        <Button
          color="green"
          leftSection={<IconCheck />}
          loading={approveMutation.isPending}
          onClick={() => approveMutation.mutate()}
          disabled={adStatus === 'approved'}
        >
          Одобрить
        </Button>
        <Button
          color="red"
          leftSection={<IconX />}
          onClick={() => setRejectModal(true)}
          disabled={adStatus === 'rejected'}
          aria-label="Открыть модальное окно отклонения"
        >
          Отклонить
        </Button>
        <Button
          color="yellow"
          leftSection={<IconEdit />}
          onClick={() => setRejectModal(true)}
          disabled={adStatus === 'pending'}
        >
          Вернуть на доработку
        </Button>
      </Group>

      <Modal opened={rejectModal} onClose={() => setRejectModal(false)} title="Укажите причину" centered>
        <Stack gap="md">
          <Text fw={600}>Причина</Text>
          <Group>
            {DecisionReasonEnum.options.map((r) => (
              <Button
                key={r}
                variant={rejectReason === r ? 'filled' : 'outline'}
                color="gray"
                onClick={() => setRejectReason(r)}
              >
                {r}
              </Button>
            ))}
          </Group>
          {rejectReason === 'Другое' && (
            <input
              type="text"
              placeholder="Введите причину"
              value={rejectComment}
              onChange={(e) => setRejectComment(e.target.value)}
              style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
            />
          )}
          <Group justify="flex-start">
            <Button variant="default" onClick={() => setRejectModal(false)}>
              Отмена
            </Button>
            <Button
              color="red"
              loading={rejectMutation.isPending}
              disabled={!rejectReason}
              onClick={() => rejectMutation.mutate()}
            >
              Отклонить
            </Button>
            <Button
              color="yellow"
              loading={requestChangesMutation.isPending}
              disabled={!rejectReason}
              onClick={() => requestChangesMutation.mutate()}
            >
              На доработку
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
