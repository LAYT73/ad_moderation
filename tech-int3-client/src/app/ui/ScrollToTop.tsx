import { useEffect } from 'react';

export const ScrollToTop = () => {
  const { pathname } = window.location;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};
