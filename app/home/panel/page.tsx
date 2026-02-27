'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface ProjectPanelProps {
  project: {
    logo?: string;
    company: string;
    position: string;
    duration: string;
    description?: string;
    highlights?: string[];
    role?: string;
    timeframe?: string;
  };
  position: 'top-left' | 'bottom-right';
  scrollProgressRef: React.RefObject<{ value: number }>;
}

export default function ProjectPanel({
  project,
  position,
  scrollProgressRef,
}: ProjectPanelProps) {
  const isTopLeft = position === 'top-left';
  const panelRef = useRef<HTMLDivElement>(null);

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isDark = mounted && resolvedTheme === 'dark';

  useEffect(() => {
    setMounted(true);

    let rafId = 0;
    let prevX: number | null = null;
    let prevOpacity: number | null = null;

    const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // ✅ Faster / finishes earlier
    const windowSize = 0.32; // bigger => completes sooner within your scroll section
    const offset = isTopLeft ? 0.0 : 0.12; // start slightly later for bottom-right
    const easeSpeed = 0.75; // higher => faster catch-up (snappier)

    const animate = () => {
      const el = panelRef.current;
      const sp = scrollProgressRef.current?.value;

      if (!el || sp == null) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      const p = clamp01((sp - offset) / windowSize);

      const targetX = isTopLeft ? (p - 1) * 100 : (1 - p) * 100;
      const targetOpacity = p;

      if (prevX === null) prevX = targetX;
      if (prevOpacity === null) prevOpacity = targetOpacity;

      // Smooth but fast
      prevX = lerp(prevX, targetX, easeSpeed);
      prevOpacity = lerp(prevOpacity, targetOpacity, easeSpeed);

      el.style.opacity = String(prevOpacity);
      el.style.transform = `translateX(${prevX}%)`;
      el.style.pointerEvents = prevOpacity < 0.1 ? 'none' : 'auto';

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isTopLeft, scrollProgressRef]);

  return (
    <div
      ref={panelRef}
      className="glass-container project-panel max-w-sm"
      style={{
        position: 'absolute',
        ...(isTopLeft
          ? { top: '80px', left: '80px', marginTop: '128px' }
          : { bottom: '80px', right: '80px', marginBottom: '128px' }),
        width: '350px',
        padding: '16px',
        color: 'var(--foreground)',
        opacity: 0,
        transform: isTopLeft ? 'translateX(-100%)' : 'translateX(100%)',
        zIndex: 20,
        pointerEvents: 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {project.logo && (
          <img
            src={project.logo}
            alt={`${project.company} logo`}
            style={{
              width: project.logo === '/icons/ap.png' ? 80 : 64,
              height: project.logo === '/icons/ap.png' ? 80 : 64,
              borderRadius: 10,
              marginRight: 18,
              objectFit: 'cover',
            }}
          />
        )}

        <div>
          <div style={{ fontSize: 'clamp(13px,1.5vw,15px)' }}>
            {project.position}
          </div>

          <div
            style={{
              fontWeight: 'bold',
              fontSize: 'clamp(13px,1.5vw,15px)',
            }}
          >
            {project.company}
          </div>

          <div
            style={{
              height: 1,
              background: mounted
                ? isDark
                  ? 'linear-gradient(90deg, rgba(255, 255, 255, 0.69), transparent)'
                  : 'linear-gradient(90deg, rgba(34, 34, 34, 0.3), transparent)'
                : 'linear-gradient(90deg, rgba(128,128,128,0.3), transparent)',
              margin: '6px 0',
            }}
          />

          <div style={{ fontSize: 'clamp(13px,1.5vw,15px)', marginTop: 2 }}>
            {project.duration}
          </div>
        </div>
      </div>

      {project.description && (
        <p
          style={{
            margin: '12px 0',
            fontSize: 'clamp(13px,1.5vw,15px)',
            lineHeight: 1.5,
          }}
        >
          {project.description}
        </p>
      )}

      {project.highlights?.length ? (
        <div
          style={{
            marginTop: 12,
            paddingTop: 12,
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <p
            style={{
              margin: '0 0 8px 0',
              fontSize: 'clamp(13px,1.5vw,15px)',
              fontWeight: 'bold',
              color: isDark
                ? 'rgba(255, 255, 255, 0.9)'
                : 'rgba(20, 20, 20, 0.9)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Key Features:
          </p>

          <ul style={{ margin: 0, paddingLeft: 16, listStyle: 'disc' }}>
            {project.highlights.slice(0, 2).map((highlight, idx) => (
              <li
                key={idx}
                style={{
                  fontSize: 'clamp(13px,1.5vw,15px)',
                  color: isDark
                    ? 'rgba(255, 255, 255, 0.8)'
                    : 'rgba(20, 20, 20, 0.75)',
                  marginBottom: 4,
                  lineHeight: 1.4,
                }}
              >
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {project.role && (
        <div
          style={{
            marginTop: 16,
            padding: '10px 12px',
            backgroundColor: isDark
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.04)',
            border: isDark
              ? '1px solid rgba(255, 255, 255, 0.2)'
              : '1px solid rgba(0, 0, 0, 0.08)',
            borderRadius: 6,
            fontSize: 'clamp(13px,1.5vw,15px)',
            color: isDark
              ? 'rgba(255, 255, 255, 0.9)'
              : 'rgba(20, 20, 20, 0.85)',
            textAlign: 'center',
            fontWeight: 'bold',
            letterSpacing: '0.5px',
          }}
        >
          {project.role}
          {project.timeframe ? ` | ${project.timeframe}` : ''}
        </div>
      )}
    </div>
  );
}