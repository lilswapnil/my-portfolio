"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface LoadingContextType {
  isPageLoading: boolean;
  setIsPageLoading: (isLoading: boolean) => void;
  isInitialLoad: boolean;
  setIsInitialLoad: (isInitial: boolean) => void;
  setIsTransitioning: (isTransitioning: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const setIsTransitioning = useCallback((isTransitioning: boolean) => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    overlay.classList.toggle('fade-in', isTransitioning);
    overlay.classList.toggle('fade-out', !isTransitioning);
  }, []);

  useEffect(() => {
    let isMounted = true;
    requestAnimationFrame(() => {
      if (isMounted) setIsTransitioning(false);
    });
    return () => {
      isMounted = false;
    };
  }, [pathname]);

  const contextValue = useMemo(
    () => ({ isPageLoading, setIsPageLoading, isInitialLoad, setIsInitialLoad, setIsTransitioning }),
    [isPageLoading, isInitialLoad, setIsTransitioning]
  );

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
      <div ref={overlayRef} className="page-transition-overlay fade-out" />
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
};