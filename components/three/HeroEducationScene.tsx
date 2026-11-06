"use client";

import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  Line,
  RoundedBox,
  Sparkles,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { SceneShell } from "./SceneShell";
import { StaticFallback } from "./StaticFallback";
import { useScrollProgress } from "./scroll";

const NAVY = "#0b2a66";
const BLUE = "#0866d9";
const SKY = "#8fc1ff";
const ORANGE = "#ff6818";
const GOLD = "#ffb21a";

/* ── Studio lighting baked into an environment map (no network fetch) ── */
function Studio() {
  return (
    <Environment resolution={256} frames={1}>
      <Lightformer intensity={2.2} position={[0, 5, -2]} scale={[10, 3, 1]} color="#ffffff" />
      <Lightformer
        intensity={1.4}
        position={[-5, 1, 1]}
        rotation-y={Math.PI / 2}
        scale={[6, 4, 1]}
        color={SKY}
      />
      <Lightformer
        intensity={1.2}
        position={[5, 0, 2]}
        rotation-y={-Math.PI / 2}
        scale={[5, 3, 1]}
        color={ORANGE}
      />
      <Lightformer intensity={0.6} position={[0, -4, 3]} scale={[8, 2, 1]} color={BLUE} />
    </Environment>
  );
}

/* ── A book: hard cover with a page block, open edge facing +x ── */
function Book({
  position,
  rotation = 0,
  color,
  width = 2.1,
}: {
  position: [number, number, number];
  rotation?: number;
  color: string;
  width?: number;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <RoundedBox args={[width, 0.34, 1.45]} radius={0.05} smoothness={4}>
        <meshPhysicalMaterial
          color={color}
          metalness={0.55}
          roughness={0.22}
          clearcoat={1}
          clearcoatRoughness={0.15}
        />
      </RoundedBox>
      {/* page block */}
      <mesh position={[0.06, 0, 0]}>
        <boxGeometry args={[width - 0.08, 0.26, 1.38]} />
        <meshStandardMaterial color="#f4f7fc" roughness={0.6} />
      </mesh>
      {/* ribbon bookmark */}
      <mesh position={[width / 2 - 0.02, -0.05, 0.35]}>
        <boxGeometry args={[0.04, 0.22, 0.1]} />
        <meshStandardMaterial color={ORANGE} emissive={ORANGE} emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}

/* ── Graduation cap with a swinging tassel ── */
function GradCap() {
  const tassel = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (tassel.current) tassel.current.rotation.z = Math.sin(clock.elapsedTime * 1.6) * 0.12;
  });

  const cord = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0.07, 0),
        new THREE.Vector3(0.45, 0.06, 0.3),
        new THREE.Vector3(0.78, 0.04, 0.55),
      ]),
    [],
  );

  return (
    <group>
      {/* skull cap */}
      <mesh position={[0, -0.24, 0]}>
        <cylinderGeometry args={[0.52, 0.56, 0.42, 48, 1, true]} />
        <meshPhysicalMaterial
          color={NAVY}
          metalness={0.6}
          roughness={0.25}
          clearcoat={1}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* light band */}
      <mesh position={[0, -0.36, 0]}>
        <cylinderGeometry args={[0.565, 0.565, 0.1, 48, 1, true]} />
        <meshPhysicalMaterial
          color="#dce8fb"
          metalness={0.8}
          roughness={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* mortarboard */}
      <RoundedBox args={[1.7, 0.07, 1.7]} radius={0.03} rotation={[0, Math.PI / 4, 0]}>
        <meshPhysicalMaterial
          color={BLUE}
          metalness={0.65}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </RoundedBox>
      {/* button */}
      <mesh position={[0, 0.07, 0]}>
        <sphereGeometry args={[0.07, 24, 24]} />
        <meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.2} />
      </mesh>
      {/* cord */}
      <mesh>
        <tubeGeometry args={[cord, 24, 0.018, 8]} />
        <meshStandardMaterial color={GOLD} metalness={0.8} roughness={0.25} />
      </mesh>
      {/* tassel */}
      <group ref={tassel} position={[0.78, 0.04, 0.55]}>
        <mesh position={[0, -0.22, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.42, 8]} />
          <meshStandardMaterial color={GOLD} metalness={0.8} roughness={0.25} />
        </mesh>
        <mesh position={[0, -0.48, 0]}>
          <coneGeometry args={[0.07, 0.22, 16]} />
          <meshStandardMaterial
            color={ORANGE}
            emissive={ORANGE}
            emissiveIntensity={0.35}
            roughness={0.5}
          />
        </mesh>
      </group>
    </group>
  );
}

/* ── Subtle glowing globe, representing international education ── */
function MiniGlobe({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  const geometry = useMemo(() => {
    const count = 700;
    const pos = new Float32Array(count * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      pos.set([Math.cos(golden * i) * r, y, Math.sin(golden * i) * r], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.15;
  });
  return (
    <group ref={ref} position={position} scale={0.75}>
      <points geometry={geometry}>
        <pointsMaterial size={0.035} color={SKY} transparent opacity={0.9} depthWrite={false} />
      </points>
      <mesh>
        <sphereGeometry args={[0.97, 32, 32]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0.18} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.35, 0.008, 8, 120]} />
        <meshBasicMaterial color={ORANGE} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ── Glass geometric structures ── */
function GlassShape({
  position,
  geometry,
  scale = 1,
  speed = 1,
  simple,
}: {
  position: [number, number, number];
  geometry: "ico" | "octa" | "torus";
  scale?: number;
  speed?: number;
  simple?: boolean;
}) {
  return (
    <Float speed={speed} rotationIntensity={1.2} floatIntensity={1.2}>
      <mesh position={position} scale={scale}>
        {geometry === "ico" && <icosahedronGeometry args={[0.45, 0]} />}
        {geometry === "octa" && <octahedronGeometry args={[0.38, 0]} />}
        {geometry === "torus" && <torusGeometry args={[0.32, 0.1, 24, 64]} />}
        {simple ? (
          <meshStandardMaterial
            color={SKY}
            metalness={0.3}
            roughness={0.1}
            transparent
            opacity={0.55}
          />
        ) : (
          <meshPhysicalMaterial
            color="#cfe3ff"
            transmission={1}
            thickness={0.6}
            roughness={0.05}
            ior={1.4}
            metalness={0}
            clearcoat={1}
          />
        )}
      </mesh>
    </Float>
  );
}

/* ── Collaboration network: nodes linked to the central composition ── */
const NODES: [number, number, number][] = [
  [-2.1, 0.7, -0.6],
  [-1.9, -1.3, 0.4],
  [2.0, 1.5, -0.8],
  [2.1, -0.5, 0.2],
  [0.5, 2.3, -1.2],
];

function Connections() {
  const pulses = useRef<THREE.Mesh[]>([]);
  const hub = useMemo(() => new THREE.Vector3(0, 0.4, 0), []);
  const vecs = useMemo(() => NODES.map((n) => new THREE.Vector3(...n)), []);
  useFrame(({ clock }) => {
    vecs.forEach((v, i) => {
      const m = pulses.current[i];
      if (!m) return;
      const t = (clock.elapsedTime * 0.35 + i * 0.21) % 1;
      m.position.lerpVectors(v, hub, t);
    });
  });
  return (
    <group>
      {vecs.map((v, i) => (
        <group key={i}>
          <Line
            points={[v, hub]}
            color={i % 2 ? SKY : ORANGE}
            lineWidth={1}
            transparent
            opacity={0.2}
            dashed
            dashSize={0.12}
            gapSize={0.08}
          />
          <mesh position={v}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color={i % 2 ? SKY : GOLD} toneMapped={false} />
          </mesh>
          <mesh ref={(m) => void (m && (pulses.current[i] = m))}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color="#ffffff" toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ── Main composition, eased toward the pointer and scaled in on mount ── */
function Composition({ mobile }: { mobile: boolean }) {
  const root = useRef<THREE.Group>(null);
  const hero = useRef<THREE.Group>(null);
  const cap = useRef<THREE.Group>(null);
  const intro = useRef(0);
  const scroll = useScrollProgress();

  useFrame(({ pointer }, d) => {
    const t = scroll.current.t;
    // The cap floats above the books and settles onto them as the scene reaches mid-screen.
    if (cap.current) {
      const lift = Math.max(0, -t) * 3.2;
      cap.current.position.y = THREE.MathUtils.damp(cap.current.position.y, 0.42 + lift, 5, d);
      cap.current.rotation.z = THREE.MathUtils.damp(
        cap.current.rotation.z,
        -0.05 - Math.max(0, -t) * 0.9,
        5,
        d,
      );
    }
    intro.current = Math.min(1, intro.current + d * 0.8);
    const e = 1 - Math.pow(1 - intro.current, 3);
    if (root.current) root.current.scale.setScalar(0.7 + e * 0.3);
    if (hero.current) {
      hero.current.rotation.y = THREE.MathUtils.damp(
        hero.current.rotation.y,
        -0.55 + pointer.x * 0.35 + (1 - e) * -1.2 + t * 2.4,
        3,
        d,
      );
      hero.current.rotation.x = THREE.MathUtils.damp(
        hero.current.rotation.x,
        0.08 - pointer.y * 0.12 + t * 0.3,
        3,
        d,
      );
    }
  });

  return (
    <group ref={root}>
      <group ref={hero} position={[0, -0.55, 0]}>
        <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.5}>
          {/* platform */}
          <RoundedBox args={[3.4, 0.5, 2.9]} radius={0.24} smoothness={6} position={[0, -0.95, 0]}>
            <meshPhysicalMaterial
              color={BLUE}
              metalness={0.7}
              roughness={0.18}
              clearcoat={1}
              clearcoatRoughness={0.08}
            />
          </RoundedBox>
          <mesh position={[0, -0.69, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.62, 1.66, 64]} />
            <meshBasicMaterial color={ORANGE} toneMapped={false} />
          </mesh>
          {/* books */}
          <Book position={[0, -0.52, 0]} rotation={0.05} color={BLUE} />
          <Book position={[0.05, -0.18, 0.02]} rotation={-0.06} color="#e9f0fb" width={2.0} />
          {/* cap */}
          <group ref={cap} position={[-0.05, 0.42, 0]} rotation={[0.04, 0.3, -0.05]}>
            <GradCap />
          </group>
        </Float>
      </group>

      <MiniGlobe position={[-1.7, 1.85, -1.8]} />
      <GlassShape position={[1.85, 2.0, -0.6]} geometry="ico" speed={1.6} simple={mobile} />
      <GlassShape position={[1.8, -1.75, 0.8]} geometry="torus" speed={1.2} simple={mobile} />
      <GlassShape position={[-1.85, -1.6, 0.6]} geometry="octa" speed={2} simple={mobile} />
      {!mobile && <Connections />}
    </group>
  );
}

export default function HeroEducationScene() {
  const mobile = useIsMobile();
  return (
    <SceneShell
      camera={{ position: [0, 1.3, 8.2], fov: 38 }}
      fallback={<StaticFallback src="/images/3d/education-platform.webp" alt="" />}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} />
      <pointLight position={[-4, 2, 3]} intensity={25} color={SKY} />
      <pointLight position={[4, -1, 3]} intensity={25} color={ORANGE} />
      <Studio />
      <Composition mobile={mobile} />
      {!mobile && (
        <ContactShadows
          position={[0, -2.15, 0]}
          opacity={0.45}
          scale={9}
          blur={2.6}
          far={3}
          color="#000814"
        />
      )}
      <Sparkles
        count={mobile ? 20 : 45}
        scale={[10, 6, 4]}
        size={2}
        speed={0.3}
        color={SKY}
        opacity={0.6}
      />
    </SceneShell>
  );
}
