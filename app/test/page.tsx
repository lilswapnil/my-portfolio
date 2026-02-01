"use client";

import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, useScroll } from "@react-three/drei";
import Lights from './Lights.jsx';



import Model from "../../public/test/scott-formal.jsx";
import * as THREE from "three";


import { useFrame } from "@react-three/fiber";
// Camera animation driven by scroll (copied from homepage, fixed for hooks)
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

export default function Test() {
    return (
        <div className="min-h-screen pt-16 smooth-scroll w-screen overflow-x-hidden bg-[var(--background)]">
            <div className="text-[var(--foreground)] h-screen relative w-screen overflow-x-hidden">
                <Canvas
                    camera={{ position: [0, 0.2, 1.0], fov: 50 }}
                    style={{ background: 'transparent', overflowX: 'hidden' }}
                    gl={{ preserveDrawingBuffer: true, alpha: true }}
                >
                    <Lights /> 
                    {/* Key light (main) */}
                    <directionalLight
                        position={[2, 4, 2]}
                        intensity={0.8}
                        color={"#fff8e7"}
                        castShadow
                    />
                    {/* Fill light (softens shadows) */}
                    <directionalLight
                        position={[-3, 2, 1]}
                        intensity={0.3}
                        color={"#b0c4de"}
                    />
                    {/* Rim light (adds edge highlight) */}
                    <directionalLight
                        position={[0, 2, -3]}
                        intensity={0.5}
                        color={"#cbe5ff"}
                    />
                    {/* Subtle ambient light for base illumination */}
                    <ambientLight intensity={0.15} />
                    <ScrollControls pages={3} damping={0.6}>
                        <ScrollCameraRig />
                        <Model
                            rotation={[0, -Math.PI / 2, 0]}
                            position={[0, 0.25, 0]}
                            scale={[0.4, 0.4, 0.4]}
                        />
                    </ScrollControls>
                </Canvas>
            </div>
        </div>
    );
}
