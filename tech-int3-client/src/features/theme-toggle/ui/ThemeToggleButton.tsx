import { ActionIcon, Tooltip } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

import { useTheme } from '@/app/providers/themeProvider/ThemeProvider';

export const ThemeToggleButton = () => {
  const { colorScheme, toggle } = useTheme();

  const isDark = colorScheme === 'dark';

  return (
    <Tooltip label={isDark ? 'Светлая тема' : 'Тёмная тема'}>
      <ActionIcon variant="default" size="lg" radius="md" onClick={toggle} aria-label="Toggle color scheme">
        {isDark ? <IconSun size={18} /> : <IconMoon size={18} />}
      </ActionIcon>
    </Tooltip>
  );
};
