import { Card, Group } from '@mantine/core';

interface Props {
  images: string[];
}

export function AdImagesGallery({ images }: Props) {
  return (
    <Group gap="md">
      {(images.length > 0 ? images.slice(0, 3) : Array.from({ length: 3 }, () => '')).map((image, i) => (
        <Card key={i} shadow="sm" radius="md" withBorder style={{ width: 220, height: 160, overflow: 'hidden' }}>
          <img
            src={image || 'https://placehold.co/220x160?text=No+Image'}
            alt={`Фото ${i + 1}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Card>
      ))}
    </Group>
  );
}
