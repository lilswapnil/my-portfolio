'use client';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import { ScrollControls, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Model as FormalScottModel } from '../components/ScottModelV2/Formal-scott.jsx';
import { Lights } from '../home/Lights.jsx';
import { ContactShadows } from '@react-three/drei';

// Camera animation driven by scroll
function ScrollCameraRig() {
    const scroll = useScroll();

    const startPos = new THREE.Vector3(0, 0.3, 0.72);
    const zoomPos = new THREE.Vector3(0, 0.3, 0.2);

    const startRotX = 0.0;
    const endRotX = -0.05;

    useFrame((state) => {
        // Use only the early part of scroll for the intro zoom-in move.
        const t = Math.min(scroll.offset * 4, 1);
        state.camera.position.lerp(
            startPos.clone().lerp(zoomPos, t),
            0.12
        );
        state.camera.rotation.x +=
            (THREE.MathUtils.lerp(startRotX, endRotX, t) - state.camera.rotation.x) *
            0.12;
        state.camera.lookAt(0, 0.35, 0);
        state.camera.updateProjectionMatrix();
    });
    return null;
}

function ScrollModelRig({ children }: { children: React.ReactNode }) {
    const scroll = useScroll();
    const modelGroupRef = React.useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!modelGroupRef.current) {
            return;
        }

        const t = Math.min(scroll.offset * 4, 1);
        const maxRightOffset = Math.min(state.viewport.width * 0.2, 0.55);
        modelGroupRef.current.position.x = THREE.MathUtils.lerp(0, maxRightOffset, t);
    });

    return <group ref={modelGroupRef}>{children}</group>;
}

function ScrollProgressUpdater({ progressRef }: { progressRef: React.RefObject<{ value: number }> }) {
    const scroll = useScroll();

    useFrame(() => {
        if (progressRef.current) {
            progressRef.current.value = scroll.offset;
        }
    });

    return null;
}

export default function Test() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const scrollProgressRef = React.useRef({ value: 0 });

    return (
        <div className="w-screen max-w-screen overflow-hidden">
            <Canvas
                shadows
                camera={{ position: [0, 0.25, 1.1], fov: 40 }}
                style={{ height: '100vh', width: '%' }}
            >
                <Lights />

                <ScrollControls pages={1.5} damping={0.18}>
                    <ScrollCameraRig />
                    <ScrollProgressUpdater progressRef={scrollProgressRef} />

                    <ScrollModelRig>
                        <FormalScottModel
                            rotation={[0, (4 * Math.PI), 0]}
                            position={[0, 0.1, 0]}
                            scale={0.35}
                        />
                    </ScrollModelRig>

                    <ContactShadows
                        position={[0, -0.3, 0]}
                        opacity={isDark ? 0.42 : 0.15}
                        scale={2.6}
                        blur={2.2}
                        far={1.8}
                        resolution={1024}
                        color="#656565"
                    />

                </ScrollControls>
            </Canvas>
        </div>
    );
}