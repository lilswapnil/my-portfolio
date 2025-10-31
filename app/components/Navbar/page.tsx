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
          className="lg:hidden flex flex-col gap-1 flex-shrink-0"
        >
          <span className={`w-6 h-0.5 transition-all ${isDark ? 'bg-white' : 'bg-gray-800'} ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`w-6 h-0.5 transition-all ${isDark ? 'bg-white' : 'bg-gray-800'} ${menuOpen ? "opacity-0" : ""}`}></span>
          <span className={`w-6 h-0.5 transition-all ${isDark ? 'bg-white' : 'bg-gray-800'} ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={`lg:hidden p-4 flex flex-col gap-4 glass-container ${isDark ? 'dark' : ''}`}>
          <nav className="flex flex-col gap-4">
            <a href="/about" className={`accent-hover transition ${isActive('/about') ? 'font-bold' : 'font-medium'}`}>About</a>
            <a href="/projects" className={`accent-hover transition ${isActive('/projects') ? 'font-bold' : 'font-medium'}`}>Projects</a>
            <a href="/credentials" className={`accent-hover transition ${isActive('/credentials') ? 'font-bold' : 'font-medium'}`}>Credentials</a>
            <a href="/contact" className={`accent-hover transition ${isActive('/contact') ? 'font-bold' : 'font-medium'}`}>Contact</a>
          </nav>
        </div>
      )}
    </header>
  );
}