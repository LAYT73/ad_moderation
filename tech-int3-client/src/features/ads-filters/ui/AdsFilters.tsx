import { Button, Group, MultiSelect, NumberInput, Select, Stack, TextInput } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import { memo } from 'react';

import { type AdStatus } from '@/shared/api';

interface AdsFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  statuses: AdStatus[];
  onStatusesChange: (value: AdStatus[]) => void;
  categoryId?: number;
  onCategoryIdChange: (value: number | undefined) => void;
  minPrice?: number;
  onMinPriceChange: (value: number | undefined) => void;
  maxPrice?: number;
  onMaxPriceChange: (value: number | undefined) => void;
  sortBy: 'createdAt' | 'price' | 'priority';
  onSortByChange: (value: 'createdAt' | 'price' | 'priority') => void;
  sortOrder: 'asc' | 'desc';
  onSortOrderChange: (value: 'asc' | 'desc') => void;
  onReset: () => void;
}

const statusOptions = [
  { value: 'pending', label: 'На модерации' },
  { value: 'approved', label: 'Одобрено' },
  { value: 'rejected', label: 'Отклонено' },
  { value: 'draft', label: 'Черновик' },
];

const sortByOptions = [
  { value: 'createdAt', label: 'По дате создания' },
  { value: 'price', label: 'По цене' },
  { value: 'priority', label: 'По приоритету' },
];

const sortOrderOptions = [
  { value: 'desc', label: 'По убыванию' },
  { value: 'asc', label: 'По возрастанию' },
];

export const AdsFilters = memo((props: AdsFiltersProps) => {
  const {
    search,
    onSearchChange,
    statuses,
    onStatusesChange,
    minPrice,
    onMinPriceChange,
    maxPrice,
    onMaxPriceChange,
    sortBy,
    onSortByChange,
    sortOrder,
    onSortOrderChange,
    onReset,
  } = props;

  return (
    <Stack gap="md">
      <TextInput
        placeholder="Поиск по названию..."
        value={search}
        onChange={(e) => onSearchChange(e.currentTarget.value)}
        leftSection={<IconSearch size={16} />}
        rightSection={search && <IconX size={16} className="cursor-pointer" onClick={() => onSearchChange('')} />}
      />

      <Group grow>
        <MultiSelect
          label="Статус"
          placeholder="Выберите статусы"
          data={statusOptions}
          value={statuses}
          onChange={(value) => onStatusesChange(value as AdStatus[])}
          clearable
        />

        <Select
          label="Сортировка"
          data={sortByOptions}
          value={sortBy}
          onChange={(value) => onSortByChange(value as 'createdAt' | 'price' | 'priority')}
        />

        <Select
          label="Порядок"
          data={sortOrderOptions}
          value={sortOrder}
          onChange={(value) => onSortOrderChange(value as 'asc' | 'desc')}
        />
      </Group>

      <Group grow>
        <NumberInput
          label="Мин. цена"
          placeholder="От"
          value={minPrice}
          onChange={(value) => onMinPriceChange(typeof value === 'number' ? value : undefined)}
          min={0}
          hideControls
        />

        <NumberInput
          label="Макс. цена"
          placeholder="До"
          value={maxPrice}
          onChange={(value) => onMaxPriceChange(typeof value === 'number' ? value : undefined)}
          min={0}
          hideControls
        />
      </Group>

      <Button variant="subtle" color="gray" onClick={onReset} leftSection={<IconX size={16} />}>
        Сбросить фильтры
      </Button>
    </Stack>
  );
});

AdsFilters.displayName = 'AdsFilters';
