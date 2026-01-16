'use client';

import { Canvas } from "@react-three/fiber";
import { ScrollControls, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { FormalScottModel } from "../components/ScottModel/Formal-scott.jsx";
import { Lights } from './Lights.jsx';
import Texts from "./Texts";
import Showcase from "./Showcase";
    // Camera animation driven by scroll
    function ScrollCameraRig() {
        const scroll = useScroll();

        // Start / end camera values
        const startPos = new THREE.Vector3(0, 0.2, 0.9);
        const endPos = new THREE.Vector3(0, 1.2, 0.75);

        // Optional: subtle tilt for cinematic feel
        const startRotX = 0.0;
        const endRotX = -0.12;

        // Animate camera on scroll
        useFrame((state: any) => {
            const t = scroll.offset;
            state.camera.position.lerpVectors(startPos, endPos, t);
            state.camera.rotation.x = THREE.MathUtils.lerp(startRotX, endRotX, t);
            state.camera.lookAt(0, 0.35, 0);
            state.camera.updateProjectionMatrix();
        });
        return null;
    }

export default function Home() {
    return (
        <>
                        <div style={{ color: "white", height: "100vh", position: "relative" }}>
                                <style>{`
                                    @media (max-width: 900px) {
                                        .home-title { font-size: 2.2rem !important; text-align: left !important; margin-left: 0.5rem !important; margin-right: 0 !important; }
                                        .home-subtitle { font-size: 1rem !important; text-align: left !important; margin-left: 0.5rem !important; margin-right: 0 !important; }
                                    }
                                    @media (min-width: 901px) {
                                        .home-title { font-size: 4.5rem !important; text-align: center !important; }
                                        .home-subtitle { font-size: 1.5rem !important; text-align: center !important; }
                                    }
                                `}</style>
                                <h1 className="home-title" style={{ color: 'white', textAlign: 'center', margin: '84px 0 0 0', fontSize: '4.5rem', fontWeight: 700 }}>
                                        Welcome to the Scott's portfolio
                                </h1>
                                <p className="home-subtitle" style={{ textAlign: 'center', color: 'white', margin: '6px 0 0 0', fontSize: '1.5rem' }}>
                                        Solve complex problems. Ship reliable systems.
                                </p>
                <Canvas
                    camera={{ position: [0, 0.2, 1.0], fov: 50 }}
                    style={{ background: "transparent" }}
                    gl={{ preserveDrawingBuffer: true, alpha: true }}
                >
                    <Lights />
                    <ambientLight intensity={0.7} />
                    <directionalLight position={[5, 5, 5]} intensity={1} />
                    <ScrollControls pages={3} damping={0.2}>
                        <ScrollCameraRig />
                        <FormalScottModel rotation={[0, -Math.PI / 2, 0]} position={[0, 0.25, 0]} />
                    </ScrollControls>
                </Canvas>
                <Texts />
                 <Showcase /> 
            </div>
        </>
    );
}