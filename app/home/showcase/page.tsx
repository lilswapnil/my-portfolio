import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTheme } from 'next-themes';
import { projects } from "../../../data/projects";
import "./showcase.css";

const screenshots = [
    "/screenshot/musix.png",
    "/screenshot/moviz.png",
    "/screenshot/gaming-trends.png",
    "/screenshot/kdrama-analytics.png",
    "/screenshot/lung-cancer-detection.png",
];


export default function Showcase() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [scrollY, setScrollY] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { resolvedTheme } = useTheme();
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setIsDark(resolvedTheme === 'dark');
    }, [resolvedTheme]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
    };
    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % screenshots.length);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (!wrapperRef.current) return;
            const rect = wrapperRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const progress = Math.min(1, Math.max(0, 1 - rect.top / windowHeight));
            setScrollY(progress);
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="max-h-screen bg-transparent mx-16 my-0 border-box">
            {/* <h1
                className="text-6xl z-1 text-left ml-32 mt-26"
                style={{ color: 'var(--foreground)' }}
            >
                Galleria
            </h1> */}
            <div ref={wrapperRef} className="h-full w-full flex items-end justify-center relative overflow-visible z-1 min-h-[700px] mt-0 mb-0">
                <div className="w-full flex flex-col items-center justify-center relative z-10">
                    <Image
                        src="/laptop.svg"
                        alt="Showcase of Projects"
                        width={1300}
                        height={600}
                        className="showcase-image"
                    />
                    {(() => {
                        const filename = screenshots[currentIndex].split("/").pop() || "";
                        const base = filename.replace(/\.[^.]+$/, "");
                        const normalize = (str: string) => str.toLowerCase().replace(/[-_\s]/g, "");
                        const project = projects.find(
                            p => normalize(p.id) === normalize(base) || (p.title && normalize(p.title) === normalize(base))
                        );
                        const name = filename.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
                        let link = project?.liveUrl || (project?.githubRepo ? `https://github.com/${project.githubRepo}` : undefined);
                        return (
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="showcase-project-link"
                                style={{ pointerEvents: link ? 'auto' : 'none', opacity: link ? 1 : 0.7, cursor: link ? 'pointer' : 'default' }}
                            >
                                {name}
                            </a>
                        );
                    })()}
                    <div className="showcase-screenshot">
                        <Image
                            src={screenshots[currentIndex]}
                            alt={screenshots[currentIndex].split("/").pop() || "screenshot"}
                            width={1000}
                            height={600}
                            className="showcase-screenshot-image"
                            priority
                        />
                    </div>
                    <button
                        aria-label="Previous screenshot"
                        onClick={handlePrev}
                        className={`showcase-btn showcase-btn-prev glass-button font-semibold rounded-lg active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer px-6 py-3${!isDark ? ' bg-purple-500 text-white' : ''}`}
                    >
                        &#8592;
                    </button>
                    <button
                        aria-label="Next screenshot"
                        onClick={handleNext}
                        className={`showcase-btn showcase-btn-next glass-button font-semibold rounded-lg active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer px-6 py-3${!isDark ? ' bg-purple-500 text-white' : ''}`}
                    >
                        &#8594;
                    </button>
                </div>
                <div className="showcase-screenshots-behind">
                    {screenshots.map((src, i) => {
                        const base = i * 0.15;
                        const localProgress = Math.max(0, Math.min(1, (scrollY - base) / 0.3));
                        const direction = i % 2 === 0 ? -1 : 1;
                        const translateX = (localProgress - 1) * direction * 400;
                        const opacity = localProgress;
                        return (
                            <Image
                                key={src}
                                src={src}
                                alt={src.split("/").pop() || "screenshot"}
                                width={1300}
                                height={600}
                                className="showcase-behind-image"
                                style={{
                                    transform: `translateX(${translateX}px) scale(${0.7 + 0.1 * localProgress})`,
                                    opacity,
                                    zIndex: i + 1,
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
