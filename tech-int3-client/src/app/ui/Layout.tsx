import { ActionIcon, Tooltip } from '@mantine/core';
import { IconUser, IconList } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { ScrollToTop } from '@/app/ui/ScrollToTop';
import { ThemeToggleButton } from '@/features/theme-toggle';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <ScrollToTop />
      <div className="fixed right-4 top-4 z-50">
        <ThemeToggleButton />
      </div>
      <div className="fixed left-4 bottom-4 z-50">
        <Tooltip label="Статистика">
          <ActionIcon
            variant="default"
            size="lg"
            radius="md"
            onClick={() => navigate('/stats')}
            aria-label="Go to stats"
          >
            <IconUser size={18} />
          </ActionIcon>
        </Tooltip>
      </div>
      <div className="fixed left-4 bottom-16 z-50">
        <Tooltip label="Список">
          <ActionIcon variant="default" size="lg" radius="md" onClick={() => navigate('/list')} aria-label="Go to list">
            <IconList size={18} />
          </ActionIcon>
        </Tooltip>
      </div>
      {children}
    </div>
  );
};
