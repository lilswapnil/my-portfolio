"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AskScottyContextType {
  messages: Message[];
  loading: boolean;
  minimized: boolean;
  closed: boolean;
  setMinimized: (value: boolean) => void;
  setClosed: (value: boolean) => void;
  addMessage: (message: Message) => void;
  setLoading: (value: boolean) => void;
  clearMessages: () => void;
}

const AskScottyContext = createContext<AskScottyContextType | undefined>(undefined);

export function AskScottyProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [minimized, setMinimized] = useState(true);
  const [closed, setClosed] = useState(false);

  const addMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return (
    <AskScottyContext.Provider
      value={{
        messages,
        loading,
        minimized,
        closed,
        setMinimized,
        setClosed,
        addMessage,
        setLoading,
        clearMessages,
      }}
    >
      {children}
    </AskScottyContext.Provider>
  );
}

export function useAskScotty() {
  const context = useContext(AskScottyContext);
  if (context === undefined) {
    throw new Error('useAskScotty must be used within AskScottyProvider');
  }
  return context;
}