"use client";
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import HeroModel from './HeroModel/page';
import Details from './Details/page';
import ScottModel from '../components/ScottModel/page';
import LenisProvider from '../components/LenisProvider';
import Skills from './Skills/page';
import Skills1 from './Skills/page1';

// Dynamic colors based on theme
function getColors(isDark: boolean) {
    if (isDark) {
        return {
            primary: 'bg-purple-500',
            secondary: 'bg-violet-950'
        };
    } else {
        return {
            primary: 'bg-yellow-200',
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
            <div className={`min-h-screen mt-16 ${isDark ? 'dark' : ''}`}>
                {/* Background gradient blur effect with molecular animation - only render after mounted */}
                <figure className="w-full" style={{ height: '93vh' }}>
                    <div className="w-full h-full relative">
                        <ScottModel />
                    </div>
                </figure>
                <Skills />
                <Details />
                <Skills1 />

                {/* Hero Model - Right (70% width) */}
                <div className="max-w-7xl mx-auto px-4" style={{ height: '95vh' }}>
                    <div className="flex flex-col lg:grid lg:grid-cols-[30%_70%] lg:pt-8 gap-4 w-full h-full">
                        {/* Header Section - Left (30% width) */}
                        <div className="flex flex-col justify-center items-start mt-[50px] mb-[50px] ">
                            <h1 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-primary' : 'text-gray-900'}`}>
                                Welcome to <br /> My WorkPlace
                            </h1>
                            <p className={`text-lg ${isDark ? 'text-secondary' : 'text-gray-700'}`}>
                                Explore my latest work and contributions
                            </p>
                            <button
                                className="mt-6 px-8 w-fit py-3 glass-button font-semibold rounded-lg active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
                                onClick={() => window.location.href = '/projects'}
                            >
                                Explore Projects
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