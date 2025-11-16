import React from 'react';

export const ScrollToTop = () => {
  const { pathname } = window.location;

  React.useEffect(() => {
    scrollToTop();
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return null;
};
