import { createContext, useContext, useEffect, useMemo } from 'react';

import { useLocalStorage } from '@/shared/hooks/useLocalStorage';

type ColorScheme = 'light' | 'dark';

interface ThemeContextValue {
  colorScheme: ColorScheme;
  toggle: () => void;
  set: (scheme: ColorScheme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>('color-scheme', 'dark');

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', colorScheme === 'dark');
    root.setAttribute('data-mantine-color-scheme', colorScheme);
  }, [colorScheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      colorScheme,
      toggle: () => setColorScheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
      set: (scheme) => setColorScheme(scheme),
    }),
    [colorScheme, setColorScheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
