'use client';

import { useEffect, useState } from 'react';

type ScreenType = 'mobile' | 'tablet' | 'desktop';

const breakpoints = {
  tablet: 768,
  desktop: 1024,
};

export function useScreenWidth() {
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0,
  );

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  let screenType: ScreenType = 'desktop';

  if (screenWidth <= breakpoints.tablet) {
    screenType = 'mobile';
  } else if (screenWidth <= breakpoints.desktop) {
    screenType = 'tablet';
  }

  return {
    screenWidth,
    screenType,
  };
}
