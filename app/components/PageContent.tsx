"use client";

import { ReactNode } from "react";
import { useLoading } from "@/app/context/LoadingContext";

export default function PageContent({ children }: { children: ReactNode }) {
  const { isPageLoading } = useLoading();

  return (
    <div className={`transition-opacity duration-500 ${isPageLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      {children}
    </div>
  );
}