/** Перечень базовых HTTP-статусов */
export const EHttpStatus = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,

  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
};

export type HttpStatusType = (typeof EHttpStatus)[keyof typeof EHttpStatus];

export const HttpStatusMessages: Record<number, string> = {
  [EHttpStatus.OK]: 'OK',
  [EHttpStatus.CREATED]: 'Создано',
  [EHttpStatus.NO_CONTENT]: 'Нет содержимого',
  [EHttpStatus.BAD_REQUEST]: 'Некорректный запрос',
  [EHttpStatus.UNAUTHORIZED]: 'Не авторизован',
  [EHttpStatus.FORBIDDEN]: 'Доступ запрещен',
  [EHttpStatus.NOT_FOUND]: 'Не найдено',
  [EHttpStatus.CONFLICT]: 'Конфликт',
  [EHttpStatus.INTERNAL_SERVER_ERROR]: 'Внутренняя ошибка сервера',
  [EHttpStatus.BAD_GATEWAY]: 'Проблема шлюза',
  [EHttpStatus.SERVICE_UNAVAILABLE]: 'Сервис недоступен',
};

export function httpStatusMessage(status?: number, fallback = 'Неизвестная ошибка'): string {
  if (!status) return fallback;
  return HttpStatusMessages[status] ?? fallback;
}
