import { useEffect, useRef, useState } from "react";
import { impactData } from '../../../data/impact';
import { serviceSectionData } from '../../../data/service-section';

type AnimatedCounterProps = {
    value: number;
    decimals?: number;
    className?: string;
};

function AnimatedCounter({ value, decimals = 0, className = "" }: AnimatedCounterProps) {
    const [count, setCount] = useState(0);
    const raf = useRef<number | null>(null);
    useEffect(() => {
        setCount(0); // Reset count to 0 on value/decimals change
        let startTime: number | undefined;
        const duration = 1200;
        function animateCounter(ts: number) {
            if (startTime === undefined) startTime = ts;
            const progress = Math.min((ts - startTime) / duration, 1);
            const current = value * progress;
            setCount(() => Number(current.toFixed(decimals)));
            if (progress < 1) {
                raf.current = requestAnimationFrame(animateCounter);
            } else {
                setCount(() => Number(value.toFixed(decimals)));
            }
        }
        raf.current = requestAnimationFrame(animateCounter);
        return () => {
            if (raf.current) cancelAnimationFrame(raf.current);
        };
    }, [value, decimals]);
    return <span className={className}>{count}{decimals === 0 ? '' : ''}</span>;
}

export default function ImpactSection() {
    return (
        <>
        <section className="w-full bg-[var(--background)] text-[var(--foreground)] py-16 px-4 flex flex-col items-center mt-12">
            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 grid-rows-6 md:grid-rows-2 gap-8">
                {impactData.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-start px-4">
                    <span className="text-zinc-400 text-base font-medium mb-1">Up to</span>
                    <h2 className={`text-4xl md:text-5xl font-bold ${item.colorClass} mb-2`}>
                      <AnimatedCounter value={item.value} decimals={item.decimals} />%
                    </h2>
                    <p className="text-[var(--foreground)] text-base font-medium mb-2">{item.label}</p>
                    <p className="text-zinc-500 text-base leading-relaxed">{item.description}</p>
                  </div>
                ))}
            </div>
            <div className="max-w-5xl w-full mt-16 flex flex-col gap-6 bg-[var(--background)] text-[var(--foreground)]">
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-2">{serviceSectionData.title}</h2>
                <p className="text-lg font-medium text-zinc-500 text-base leading-relaxed">
                    {serviceSectionData.description}
                </p>
            </div>
        </section>
        </>
    );
}