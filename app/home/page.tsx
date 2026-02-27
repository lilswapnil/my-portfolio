'use client';
import React from 'react';
import { Analytics } from "@vercel/analytics/next";
import { Canvas } from '@react-three/fiber';
// import { useTheme } from 'next-themes';
import { ScrollControls, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { FormalScottModel } from '../components/ScottModel/Formal-scott.jsx';
import { Lights } from './Lights.jsx';
import Texts from './text/page';
import Showcase from './showcase/page';
import ImpactSection from './impactsection/page';
import ProjectPanel from '../components/ProjectPanel';
import workexperience from '@/data/workexperience';
import dynamic from 'next/dynamic';

const ShowcaseIpad = dynamic(() => import('./showcase-sm/page'), { ssr: false });

// Camera animation driven by scroll
function ScrollCameraRig() {
    const scroll = useScroll();

    // Start / end camera values
    const startPos = new THREE.Vector3(0, 0.2, 0.9);
    const endPos = new THREE.Vector3(0, 1.2, 0.75);

    // Optional: subtle tilt for cinematic feel
    const startRotX = 0.0;
    const endRotX = -0.12;

    // Animate camera on scroll with smooth lerp
    useFrame((state) => {
        const t = scroll.offset;
        // Smoothly interpolate camera position
        state.camera.position.lerp(
            startPos.clone().lerp(endPos, t),
            0.12 // smoothing factor
        );
        // Smoothly interpolate camera rotation
        state.camera.rotation.x +=
            (THREE.MathUtils.lerp(startRotX, endRotX, t) - state.camera.rotation.x) *
            0.12;
        state.camera.lookAt(0, 0.35, 0);
        state.camera.updateProjectionMatrix();
    });
    return null;
}

// Component to track scroll progress via ref (avoids React re-renders)
function ScrollProgressUpdater({ progressRef }: { progressRef: React.RefObject<{ value: number }> }) {
    const scroll = useScroll();

    useFrame(() => {
        if (progressRef.current) {
            progressRef.current.value = scroll.offset;
        }
    });

    return null;
}

export default function Home() {
    // const { theme } = useTheme();
    // const isDark = theme === 'dark';
    const scrollProgressRef = React.useRef({ value: 0 });

    return (
        <>
            <div className="min-h-screen pt-16 smooth-scroll w-screen overflow-x-hidden bg-[var(--background)]">
                <div className="text-[var(--foreground)] h-screen relative w-screen overflow-x-hidden">
                    <h1
                        className="font-bold mt-6 mb-0 text-center text-5xl sm:text-6xl mx-3 font-px-4 text-left md:text-[4.5rem] md:text-center md:ml-0 md:mr-0 mr-0 text-[var(--foreground)]"
                        style={{
                            textShadow: '0 8px 24px rgba(0,0,0,0.18)'
                        }}
                    >
                        Welcome to Scott&apos;s portfolio
                    </h1>
                    <p
                        className="mt-1 mb-0 text-center text-[1rem] md:text-[1.5rem] md:text-center md:ml-0 md:mr-0 ml-2 mr-0 text-[var(--foreground)]"
                        style={{
                            textShadow: '0 4px 12px rgba(0,0,0,0.15)'
                        }}
                    >
                        Solve complex problems. Ship reliable systems.
                    </p>
                    <Canvas
                        camera={{ position: [0, 0.2, 1.0], fov: 50 }}
                        style={{ background: 'transparent', overflowX: 'hidden' }}
                        gl={{ preserveDrawingBuffer: true, alpha: true }}
                    >
                        <Lights />
                        <ambientLight intensity={0.7} />
                        <directionalLight position={[5, 5, 5]} intensity={1} />
                        <ScrollControls pages={3} damping={0.6}>
                            <ScrollCameraRig />
                            <ScrollProgressUpdater progressRef={scrollProgressRef} />
                            <FormalScottModel
                                rotation={[0, -Math.PI / 2, 0]}
                                position={[0, 0.25, 0]}
                            />
                        </ScrollControls>
                    </Canvas>

                    {/* Work Experience Panels - must be outside Canvas as DOM overlays */}
                    {workexperience.length >= 1 && (
                        <ProjectPanel
                            project={workexperience[0]}
                            position="top-left"
                            scrollProgressRef={scrollProgressRef}
                        />
                    )}
                    {workexperience.length >= 2 && (
                        <ProjectPanel
                            project={workexperience[1]}
                            position="bottom-right"
                            scrollProgressRef={scrollProgressRef}
                        />
                    )}

                    <Texts />
                    {/* ShowcaseIpad: phones & tablets (< 1024px). Showcase: desktop/laptop (>= 1024px) */}
                    <div className="block lg:hidden">
                        <ShowcaseIpad />
                    </div>
                    <div className="hidden lg:block">
                        <Showcase />
                    </div>
                    <ImpactSection />
                </div>
            </div>
            <Analytics />
        </>
    );
}