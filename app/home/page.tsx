'use client';
import { Canvas } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import { ScrollControls, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { FormalScottModel } from '../components/ScottModel/Formal-scott.jsx';
import { Lights } from './Lights.jsx';
import Texts from './text/page';
import Showcase from './showcase/page';
import ImpactSection from './impactsection/page';


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
    useFrame((state: { camera: THREE.PerspectiveCamera }) => {
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

export default function Home() {
    // const { theme } = useTheme();
    // const isDark = theme === 'dark';
    return (
        <div
            className="min-h-screen pt-16 smooth-scroll w-screen overflow-x-hidden bg-[var(--background)]"
        >
            <div
                className="text-[var(--foreground)] h-screen relative w-screen overflow-x-hidden"
            >
                <h1
                    className="font-bold mt-1 mb-0 text-center text-[2.2rem] md:text-[4.5rem] md:text-center md:ml-0 md:mr-0 ml-2 mr-0 text-[var(--foreground)]"
                >
                    Welcome to the Scott&apos;s portfolio
                </h1>
                <p
                    className="mt-1 mb-0 text-center text-[1rem] md:text-[1.5rem] md:text-center md:ml-0 md:mr-0 ml-2 mr-0 text-[var(--foreground)]"
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
                        <FormalScottModel
                            rotation={[0, -Math.PI / 2, 0]}
                            position={[0, 0.25, 0]}
                        />
                    </ScrollControls>
                </Canvas>
                <Texts />
                <Showcase />
                <ImpactSection />
            </div>
        </div>
    );
}