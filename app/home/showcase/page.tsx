"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTheme } from 'next-themes';
import { projects } from "../../../data/projects";
// ...existing code...
const screenshots = [
    "/screenshot/musix.png",
    "/screenshot/moviez.png",
    "/screenshot/gaming-trends.png",
    "/screenshot/kdrama-analytics.png",
    "/screenshot/lung-cancer-detection.png",
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
        <div className="max-h-screen bg-transparent mx-16 my-0 border-box">
            {/* Tabs above laptop */}
            <div className="max-w-3xl mx-auto mt-8 mb-4">
                <div className="flex justify-center space-x-4 mb-4 overflow-x-auto scrollbar-hide">
                    {screenshotLabels.map((label, idx) => (
                        <button
                            key={label}
                            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 focus:outline-none whitespace-nowrap ${
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
            <div className="h-full w-full flex items-end justify-center relative overflow-visible z-1 min-h-[700px] mt-0 mb-0">
                <div className="w-full flex flex-col items-center justify-center relative z-10">
                    <Image
                        src="/laptop.svg"
                        alt="Showcase of Projects"
                        width={1300}
                        height={600}
                        className="showcase-image"
                    />
                    <div
                        className="absolute left-1/2 top-1/2 w-[920px] h-[600px] -translate-x-1/2 -translate-y-[54%] rounded-[18px] overflow-hidden bg-[#18181b] z-2 flex items-center justify-center pointer-events-auto shadow-2xl"
                        style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}
                    >
                        <Image
                            src={screenshots[currentIndex]}
                            alt={screenshotLabels[currentIndex] || 'screenshot'}
                            width={1800}
                            height={600}
                            className="contain w-full h-full transition-all duration-500"
                            priority
                        />
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
