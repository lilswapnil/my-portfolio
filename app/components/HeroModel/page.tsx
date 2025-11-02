"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import HeroLights from "./HeroLights";
import { Suspense, useRef, useEffect, useState } from "react";
import { Room } from './room';

export default function HeroModel() {
    const [mounted, setMounted] = useState(false);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    
    useEffect(() => {
        setMounted(true);
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    if (!mounted) return null;
    
    const isMobile = windowSize.width <= 768;
    const isTablet = windowSize.width <= 1024;
    
    const cameraPosition: [number, number, number] = isMobile ? [0, 0, 20] : [0, 5, 15];
    const roomScale = isMobile ? 0.6 : isTablet ? 0.9 : 1.2;
    
    return(
        <Canvas camera={{ position: cameraPosition, fov: 45 }}>
            <ambientLight intensity={0.2} color="#1a1a40" />
            <OrbitControls
                enablePan={false}
                enableZoom={false}
                maxDistance={20}
                minDistance={5}
                minPolarAngle={Math.PI / 5}
                maxPolarAngle={Math.PI / 2}
            />
            <Suspense fallback={null}>
                <HeroLights />
                <FloatingGroup roomScale={roomScale} />
            </Suspense>
        </Canvas>
    );
}

function FloatingGroup({ roomScale }: { roomScale: number }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.position.y = -1.5 + Math.sin(clock.elapsedTime * 0.5) * 0.3;
        }
    });

    return (
        <group
            ref={groupRef}
            scale={roomScale}
            position={[0, -5.5, 0]}
            rotation={[0, -Math.PI / 4, 0]}
        >
            <Room />
        </group>
    );
}