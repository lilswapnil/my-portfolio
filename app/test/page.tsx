"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, useScroll } from "@react-three/drei";
import * as THREE from "three";
import { FormalScottModel } from "../components/ScottModel/Formal-scott.jsx";

/** Camera animation driven by scroll */
function ScrollCameraRig() {
  const scroll = useScroll();

  // Start / end camera values (tweak these to taste)
  const startPos = new THREE.Vector3(0, 0.2, 0.7);
  const endPos = new THREE.Vector3(0, 1.2, 0.55);

  // Optional: subtle tilt for cinematic feel
  const startRotX = 0.0;
  const endRotX = -0.12;

  useFrame((state) => {
    const t = scroll.offset; // 0 -> 1 as you scroll through pages

    // Lerp camera position
    state.camera.position.lerpVectors(startPos, endPos, t);

    // Smooth tilt
    state.camera.rotation.x = THREE.MathUtils.lerp(startRotX, endRotX, t);

    // Keep framing the model (lookAt target slightly above origin)
    state.camera.lookAt(0, 0.35, 0);

    state.camera.updateProjectionMatrix();
  });

  return null;
}

export default function TestCasualScottPage() {
  return (
    <div style={{ background: "#111", color: "white" }}>
      {/* A tall scroll area to make the camera move feel like a movie shot */}
      <div style={{ height: "300vh", position: "relative" }}>
        {/* Sticky canvas so the 3D scene stays visible while you scroll */}
        <div style={{ position: "sticky", top: 0, height: "100vh" }}>
          <h1 style={{ position: "absolute", top: 24, width: "100%", textAlign: "center", zIndex: 2 }}>
           
          </h1>

          <Canvas camera={{ position: [0, 0.2, 0.7], fov: 50 }}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 5, 5]} intensity={1} />

            {/* ScrollControls creates the scroll progress (pages controls scroll length) */}
            <ScrollControls pages={3} damping={0.2}>
              <ScrollCameraRig />

                  <FormalScottModel
                    rotation={[0, -Math.PI / 2, 0]}
                    position={[0, 0.1, 0]}
              />
            </ScrollControls>
          </Canvas>
        </div>
      </div>

      {/* Some content after the 3D section so you can see the transition */}
      <div style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
        <h2>After the shot</h2>
        <p style={{ opacity: 0.8 }}>
          This section is normal page content. The camera move happens in the 300vh scroll scene above.
        </p>
      </div>
    </div>
  );
}
