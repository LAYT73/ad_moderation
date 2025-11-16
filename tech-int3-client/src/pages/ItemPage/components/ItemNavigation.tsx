import { Button, Group } from '@mantine/core';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  page: number;
  prevId?: number;
  nextId?: number;
}

export function ItemNavigation({ page, prevId, nextId }: Props) {
  const navigate = useNavigate();

  return (
    <Group justify="space-between">
      <Button leftSection={<IconArrowLeft />} onClick={() => navigate('/list?page=' + page)}>
        Назад к списку
      </Button>
      <Group>
        <Button
          variant="subtle"
          leftSection={<IconArrowLeft />}
          disabled={!prevId}
          onClick={() => navigate(`/item/${prevId}?page=${page}`)}
        >
          Предыдущее
        </Button>
        <Button
          variant="subtle"
          rightSection={<IconArrowRight />}
          disabled={!nextId}
          onClick={() => navigate(`/item/${nextId}?page=${page}`)}
        >
          Следующее
        </Button>
      </Group>
    </Group>
  );
}
