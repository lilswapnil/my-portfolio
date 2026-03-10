"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTheme } from 'next-themes';
import { projects } from "../../../data/projects";
// ...existing code...
const screenshots = [
    "/screenshots/musix.png",
    "/screenshots/moviz.png",
    "/screenshots/gaming-trends.png",
    "/screenshots/kdrama-analytics.png",
    "/screenshots/lung-cancer-detection.png",
];

const screenshotLabels = [
    "Musix",
    "Moviez",
    "Gaming Trends",
    "Kdrama Analytics",
    "Lung Cancer Detection",
];


export default function Showcase() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { resolvedTheme } = useTheme();
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setIsDark(resolvedTheme === 'dark');
    }, [resolvedTheme]);

    return (
        <div className="max-h-screen bg-transparent mx-4 sm:mx-8 lg:mx-16 my-0 border-box overflow-x-hidden">
            {/* Tabs above laptop */}
            <div className="mx-auto mt-8 mb-0 max-w-full">
                <div className="flex justify-center space-x-4 mb-0 overflow-x-auto scrollbar-hide">
                    {screenshotLabels.map((label, idx) => (
                        <button
                            key={label}
                            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 focus:outline-none whitespace-nowrap ${
                                currentIndex === idx
                                    ? isDark
                                        ? 'glass-button dark scale-100 shadow-lg'
                                        : 'bg-black/80 text-white shadow-lg scale-100'
                                    : isDark
                                        ? 'bg-zinc-800/80 text-zinc-200 hover:bg-zinc-700/80'
                                        : 'bg-gray-200/80 text-gray-700 hover:bg-gray-300/80'
                            }`}
                            onClick={() => setCurrentIndex(idx)}
                            aria-current={currentIndex === idx ? 'true' : 'false'}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="h-full w-full flex items-end justify-center relative overflow-visible z-1 min-h-[500px] lg:min-h-[500px] mt-0 mb-0">
                <div className="w-full max-w-[min(1300px,95vw)] flex flex-col items-center justify-center relative">
                    {/* Laptop frame - screenshot overlay uses % of this container so they scale together */}
                    <div className="relative w-full">
                        <Image
                            src="/laptop.svg"
                            alt="Showcase of Projects"
                            width={1200}
                            height={600}
                            className="w-full h-auto block"
                        />
                        <div
                            className="absolute left-1/2 top-[1.5%] w-[70.8%] h-[90%] -translate-x-1/2 rounded-t-[50px] overflow-hidden flex items-center justify-center pointer-events-auto"
                            
                        >
                            <Image
                                src={screenshots[currentIndex]}
                                alt={screenshotLabels[currentIndex] || 'screenshot'}
                                fill
                                className="object-contain transition-all duration-500"
                                sizes="(min-width: 1024px) 700px, 90vw"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
}
