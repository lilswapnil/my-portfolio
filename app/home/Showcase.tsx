import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { projects } from "../../data/projects";

const screenshots = [
    "/screenshot/gaming-trends.png",
    "/screenshot/kdrama-analytics.png",
    "/screenshot/moviz.png",
    "/screenshot/lung-cancer-detection.png",
    "/screenshot/musix.png"
];

export default function Showcase() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [scrollY, setScrollY] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

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
            // Calculate scroll progress (0 = top in view, 1 = bottom out of view)
            const progress = Math.min(1, Math.max(0, 1 - rect.top / windowHeight));
            setScrollY(progress);
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div ref={wrapperRef} className="showcase-wrapper h-full w-full flex items-end justify-center relative overflow-visible" style={{zIndex:1, minHeight: 700, marginTop: 0, marginBottom: 68}}>
            {/* Main laptop image with screenshot inside */}
            <div style={{position: 'relative', width: 1300, height: 600}} className="relative z-10 flex items-center justify-center">
                {/* Project name at top right of laptop */}
                {(() => {
                    const filename = screenshots[currentIndex].split("/").pop() || "";
                    const base = filename.replace(/\.[^.]+$/, "");
                    // Try to match project by id or by title (case-insensitive, ignoring dashes/underscores/spaces)
                    const normalize = (str: string) => str.toLowerCase().replace(/[-_\s]/g, "");
                    const project = projects.find(
                        p => normalize(p.id) === normalize(base) || (p.title && normalize(p.title) === normalize(base))
                    );
                    // Remove extension and replace dashes/underscores with spaces, capitalize words
                    const name = filename.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
                    let link = project?.liveUrl || (project?.githubRepo ? `https://github.com/${project.githubRepo}` : undefined);
                    return (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="showcase-project-link"
                            style={{
                                position: 'absolute',
                                top: 38,
                                right: 110,
                                zIndex: 5,
                                background: 'rgba(24,24,27,0.92)',
                                color: 'white',
                                padding: '8px 24px',
                                borderRadius: 16,
                                fontWeight: 600,
                                fontSize: 22,
                                letterSpacing: 0.5,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                                pointerEvents: link ? 'auto' : 'none',
                                userSelect: 'none',
                                maxWidth: 340,
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textDecoration: 'none',
                                opacity: link ? 1 : 0.7,
                                cursor: link ? 'pointer' : 'default',
                                border: '1px solid #FFFFFF',
                                transition: 'color 0.2s, border-color 0.2s',
                            }}
                        >
                            {name}
                        </a>
                    );
                })()}
                            {/* Custom style for project link hover */}
                            <style>{`
                                .showcase-project-link:hover {
                                    color: rgba(59, 130, 246, 0.6);; !important;
                                    border-color: #a5b4fc !important;
                                }
                            `}</style>
                <Image
                    src="/laptop.svg"
                    alt="Showcase of Projects"
                    width={1300}
                    height={600}
                    className="showcase-image object-contain"
                />
                {/* Screenshot inside the laptop screen */}
                <div
                    style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        width: 900,
                        height: 600,
                        transform: 'translate(-50%, -54%)',
                        borderRadius: 18,
                        overflow: 'hidden',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                        background: '#18181b',
                        zIndex: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'auto',
                    }}
                >
                    <Image
                        src={screenshots[currentIndex]}
                        alt={screenshots[currentIndex].split("/").pop() || "screenshot"}
                        width={1000}
                        height={600}
                        style={{objectFit: 'cover', width: '100%', height: '100%'}}
                        className="transition-all duration-500"
                        priority
                    />
                </div>
                {/* Left/Right buttons */}
                <button
                    aria-label="Previous screenshot"
                    onClick={handlePrev}
                    style={{
                        position: 'absolute',
                        left: 40,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 3,
                        background: 'rgba(24,24,27,0.85)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: 48,
                        height: 48,
                        fontSize: 28,
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background 0.2s',
                    }}
                >
                    &#8592;
                </button>
                <button
                    aria-label="Next screenshot"
                    onClick={handleNext}
                    style={{
                        position: 'absolute',
                        right: 40,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 3,
                        background: 'rgba(24,24,27,0.85)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: 48,
                        height: 48,
                        fontSize: 28,
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background 0.2s',
                    }}
                >
                    &#8594;
                </button>
            </div>
            {/* Screenshots behind the laptop, at the bottom */}
            <div className="absolute left-1/2" style={{bottom: 50, transform: 'translateX(-50%)', zIndex:0, width: '1000px', height: '600px', pointerEvents: 'none'}}>
                {screenshots.map((src, i) => {
                    // ...existing code...
                    const base = i * 0.15;
                    const localProgress = Math.max(0, Math.min(1, (scrollY - base) / 0.3));
                    const direction = i % 2 === 0 ? -1 : 1;
                    const translateX = (localProgress - 1) * direction * 400; // px
                    const opacity = localProgress;
                    return (
                        <Image
                            key={src}
                            src={src}
                            alt={src.split("/").pop() || "screenshot"}
                            width={1300}
                            height={600}
                            className="absolute rounded-xl shadow-2xl transition-transform duration-500"
                            style={{
                                top:6,
                                left: 0,
                                bottom: 0,
                                transform: `translateX(${translateX}px) scale(${0.9 + 0.1 * localProgress})`,
                                opacity,
                                zIndex: i + 1,
                                transition: 'transform 0.6s cubic-bezier(.4,2,.3,1), opacity 0.6s',
                                pointerEvents: 'none',
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}