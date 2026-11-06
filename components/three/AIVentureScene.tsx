"use client";

import { Environment, Float, Lightformer, Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { SceneShell } from "./SceneShell";
import { StaticFallback } from "./StaticFallback";
import { useScrollProgress } from "./scroll";

const BLUE = new THREE.Color("#0866d9");
const SKY = new THREE.Color("#5c9cff");
const GOLD = new THREE.Color("#ffb21a");

function rand(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/** Generates a 3D coordinate on the cerebral cortex of a hemisphere. */
function getBrainPoint(u: number, v: number, hemisphere: number, seed: number): THREE.Vector3 {
  // u: latitude (0 at superior/top, PI at inferior/bottom)
  // v: longitude around the hemisphere (0 to PI)
  const phi = u;
  const theta = hemisphere > 0 ? v * 0.94 + 0.06 : Math.PI - (v * 0.94 + 0.06);

  // Anatomical proportions: elongated front-to-back (Z), curved top (Y), dual lobes (X)
  let rx = 1.08;
  const ry = 0.98;
  let rz = 1.38;

  // Flatten & tuck inferior temporal lobes and cerebellum
  const isInferior = Math.cos(phi) < -0.15;
  if (isInferior) {
    rx *= 0.88;
    rz *= 0.86;
  }

  // Organic cerebral sulci & gyri (brain wrinkles)
  const gyri =
    Math.sin(phi * 7 + theta * 4) * 0.05 +
    Math.cos(phi * 13 - theta * 9) * 0.025 +
    (rand(seed) - 0.5) * 0.04;

  let x = (rx + gyri) * Math.sin(phi) * Math.sin(theta);
  const y = (ry + gyri) * Math.cos(phi);
  const z = (rz + gyri) * Math.sin(phi) * Math.cos(theta);

  // Shift hemisphere outward from central longitudinal fissure
  x += hemisphere * 0.16;

  // Flatten the medial wall facing the opposite hemisphere
  if (hemisphere > 0 && x < 0.16) x = 0.16 + (x - 0.16) * 0.15;
  if (hemisphere < 0 && x > -0.16) x = -0.16 + (x + 0.16) * 0.15;

  return new THREE.Vector3(x, y, z);
}

/** Builds the neural network graph: synaptic nodes, axon lines, and active firing paths. */
function useNeuralBrain(mobile: boolean) {
  return useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    const nodeHemispheres: number[] = [];

    const uSteps = mobile ? 11 : 14;
    const vSteps = mobile ? 10 : 13;
    let seedCounter = 1;

    // 1. Generate synaptic nodes across Left (-1) and Right (+1) hemispheres
    [-1, 1].forEach((h) => {
      for (let ui = 1; ui < uSteps; ui++) {
        const u = (ui / uSteps) * Math.PI;
        for (let vi = 0; vi <= vSteps; vi++) {
          const v = (vi / vSteps) * Math.PI;
          seedCounter++;
          const pt = getBrainPoint(u, v, h, seedCounter);
          nodes.push(pt);
          nodeHemispheres.push(h);
        }
      }
    });

    // 2. Compute axon connections between neighboring synapses
    const connections: [number, number][] = [];
    const maxDist = 0.48;
    const n = nodes.length;

    for (let i = 0; i < n; i++) {
      let neighbors = 0;
      for (let j = i + 1; j < n; j++) {
        // Connect nodes in same hemisphere, or bridges across corpus callosum near center
        const sameHemi = nodeHemispheres[i] === nodeHemispheres[j];
        const isCenterBridge =
          !sameHemi && Math.abs(nodes[i].z) < 0.6 && nodes[i].y > -0.2 && nodes[i].y < 0.4;

        if (sameHemi || isCenterBridge) {
          const dist = nodes[i].distanceTo(nodes[j]);
          const threshold = isCenterBridge ? 0.42 : maxDist;

          if (dist < threshold && neighbors < 4) {
            connections.push([i, j]);
            neighbors++;
          }
        }
      }
    }

    // 3. Build line segments buffer
    const linePos: number[] = [];
    const lineColors: number[] = [];
    const c = new THREE.Color();

    connections.forEach(([i, j], idx) => {
      const p1 = nodes[i];
      const p2 = nodes[j];
      linePos.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);

      // Gradient between brand cyan/sky and brand blue, with occasional gold synapses
      const isGoldSynapse = idx % 9 === 0;
      if (isGoldSynapse) {
        c.copy(GOLD);
      } else {
        const t = (p1.y + 1) / 2;
        c.copy(BLUE).lerp(SKY, t);
      }
      lineColors.push(c.r, c.g, c.b, c.r, c.g, c.b);
    });

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePos, 3));
    lineGeometry.setAttribute("color", new THREE.Float32BufferAttribute(lineColors, 3));

    return {
      nodes,
      connections,
      lineGeometry,
    };
  }, [mobile]);
}

/** Inner glowing volumetric cerebral lobes */
function BrainCores() {
  const leftCore = useRef<THREE.Mesh>(null);
  const rightCore = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);

  useFrame(({ clock }) => {
    if (matRef.current) {
      // Gentle pulsing "thought" luminescence
      matRef.current.emissiveIntensity = 0.55 + Math.sin(clock.elapsedTime * 2.2) * 0.2;
    }
  });

  return (
    <group>
      {/* Left hemisphere inner mass */}
      <mesh ref={leftCore} position={[-0.62, 0.02, 0]} scale={[0.82, 0.9, 1.15]}>
        <sphereGeometry args={[0.9, 32, 24]} />
        <meshPhysicalMaterial
          ref={matRef}
          color="#061d4a"
          emissive="#0866d9"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.15}
          transmission={0.65}
          thickness={0.8}
          transparent
          opacity={0.85}
          clearcoat={1}
        />
      </mesh>

      {/* Right hemisphere inner mass */}
      <mesh ref={rightCore} position={[0.62, 0.02, 0]} scale={[0.82, 0.9, 1.15]}>
        <sphereGeometry args={[0.9, 32, 24]} />
        <meshPhysicalMaterial
          color="#061d4a"
          emissive="#0866d9"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.15}
          transmission={0.65}
          thickness={0.8}
          transparent
          opacity={0.85}
          clearcoat={1}
        />
      </mesh>
    </group>
  );
}

/** Synaptic Thought Impulses firing continuously across neural pathways */
function ActionPotentials({
  nodes,
  connections,
  count = 32,
}: {
  nodes: THREE.Vector3[];
  connections: [number, number][];
  count?: number;
}) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tempPos = useMemo(() => new THREE.Vector3(), []);

  const impulses = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      connectionIdx: Math.floor(rand(i * 17 + 5) * connections.length),
      speed: 0.6 + rand(i * 31 + 7) * 1.2,
      progress: rand(i * 43 + 11),
      isOrange: i % 3 === 0,
    }));
  }, [connections.length, count]);

  useFrame((_, delta) => {
    const im = mesh.current;
    if (!im || connections.length === 0) return;

    impulses.forEach((imp, i) => {
      imp.progress += delta * imp.speed;
      if (imp.progress >= 1) {
        imp.progress = 0;
        // Hop to another random connection
        imp.connectionIdx = Math.floor(rand(i + performance.now()) * connections.length);
      }

      const [n1, n2] = connections[imp.connectionIdx];
      tempPos.lerpVectors(nodes[n1], nodes[n2], imp.progress);

      dummy.position.copy(tempPos);
      const scale = (Math.sin(imp.progress * Math.PI) * 0.05 + 0.04) * (imp.isOrange ? 1.3 : 1);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();

      im.setMatrixAt(i, dummy.matrix);
    });

    im.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 10, 10]} />
      <meshBasicMaterial color="#ffb21a" toneMapped={false} />
    </instancedMesh>
  );
}

/** Holographic orbital rings representing quantum computing & AI synthesis */
function NeuralRings() {
  const ringARef = useRef<THREE.Group>(null);
  const ringBRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (ringARef.current) {
      ringARef.current.rotation.z = t * 0.35;
      ringARef.current.rotation.y = Math.sin(t * 0.2) * 0.2;
    }
    if (ringBRef.current) {
      ringBRef.current.rotation.z = -t * 0.25;
      ringBRef.current.rotation.x = Math.cos(t * 0.25) * 0.2;
    }
  });

  return (
    <group>
      {/* Primary Equatorial Neural Ring */}
      <group ref={ringARef} rotation={[0.45, 0.2, 0.2]}>
        <mesh>
          <torusGeometry args={[2.15, 0.015, 16, 80]} />
          <meshBasicMaterial color="#5c9cff" transparent opacity={0.65} />
        </mesh>
        {/* Orbital data node */}
        <mesh position={[2.15, 0, 0]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial
            color="#5c9cff"
            emissive="#5c9cff"
            emissiveIntensity={1.5}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Secondary Tilted Innovation Ring */}
      <group ref={ringBRef} rotation={[-0.6, -0.3, 0.4]}>
        <mesh>
          <torusGeometry args={[2.35, 0.012, 16, 80]} />
          <meshBasicMaterial color="#ff6818" transparent opacity={0.5} />
        </mesh>
        {/* Orbital innovation node */}
        <mesh position={[2.35, 0, 0]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial
            color="#ffb21a"
            emissive="#ff6818"
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  );
}

/** Synaptic Node Points located at every junction of the brain cortex */
function SynapticNodes({ nodes }: { nodes: THREE.Vector3[] }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useLayoutEffect(() => {
    const im = mesh.current;
    if (!im) return;
    nodes.forEach((pt, i) => {
      dummy.position.copy(pt);
      dummy.scale.setScalar(0.032);
      dummy.updateMatrix();
      im.setMatrixAt(i, dummy.matrix);
    });
    im.instanceMatrix.needsUpdate = true;
  }, [nodes, dummy]);

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, nodes.length]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#8fc1ff" toneMapped={false} />
    </instancedMesh>
  );
}

/** Entire AI Brain assembly with neural network cortex, firing impulses, and core glow. */
function AIBrain({ mobile }: { mobile: boolean }) {
  const root = useRef<THREE.Group>(null);
  const scroll = useScrollProgress();
  const { nodes, connections, lineGeometry } = useNeuralBrain(mobile);

  useFrame(({ pointer, clock }, d) => {
    const t = scroll.current.t;
    if (root.current) {
      // Smooth dynamic rotation driven by pointer and scroll
      root.current.rotation.y = THREE.MathUtils.damp(
        root.current.rotation.y,
        0.35 + t * 1.5 + pointer.x * 0.35 + Math.sin(clock.elapsedTime * 0.4) * 0.08,
        3,
        d,
      );
      root.current.rotation.x = THREE.MathUtils.damp(
        root.current.rotation.x,
        0.18 + t * 0.3 - pointer.y * 0.2,
        3,
        d,
      );
    }
  });

  return (
    <group ref={root} position={[0, 0, 0]}>
      {/* Semi-translucent inner brain hemispheres */}
      <BrainCores />

      {/* Neural network axon lines */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial vertexColors transparent opacity={0.65} depthWrite={false} />
      </lineSegments>

      {/* Synaptic nodes */}
      <SynapticNodes nodes={nodes} />

      {/* Active firing thought signals */}
      <ActionPotentials nodes={nodes} connections={connections} count={mobile ? 20 : 38} />

      {/* Quantum orbital rings */}
      <NeuralRings />

      {/* Internal core illumination */}
      <pointLight position={[0, 0, 0]} color="#5c9cff" intensity={12} distance={5} />
      <pointLight position={[0, -0.4, 0.4]} color="#ff6818" intensity={8} distance={4} />
      <pointLight position={[0, 0.5, -0.2]} color="#ffb21a" intensity={6} distance={3} />
    </group>
  );
}

/**
 * 3D Neural AI Brain — represents AI startup incubation, deep learning,
 * and next-generation venture acceleration.
 */
export default function AIVentureScene() {
  const mobile = useIsMobile();
  return (
    <SceneShell
      camera={{ position: [0, 0.2, 5.8], fov: 42 }}
      fallback={<StaticFallback src="/images/3d/glass-staircase.webp" alt="AI Brain Network" />}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 5]} intensity={1.6} />
      <directionalLight position={[-4, -3, 3]} intensity={0.8} color="#0866d9" />

      <Environment resolution={128} frames={1}>
        <Lightformer intensity={2} position={[0, 5, -2]} scale={[10, 3, 1]} color="#ffffff" />
        <Lightformer
          intensity={1.5}
          position={[-5, 1, 2]}
          rotation-y={Math.PI / 2}
          scale={[6, 4, 1]}
          color="#8fc1ff"
        />
        <Lightformer
          intensity={1.2}
          position={[5, 0, 2]}
          rotation-y={-Math.PI / 2}
          scale={[5, 3, 1]}
          color="#ff6818"
        />
      </Environment>

      <Float speed={1.5} floatIntensity={0.28} rotationIntensity={0.08}>
        <AIBrain mobile={mobile} />
      </Float>

      <Sparkles
        count={mobile ? 18 : 36}
        scale={[7, 5, 5]}
        size={1.8}
        speed={0.35}
        color="#bcd8ff"
        opacity={0.65}
      />
    </SceneShell>
  );
}
