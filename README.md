# ad_moderation

## Запуск всего проекта (Docker)

Требования: установлен Docker и Docker Compose (Compose V2 встроен в Docker Desktop).

1. Построить и запустить:

```sh
docker compose up --build
```

2. Клиент: <http://localhost:5173>
   API: <http://localhost:3001/api/v1>

Остановка:

```sh
docker compose down
```

Пересборка после изменений зависимостей (package.json):

```sh
docker compose up --build
```

## Структура

- tech-int3-server — backend (Express)
- tech-int3-client — frontend (Vite + React)

## Индивидуальные инструкции

- Frontend подробности: см. [tech-int3-client/README.md](tech-int3-client/README.md)
- Backend подробности: см. [tech-int3-server/README.md](tech-int3-server/README.md)

## Переменные окружения

Frontend использует VITE_API_URL (уже прокинуто в docker-compose). Для локального запуска без Docker: см. клиентский README.

## Быстрый локальный запуск без Docker

```sh
# сервер
cd tech-int3-server
npm install
npm run dev

# клиент (в отдельном окне)
cd tech-int3-client
npm install
cp .env.example .env
npm run dev
```

## Экспорт / Документация API

Документация OpenAPI: [tech-int3-server/schema.yaml](tech-int3-server/schema.yaml)

## Лицензия

Внутренний учебный проект.
