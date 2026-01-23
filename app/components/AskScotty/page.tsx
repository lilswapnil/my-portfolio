"use client";

import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from 'next-themes'
import { useAskScotty } from '@/app/context/AskScottyContext';
import { ASKSCOTTY_SYSTEM_PROMPT } from '@/lib/askscotty-system-prompt';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AskScotty({ question }: { question: string }) {
  const { messages, loading, minimized, closed, addMessage, setLoading, setMinimized } = useAskScotty();
  const [inputValue, setInputValue] = useState('');
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme } = useTheme()
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const isDark = theme === 'dark';
  const colors = {
    chatWindow: isDark ? 'glass-container askscotty-chat-window dark' : 'bg-white border border-gray-200 shadow askscotty-chat-window',
    headerText: isDark ? 'text-primary dark:text-white' : 'text-primary',
    secondaryText: isDark ? 'text-secondary dark:text-white/70' : 'text-secondary',
    userMsg: isDark ? 'bg-blue-500/70 text-white dark:text-white rounded-br-none' : 'bg-blue-200 text-primary rounded-br-none',
    assistantMsg: isDark ? 'bg-white/80 text-primary dark:bg-white/15 dark:text-white/95 backdrop-blur-md rounded-bl-none border border-black/10 dark:border-white/30' : 'bg-zinc-100 text-primary rounded-bl-none border border-gray-200',
    input: isDark ? 'glass-input flex-1 text-sm placeholder-secondary dark:placeholder-white/50 text-primary dark:text-white disabled:opacity-50' : 'bg-zinc-100 border border-gray-300 text-primary flex-1 text-sm placeholder-gray-400 disabled:opacity-50 rounded-lg px-4 py-2',
    button: isDark ? 'glass-button px-4 py-2 text-sm font-medium text-primary dark:text-white disabled:opacity-50 disabled:cursor-not-allowed' : 'bg-zinc-200 px-4 py-2 text-sm font-medium text-primary rounded-lg border border-gray-300 hover:bg-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed',
  };
  
  // Initialize on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle click outside to minimize (desktop only)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        if (!minimized && mounted) {
          setMinimized(true);
        }
      }
    };

    if (mounted && !minimized) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [minimized, mounted, setMinimized]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const handleSendMessage = useCallback(async (messageText: string) => {
    if (!messageText.trim()) return;

    const userMessage: Message = { role: 'user', content: messageText };
    addMessage(userMessage);
    setInputValue('');
    setLoading(true);

    try {
      const response = await fetch('/api/askscotty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          systemPrompt: ASKSCOTTY_SYSTEM_PROMPT,
        }),
      });
      const data = await response.json();

      if (data.error) {
        addMessage({
          role: 'assistant',
          content: "I'm having trouble responding right now. Please try again later!",
        });
      } else {
        addMessage({
          role: 'assistant',
          content: data.message,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      addMessage({
        role: 'assistant',
        content: "I'm having trouble responding right now. Please try again later!",
      });
    } finally {
      setLoading(false);
    }
  }, [addMessage, setInputValue, setLoading, messages]);

  useEffect(() => {
    if (question) {
      setMinimized(false);
      setMobileOpen(true);
      handleSendMessage(question);
    }
  }, [question, setMinimized, handleSendMessage]);

  const handleMobileButtonClick = () => {
    if (mobileOpen) {
      setMobileOpen(false);
    } else {
      setMobileOpen(true);
    }
  };

  if (!mounted) return null;

  // Animation classes for minimize/maximize (removed unused variable)

  return (
    <>
      {/* Mobile Button (sm screens only) */}
      <div className="flex md:hidden lg:hidden fixed bottom-4 right-4 z-40">
        <button
          onClick={handleMobileButtonClick}
          className={`glass-button flex items-center justify-center flex-shrink-0 ${isDark ? 'dark' : ''}`}
          title={mobileOpen ? "Close Chat" : "Open Chat"}
        >
          {mobileOpen ? (
            <span className="text-2xl font-small text-primary dark:text-white">×</span>
          ) : (
            <Image
              src="/logo/askscotty.png"
              alt="Ask Scotty"
              width={24}
              height={24}
              style={{ filter: isDark ? "invert(1)" : "none" }}
            />
          )}
        </button>
      </div>

      {/* Mobile Chat Backdrop (sm screens only) */}
      {mobileOpen && (
        <div 
          className="flex md:hidden lg:hidden fixed inset-0 z-40"
          style={{
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Chat Window (sm screens only - full screen) */}
      {mobileOpen && (
        <div
          ref={chatRef}
          className={`flex md:hidden lg:hidden fixed inset-0 z-50 flex-col ${colors.chatWindow} m-4 rounded-2xl overflow-hidden`}
        >
          {/* Header */}
          <div className="h-16 w-full flex items-center justify-between gap-2 p-4 border-b border-white/20 flex-shrink-0">
            <h3 className={`text-lg font-bold ${colors.headerText}`}>Ask Scotty</h3>
            {!minimized && (
              <button
                onClick={() => { setMobileOpen(false); setMinimized(true); }}
                className={`text-2xl font-bold transition flex-shrink-0 ${colors.secondaryText} hover:text-primary`}
              >
                ×
              </button>
            )}
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full text-center">
                <div>
                  <p className={`${colors.secondaryText} text-sm`}>
                    Hi! I&apos;m Scotty. Ask me anything about Swapnil&apos;s work and experience!
                  </p>
                </div>
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${msg.role === 'user' ? colors.userMsg : colors.assistantMsg}`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/80 dark:bg-white/15 backdrop-blur-md px-3 py-2 rounded-lg border border-black/10 dark:border-white/30">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary dark:bg-white/70 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary dark:bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary dark:bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Container */}
          <div className="border-t border-white/20 p-4 flex-shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                placeholder="Ask about Swapnil..."
                disabled={loading}
                className={colors.input}
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                disabled={loading || !inputValue.trim()}
                className={colors.button}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Chat Window (md and lg screens only) */}
      {!closed && (
        <div
          ref={chatRef}
          className={`hidden md:flex fixed bottom-4 right-4 z-40 flex-col ${colors.chatWindow} rounded-2xl transition-all duration-300 ease-out ${
            minimized ? 'w-80 chat-minimized' : 'h-96 w-80 chat-expanded'
          } chat-window-enter ' + animationClass}`}
        >
        
          {/* Header */}
          <div className="h-12 w-full flex items-center justify-between gap-2 p-2 border-b border-white/20 flex-shrink-0">
            <button
              onClick={() => setMinimized(!minimized)}
              className="flex items-center gap-2 flex-1 cursor-pointer hover:opacity-80 transition"
            >
              <Image
                src="/logo/askscotty.png"
                alt="Ask Scotty Logo"
                width={24}
                height={24}
                style={{ filter: isDark ? "invert(1)" : "none" }}
              />
              <h3 className={`text-md  ${colors.headerText}`}>AskScotty</h3>
            </button>
            {!minimized && (
              <button
                onClick={() => setMinimized(true)}
                className={`text-xl font-bold transition flex-shrink-0 ${colors.secondaryText} hover:text-primary`}
              >
                ×
              </button>
            )}
          </div>

          {/* Messages Container */}
          {!minimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
                {messages.length === 0 && (
                  <div className="flex items-center justify-center h-full text-center">
                    <div>
                      <p className={`${colors.secondaryText} text-sm`}>
                        Hi! I&apos;m Scotty. Ask me anything about Swapnil&apos;s work and experience!
                      </p>
                    </div>
                  </div>
                )}

                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg text-sm ${msg.role === 'user' ? colors.userMsg : colors.assistantMsg}`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white/80 dark:bg-white/15 backdrop-blur-md px-3 py-2 rounded-lg border border-black/10 dark:border-white/30">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-primary dark:bg-white/70 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary dark:bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary dark:bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Container */}
              <div className="border-t border-white/20 p-3 flex-shrink-0">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                    placeholder="Ask about Swapnil..."
                    disabled={loading}
                    className={colors.input}
                  />
                  <button
                    onClick={() => handleSendMessage(inputValue)}
                    disabled={loading || !inputValue.trim()}
                    className={colors.button}
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
