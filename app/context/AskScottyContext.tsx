"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

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
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('askscotty-messages');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });
  const [loading, setLoading] = useState(false);
  const [minimized, setMinimized] = useState(true);
  const [closed, setClosed] = useState(false);

  // Persist messages to sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('askscotty-messages', JSON.stringify(messages));
    }
  }, [messages]);

  // Clear messages on tab close
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleUnload = () => {
        sessionStorage.removeItem('askscotty-messages');
      };
      window.addEventListener('beforeunload', handleUnload);
      return () => window.removeEventListener('beforeunload', handleUnload);
    }
  }, []);

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