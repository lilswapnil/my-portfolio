"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense, useRef, useEffect, useState } from "react";
import { FormalScottModel } from './Formal-scott';
import { Model as GraduationScottModel } from './Graduation-scott';
import { Model as CasualScottModel } from './Casual-scott';
import { Lights } from './Lights';

export default function ScottModel() {
    const [mounted, setMounted] = useState(false);
    const [currentAzimuth, setCurrentAzimuth] = useState(0);
    const [activeModel, setActiveModel] = useState('formal');
    const [animateIn, setAnimateIn] = useState(true);
    const orbitControlsRef = useRef<any>(null);
    const prevModelRef = useRef('formal');

    useEffect(() => {
        setMounted(true);
        if (orbitControlsRef.current) {
            orbitControlsRef.current.reset();
            orbitControlsRef.current.target.set(0, -1, 0);
        }
    }, []);

    if (!mounted) return null;

    const handleOrbitChange = () => {
        if (orbitControlsRef.current) {
            const azimuth = orbitControlsRef.current.getAzimuthalAngle();
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
                    details: "Full-Stack Developer | Multiple Companies"
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
                    ref={orbitControlsRef}
                    enablePan={false}
                    enableZoom={false}
                    autoRotate={true}
                    autoRotateSpeed={2}
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

                    <GlassSlab visible={!animateIn} azimuth={currentAzimuth} />

                    {currentAzimuth >= -Math.PI / 3 && currentAzimuth <= Math.PI / 3 && (
                        <FloatingModel>
                            <FormalScottModel scale={4.5} />
                        </FloatingModel>
                    )}
                    {currentAzimuth > Math.PI / 3 && currentAzimuth <= Math.PI && (
                        <FloatingModel>
                            <CasualScottModel scale={4.5} />
                        </FloatingModel>
                    )}
                    {currentAzimuth < -Math.PI / 3 && currentAzimuth >= -Math.PI && (
                        <FloatingModel>
                            <GraduationScottModel scale={5.0} />
                        </FloatingModel>
                    )}
                </Suspense>
            </Canvas>

            <div className={`character-info-panel ${animateIn ? 'animate-in' : 'animate-out'}`}>
                <h2 className="info-panel-title">{content.title}</h2>
                <div className="info-panel-divider"></div>
                <p className="info-panel-description">{content.description}</p>
                {content.details && (
                    <div className="info-panel-details">{content.details}</div>
                )}
            </div>
        </div>
    );
}

function FloatingModel({ children }: { children: React.ReactNode }) {
    return (
        <group position={[0, -1, 1]}>
            {children}
        </group>
    );
}

function GlassSlab({ visible, azimuth }: { visible: boolean, azimuth: number }) {
    const radius = 3.5;
    let switchAzimuth: number | null = null;

    if (azimuth > Math.PI / 3 && azimuth < Math.PI) {
        switchAzimuth = Math.PI / 3;
    } else if (azimuth < -Math.PI / 3 && azimuth > -Math.PI) {
        switchAzimuth = -Math.PI / 3;
    } else if (azimuth >= Math.PI) {
        switchAzimuth = Math.PI;
    } else if (azimuth <= -Math.PI) {
        switchAzimuth = -Math.PI;
    } else {
        return null;
    }

    const x = radius * Math.sin(switchAzimuth);
    const z = radius * Math.cos(switchAzimuth);
    const rotationY = switchAzimuth;

    return (
        <mesh
            position={[x, -1, z]}
            rotation={[0, rotationY, 0]}
            visible={visible}
            // @ts-ignore
            className={`glass-slab${visible ? '' : ' hide'}`}
        >
            {/* Set height to 5 to match model scale */}
            <planeGeometry args={[2.5, 5]} />
            <meshStandardMaterial
                color="#ffffff"
                transparent
                opacity={0.25}
                metalness={0.5}
                roughness={0.1}
            />
        </mesh>
    );
}