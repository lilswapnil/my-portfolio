"use client";

import { AskScottyProvider } from './context/AskScottyContext';
import ChatLayoutWrapper from './components/ChatLayoutWrapper';
import React, { useEffect } from "react";
import { ReactNode } from 'react';

export default function RootLayoutClient({ children }: { children: ReactNode }) {
  useEffect(() => {
    let isScrolling = false;
    let targetScroll = window.scrollY;
    let currentScroll = window.scrollY;
    const speed = 0.08; // Lower = slower

    const smoothScroll = () => {
      currentScroll += (targetScroll - currentScroll) * speed;
      window.scrollTo(0, currentScroll);
      if (Math.abs(targetScroll - currentScroll) > 0.5) {
        requestAnimationFrame(smoothScroll);
      } else {
        isScrolling = false;
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetScroll += e.deltaY;
      targetScroll = Math.max(0, Math.min(targetScroll, document.body.scrollHeight - window.innerHeight));
      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(smoothScroll);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, []);
  return (
    <AskScottyProvider>
      {children}
      <ChatLayoutWrapper />
    </AskScottyProvider>
  );
}