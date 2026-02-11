"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { impactData } from '../../../data/impact';
import { serviceSectionData, type ServiceSection } from '../../../data/service-section';

type AnimatedCounterProps = {
    value: number;
    decimals?: number;
    className?: string;
};

function AnimatedCounter({ value, decimals = 0, className = "" }: AnimatedCounterProps) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px 0px" }); // Trigger slightly before full view
    const raf = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        if (isInView) {
            // Reset and start animation
            setCount(0);
            startTimeRef.current = null;

            const duration = 1200;

            const animateCounter = (ts: number) => {
                if (startTimeRef.current === null) {
                    startTimeRef.current = ts;
                }

                const progress = Math.min((ts - startTimeRef.current) / duration, 1);
                const current = value * progress;
                setCount(Number(current.toFixed(decimals)));

                if (progress < 1) {
                    raf.current = requestAnimationFrame(animateCounter);
                }
            };

            raf.current = requestAnimationFrame(animateCounter);
        } else {
            // Reset when out of view so it can animate again
            setCount(0);
            if (raf.current) {
                cancelAnimationFrame(raf.current);
            }
        }

        return () => {
            if (raf.current) {
                cancelAnimationFrame(raf.current);
            }
        };
    }, [value, decimals, isInView]);

    return <span ref={ref} className={className}>{count}{decimals === 0 ? '' : ''}</span>;
}

export default function ImpactSection() {
    return (
        <>
            <section className="w-full bg-[var(--background)] text-[var(--foreground)] py-16 px-4 flex flex-col items-center mt-12">
                <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 grid-rows-6 md:grid-rows-2 gap-8">
                    {impactData.map((item, idx) => (
                        <div key={idx} className="flex flex-col items-start px-4">
                            <span className="text-zinc-400 text-base font-medium mb-1">Up to</span>
                            <h2 className="text-4xl md:text-5xl font-bold mb-2">
                                <AnimatedCounter value={item.value} decimals={0} />%
                            </h2>
                            {/* Removed item.label as it does not exist in the data */}
                            <p className="text-zinc-500 text-base leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
                <div className="max-w-5xl w-full mt-16 px-4 flex flex-col gap-6 bg-[var(--background)] text-[var(--foreground)]">
                    {serviceSectionData.map((section: ServiceSection, idx: number) => (
                        <div key={idx} className="mb-4">
                            <h2 className="text-3xl md:text-3xl sm:text-3xl font-bold text-[var(--foreground)] mb-2">{section.title}</h2>
                            <p className="text-lg font-medium text-zinc-500 text-base leading-relaxed">
                                {section.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}