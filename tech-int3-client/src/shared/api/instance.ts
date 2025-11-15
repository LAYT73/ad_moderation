import config from '@/shared/config';
import { ConsoleLogger } from '@/shared/lib/logger/ConsoleLogger';

import { createAxiosInstance } from './http-factory';

const logger = new ConsoleLogger();

const getToken = () => {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem('access_token'); // На будущую интеграцию с авторизацией
  } catch {
    return null;
  }
};

const instance = createAxiosInstance(
  config.VITE_API_URL,
  {
    getToken,
    retryCount: 1,
  },
  logger,
);

export default instance;
