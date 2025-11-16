import { Alert, Center, Container, Grid, Pagination, Stack, Text, Title } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useState, useEffect } from 'react';

import { AdCardSkeleton } from '@/entities/ad';
import { AdCard } from '@/entities/ad/ui/AdCard';
import { useAdsFilters, AdsFilters } from '@/features/ads-filters';
import { BulkActionsBar, useSelection } from '@/features/bulk-actions';
import { useAdsList } from '@/shared/api';
import { adsApi } from '@/shared/api/resources/advertisements/ads.api';
import { useListPageHotkeys } from '@/shared/hooks/useHotkeys';
import { runConcurrently } from '@/shared/lib/utils';

const ListPage = () => {
  const qc = useQueryClient();
  useListPageHotkeys();
  const { filters, debouncedFilters, updateFilters, resetFilters } = useAdsFilters();
  const { data, isLoading, isError, error } = useAdsList({
    page: filters.page,
    limit: 10,
    search: debouncedFilters.search,
    status: filters.statuses.length > 0 ? filters.statuses : undefined,
    categoryId: filters.categoryId,
    minPrice: debouncedFilters.minPrice,
    maxPrice: debouncedFilters.maxPrice,
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
  });

  const { isSelected, toggle, clear, selectAll, count, selectedIds } = useSelection();
  const [processing, setProcessing] = useState(false);
  const pageIds = useMemo(() => (data?.ads ?? []).map((a) => a.id), [data?.ads]);

  useEffect(() => {
    // Чистка выбора при смене страницы/состава данных
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.pagination.currentPage, data?.ads?.length]);

  const approveSelected = async () => {
    if (selectedIds.length === 0) return;
    setProcessing(true);
    const result = await runConcurrently(selectedIds, (id) => adsApi.approve(id), 4);
    setProcessing(false);
    clear();
    await qc.invalidateQueries({ queryKey: ['ads', 'list'] });
    if (result.failed.length > 0) {
      alert(`Одобрено: ${result.success}, ошибок: ${result.failed.length}`);
    }
  };

  const rejectSelected = async (reason: Parameters<typeof adsApi.reject>[1]['reason'], comment?: string) => {
    if (selectedIds.length === 0) return;
    setProcessing(true);
    const result = await runConcurrently(selectedIds, (id) => adsApi.reject(id, { reason, comment }), 3);
    setProcessing(false);
    clear();
    await qc.invalidateQueries({ queryKey: ['ads', 'list'] });
    if (result.failed.length > 0) {
      alert(`Отклонено: ${result.success}, ошибок: ${result.failed.length}`);
    }
  };

  if (isLoading) {
    return (
      <Container size="xl" py="xl">
        <Stack gap="xl">
          <Title order={1}>Модерация объявлений</Title>

          <Grid>
            {Array.from({ length: 8 }).map((_, i) => (
              <Grid.Col key={i} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                <AdCardSkeleton />
              </Grid.Col>
            ))}
          </Grid>
        </Stack>
      </Container>
    );
  }
  if (isError) {
    return (
      <Container size="md" py="xl">
        <Alert icon={<IconAlertCircle size={16} />} title="Ошибка загрузки" color="red">
          {error instanceof Error ? error.message : 'Не удалось загрузить объявления'}
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Title order={1}>Модерация объявлений</Title>

        <AdsFilters
          search={filters.search}
          onSearchChange={(value) => updateFilters({ search: value })}
          statuses={filters.statuses}
          onStatusesChange={(value) => updateFilters({ statuses: value })}
          categoryId={filters.categoryId}
          onCategoryIdChange={(value) => updateFilters({ categoryId: value })}
          minPrice={filters.minPrice}
          onMinPriceChange={(value) => updateFilters({ minPrice: value })}
          maxPrice={filters.maxPrice}
          onMaxPriceChange={(value) => updateFilters({ maxPrice: value })}
          sortBy={filters.sortBy}
          onSortByChange={(value) => updateFilters({ sortBy: value })}
          sortOrder={filters.sortOrder}
          onSortOrderChange={(value) => updateFilters({ sortOrder: value })}
          onReset={resetFilters}
        />

        <BulkActionsBar
          selectedCount={count}
          pageTotal={pageIds.length}
          disabled={processing}
          onClear={clear}
          onSelectAllOnPage={() => selectAll(pageIds)}
          onApprove={approveSelected}
          onReject={rejectSelected}
        />

        {data && (
          <>
            <Text size="sm" c="dimmed">
              Найдено объявлений: {data.pagination.totalItems}
            </Text>

            {data.ads.length === 0 ? (
              <Center py="xl">
                <Text size="lg" c="dimmed">
                  Объявления не найдены
                </Text>
              </Center>
            ) : (
              <Grid>
                {data.ads.map((ad) => (
                  <Grid.Col key={ad.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                    <AdCard
                      ad={ad}
                      selectable
                      selected={isSelected(ad.id)}
                      onToggleSelect={(id, next) => toggle(id, next)}
                    />
                  </Grid.Col>
                ))}
              </Grid>
            )}

            {data.pagination.totalPages > 1 && (
              <Center>
                <Pagination
                  total={data.pagination.totalPages}
                  value={filters.page}
                  onChange={(page) => updateFilters({ page })}
                  withEdges
                />
              </Center>
            )}
          </>
        )}
      </Stack>
    </Container>
  );
};

export default ListPage;
