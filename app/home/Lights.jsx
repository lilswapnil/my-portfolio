import React from "react";
import { Environment, Lightformer } from "@react-three/drei";

export function Lights() {
  return (
    <>
      {/* Soft base light so shadows aren't harsh */}
      <ambientLight intensity={0.5} />

      {/* Main key light (front-right) */}
      <directionalLight
        position={[0, 3, 5]}   // light in front
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Fill light from left to soften shadows */}
      <directionalLight
        position={[-3, 2, 4]}
        intensity={0.6}
      />

      {/* Soft studio environment */}
      <Environment resolution={256}>
        {/* overhead softbox */}
        <Lightformer
          intensity={1}
          rotation-x={Math.PI / 2}
          position={[0, 5, 2]}
          scale={[8, 8, 1]}
        />

        {/* front panel bounce */}
        <Lightformer
          intensity={0.8}
          position={[0, 1, 5]}
          scale={[6, 4, 1]}
        />
      </Environment>
    </>
  );
}