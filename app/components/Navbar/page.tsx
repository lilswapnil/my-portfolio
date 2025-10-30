"use client";

import { useTheme } from 'next-themes'
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

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
            <a href="/about" className={`accent-hover transition font-medium ${isDark ? 'dark' : ''}`}>About</a>
            <a href="/projects" className={`accent-hover transition font-medium ${isDark ? 'dark' : ''}`}>Projects</a>
            <a href="/credentials" className={`accent-hover transition font-medium ${isDark ? 'dark' : ''}`}>Credentials</a>
            <a href="/contact" className={`accent-hover transition font-medium ${isDark ? 'dark' : ''}`}>Contact</a>
          </nav>
        </div>

        {/* Desktop Input and Button - Right */}
        <div className="hidden lg:flex items-center gap-2 flex-shrink-0 ml-auto">
          <div 
            className="flex items-center gap-2 transition-all duration-300"
            onMouseEnter={() => setShowInput(true)}
            onMouseLeave={() => setShowInput(false)}
          >
            <input
              type="text"
              placeholder="ask scotty"
              className={`glass-input ${isDark ? 'dark' : ''} ${
                showInput ? "w-36 opacity-100" : "w-0 opacity-0"
              }`}
            />
            <button 
              className={`glass-button flex items-center justify-center flex-shrink-0 ${isDark ? 'dark' : ''}`}
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
          
        </div>

        {/* Mobile Hamburger Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col gap-1 flex-shrink-0"
        >
          <span 
            className={`w-6 h-0.5 transition-all ${isDark ? 'bg-white' : 'bg-gray-800'} ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          ></span>
          <span 
            className={`w-6 h-0.5 transition-all ${isDark ? 'bg-white' : 'bg-gray-800'} ${menuOpen ? "opacity-0" : ""}`}
          ></span>
          <span 
            className={`w-6 h-0.5 transition-all ${isDark ? 'bg-white' : 'bg-gray-800'} ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div 
          className={`lg:hidden p-4 flex flex-col gap-4 glass-container ${isDark ? 'dark' : ''}`}
        >
          <nav className="flex flex-col lg:flex-row justify-center gap-8">
            <a href="/about" className={`accent-hover transition font-medium ${isDark ? 'dark' : ''}`}>About</a>
            <a href="/credentials" className={`accent-hover transition font-medium ${isDark ? 'dark' : ''}`}>Credentials</a>
            <a href="/projects" className={`accent-hover transition font-medium ${isDark ? 'dark' : ''}`}>Projects</a>
          </nav>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="ask scotty"
              className={`glass-input ${isDark ? 'dark' : ''}`}
            />
            <button 
              className={`glass-button w-full flex items-center justify-center gap-2 ${isDark ? 'dark' : ''}`}
            >
              <Image
                src="/askscotty.png"
                alt="Ask Scotty"
                width={20}
                height={20}
              />
            </button>
          </div>
          
        </div>
      )}
    </header>
  );
}