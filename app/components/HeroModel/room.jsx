import React, { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'



export function Room(props) {
  const { nodes, materials } = useGLTF('models/optimized-room.glb')
  const { resolvedTheme } = require('next-themes').useTheme();
  const THREE = require('three');

  // Memoize a transparent version of the phong1 material for the window
  const transparentPhong = useMemo(() => {
    if (!materials.phong1) return undefined;
    const mat = materials.phong1.clone();
    mat.transparent = true;
    mat.opacity = 0.25;
    mat.depthWrite = false;
    return mat;
  }, [materials.phong1]);

  // --- DAYLIGHT COLOR ENHANCEMENT ---
  if (resolvedTheme === 'light') {
    // Wood (table, cabin, etc.)
    if (materials.blinn1) {
      materials.blinn1.color = new THREE.Color('#e6cfa7'); // light warm wood
      materials.blinn1.roughness = 0.45;
      materials.blinn1.metalness = 0.08;
      materials.blinn1.specular = new THREE.Color('#fffbe6');
      materials.blinn1.shininess = 60;
    }
    // Metal (radiator, handles, railing)
    if (materials.lambert1) {
      materials.lambert1.color = new THREE.Color('#e0e0e0');
      materials.lambert1.roughness = 0.25;
      materials.lambert1.metalness = 0.7;
    }
    // Plastic (keyboard, mouse, stylus, tablet)
    if (materials.blinn1) {
      // Already set above, but can tweak for plastic parts if needed
    }
    // Fabric (pillows)
    if (nodes.pillows_blinn1_0 && materials.blinn1) {
      materials.blinn1.color = new THREE.Color('#f5e6d6');
    }
    // Monitor screens (emissive)
    if (materials.blinn1 && nodes.monitor2_blinn1_0 && nodes.monitor3_blinn1_0) {
      materials.blinn1.emissive = new THREE.Color('#b3e6ff');
      materials.blinn1.emissiveIntensity = 1.2;
    }
    // Red buttons/vacuum
    if (nodes.red_bttns_blinn1_0 && materials.blinn1) {
      materials.blinn1.color = new THREE.Color('#ffb3b3');
    }
    // Window frame
    if (nodes.window_blinn1_0 && materials.blinn1) {
      materials.blinn1.color = new THREE.Color('#e6e6e6');
    }

    // Sunlight streaming in from the window: make the window mesh emit warm light
    if (nodes.window4_phong1_0 && materials.phong1) {
      materials.phong1.emissive = new THREE.Color('#fffbe6');
      materials.phong1.emissiveIntensity = 2.5;
      materials.phong1.color = new THREE.Color('#fffbe6');
      materials.phong1.opacity = 0.55;
      materials.phong1.transparent = true;
    }
  } else {
    // NIGHT: Optionally, restore or darken colors for night mode if needed
    if (materials.blinn1) {
      materials.blinn1.color = new THREE.Color('#b8b8b8');
      materials.blinn1.roughness = 0.6;
      materials.blinn1.metalness = 0.05;
      materials.blinn1.specular = new THREE.Color('#cccccc');
      materials.blinn1.shininess = 30;
      materials.blinn1.emissive = new THREE.Color('#000000');
      materials.blinn1.emissiveIntensity = 0.1;
    }
    if (materials.lambert1) {
      materials.lambert1.color = new THREE.Color('#b0b0b0');
      materials.lambert1.roughness = 0.4;
      materials.lambert1.metalness = 0.5;
    }
  }

  return (
    <group {...props} dispose={null}>
      {/* Wood/Plastic/Metal objects (all use blinn1 or lambert1, but colors are set above) */}
      <mesh geometry={nodes._________6_blinn1_0.geometry} material={materials.blinn1} />
      <mesh geometry={nodes.body1_blinn1_0.geometry} material={materials.blinn1} />
      <mesh geometry={nodes.cabin_blinn1_0.geometry} material={materials.blinn1} />
      <mesh geometry={nodes.chair_body_blinn1_0.geometry} material={materials.blinn1} />
      <mesh geometry={nodes.comp_blinn1_0.geometry} material={materials.blinn1} />
      <mesh geometry={nodes.emis_lambert1_0.geometry} material={materials.lambert1} />
      <mesh geometry={nodes.handls_blinn1_0.geometry} material={materials.blinn1} />
      <mesh geometry={nodes.keyboard_blinn1_0.geometry} material={materials.blinn1} />
      <mesh geometry={nodes.kovrik_blinn1_0.geometry} material={materials.blinn1} />
      <mesh geometry={nodes.lamp_bl_blinn1_0.geometry} material={materials.blinn1} />
      <mesh geometry={nodes.lamp_white_blinn1_0.geometry} material={materials.blinn1} />
      <mesh geometry={nodes.miuse_blinn1_0.geometry} material={materials.blinn1} />
      <mesh geometry={nodes.monitor2_blinn1_0.geometry} material={materials.blinn1} />
      <mesh geometry={nodes.monitor3_blinn1_0.geometry} material={materials.blinn1} />
      <mesh geometry={nodes.pCylinder5_blinn1_0.geometry} material={materials.blinn1} />
      <mesh geometry={nodes.pillows_blinn1_0.geometry} material={materials.blinn1} />
      <mesh geometry={nodes.polySurface53_blinn1_0.geometry} material={materials.blinn1} />
      <mesh geometry={nodes.radiator_blinn1_0.geometry} material={materials.blinn1} />
      <mesh geometry={nodes.radiator_blinn1_0001.geometry} material={materials.blinn1} />
      <mesh geometry={nodes.railing_blinn1_0.geometry} material={materials.blinn1} />
      <mesh geometry={nodes.red_bttns_blinn1_0.geometry} material={materials.blinn1} />
      <mesh geometry={nodes.red_vac_blinn1_0.geometry} material={materials.blinn1} />
      <mesh geometry={nodes.stylus_blinn1_0.geometry} material={materials.blinn1} />
      <mesh geometry={nodes.table_blinn1_0.geometry} material={materials.blinn1} />
      <mesh geometry={nodes.tablet_blinn1_0.geometry} material={materials.blinn1} />
      <mesh geometry={nodes.triangle_blinn1_0.geometry} material={materials.blinn1} />
      <mesh geometry={nodes.vac_black_blinn1_0.geometry} material={materials.blinn1} />
      <mesh geometry={nodes.vacuum1_blinn1_0.geometry} material={materials.blinn1} />
      <mesh geometry={nodes.vacuumgrey_blinn1_0.geometry} material={materials.blinn1} />
      <mesh geometry={nodes.vires_blinn1_0.geometry} material={materials.blinn1} />
      <mesh geometry={nodes.window_blinn1_0.geometry} material={materials.blinn1} />
      {/* Sunlight streaming in: window mesh emits light in daylight */}
      <mesh geometry={nodes.window4_phong1_0.geometry} material={materials.phong1} />
    </group>
  )
}

useGLTF.preload('models/optimized-room.glb')
