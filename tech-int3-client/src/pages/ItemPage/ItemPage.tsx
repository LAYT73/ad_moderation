import { Alert, Button, Center, Container, Loader, Stack } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

import { useAd } from '@/shared/hooks/useAd';
import { useAdIdsList } from '@/shared/hooks/useAdIdsList';
import { useModerationMutations } from '@/shared/hooks/useModerationMutations';

import { AdCharacteristics } from './components/AdCharacteristics';
import { AdDetails } from './components/AdDetails';
import { AdImagesGallery } from './components/AdImagesGallery';
import { AdSeller } from './components/AdSeller';
import { ItemNavigation } from './components/ItemNavigation';
import { ModerationHistoryTable } from './components/ModerationHistoryTable';
import { ModeratorActionsPanel } from './components/ModeratorActionsPanel';

export default function ItemPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const adId = Number(id);
  const page = Number(searchParams.get('page')) || 1;

  const { data: ad, isLoading, isError, error } = useAd(adId);
  const ids = useAdIdsList(page);
  const idx = ids.indexOf(adId);
  const prevId = idx > 0 ? ids[idx - 1] : undefined;
  const nextId = idx < ids.length - 1 ? ids[idx + 1] : undefined;

  const moderation = useModerationMutations(adId);

  if (isLoading)
    return (
      <Center py="xl">
        <Loader size="xl" color="green" />
      </Center>
    );

  if (isError || !ad) {
    return (
      <Container size="md" py="xl">
        <Alert color="red" title="Ошибка">
          {error instanceof Error ? error.message : 'Не удалось загрузить объявление'}
        </Alert>
        <Button mt="md" leftSection={<IconArrowLeft />} onClick={() => navigate('/list')}>
          Назад к списку
        </Button>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <ItemNavigation page={page} prevId={prevId} nextId={nextId} />
        <AdImagesGallery images={ad.images as string[]} />
        <AdDetails ad={ad} />
        <AdCharacteristics characteristics={ad.characteristics} />
        <AdSeller ad={ad} />
        <ModerationHistoryTable history={ad.moderationHistory} />
        <ModeratorActionsPanel {...moderation} adStatus={ad.status} />
      </Stack>
    </Container>
  );
}
