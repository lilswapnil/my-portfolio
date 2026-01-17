// This client component will initialize Lenis for smooth scrolling globally
"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function LenisProvider() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6, // slow and smooth
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5,
      wheelMultiplier: 1.2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
