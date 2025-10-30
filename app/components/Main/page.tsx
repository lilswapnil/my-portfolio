"use client";

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Main() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <main className={`${isDark ? 'dark' : ''}`}>
      {/* Use text-primary for main text */}
      <h1 className={`text-primary ${isDark ? 'dark' : ''}`}>Welcome</h1>
      
      {/* Use text-secondary for secondary text */}
      <p className={`text-secondary ${isDark ? 'dark' : ''}`}>Description</p>
      
      {/* Use glass-container for containers */}
      <div className={`glass-container ${isDark ? 'dark' : ''}`}>
        Content
      </div>
      
      {/* Use glass-button for buttons */}
      <button className={`glass-button ${isDark ? 'dark' : ''}`}>
        Click me
      </button>
    </main>
  );
}