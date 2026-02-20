"use client";
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import skillSet from '../../../data/skillset';

const marqueeAnimation = {
  animation: 'marquee 40s linear infinite',
};

export default function Skills() {
  const allSkills = [
    ...skillSet['Languages & Databases'],
    ...skillSet['Frameworks & Libraries']
  ];
  // Duplicate skills for seamless loop
  const marqueeSkills = [...allSkills, ...allSkills];
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <div style={{ width: '100vw', overflow: 'hidden', position: 'relative' }}>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div
        className={`glass-container ${isDark ? 'dark' : ''}`}
        style={{
          width: '100%',
          overflow: 'hidden',
          border: 'none', // Remove border if we want full width seamless, or keep if user wants boxy look. 
          // Navbar has rounded-4xl. 
          // Allowing glass-container to do its thing for background/backdrop.
          // Navbar shadow:
          boxShadow: `0 -8px 24px 0 rgba(0,0,0,0.10), -8px 0 24px 0 rgba(0,0,0,0.10), 8px 0 24px 0 rgba(0,0,0,0.10), 0 0 0 2px rgba(0,0,0,0.04)`,
          borderRadius: 0, // Full width strip usually doesn't have rounded corners
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '4rem',
            maxHeight: '70px',
            whiteSpace: 'nowrap',
            ...marqueeAnimation,
            width: '200%',
          }}
        >
          {marqueeSkills.map(({ name, icon: Icon, bgColor }, idx) => {
            // Extract color from "bg-[#xxxxxx]" format or default to white
            const color = bgColor?.match(/\[(.*?)\]/)?.[1] || '#fff';

            return (
              <div
                key={name + '-' + idx}
                title={name}
                style={{
                  // filter: 'grayscale(1)', // Removed to keep original colors
                  // opacity: 0.7,          // Removed to keep original colors
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // width: 120, // Let width adjust to content
                  padding: '0 20px', // Add some padding
                  height: 120,
                  borderRadius: '24px',
                  gap: '1rem', // Space between icon and text
                }}
              >
                <Icon size={40} color={color} style={{ zIndex: 1 }} />
                <span style={{
                  color: isDark ? '#FFFFFF' : '#1A1A1A',
                  fontSize: '1rem',
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  textShadow: isDark ? '2px 2px 4px #000000, 4px 4px 8px rgba(10, 10, 10, 0.5)' : 'none'
                }}>
                  {name}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}