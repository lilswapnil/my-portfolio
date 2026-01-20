"use client";

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import HeroModel from '../components/HeroModel/page';
import TileHighlightSection from '../components/TileHighlightSection/page';
import ScottModel from '../components/ScottModel/page';
import LenisProvider from '../components/LenisProvider';

// Dynamic colors based on theme
function getColors(isDark: boolean) {
    if (isDark) {
        return {
            primary: 'bg-purple-500',
            secondary: 'bg-violet-950'
        };
    } else {
        return {
            primary: 'bg-yellow-500',
            secondary: 'bg-blue-950'
        };
    }
}


export default function Home() {
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        let isMounted = true;
        requestAnimationFrame(() => {
            if (isMounted) setMounted(true);
        });
        return () => {
            isMounted = false;
        };
    }, []);

    if (!mounted) return null;

    const isDark = theme === 'dark';
    const colors = getColors(isDark);

    return (
        <>
            <LenisProvider />
            <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
                {/* Hero Model - Right (70% width) */}
                <div className="max-w-7xl mx-auto px-4 mt-16 h-screen flex flex-col">
                    <div className="grid grid-cols-1 lg:px-16 lg:grid-cols-[30%_70%] gap-8 w-full flex-1 md:mt-12">
                        {/* Header Section - Left (30% width) */}
                        <div className="flex flex-col justify-center lg:mb-0">
                            <h1 className="text-5xl md:text-6xl font-bold mb-3 text-primary">
                                Welcome to <br /> My WorkPlace
                            </h1>
                            <p className="text-lg text-secondary">
                                Explore my latest work and contributions
                            </p>
                            <button
                                className="mt-6 px-8 w-fit py-3 glass-button font-semibold rounded-lg active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
                                onClick={() => window.location.href = '/projects'}
                            >
                                Explore
                            </button>
                        </div>

                        {/* Hero Model - Right (70% width) */}
                        <figure className="w-full h-full">
                            <div className="w-full h-full">
                                <HeroModel />
                            </div>
                        </figure>
                    </div>
                </div>

                <TileHighlightSection />

                {/* Background gradient blur effect with molecular animation - only render after mounted */}
                <figure className="w-full h-100vh">
                    <div className="w-full h-full">
                        <ScottModel />
                    </div>
                </figure>

                {mounted && (
                    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
                        <div className={`absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 spiral-1 ${colors.primary}`} />
                        <div className={`absolute bottom-40 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 spiral-2 ${colors.secondary}`} />
                    </div>
                )}
            </div>
        </>
    );
}