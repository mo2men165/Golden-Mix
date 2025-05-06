'use client';

import { useEffect, ReactNode } from 'react';

interface AutoScrollWrapperProps {
  children: ReactNode;
  scrollAmount?: number;
  minScreenWidth?: number;
}

/**
 * Wrapper component that automatically scrolls the page on initial load
 * Only activates on screens larger than the specified width
 */
const AutoScrollWrapper: React.FC<AutoScrollWrapperProps> = ({
  children,
  scrollAmount = 140,
  minScreenWidth = 1024
}) => {
  useEffect(() => {
    // Function to check if screen is large enough
    const isLargeScreen = () => {
      // Only run on client side
      if (typeof window === 'undefined') return false;
      
      // Check if screen width is larger than the specified minimum
      return window.innerWidth >= minScreenWidth;
    };

    // Only scroll if it's a large screen
    if (isLargeScreen()) {
      // Small delay to ensure the page is fully loaded
      const timeoutId = setTimeout(() => {
        window.scrollTo({
          top: scrollAmount,
          behavior: 'smooth'
        });
      }, 150);
      
      // Cleanup timeout if component unmounts
      return () => clearTimeout(timeoutId);
    }
  }, [scrollAmount, minScreenWidth]);

  // Simply render the children as this is just a wrapper
  return <>{children}</>;
};

export default AutoScrollWrapper;