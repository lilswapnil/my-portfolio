"use client";

import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import { ProductLifecycleLabels } from "./components/ProductLifecycleLabels";
import { ProductLifecycleScene } from "./components/ProductLifecycleScene";


export default function ProductLifecyclePipelineScroll() {
  const stageRef = useRef(0);

  return (
    <section style={{ width: "100%", overflowX: "hidden" }}>
      {/* 2–3 screens of scroll */}
      <div style={{ height: "260vh", position: "relative" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh" }}>
          <Canvas
            camera={{ position: [0, 0.35, 2.4], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
          >
            <ScrollControls pages={3} damping={0.12}>
              <ProductLifecycleScene stageRef={stageRef} />
            </ScrollControls>
          </Canvas>

          {/* Labels overlay */}
          <ProductLifecycleLabels stageRef={stageRef} />
        </div>
      </div>
    </section>
  );
}
