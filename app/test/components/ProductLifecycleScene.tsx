import React, { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useScroll, Text } from "@react-three/drei";

// Helper functions
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
function getActiveStage(t: number) {
  if (t < 0.18) return 0; // Ideate
  if (t < 0.36) return 1; // Design
  if (t < 0.52) return 2; // Build
  if (t < 0.7) return 3; // Test
  if (t < 0.86) return 4; // Deploy
  return 5; // Iterate
}


export function ProductLifecycleScene({ stageRef }: { stageRef: React.MutableRefObject<number> }) {
  // Track x-axis spin for Test stage
  const [testSpin, setTestSpin] = useState(0);
  const scroll = useScroll();
  const rig = useRef<THREE.Group>(null);
  const productRef = useRef<THREE.Group>(null);

  const shellRef = useRef<THREE.Mesh>(null);
  const cubeEdgesRef = useRef<THREE.LineSegments>(null);
  const cubeDiagonalsRef = useRef<THREE.LineSegments>(null);
  const cubeCornersRef = useRef<THREE.LineSegments>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Flight path (CodePen-like)
  const curve = useMemo(() => {
    const pts = [
      new THREE.Vector3(-3.0, 0.25, 2.3), // Ideate
      new THREE.Vector3(-1.8, 0.7, 1.2), // Design
      new THREE.Vector3(-0.4, 0.15, 0.2), // Build
      new THREE.Vector3(1.0, 0.6, -1.0), // Test
      new THREE.Vector3(2.4, 0.25, -2.1), // Deploy
      new THREE.Vector3(3.3, 0.35, -3.2), // Iterate
    ];
    return new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.62);
  }, []);

  const stages = useMemo(
    () => [
      { t: 0.06, name: "Plan" },
      { t: 0.24, name: "Design" },
      { t: 0.44, name: "Build" },
      { t: 0.62, name: "Test" },
      { t: 0.8, name: "Deploy" },
    ],
    []
  );

  // Materials
  // Gray wireframe material for pipeline
  const tubeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        wireframe: true,
        transparent: false,
        opacity: 1,
        roughness: 0.45,
      }),
    []
  );

  // State for animated tube radius
  const [tubeRadius, setTubeRadius] = useState(0.32);

  // Shell material (black mesh)
  const [shellWireframe, setShellWireframe] = useState(true);
  const [shellColor, setShellColor] = useState("#0b1220");
  const shellMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: shellColor,
        metalness: 0.35,
        roughness: 0.35,
        wireframe: shellWireframe,
      }),
    [shellWireframe, shellColor]
  );

  const coreMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#60a5fa",
        emissive: "#60a5fa",
        emissiveIntensity: 0.35,
        transparent: true,
        opacity: 0.55,
        roughness: 0.25,
      }),
    []
  );

  const screenMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#111827",
        emissive: "#0ea5e9",
        emissiveIntensity: 0,
        transparent: true,
        opacity: 0,
        roughness: 0.2,
        metalness: 0.05,
      }),
    []
  );

  const ringMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#a855f7",
        emissive: "#7c3aed",
        emissiveIntensity: 0,
        transparent: true,
        opacity: 0,
        roughness: 0.25,
      }),
    []
  );

  const tangent = useMemo(() => new THREE.Vector3(), []);
  const camOffset = useMemo(() => new THREE.Vector3(0, 0.35, 1.25), []);

  // Reuse one quaternion to avoid allocating each frame
  const tmpQ = useMemo(() => new THREE.Quaternion(), []);

  // Tag mesh ref for deploy
  const tagRef = useRef<THREE.Mesh>(null);

  // Get scroll offset and stage morphs for use in JSX
  const t = scroll.offset;
  const s1 = easeOutCubic(smoothstep(0.0, 0.18, t));
  // const s2 = easeOutCubic(smoothstep(0.18, 0.36, t));
  const s3 = easeOutCubic(smoothstep(0.36, 0.52, t));
  // const s4 = easeOutCubic(smoothstep(0.52, 0.7, t));
  // const s5 = easeOutCubic(smoothstep(0.7, 0.86, t));
  // Remove s6 (Iterate) logic

  useFrame((state, delta) => {
    const t = scroll.offset; // 0..1
    const tt = clamp01(t);

    // Update stage label
    stageRef.current = getActiveStage(t);

    /* Camera flight */
    const camPos = curve.getPointAt(tt);
    const camTan = curve.getTangentAt(tt, tangent).normalize();

    const desiredCam = camPos
      .clone()
      .add(camOffset)
      .add(camTan.clone().multiplyScalar(-0.95));

    state.camera.position.lerp(desiredCam, 0.08);
    state.camera.lookAt(curve.getPointAt(clamp01(tt + 0.02)));

    // Cinematic sway
    if (rig.current) {
      rig.current.rotation.y = THREE.MathUtils.lerp(
        rig.current.rotation.y,
        (t - 0.5) * 0.12,
        0.06
      );
      rig.current.rotation.x = THREE.MathUtils.lerp(
        rig.current.rotation.x,
        -0.08 + t * 0.05,
        0.06
      );
    }

    /* Product follows curve, but leads scroll (moves ahead) */
    if (productRef.current) {
      // Move the box slightly ahead of the scroll position
      const leadT = clamp01(tt + 0.08);
      const p = curve.getPointAt(leadT);
      const tan = curve.getTangentAt(leadT).normalize();

      productRef.current.position.lerp(p, 0.18);

      tmpQ.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tan);
      productRef.current.quaternion.slerp(tmpQ, 0.15);

      productRef.current.rotation.z += delta * 0.18;
    }

    /* Lifecycle morphing */
    const s1 = easeOutCubic(smoothstep(0.0, 0.18, t));
    const s2 = easeOutCubic(smoothstep(0.18, 0.36, t));
    const s3 = easeOutCubic(smoothstep(0.36, 0.52, t));
    const s4 = easeOutCubic(smoothstep(0.52, 0.7, t));
    const s5 = easeOutCubic(smoothstep(0.7, 0.86, t));
    const s6 = easeOutCubic(smoothstep(0.86, 1.0, t));

    // Animate tube radius to match product scale (from 0.32 to 0.55+0.55=1.1)
    const targetRadius = 0.18 + 0.55 * s1 + 0.25 * s2 + 0.15 * s3 + 0.1 * s4 + 0.05 * s5 + 0.05 * s6;
    setTubeRadius((r) => r + (targetRadius - r) * 0.12);

    // Overall “maturity” scale
    if (productRef.current) {
      const overall = 0.55 + 0.55 * s1;
      productRef.current.scale.setScalar(overall);
    }

    // Animate shell (black mesh) through stages
    // Plan: outline only (edges)
    // Design: add diagonal outlines
    // Build: full color, no outlines
    // Test: fast spin
    // Deploy: tag appears
    // Iterate: slow revolve
    // Thicken corner outlines at Design stage
    if (cubeCornersRef.current) {
      // s2 is Design stage
      const thick = s2 > 0.01 && s2 < 0.99;
      const mat = cubeCornersRef.current.material as THREE.LineBasicMaterial;
      if (mat) mat.linewidth = thick ? 6 : 2;
    }
    // Show edges at Deploy stage (s5)
    if (cubeEdgesRef.current) {
      const mat = cubeEdgesRef.current.material as THREE.LineBasicMaterial;
      if (s2 > 0.01 && s2 < 0.99) {
        if (mat) {
          mat.linewidth = 9;
          mat.color.set("#8B5C2A"); // brown
        }
        cubeEdgesRef.current.visible = true;
      } else if (s3 > 0.01) {
        if (mat) {
          mat.linewidth = 9;
          mat.color.set("#8B5C2A"); // brown
        }
        cubeEdgesRef.current.visible = true;
      } else if (s5 > 0.01 && s5 < 0.99) {
        // Deploy stage: show edges in black and thick
        if (mat) {
          mat.linewidth = 9;
          mat.color.set("#000");
        }
        cubeEdgesRef.current.visible = true;
      } else {
        if (mat) mat.linewidth = 2;
        mat.color.set("#8B5C2A"); // brown
        cubeEdgesRef.current.visible = false;
      }
    }
    if (shellRef.current) {
      // Plan: only edges (no mesh, no diagonals, no corners)
      if (s1 < 0.99) {
        if (shellRef.current) shellRef.current.visible = false;
        if (cubeEdgesRef.current) cubeEdgesRef.current.visible = true;
        if (cubeDiagonalsRef.current) cubeDiagonalsRef.current.visible = false;
        if (cubeCornersRef.current) cubeCornersRef.current.visible = false;
      } else if (s2 > 0.01 && s2 < 0.99) {
        // Design stage: show edges in black and thick, mesh transparent, corners hidden, diagonals hidden
        if (shellRef.current) shellRef.current.visible = true;
        setShellWireframe(false);
        setShellColor("#00000000"); // transparent
        if (cubeEdgesRef.current) cubeEdgesRef.current.visible = true;
        if (cubeDiagonalsRef.current) cubeDiagonalsRef.current.visible = false;
        if (cubeCornersRef.current) cubeCornersRef.current.visible = false;
      } else if (s3 < 0.99) {
        // After Design: diagonals visible (black and thick), mesh is transparent, corners hidden
        if (shellRef.current) shellRef.current.visible = true;
        setShellWireframe(false);
        setShellColor("#00000000"); // transparent
        if (cubeEdgesRef.current) cubeEdgesRef.current.visible = false;
        if (cubeDiagonalsRef.current) cubeDiagonalsRef.current.visible = true;
        if (cubeCornersRef.current) cubeCornersRef.current.visible = false;
        // Set diagonals to black and thick
        const diagMat = cubeDiagonalsRef.current?.material as THREE.LineBasicMaterial;
        if (diagMat) {
          diagMat.color.set("#000");
          diagMat.linewidth = 6;
        }
      } else if (s5 > 0.01 && s5 < 0.99) {
        // Deploy: show edges only, mesh is cardboard color
        if (shellRef.current) shellRef.current.visible = true;
        setShellWireframe(false);
        setShellColor("#d2b075");
        if (cubeEdgesRef.current) cubeEdgesRef.current.visible = true;
        if (cubeDiagonalsRef.current) cubeDiagonalsRef.current.visible = false;
        if (cubeCornersRef.current) cubeCornersRef.current.visible = false;
      } else {
        // After Deploy: cardboard color and tape, no outlines
        if (shellRef.current) shellRef.current.visible = true;
        setShellWireframe(false);
        setShellColor("#d2b075");
        if (cubeEdgesRef.current) cubeEdgesRef.current.visible = false;
        if (cubeDiagonalsRef.current) cubeDiagonalsRef.current.visible = false;
        if (cubeCornersRef.current) cubeCornersRef.current.visible = false;
      }
      // Test stage: spin in x axis for 5 times
      if (s4 > 0.01 && s4 < 0.99 && productRef.current) {
        // Only spin in x axis, up to 5 full rotations
        let spin = testSpin + delta * 8 * s4;
        const maxSpin = 5 * Math.PI * 2;
        if (spin > maxSpin) spin = maxSpin;
        productRef.current.rotation.x = spin;
        setTestSpin(spin);
      } else if ((s4 <= 0.01 || s4 >= 0.99) && testSpin !== 0) {
        // Reset spin when leaving this stage
        setTestSpin(0);
        if (productRef.current) productRef.current.rotation.x = 0;
      }
      // Deploy: spin the box (after Deploy)
      if (s5 > 0.99 && productRef.current) {
        productRef.current.rotation.y += delta * 2.5;
      }
      // Remove Iterate: slow revolve
    }

    // Deploy: show tag only before or at Test stage
    if (tagRef.current) {
      // Only show tag if NOT after Test (i.e., s5 <= 0.01)
      tagRef.current.visible = s5 <= 0.01;
      tagRef.current.scale.setScalar(Math.max(0.01, s5));
    }

    // Core powers up + evolves color
    if (coreRef.current) {
      coreRef.current.scale.setScalar(0.25 + 0.55 * s3);
      const newCoreMat = coreMat.clone();
      newCoreMat.emissiveIntensity = 0.25 + 1.1 * s3 + 0.5 * s6;
      newCoreMat.opacity = 0.25 + 0.55 * s3;
      coreRef.current.material = newCoreMat;
    }

    // Screen appears in Test stage
    if (screenRef.current) {
      const newScreenMat = screenMat.clone();
      newScreenMat.opacity = 0.0 + 0.9 * s4;
      newScreenMat.emissiveIntensity = 0.0 + 1.0 * s4;
      screenRef.current.material = newScreenMat;
      screenRef.current.position.z =
        0.32 + 0.05 * Math.sin(t * Math.PI * 4) * s4;
      screenRef.current.scale.set(
        0.55 + 0.55 * s4,
        0.15 + 0.85 * s4,
        1
      );
    }

    // Polish ring appears in Deploy stage, but hide at Deploy and after
    if (ringRef.current) {
      if (s5 < 0.99) {
        const newRingMat = ringMat.clone();
        newRingMat.opacity = 0.0 + 0.8 * s5;
        newRingMat.emissiveIntensity = 0.0 + 1.1 * s5;
        ringRef.current.material = newRingMat;
        ringRef.current.scale.setScalar(0.4 + 1.0 * s5);
        ringRef.current.visible = true;
        ringRef.current.rotation.y += delta * 0.7 * s5;
      } else {
        ringRef.current.visible = false;
      }
    }

    // Remove Iterate shine and color shift
  });

  return (
    <group ref={rig}>
      {/* lights */}
      <ambientLight intensity={0.72} />
      <directionalLight position={[3, 4, 2]} intensity={1.1} />
      <pointLight position={[-4, 2, 3]} intensity={0.55} />

      {/* pipeline tube (animated radius) */}
      <mesh material={tubeMat}>
        <tubeGeometry args={[curve, 400, tubeRadius, 32, false]} />
      </mesh>

      {/* stage labels as 3D text */}
      {stages.map((s) => {
        const p = curve.getPointAt(s.t);
        return (
          <group key={s.name} position={[p.x, p.y + 0.32, p.z]}>
            {/* 3D floating label */}
            <Text
              fontSize={0.22}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.012}
              outlineColor="#222"
              fontWeight={700}
            >
              {s.name}
            </Text>
          </group>
        );
      })}

      {/* one evolving product (hidden until Plan stage) */}
      {s1 > 0.01 && (
        <group ref={productRef}>
          {/* Black mesh shell, animated by stage */}
          {/* Main box body (no top) */}
          <mesh ref={shellRef} material={shellMat}>
            <boxGeometry args={[0.9, 0.9, 0.9]} />
          </mesh>

          {/* Box flaps (top) - open during Build stage (s3) */}
          {/* Four flaps, each a thin rectangle, rotate outward during s3 */}
          {[0, 1, 2, 3].map((i) => {
            // Flap rotation: closed (0) to open (Math.PI/2) as s3 goes from 0 to 1
            const open = lerp(0, Math.PI / 2.1, s3); // 85 degrees
            // Flap positions and axes
            const flapLength = 0.9;
            const flapWidth = 0.45;
            const flapThickness = 0.04;
            // Flap center offset from box center
            const offset = 0.45 + flapThickness / 2;
            // Flap rotation axis and position
            let pos: [number, number, number] = [0, 0, 0];
            let rot: [number, number, number] = [0, 0, 0];
            if (i === 0) { // front
              pos = [0, offset, flapLength / 2];
              rot = [-open, 0, 0];
            } else if (i === 1) { // back
              pos = [0, offset, -flapLength / 2];
              rot = [open, 0, 0];
            } else if (i === 2) { // left
              pos = [-flapLength / 2, offset, 0];
              rot = [0, 0, open];
            } else if (i === 3) { // right
              pos = [flapLength / 2, offset, 0];
              rot = [0, 0, -open];
            }
            return (
              <mesh key={i} position={pos} rotation={rot} material={shellMat}>
                <boxGeometry args={[flapWidth, flapThickness, flapWidth]} />
              </mesh>
            );
          })}
          {/* Tape on top face after Deploy */}
          {shellColor === "#d2b075" && (
            <mesh position={[0, 0.451, 0]} rotation={[0, 0, 0]}>
              <boxGeometry args={[0.18, 0.04, 0.5]} />
              <meshStandardMaterial color="#a97a4a" />
            </mesh>
          )}
          {/* Cube edges (outline) */}
          <lineSegments ref={cubeEdgesRef}>
            <edgesGeometry args={[new THREE.BoxGeometry(0.9, 0.9, 0.9)]} />
            <lineBasicMaterial color="#000" linewidth={2} />
          </lineSegments>
          {/* Cube diagonals (for Design and after) */}
          <lineSegments ref={cubeDiagonalsRef}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[
                  new Float32Array([
                    // 12 cube face diagonals (2 per face, 6 faces)
                    // Each diagonal: two points (start, end)
                    // Front face
                    -0.45, 0.45, 0.45, 0.45, -0.45, 0.45,
                    0.45, 0.45, 0.45, -0.45, -0.45, 0.45,
                    // Back face
                    -0.45, 0.45, -0.45, 0.45, -0.45, -0.45,
                    0.45, 0.45, -0.45, -0.45, -0.45, -0.45,
                    // Left face
                    -0.45, 0.45, 0.45, -0.45, -0.45, -0.45,
                    -0.45, 0.45, -0.45, -0.45, -0.45, 0.45,
                    // Right face
                    0.45, 0.45, 0.45, 0.45, -0.45, -0.45,
                    0.45, 0.45, -0.45, 0.45, -0.45, 0.45,
                    // Top face
                    -0.45, 0.45, 0.45, 0.45, 0.45, -0.45,
                    0.45, 0.45, 0.45, -0.45, 0.45, -0.45,
                    // Bottom face
                    -0.45, -0.45, 0.45, 0.45, -0.45, -0.45,
                    0.45, -0.45, 0.45, -0.45, -0.45, -0.45,
                  ]),
                  3,
                ]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#000" linewidth={2} />
          </lineSegments>

          {/* Cube corners (after Plan) */}
          <lineSegments ref={cubeCornersRef}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[
                  new Float32Array([
                    // 12 corners, each as a short line segment
                    // Each corner: two points, so 24 points (12*2*3 floats)
                    // Each segment is 0.18 units long from the corner
                    // Front top left
                    -0.45, 0.45, 0.45, -0.27, 0.45, 0.45,
                    -0.45, 0.45, 0.45, -0.45, 0.27, 0.45,
                    -0.45, 0.45, 0.45, -0.45, 0.45, 0.27,
                    // Front top right
                    0.45, 0.45, 0.45, 0.27, 0.45, 0.45,
                    0.45, 0.45, 0.45, 0.45, 0.27, 0.45,
                    0.45, 0.45, 0.45, 0.45, 0.45, 0.27,
                    // Front bottom left
                    -0.45, -0.45, 0.45, -0.27, -0.45, 0.45,
                    -0.45, -0.45, 0.45, -0.45, -0.27, 0.45,
                    -0.45, -0.45, 0.45, -0.45, -0.45, 0.27,
                    // Front bottom right
                    0.45, -0.45, 0.45, 0.27, -0.45, 0.45,
                    0.45, -0.45, 0.45, 0.45, -0.27, 0.45,
                    0.45, -0.45, 0.45, 0.45, -0.45, 0.27,
                    // Back top left
                    -0.45, 0.45, -0.45, -0.27, 0.45, -0.45,
                    -0.45, 0.45, -0.45, -0.45, 0.27, -0.45,
                    -0.45, 0.45, -0.45, -0.45, 0.45, -0.27,
                    // Back top right
                    0.45, 0.45, -0.45, 0.27, 0.45, -0.45,
                    0.45, 0.45, -0.45, 0.45, 0.27, -0.45,
                    0.45, 0.45, -0.45, 0.45, 0.45, -0.27,
                    // Back bottom left
                    -0.45, -0.45, -0.45, -0.27, -0.45, -0.45,
                    -0.45, -0.45, -0.45, -0.45, -0.27, -0.45,
                    -0.45, -0.45, -0.45, -0.45, -0.45, -0.27,
                    // Back bottom right
                    0.45, -0.45, -0.45, 0.27, -0.45, -0.45,
                    0.45, -0.45, -0.45, 0.45, -0.27, -0.45,
                    0.45, -0.45, -0.45, 0.45, -0.45, -0.27,
                  ]),
                  3,
                ]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#000" linewidth={2} />
          </lineSegments>

          {/* Tag for deploy stage (hidden after Test/at Deploy) */}
          <mesh
            ref={tagRef}
            position={[0, 0.55, 0]}
            visible={false}
          >
            <boxGeometry args={[0.22, 0.08, 0.04]} />
            <meshStandardMaterial color="#22c55e" metalness={0.5} roughness={0.2} />
          </mesh>

          <mesh ref={coreRef} material={coreMat}>
            <sphereGeometry args={[0.22, 32, 32]} />
          </mesh>

          <mesh ref={screenRef} material={screenMat} position={[0, 0.05, 0.33]}>
            <boxGeometry args={[0.55, 0.25, 0.02]} />
          </mesh>

          {/* Removed pink circular ring mesh */}
        </group>
      )}
    </group>
  );
}
