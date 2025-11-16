import { MantineProvider } from '@mantine/core';
import { type ReactNode } from 'react';

import { LocalErrorBoundary } from '@/app/ui/LocalErrorBoundary';

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
        <LocalErrorBoundary>
          <ThemeProvider>
            <MantineProvider defaultColorScheme={'dark'}>{children}</MantineProvider>
          </ThemeProvider>
        </LocalErrorBoundary>
      </QueryProvider>
    </ErrorBoundary>
  );
};
