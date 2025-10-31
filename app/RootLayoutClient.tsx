"use client";

import { AskScottyProvider } from './context/AskScottyContext';
import ChatLayoutWrapper from './components/ChatLayoutWrapper';
import { ReactNode } from 'react';

export default function RootLayoutClient({ children }: { children: ReactNode }) {
  return (
    <AskScottyProvider>
      {children}
      <ChatLayoutWrapper />
    </AskScottyProvider>
  );
}