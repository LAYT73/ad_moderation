import { MantineProvider } from '@mantine/core';
import { type ReactNode } from 'react';

import { QueryProvider } from './queryProvider';
import { ErrorBoundary } from '../ui/ErrorBoundary';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <MantineProvider defaultColorScheme={'dark'}>{children}</MantineProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
};
