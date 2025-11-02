"use client";

import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation';
import { useState, useEffect } from "react";
import Image from "next/image";
import { useAskScotty } from '@/app/context/AskScottyContext';
import { useLoading } from '@/app/context/LoadingContext';
import './navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme()
  const pathname = usePathname();
  const { setMinimized } = useAskScotty();
  const { setIsPageLoading } = useLoading();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Simulate page load completion - adjust timing as needed
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsPageLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [setIsPageLoading]);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      {/* Loading/Growing Navbar */}
      <header 
        className={`fixed z-50 rounded-4xl glass-container transition-all duration-700 ease-out ${isDark ? 'dark' : ''}`}
        style={{
          left: '50%',
          transform: 'translateX(-50%)',
          top: isLoading ? '50%' : '8px',
          marginTop: isLoading ? '-24px' : '0',
          width: isLoading ? '160px' : 'calc(100vw - 32px)',
          maxWidth: isLoading ? '220px' : '1792px',
          height: isLoading ? '58px' : '64px',
          opacity: isLoading ? 1 : 1,
          padding: isLoading ? '10px' : '0',
          border: isLoading ? `2px solid ${isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'}` : 'none',
          boxShadow: isLoading 
            ? `0 0 20px ${isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.3)'}, inset 0 0 20px ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`
            : 'none',
          animation: isLoading ? 'glowPulse 2s ease-in-out infinite' : 'none',
        }}
      >
        <div className="flex items-center justify-between p-2 px-2 h-full">
          
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <a href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
                priority
              />
            </a>
<h3 className='text-l font-small select-none'>Ask Scotty</h3>
          </div>

          {/* Desktop Navbar - Center */}
          <div 
            className={`hidden lg:flex absolute left-1/2 transform -translate-x-1/2 h-full items-center transition-opacity duration-500 ${
              isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-300'
            }`}
          >
            <nav className="flex flex-col lg:flex-row justify-center gap-8">
              <a href="/about" className={`accent-hover transition ${isActive('/about') ? 'font-bold' : 'font-medium'} ${isDark ? 'dark' : ''}`}>About</a>
              <a href="/projects" className={`accent-hover transition ${isActive('/projects') ? 'font-bold' : 'font-medium'} ${isDark ? 'dark' : ''}`}>Projects</a>
              <a href="/credentials" className={`accent-hover transition ${isActive('/credentials') ? 'font-bold' : 'font-medium'} ${isDark ? 'dark' : ''}`}>Credentials</a>
              <a href="/contact" className={`accent-hover transition ${isActive('/contact') ? 'font-bold' : 'font-medium'} ${isDark ? 'dark' : ''}`}>Contact</a>
            </nav>
          </div>

          {/* Desktop Ask Scotty Button - Right */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0 ml-auto h-full">
            <button 
              onClick={() => setMinimized(false)}
              className={`glass-button flex items-center justify-center flex-shrink-0 transition-opacity duration-500 ${
                isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-300'
              } ${isDark ? 'dark' : ''}`}
              title="Ask Scotty"
            >
              <Image
                src="/askscotty.png"
                alt="Ask Scotty"
                width={20}
                height={20}
                style={{ filter: isDark ? "invert(0)" : "invert(1)"}}
              />
            </button>
          </div>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden flex flex-col gap-2 flex-shrink-0 p-2 rounded-lg glass-container dark transition-opacity duration-500 ${
              isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-300'
            }`}
            style={{
              background: 'rgba(24, 24, 27, 0.6)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <span className={`w-6 h-0.5 transition-all ${isDark ? 'bg-white' : 'bg-gray-800'} ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`w-6 h-0.5 transition-all ${isDark ? 'bg-white' : 'bg-gray-800'} ${menuOpen ? "opacity-0" : ""}`}></span>
            <span className={`w-6 h-0.5 transition-all ${isDark ? 'bg-white' : 'bg-gray-800'} ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      {menuOpen && !isLoading && (
        <div 
          className="lg:hidden fixed inset-0 z-30"
          style={{
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Menu - Half Screen Width from Right */}
      {menuOpen && !isLoading && (
        <div 
          className={`lg:hidden fixed right-0 top-0 bottom-0 z-40 w-1/2 flex flex-col justify-between p-6 glass-container ${isDark ? 'dark' : ''}`}
          style={{
            background: 'rgba(24, 24, 27, 0.95)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRight: 'none',
            animation: 'slideInRight 0.3s ease-out',
          }}
        >
        

          <nav className="flex flex-col justify-center gap-12 flex-1 text-right my-8">
            <a 
              href="/about" 
              onClick={() => setMenuOpen(false)}
              className={`accent-hover transition text-2xl ${isActive('/about') ? 'font-bold' : 'font-medium'} text-white`}
            >
              About
            </a>
            <a 
              href="/projects" 
              onClick={() => setMenuOpen(false)}
              className={`accent-hover transition text-2xl ${isActive('/projects') ? 'font-bold' : 'font-medium'} text-white`}
            >
              Projects
            </a>
            <a 
              href="/credentials" 
              onClick={() => setMenuOpen(false)}
              className={`accent-hover transition text-2xl ${isActive('/credentials') ? 'font-bold' : 'font-medium'} text-white`}
            >
              Credentials
            </a>
            <a 
              href="/contact" 
              onClick={() => setMenuOpen(false)}
              className={`accent-hover transition text-2xl ${isActive('/contact') ? 'font-bold' : 'font-medium'} text-white`}
            >
              Contact
            </a>
          </nav>

          <div className="text-right text-sm text-white/50 pb-4">
            © 2025 Swapnil
          </div>
        </div>
      )}
    </>
  );
}