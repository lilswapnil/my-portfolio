"use client";

import { useTheme } from "next-themes";
import React from "react";


export default function DarkModeToggle({ size = 16 }: { size?: number }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isDark = theme === "dark" || resolvedTheme === "dark";
  const [animating, setAnimating] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  // Set default theme based on local time on first mount
  React.useEffect(() => {
    // Only set if theme is not already set (prevents flicker/override)
    if (!theme || theme === "system") {
      const hour = new Date().getHours();
      // Night: 7pm–7am (19–7)
      if (hour >= 19 || hour < 7) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    }
  }, [theme, setTheme]);

  // Animation handler
  const handleToggle = () => {
    if (!buttonRef.current) {
      setTheme(isDark ? "light" : "dark");
      return;
    }
    setAnimating(true);
    // Get button position
    const rect = buttonRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Create circle overlay
    const circle = document.createElement("div");
    circle.style.position = "fixed";
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.style.transform = "translate(-50%, -50%)";
    circle.style.borderRadius = "50%";
    circle.style.pointerEvents = "none";
    circle.style.zIndex = "9999";
    circle.style.background = isDark ? "#fff" : "#0A0A0A";
    circle.style.width = "0px";
    circle.style.height = "0px";
    circle.style.transition = "width 0.7s cubic-bezier(0.4,0,0.2,1), height 0.7s cubic-bezier(0.4,0,0.2,1), opacity 0.3s";
    document.body.appendChild(circle);

    // Force reflow then animate
    requestAnimationFrame(() => {
      circle.style.width = "3000px";
      circle.style.height = "3000px";
      circle.style.opacity = "1";
    });

    // After animation, switch theme and remove circle
    setTimeout(() => {
      setTheme(isDark ? "light" : "dark");
      circle.style.opacity = "0";
      setTimeout(() => {
        document.body.removeChild(circle);
        setAnimating(false);
      }, 300);
    }, 700);
  };

  return (
    <button
      ref={buttonRef}
      aria-label="Toggle dark mode"
      className={`glass-button rounded-full flex items-center justify-center transition-colors duration-200 ${isDark ? "dark" : ""}`}
      style={{ width: 40, height: 40, minWidth: 40, minHeight: 40, padding: 0 }}
      onClick={animating ? undefined : handleToggle}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      disabled={animating}
    >
      {isDark ? (
        <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
          <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="12" y1="2" x2="12" y2="4" />
            <line x1="12" y1="20" x2="12" y2="22" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="2" y1="12" x2="4" y2="12" />
            <line x1="20" y1="12" x2="22" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </g>
        </svg>
      ) : (
        <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="black">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
          />
        </svg>
      )}
    </button>
  );
}
