
"use client";

import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { FormalScottModel } from './Formal-scott';
import { Model as GraduationScottModel } from './Graduation-scott';
import { Model as CasualScottModel } from './Casual-scott';
import { Lights } from './Lights';
import { useTheme } from 'next-themes';


function FloatingModel({ children }: { children: React.ReactNode }) {
    return (
        <group position={[0, -1, 1]}>
            {children}
        </group>
    );
}


export default function ScottModel() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Start at graduation model: azimuth -Math.PI
    const [currentAzimuth, setCurrentAzimuth] = useState(-Math.PI);
    const [activeModel, setActiveModel] = useState('graduation');
    const [animateIn, setAnimateIn] = useState(true);
    // Use ref for OrbitControls instance (unknown type to avoid 'any')
    const orbitControlsRef = useRef<unknown>(null);
    const prevModelRef = useRef('graduation');

    useEffect(() => {
        if (orbitControlsRef.current) {
            (orbitControlsRef.current as { reset?: () => void; target?: { set: (x: number, y: number, z: number) => void } }).reset?.();
            (orbitControlsRef.current as { reset?: () => void; target?: { set: (x: number, y: number, z: number) => void } }).target?.set(0, -1, 0);
        }
    }, [mounted]); // Only run when mounted

    if (!mounted) return null;

    const isDark = theme === 'dark';

    const handleOrbitChange = () => {
        if (orbitControlsRef.current) {
            const azimuth = (orbitControlsRef.current as { getAzimuthalAngle?: () => number }).getAzimuthalAngle?.();
            if (typeof azimuth === 'number') {
                setCurrentAzimuth(azimuth);

                let model = 'formal';
                if (azimuth > Math.PI / 3 && azimuth <= Math.PI) {
                    model = 'casual';
                } else if (azimuth < -Math.PI / 3 && azimuth >= -Math.PI) {
                    model = 'graduation';
                }

                if (model !== prevModelRef.current) {
                    setAnimateIn(false);
                    setTimeout(() => {
                        setActiveModel(model);
                        setAnimateIn(true);
                    }, 300);
                    prevModelRef.current = model;
                } else {
                    setActiveModel(model);
                }
            }
        }
    };

    const getContainerContent = () => {
        switch (activeModel) {
            case 'graduation':
                return {
                    title: "Master's Education",
                    description: "Advanced studies in Computer Science with focus on Software Engineering and Distributed Systems.",
                    details: "Graduate Degree | 2 Years"
                };
            case 'casual':
                return {
                    title: "Open Source Contributions",
                    description: "Active contributor to multiple open-source projects, improving code quality and adding new features.",
                    details: "20+ Contributions | GitHub"
                };
            case 'formal':
                return {
                    title: "3+ Years Experience",
                    description: "Professional experience in software engineering, web scraping, backend development, and DevOps.",
                    details: "Full-Stack Developer | 4 Work Experiences"
                };
            default:
                return {
                    title: "Portfolio",
                    description: "Select a model to view details",
                    details: ""
                };
        }
    };

    const content = getContainerContent();

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <Canvas
                camera={{ position: [0, 1, 8], fov: 30 }}
                style={{ height: '100vh', width: '100%', cursor: 'pointer' }}
            >
                <Lights />
                <OrbitControls
                    ref={(instance) => {
                        orbitControlsRef.current = instance;
                    }}
                    enablePan={false}
                    enableZoom={false}
                    autoRotate={true}
                    autoRotateSpeed={4}
                    maxDistance={20}
                    minDistance={3}
                    minPolarAngle={Math.PI / 2}
                    maxPolarAngle={Math.PI / 2}
                    minAzimuthAngle={-Infinity}
                    maxAzimuthAngle={Infinity}
                    onChange={handleOrbitChange}
                />
                <Suspense fallback={null}>
                    <mesh position={[0, 0, 8]}>
                        <planeGeometry args={[6, 6]} />
                        <meshStandardMaterial
                            color="#ffffff"
                            metalness={0.3}
                            roughness={0.1}
                            transparent
                            opacity={0}
                        />
                    </mesh>

                    {currentAzimuth >= -Math.PI / 3 && currentAzimuth <= Math.PI / 3 && (
                        <FloatingModel>
                            <FormalScottModel scale={4.9} />
                        </FloatingModel>
                    )}
                    {currentAzimuth > Math.PI / 3 && currentAzimuth <= Math.PI && (
                        <group position={[0, -0.75, 1]}>
                            <CasualScottModel scale={4.5} />
                        </group>
                    )}
                    {currentAzimuth < -Math.PI / 3 && currentAzimuth >= -Math.PI && (
                        <FloatingModel>
                            <GraduationScottModel scale={5.0} />
                        </FloatingModel>
                    )}
                </Suspense>
            </Canvas>

            {/* About Me Title Section - moved from about/page.tsx */}
            <div style={{ position: 'absolute', top: '2.5rem', left: 0, width: '100%', zIndex: 10 }}>
                <div className="max-w-7xl mx-auto px-4">
                    <div className="mb-2">
                        <h1 className={`text-5xl md:text-6xl font-bold mb-3 ${isDark ? 'text-primary' : 'text-gray-900'}`}>About Me</h1>
                        <p className={`text-lg ${isDark ? 'text-secondary' : 'text-gray-700'}`}>Learn more about my background, and journey</p>
                    </div>
                </div>
            </div>

            <div
                className={`glass-container character-info-panel top-48 sm:top-64 md:top-80 ${animateIn ? 'animate-in' : 'animate-out'} ${isDark ? 'dark' : ''}`}
                style={{
                    position: 'absolute',
                    top: '350px',
                }}
            >
                <h2
                    className="info-panel-title"
                    style={{
                        color: 'rgb(255, 255, 255)',
                        textShadow: '1px 1px 4px rgba(0,0,0,0.3), 1px 1px 8px rgba(0,0,0,0.5)'
                    }}
                >
                    {content.title}
                </h2>
                <div className="info-panel-divider"></div>
                <p
                    className="info-panel-description"
                    style={{
                        color: 'rgb(255, 255, 255)',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.3), 1px 1px 2px rgba(0,0,0,0.5)'
                    }}
                >
                    {content.description}
                </p>
                {content.details && (
                    <div
                        className="info-panel-details"
                        style={{
                            color: 'rgb(255, 255, 255)',
                            textShadow: '0 1px 2px rgba(0,0,0,0.3), 1px 1px 2px rgba(0,0,0,0.5)'
                        }}
                    >
                        {content.details}
                    </div>
                )}
            </div>
        </div>
    );
}

