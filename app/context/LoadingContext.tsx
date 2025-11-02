"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface LoadingContextType {
  isPageLoading: boolean;
  setIsPageLoading: (isLoading: boolean) => void;
  isInitialLoad: boolean;
  setIsInitialLoad: (isInitial: boolean) => void;
  isTransitioning: boolean;
  setIsTransitioning: (isTransitioning: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // When the route changes, end the transition animation
    setIsTransitioning(false);
  }, [pathname]);

  return (
    <LoadingContext.Provider value={{ isPageLoading, setIsPageLoading, isInitialLoad, setIsInitialLoad, isTransitioning, setIsTransitioning }}>
      {children}
      <div className={`page-transition-overlay ${isTransitioning ? 'fade-in' : 'fade-out'}`} />
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