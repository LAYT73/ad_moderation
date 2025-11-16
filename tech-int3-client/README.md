# Ad Moderation — Frontend client

Веб‑клиент для системы модерации объявлений. Поддерживает список объявлений, детальную карточку, модерацию, статистику, дополнительные функции (bulk, hotkeys, экспорт и др.).

- Клиент: Vite + React 19 + TypeScript
- Сервер (готовый API): Express (см. ниже как запустить)

Схема API: [schema.yaml](schema.yaml)

## Быстрый старт

Требования:

- Node.js v20+
- npm 10+

1. Запуск сервера API (в соседней папке проекта)

```sh
cd ../tech-int3-server
npm install
npm run dev
# сервер поднимется на http://localhost:3001 с basePath /api/v1
```

2. Запуск клиента

```sh
npm install
cp .env.example .env
# отредактируйте VITE_API_URL при необходимости
npm run dev
# откройте http://localhost:5173
```

Пример .env

```env
VITE_API_URL=http://localhost:3001/api/v1
```

Скрипты:

- dev — локальная разработка
- build — сборка прод-версии
- preview — предпросмотр сборки
- test — юнит‑тесты (Jest)
- lint, lint:fix — ESLint (flat config)
- format, format:check — Prettier
- type-check — проверка типов

Сборка:

```sh
npm run build
npm run preview
```

## Архитектура

Проект структурирован в стиле FSD:

- app — провайдеры, роутинг, глобальные UI ([src/app](src/app))
- pages — страницы (list, item, stats) ([src/pages](src/pages))
- features — изолированные фичи (фильтры, bulk-actions, theme-toggle) ([src/features](src/features))
- entities — UI-сущности (AdCard и др.) ([src/entities](src/entities))
- shared — API-клиент, схемы, хуки, утилиты ([src/shared](src/shared))

Ключевые файлы:

- Конфиг окружения: [src/shared/config/index.ts](src/shared/config/index.ts), [src/shared/config/env.ts](src/shared/config/env.ts)
- Axios-инстанс и фабрика с перехватчиками/ретраями: [src/shared/api/instance.ts](src/shared/api/instance.ts), [src/shared/api/http-factory.ts](src/shared/api/http-factory.ts)
- Роутинг: [src/app/providers/router/routeConfig.tsx](src/app/providers/router/routeConfig.tsx)
- React Query провайдер: [src/app/providers/queryProvider/QueryProvider.tsx](src/app/providers/queryProvider/QueryProvider.tsx)

## Функциональность

Страницы:

- /list — список объявлений
  - фильтры, поиск, сортировка, пагинация
  - bulk-операции (одобрение/отклонение нескольких)
  - быстрый фокус на поиск по клавише "/"
  - компоненты: [ListPage](src/pages/ListPage/ListPage.tsx), [AdsFilters](src/features/ads-filters/ui/AdsFilters.tsx), [AdCard](src/entities/ad/ui/AdCard.tsx), [BulkActionsBar](src/features/bulk-actions/ui/BulkActionsBar.tsx)

- /item/:id — детальная карточка
  - галерея, описание, характеристики, продавец
  - история модерации
  - действия модератора: Одобрить / Отклонить / На доработку
  - горячие клавиши (см. ниже)
  - компоненты: [ItemPage](src/pages/ItemPage/ItemPage.tsx), [ModeratorActionsPanel](src/pages/ItemPage/components/ModeratorActionsPanel.tsx)

- /stats — статистика модератора
  - карточки метрик, графики (активность, решения, категории)
  - экспорт в CSV и PDF
  - компоненты: [StatsPage](src/pages/StatsPage/StatsPage.tsx), [ExportButtons](src/pages/StatsPage/components/ExportButtons.tsx)

Горячие клавиши:

- A — одобрить объявление
- D — отклонить объявление
- → — следующее объявление
- ← — предыдущее объявление
- / — фокус на поле поиска
  Реализация: [useHotkeys](src/shared/hooks/useHotkeys.ts)

Экспорт статистики:

- CSV: `papaparse`
- PDF: `jspdf` + `jspdf-autotable`
- утилиты: [exportStats.ts](src/shared/lib/utils/exportStats.ts)
- кнопки экспорта: [ExportButtons](src/pages/StatsPage/components/ExportButtons.tsx)
  Примечание: для корректной кириллицы в PDF утилита подгружает шрифт Roboto из public. Добавьте public/Roboto-Regular.ttf (имя файла совпадает с константой в [exportStats.ts](src/shared/lib/utils/exportStats.ts)). При отсутствии шрифта будет использован системный, PDF всё равно сгенерируется.

## Использованные библиотеки и зачем

Runtime/UI:

- @mantine/core — UI-компоненты, быстрый прототипинг ([Layout с быстрыми кнопками](src/app/ui/Layout.tsx))
- tailwindcss, tailwind-merge — утилитарные классы, мелкая стилизация ([vite.config.ts](vite.config.ts))
- react-router-dom v7 — маршрутизация ([routeConfig.tsx](src/app/providers/router/routeConfig.tsx))
- @tanstack/react-query — кеширование и управление серверным состоянием ([QueryProvider](src/app/providers/queryProvider/QueryProvider.tsx))
- axios — HTTP‑клиент + перехватчики/ретраи ([http-factory.ts](src/shared/api/http-factory.ts))
- zod — валидация ответов API ([ads.schemas.ts](src/shared/api/resources/ads/ads.schemas.ts), [stats.schemas.ts](src/shared/api/resources/stats/stats.schemas.ts))
- recharts — графики на /stats
- react-hotkeys-hook — горячие клавиши ([useHotkeys.ts](src/shared/hooks/useHotkeys.ts))
- papaparse — экспорт статистики в CSV
- jspdf, jspdf-autotable — экспорт статистики в PDF (таблицы)
- framer-motion — анимации появления карточек и скелетонов

Тулчейн:

- vite — сборка/разработка
- vite-plugin-checker — TS/ESLint проверки в dev
- eslint (flat), prettier — качество кода ([eslint.config.js](eslint.config.js), [.prettierrc.json](.prettierrc.json))
- husky, lint-staged — pre-commit хуки
- jest — юнит‑тесты ([jest.config.js](jest.config.js), [src/setupTests.ts](src/setupTests.ts))
- svgr — импорт .svg как React-компонентов

## Работа с API

Базовый URL берётся из VITE_API_URL ([instance.ts](src/shared/api/instance.ts)).
Основные ресурсы:

- Объявления: [ads.api.ts](src/shared/api/resources/ads/ads.api.ts)
- Статистика: [stats.api.ts](src/shared/api/resources/stats/stats.api.ts)

Ответы валидируются через Zod-схемы:

- [ads.schemas.ts](src/shared/api/resources/ads/ads.schemas.ts)
- [stats.schemas.ts](src/shared/api/resources/stats/stats.schemas.ts)

Документация API: [schema.yaml](schema.yaml).
Сервер запускается отдельно (см. «Быстрый старт»).

## Детали реализации

- Фильтры и URL-синхронизация на списке: [ListPage](src/pages/ListPage/ListPage.tsx), [AdsFilters](src/features/ads-filters/ui/AdsFilters.tsx)
- Bulk‑операции (одобрение/отклонение нескольких объявлений): [BulkActionsBar](src/features/bulk-actions/ui/BulkActionsBar.tsx)
- Действия модератора с причинами/комментарием: [ModeratorActionsPanel](src/pages/ItemPage/components/ModeratorActionsPanel.tsx)
- Подсказки горячих клавиш: [HotkeysHint](src/pages/ItemPage/components/HotkeysHint.tsx)
- Обработка ошибок UI: [ErrorBoundary](src/app/ui/ErrorBoundary.tsx)
- Кеш/рефетч: конфигурация React Query (staleTime, retry) — [QueryProvider](src/app/providers/queryProvider/QueryProvider.tsx)

## Тесты, линт, форматирование

- Тесты: `npm test`
- Линт: `npm run lint` (fix — `npm run lint:fix`)
- Форматирование: `npm run format`

Pre-commit хуки автоматически запускают линт/приттир для изменённых файлов.

## Частые проблемы

- 404/Network error: проверьте, что сервер на <http://localhost:3001> запущен и VITE_API_URL указывает на /api/v1.
- CORS: сервер уже настроен на <http://localhost:5173>.
- PDF с «кракозябрами»: добавьте Roboto-Regular.ttf в папку public (см. [exportStats.ts](src/shared/lib/utils/exportStats.ts)).
