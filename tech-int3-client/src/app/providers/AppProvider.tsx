import { MantineProvider } from '@mantine/core';
import { type ReactNode } from 'react';

import { ErrorBoundary } from '../ui/ErrorBoundary';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ErrorBoundary>
      <MantineProvider defaultColorScheme={'dark'}>{children}</MantineProvider>
    </ErrorBoundary>
  );
};
