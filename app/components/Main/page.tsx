"use client";

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import HeroModel from '../HeroModel/page';

const colors = {
  primary: 'bg-purple-500',
  secondary: 'bg-purple-500'
};

export default function Main() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen py-16 ${isDark ? 'dark' : ''}`}>
      {/* Background gradient blur effect with molecular animation */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className={`absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 spiral-1 ${colors.primary}`} />
        <div className={`absolute bottom-40 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 spiral-2 ${colors.secondary}`} />
      </div>
      <div className="max-w-7xl mx-auto px-4 h-screen flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-8 w-full flex-1 md:mt-12">
          {/* Header Section - Left (30% width) */}
          <div className="flex flex-col justify-center lg:mb-0">
            <h1 className={`text-5xl md:text-6xl font-bold mt-8 text-primary ${isDark ? 'dark' : ''}`}>
              Welcome to <br/> Scott's Workplace
            </h1>
            <p className={`text-lg text-secondary ${isDark ? 'dark' : ''}`}>
              Explore my latest work and contributions
            </p>
            <button className="mt-6 px-8 w-34 py-3 font-semibold text-white bg-gray-600 rounded-lg hover:bg-gray-700 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl border-none cursor-pointer">
              Hire Me
            </button>
          </div>

          {/* Hero Model - Right (70% width) */}
          <figure className="w-full h-full">
            <div className='w-full h-full'>
              <HeroModel />
            </div>
          </figure>
        </div>
      </div>
    </div>
  );
}