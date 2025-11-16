import { MantineProvider } from '@mantine/core';
import { type ReactNode } from 'react';

import { QueryProvider } from './queryProvider';
import { ErrorBoundary } from '../ui/ErrorBoundary';
import { ThemeProvider } from './themeProvider/ThemeProvider';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <ThemeProvider>
          <MantineProvider defaultColorScheme={'dark'}>{children}</MantineProvider>
        </ThemeProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
};
