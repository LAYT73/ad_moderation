import { AxiosError } from 'axios';

import { type HttpStatusType } from '@/shared/api/http-status';
import { httpStatusMessage } from '@/shared/api/http-status';
import { EHttpError, type HttpErrorType } from '@/shared/errors/http/HttpError.types';

export class HttpError extends Error {
  public readonly type: HttpErrorType;
  public readonly status?: HttpStatusType;
  public readonly details?: unknown;

  constructor(type: HttpErrorType, message: string, status?: HttpStatusType, details?: unknown) {
    super(message);
    this.name = 'HttpError';
    this.type = type;
    this.status = status;
    this.details = details;
  }

  static fromAxiosError(error: AxiosError): HttpError {
    if (error.code === 'ECONNABORTED' || /timeout/i.test(error.message)) {
      return new HttpError(EHttpError.TIMEOUT, 'Превышено время ожидания');
    }
    const status = error.response?.status;
    const data = error.response?.data;
    const statusText = error.response?.statusText;
    if (status) {
      let rawMessage = 'Server Error';
      if (data && typeof data === 'object' && data !== null) {
        rawMessage = ((data as Record<string, unknown>).message as string) || statusText || rawMessage;
      } else {
        rawMessage = statusText || rawMessage;
      }
      const friendly = httpStatusMessage(status, rawMessage);
      if (status >= 500) return new HttpError(EHttpError.SERVER, friendly, status, data);
      return new HttpError(EHttpError.CLIENT, friendly, status, data);
    }
    if (error.request) return new HttpError(EHttpError.NETWORK, 'Сетевая ошибка. Проверьте соединение.');
    return new HttpError(EHttpError.UNKNOWN, error.message);
  }
}
