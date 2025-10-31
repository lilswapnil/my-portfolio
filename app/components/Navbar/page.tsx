"use client";

import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation';
import { useState, useEffect } from "react";
import Image from "next/image";
import { useAskScotty } from '@/app/context/AskScottyContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme()
  const pathname = usePathname();
  const { setMinimized } = useAskScotty();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header 
      className={`sticky top-2 z-50 mx-auto rounded-4xl glass-container max-w-7xl ${isDark ? 'dark' : ''}`}
    >
      <div className="flex items-center justify-between p-2 px-2">
        
        {/* Logo + Title */}
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
        </div>

        {/* Desktop Navbar - Center */}
        <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
          <nav className="flex flex-col lg:flex-row justify-center gap-8">
            <a href="/about" className={`accent-hover transition ${isActive('/about') ? 'font-bold' : 'font-medium'} ${isDark ? 'dark' : ''}`}>About</a>
            <a href="/projects" className={`accent-hover transition ${isActive('/projects') ? 'font-bold' : 'font-medium'} ${isDark ? 'dark' : ''}`}>Projects</a>
            <a href="/credentials" className={`accent-hover transition ${isActive('/credentials') ? 'font-bold' : 'font-medium'} ${isDark ? 'dark' : ''}`}>Credentials</a>
            <a href="/contact" className={`accent-hover transition ${isActive('/contact') ? 'font-bold' : 'font-medium'} ${isDark ? 'dark' : ''}`}>Contact</a>
          </nav>
        </div>

        {/* Desktop Ask Scotty Button - Right */}
        <div className="hidden lg:flex items-center gap-2 flex-shrink-0 ml-auto">
          <button 
            onClick={() => setMinimized(false)}
            className={`glass-button flex items-center justify-center flex-shrink-0 ${isDark ? 'dark' : ''}`}
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
          className="lg:hidden flex flex-col gap-2 flex-shrink-0 p-2"
        >
          <span className={`w-6 h-0.5 transition-all ${isDark ? 'bg-white' : 'bg-gray-800'} ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`w-6 h-0.5 transition-all ${isDark ? 'bg-white' : 'bg-gray-800'} ${menuOpen ? "opacity-0" : ""}`}></span>
          <span className={`w-6 h-0.5 transition-all ${isDark ? 'bg-white' : 'bg-gray-800'} ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </div>

      {/* Mobile Menu Backdrop */}
      {menuOpen && (
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

      {/* Mobile Menu - 3/4 Screen from Right */}
      {menuOpen && (
        <div 
          className={`lg:hidden fixed right-0 top-0 bottom-0 z-40 w-3/4 flex flex-col justify-between p-6 glass-container ${isDark ? 'dark' : ''}`}
          style={{
           
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRight: 'none',
            animation: 'slideInRight 0.3s ease-out',
          }}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-3xl text-white">Navigations</h3>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-bold text-white/70 hover:text-white transition"
            >
              ×
            </button>
          </div>

          <nav className="flex flex-col justify-center gap-12 flex-1">
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

          <div className="text-center text-sm text-white/50">
            © 2025 Swapnil
          </div>
        </div>
      )}
    </header>
  );
}