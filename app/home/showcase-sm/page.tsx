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
          .custom-scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .custom-scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>

      {/* iPad */}
      <div className="w-full md:mx-2 sm:p-2 flex items-center justify-center bg-[var(--background)]">
        <div className="relative w-full h-full flex items-center justify-center max-w-4xl max-h-[60vh]">
          {/* iPad frame */}
          <Image
            src="/ipad.png"
            alt="iPad Frame"
            width={768}
            height={1024}
            className="relative z-10"
            priority
          />

          {/* Screens */}
          <div className="absolute rounded-2xl w-[88%] h-[95%] sm:w-[94%] sm:h-[90%] z-0 overflow-hidden">
            <div
              ref={scrollRef}
              className="w-full h-full flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {screenshots.map((src, idx) => (
                <div
                  key={src}
                  className="relative h-full flex-shrink-0 snap-center"
                  style={{ minWidth: "100%", minHeight: "100%" }}
                >
                  <Image
                    src={src}
                    alt={screenshotLabels[idx] ?? "screenshot"}
                    fill
                    className="contain md:px-12"
                    priority={idx === 0}
                    sizes="(max-width: 768px) 90vw, 700px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hide scrollbar */}
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </div>
  );
}
