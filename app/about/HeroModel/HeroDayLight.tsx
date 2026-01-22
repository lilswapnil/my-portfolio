

/**
 * HeroDayLight - A realistic daylight setup for the hero room scene.
 * - Simulates sunlight and window fill for a bright, homey look.
 * - Use in place of HeroLights for daytime scenes.
 */

import { useMemo } from "react";
import * as THREE from "three";

const HeroDayLight = () => {
  // Memoize the RectAreaLight so it is not recreated on every render
  const rectAreaLight = useMemo(() => {
    return new THREE.RectAreaLight("#ffe6b3", 3.5, 6, 3);
  }, []);

  return (
    <>
      {/* Sunlight streaming in from a window */}
      <directionalLight
        position={[6, 12, 8]}
        intensity={2.2}
        color="#fffbe6"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0005}
      />
      {/* Soft fill from the sky (blue tint) */}
      <hemisphereLight
        args={["#e0eaff", "#fffbe6", 0.7]}
        position={[0, 10, 0]}
      />
      {/* Window bounce/fill light (warm) */}
      <primitive
        object={rectAreaLight}
        position={[-3, 4, 2]}
        rotation={[-Math.PI / 6, Math.PI / 4, 0]}
      />
      {/* Subtle ambient for shadow lift */}
      <ambientLight intensity={0.18} color="#fffbe6" />
    </>
  );
};

export default HeroDayLight;
