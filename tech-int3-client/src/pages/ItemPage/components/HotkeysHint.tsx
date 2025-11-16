import { Badge, Group, Text, Card } from '@mantine/core';
import { memo } from 'react';

interface HotkeyHintProps {
  shortcuts: Array<{ key: string; description: string }>;
}

export const HotkeysHint = memo(({ shortcuts }: HotkeyHintProps) => {
  return (
    <Card shadow="sm" padding="sm" radius="md" withBorder className="fixed -bottom-5 right-4 z-50">
      <Text size="xs" fw={600} mb="xs">
        Горячие клавиши:
      </Text>
      <Group gap="xs">
        {shortcuts.map(({ key, description }) => (
          <Group key={key} gap={4}>
            <Badge size="sm" variant="light">
              {key}
            </Badge>
            <Text size="xs" c="dimmed">
              {description}
            </Text>
          </Group>
        ))}
      </Group>
    </Card>
  );
});

HotkeysHint.displayName = 'HotkeysHint';
