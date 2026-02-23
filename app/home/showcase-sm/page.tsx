"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useTheme } from 'next-themes';
import Image from "next/image";


const screenshots = [
  "/screenshots/musix1.png",
  "/screenshots/moviz1.png",
  "/screenshots/gaming-trends.png",
  "/screenshots/kdrama-analytics.png",
  "/screenshots/lung-cancer-detection.png",
];

const screenshotLabels = [
  "Musix",
  "Moviz",
  "Gaming Trends",
  "Kdrama Analytics",
  "Lung Cancer Detection",
];

export default function ShowcaseIpad() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(resolvedTheme === 'dark');
  }, [resolvedTheme]);

  const getSlideWidth = useCallback(() => {
    const ref = scrollRef.current;
    if (!ref) return 0;
    const firstSlide = ref.firstElementChild as HTMLElement | null;
    return firstSlide?.clientWidth ?? ref.clientWidth; // fallback
  }, []);

  const scrollToIndex = useCallback(
    (idx: number) => {
      const ref = scrollRef.current;
      if (!ref) return;
      const slideWidth = getSlideWidth();
      if (!slideWidth) return;

      ref.scrollTo({
        left: idx * slideWidth,
        behavior: "smooth",
      });
      setCurrentIndex(idx);
    },
    [getSlideWidth]
  );

  // Update currentIndex on scroll (use slideWidth, not offsetWidth)
  useEffect(() => {
    const ref = scrollRef.current;
    if (!ref) return;

    const onScroll = () => {
      const slideWidth = getSlideWidth();
      if (!slideWidth) return;
      const idx = Math.round(ref.scrollLeft / slideWidth);
      const clamped = Math.max(0, Math.min(idx, screenshots.length - 1));
      setCurrentIndex(clamped);
    };

    ref.addEventListener("scroll", onScroll, { passive: true });
    return () => ref.removeEventListener("scroll", onScroll);
  }, [getSlideWidth]);

  // Keep position correct on resize
  useEffect(() => {
    const onResize = () => scrollToIndex(currentIndex);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [currentIndex, scrollToIndex]);

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="max-w-3xl mx-auto mt-8 mb-4">
        <div className="flex mx-2 justify-center space-x-4 mb-6 overflow-x-auto custom-scrollbar-hide">
          {screenshotLabels.map((label, idx) => (
            <button
              key={label}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 focus:outline-none whitespace-nowrap ${
                currentIndex === idx
                  ? isDark
                    ? "glass-button dark scale-100 shadow-lg"
                    : "bg-black/80 text-white shadow-lg scale-100"
                  : isDark
                    ? "bg-zinc-800/80 text-zinc-200 hover:bg-zinc-700/80"
                    : "bg-gray-200/80 text-gray-700 hover:bg-gray-300/80"
              }`}
              onClick={() => scrollToIndex(idx)}
              aria-current={currentIndex === idx ? "true" : "false"}
            >
              {label}
            </button>
          ))}
      </div>
      <style jsx>{`
        .custom-scrollbar-hide::-webkit-scrollbar,
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .custom-scrollbar-hide,
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* iPad */}
      <div className="w-full px-4 sm:px-6 flex items-center justify-center bg-[var(--background)] overflow-x-hidden relative max-w-[min(768px,95vw)] flex-col">
          {/* iPad frame - scales with container */}
          <div className="relative w-full aspect-[768/1024] max-h-[60vh]">
            <Image
              src="/ipad.png"
              alt="iPad Frame"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 95vw, (max-width: 878px) 90vw, 768px"
              priority
            />

            {/* Screens - overlay positioned relative to iPad frame */}
            <div
              ref={scrollRef}
              className="absolute left-1/2 top-0 w-[98%] h-full -translate-x-1/2 overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory flex"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {screenshots.map((src, idx) => (
                <div key={src} className="relative flex-shrink-0 snap-center min-w-full">
                  <Image
                    src={src}
                    alt={screenshotLabels[idx] ?? "screenshot"}
                    fill
                    className="object-contain"
                    priority={idx === 0}
                    sizes="(max-width: 640px) 100vw, (max-width: 878px) 100vw, 1000px"
                  />
                </div>
              ))}
            </div>
          </div>
      </div>
    </div>
    </div>
  );
}
