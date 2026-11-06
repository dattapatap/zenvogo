"use client";

import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { SceneShell } from "./SceneShell";
import { useScrollProgress } from "./scroll";

function Blob() {
  const ref = useRef<THREE.Mesh>(null);
  const scroll = useScrollProgress();
  useFrame(({ pointer }, d) => {
    if (!ref.current) return;
    ref.current.rotation.y += d * 0.2;
    ref.current.rotation.x = THREE.MathUtils.damp(
      ref.current.rotation.x,
      scroll.current.t * 1.6,
      4,
      d,
    );
    ref.current.position.x = THREE.MathUtils.damp(ref.current.position.x, pointer.x * 0.4, 2, d);
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, pointer.y * 0.3, 2, d);
  });
  return (
    <Float speed={2} floatIntensity={1}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.5, 64]} />
        <MeshDistortMaterial
          color="#0866d9"
          emissive="#06245a"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.4}
          distort={0.42}
          speed={2.2}
        />
      </mesh>
    </Float>
  );
}

function Rings() {
  const ref = useRef<THREE.Group>(null);
  const scroll = useScrollProgress();
  useFrame((_, d) => {
    if (ref.current) {
      ref.current.rotation.z += d * 0.15;
      ref.current.rotation.y = THREE.MathUtils.damp(
        ref.current.rotation.y,
        0.2 + scroll.current.t * 2,
        4,
        d,
      );
      ref.current.rotation.x += d * 0.05;
    }
  });
  return (
    <group ref={ref} rotation={[1.1, 0.2, 0]}>
      <mesh>
        <torusGeometry args={[2.3, 0.012, 8, 200]} />
        <meshBasicMaterial color="#ffb21a" toneMapped={false} />
      </mesh>
      <mesh rotation={[0.4, 0.6, 0]}>
        <torusGeometry args={[2.7, 0.008, 8, 200]} />
        <meshBasicMaterial color="#ff6818" transparent opacity={0.7} toneMapped={false} />
      </mesh>
    </group>
  );
}

/** Morphing orb with orbit rings, used in call-to-action sections. */
export default function Orb() {
  return (
    <SceneShell camera={{ position: [0, 0, 6.5], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 4]} intensity={80} color="#8fc1ff" />
      <pointLight position={[-4, -2, 2]} intensity={70} color="#ff6818" />
      <pointLight position={[0, 4, -2]} intensity={40} color="#ffb21a" />
      <Blob />
      <Rings />
      <Sparkles count={40} scale={[7, 5, 3]} size={2} speed={0.4} color="#cfe3ff" />
    </SceneShell>
  );
}
