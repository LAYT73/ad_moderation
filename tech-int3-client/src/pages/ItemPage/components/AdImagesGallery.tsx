import { Card, Group, Modal, ActionIcon, Image } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useState } from 'react';

interface Props {
  images: string[];
}

export function AdImagesGallery({ images }: Props) {
  const [opened, setOpened] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const displayImages = images.length > 0 ? images : Array.from({ length: 3 }, () => '');

  const openPreview = (index: number) => {
    if (images.length > 0) {
      setActiveIndex(index);
      setOpened(true);
    }
  };

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <Group gap="md">
        {displayImages.slice(0, 3).map((image, i) => (
          <Card
            key={i}
            shadow="sm"
            radius="md"
            withBorder
            style={{ width: 220, height: 160, overflow: 'hidden', cursor: image ? 'pointer' : 'default' }}
            onClick={() => openPreview(i)}
          >
            <img
              src={image || 'https://placehold.co/220x160?text=No+Image'}
              alt={`Фото ${i + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Card>
        ))}
      </Group>

      <Modal opened={opened} onClose={() => setOpened(false)} size="xl" centered withCloseButton={false} padding={0}>
        <div style={{ position: 'relative' }}>
          {images.length > 1 && (
            <>
              <ActionIcon
                variant="filled"
                color="dark"
                size="lg"
                style={{ position: 'absolute', top: '50%', left: 10, transform: 'translateY(-50%)', zIndex: 1 }}
                onClick={prevImage}
              >
                <IconChevronLeft size={20} />
              </ActionIcon>

              <ActionIcon
                variant="filled"
                color="dark"
                size="lg"
                style={{ position: 'absolute', top: '50%', right: 10, transform: 'translateY(-50%)', zIndex: 1 }}
                onClick={nextImage}
              >
                <IconChevronRight size={20} />
              </ActionIcon>
            </>
          )}

          <Image
            src={images[activeIndex] || 'https://placehold.co/800x600?text=No+Image'}
            alt={`Фото ${activeIndex + 1}`}
            fit="contain"
            style={{ maxHeight: '80vh' }}
          />
        </div>
      </Modal>
    </>
  );
}
