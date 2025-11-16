import { ScrollToTop } from '@/app/ui/ScrollToTop';
import { ThemeToggleButton } from '@/features/theme-toggle';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <ScrollToTop />
      <div className="fixed right-4 top-4 z-50">
        <ThemeToggleButton />
      </div>
      {children}
    </div>
  );
};
