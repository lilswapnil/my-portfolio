"use client";

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes'
import { useAskScotty } from '@/app/context/AskScottyContext';
import { ASKSCOTTY_SYSTEM_PROMPT } from '@/lib/askscotty-system-prompt';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AskScotty({ question }: { question: string }) {
  const { messages, loading, minimized, closed, addMessage, setLoading, setMinimized, setClosed } = useAskScotty();
  const [inputValue, setInputValue] = useState('');
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme } = useTheme()
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const isDark = theme === 'dark';
  
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

  useEffect(() => {
    if (question) {
      setMinimized(false);
      setMobileOpen(true);
      handleSendMessage(question);
    }
  }, [question, setMinimized]);

  const handleSendMessage = async (messageText: string) => {
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
  };

  const handleMobileButtonClick = () => {
    if (mobileOpen) {
      setMobileOpen(false);
    } else {
      setMobileOpen(true);
    }
  };

  if (closed && mobileOpen) return null;

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
            <span className="text-2xl font-bold">×</span>
          ) : (
            <Image
              src="/askscotty.png"
              alt="Ask Scotty"
              width={24}
              height={24}
              style={{ filter: "invert(1)" }}
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
          className="flex md:hidden lg:hidden fixed inset-0 z-50 flex-col glass-container dark m-4 rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(24, 24, 27, 0.85)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Header */}
          <div className="h-16 w-full flex items-center justify-between gap-2 p-4 border-b border-white/20 flex-shrink-0">
            <h3 className="text-white text-lg font-bold">Ask Scotty</h3>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-white/70 hover:text-white text-2xl font-bold transition flex-shrink-0"
            >
              ×
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full text-center">
                <div>
                  <p className="text-white/70 text-sm">
                    Hi! I'm Scotty. Ask me anything about Swapnil's work and experience!
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
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    msg.role === 'user'
                      ? 'bg-blue-500/70 text-white rounded-br-none'
                      : 'bg-white/15 backdrop-blur-md text-white/95 rounded-bl-none border border-white/30'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/15 backdrop-blur-md px-3 py-2 rounded-lg border border-white/30">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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
                className="glass-input dark flex-1 text-sm placeholder-white/50 disabled:opacity-50"
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                disabled={loading || !inputValue.trim()}
                className="glass-button dark px-4 py-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Chat Window (md and lg screens only) */}
      <div
        ref={chatRef}
        className={`hidden md:flex fixed bottom-4 right-4 z-40 flex-col glass-container dark transition-all duration-300 ease-out ${
          minimized ? 'w-80 chat-minimized' : 'h-96 w-80 chat-expanded'
        } chat-window-enter`}
        style={{
          background: 'rgba(24, 24, 27, 0.7)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
        }}
      >
        {/* Header */}
        <div className="h-12 w-full flex items-center justify-between gap-2 p-2 border-b border-white/20 flex-shrink-0">
          <button
            onClick={() => setMinimized(!minimized)}
            className="flex items-center gap-2 flex-1 cursor-pointer hover:opacity-80 transition"
          >
            <Image
              src="/askscotty.png"
              alt="Ask Scotty Logo"
              width={24}
              height={24}
              style={{ filter: "invert(1)" }}
            />
            <h3 className="text-white text-sm font-bold">Ask Scotty</h3>
          </button>
          <button
            onClick={() => setClosed(true)}
            className="text-white/70 hover:text-white text-xl font-bold transition flex-shrink-0"
          >
            ×
          </button>
        </div>

        {/* Messages Container */}
        {!minimized && (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
              {messages.length === 0 && (
                <div className="flex items-center justify-center h-full text-center">
                  <div>
                    <p className="text-white/70 text-sm">
                      Hi! I'm Scotty. Ask me anything about Swapnil's work and experience!
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
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      msg.role === 'user'
                        ? 'bg-blue-500/70 text-white rounded-br-none'
                        : 'bg-white/15 backdrop-blur-md text-white/95 rounded-bl-none border border-white/30'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/15 backdrop-blur-md px-3 py-2 rounded-lg border border-white/30">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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
                  className="glass-input dark flex-1 text-sm placeholder-white/50 disabled:opacity-50"
                />
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={loading || !inputValue.trim()}
                  className="glass-button dark px-3 py-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
