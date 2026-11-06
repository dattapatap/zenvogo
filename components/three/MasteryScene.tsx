"use client";

import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
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
const PAPER = "#f6f8fc";

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
        intensity={1.3}
        position={[5, 0, 2]}
        rotation-y={-Math.PI / 2}
        scale={[5, 3, 1]}
        color={ORANGE}
      />
      <Lightformer intensity={0.6} position={[0, -4, 3]} scale={[8, 2, 1]} color={BLUE} />
    </Environment>
  );
}

/* ── Easing helpers for the entrance sequence ── */
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeOutBack = (t: number) => {
  const c1 = 1.5;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
const easeOutBounce = (t: number) => {
  const n = 7.5625;
  const d = 2.75;
  if (t < 1 / d) return n * t * t;
  if (t < 2 / d) return n * (t -= 1.5 / d) * t + 0.75;
  if (t < 2.5 / d) return n * (t -= 2.25 / d) * t + 0.9375;
  return n * (t -= 2.625 / d) * t + 0.984375;
};
/** Progress (0–1) of a step that starts at `start` seconds and lasts `dur` seconds. */
const step = (time: number, start: number, dur: number) => clamp01((time - start) / dur);

/** Fine page-edge lines for the book page blocks. */
function usePageTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 4;
    c.height = 64;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = PAPER;
    ctx.fillRect(0, 0, 4, 64);
    ctx.fillStyle = "#d5deec";
    for (let y = 0; y < 64; y += 4) ctx.fillRect(0, y, 4, 1);
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1, 3);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

function Book({
  width,
  depth,
  height,
  color,
  pages,
}: {
  width: number;
  depth: number;
  height: number;
  color: string;
  pages: THREE.Texture;
}) {
  return (
    <group>
      <RoundedBox args={[width, height, depth]} radius={0.05} smoothness={4}>
        <meshPhysicalMaterial
          color={color}
          metalness={0.45}
          roughness={0.25}
          clearcoat={1}
          clearcoatRoughness={0.15}
        />
      </RoundedBox>
      {/* page block, open on the front and right edges */}
      <mesh position={[0.05, 0, 0.05]}>
        <boxGeometry args={[width - 0.06, height * 0.74, depth - 0.06]} />
        <meshStandardMaterial map={pages} roughness={0.7} />
      </mesh>
    </group>
  );
}

/* ── Rolled diploma tied with an orange ribbon ── */
function Diploma() {
  const len = 1.5;
  return (
    <group>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.18, 0.18, len, 40]} />
        <meshStandardMaterial color={PAPER} roughness={0.55} />
      </mesh>
      {/* rolled ends */}
      {[-1, 1].map((s) => (
        <mesh
          key={s}
          position={[(s * len) / 2 + s * 0.001, 0, 0]}
          rotation={[0, (s * Math.PI) / 2, 0]}
        >
          <ringGeometry args={[0.04, 0.17, 40]} />
          <meshStandardMaterial color="#dfe6f2" roughness={0.6} side={THREE.DoubleSide} />
        </mesh>
      ))}
      {/* ribbon band + bow tails */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[0.1, 0, 0]}>
        <torusGeometry args={[0.19, 0.035, 12, 40]} />
        <meshStandardMaterial color={ORANGE} roughness={0.35} metalness={0.2} />
      </mesh>
      <mesh position={[0.0, -0.22, 0.17]} rotation={[0.5, 0, 0.45]}>
        <boxGeometry args={[0.09, 0.42, 0.015]} />
        <meshStandardMaterial color={ORANGE} roughness={0.35} metalness={0.2} />
      </mesh>
      <mesh position={[0.2, -0.22, 0.17]} rotation={[0.5, 0, -0.35]}>
        <boxGeometry args={[0.09, 0.42, 0.015]} />
        <meshStandardMaterial color="#ff8a3d" roughness={0.35} metalness={0.2} />
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
      <RoundedBox args={[1.7, 0.07, 1.7]} radius={0.03} rotation={[0, Math.PI / 4, 0]}>
        <meshPhysicalMaterial
          color={BLUE}
          metalness={0.55}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </RoundedBox>
      <mesh position={[0, 0.07, 0]}>
        <sphereGeometry args={[0.08, 24, 24]} />
        <meshStandardMaterial color={NAVY} metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh>
        <tubeGeometry args={[cord, 24, 0.018, 8]} />
        <meshStandardMaterial color={GOLD} metalness={0.8} roughness={0.25} />
      </mesh>
      <group ref={tassel} position={[0.78, 0.04, 0.55]}>
        <mesh position={[0, -0.22, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.42, 8]} />
          <meshStandardMaterial color={GOLD} metalness={0.8} roughness={0.25} />
        </mesh>
        <mesh position={[0, -0.5, 0]}>
          <coneGeometry args={[0.08, 0.28, 16]} />
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

/* Stack layout (y is the centre of each item) */
const BOTTOM = { w: 2.6, d: 1.75, h: 0.4, y: 0 };
const TOP = { w: 2.25, d: 1.55, h: 0.36, y: 0.2 + 0.18 };
const CAP_REST_Y = TOP.y + TOP.h / 2 + 0.45;

/**
 * Entrance sequence (plays the first time the scene is on screen):
 * books rise in → diploma rolls in → cap drops onto the books with a bounce.
 * Afterwards everything idles: a gentle float, swinging tassel, pointer tilt.
 */
function Composition() {
  const rig = useRef<THREE.Group>(null);
  const bottom = useRef<THREE.Group>(null);
  const top = useRef<THREE.Group>(null);
  const diploma = useRef<THREE.Group>(null);
  const cap = useRef<THREE.Group>(null);
  const time = useRef(0);
  const scroll = useScrollProgress();
  const pages = usePageTexture();

  useFrame(({ pointer, clock }, d) => {
    time.current += Math.min(d, 0.05);
    const t = time.current;

    const b = easeOutBack(step(t, 0, 0.7));
    if (bottom.current) {
      bottom.current.position.y = BOTTOM.y - (1 - b) * 0.8;
      bottom.current.scale.setScalar(Math.max(0.001, b));
    }
    const tp = easeOutBack(step(t, 0.18, 0.7));
    if (top.current) {
      top.current.position.y = TOP.y + (1 - tp) * 0.9;
      top.current.scale.setScalar(Math.max(0.001, tp));
    }
    const dp = easeOutCubic(step(t, 0.45, 0.9));
    if (diploma.current) {
      diploma.current.position.x = -1.25 - (1 - dp) * 2.2;
      diploma.current.rotation.x = (1 - dp) * Math.PI * 3; // rolls in
      diploma.current.visible = dp > 0;
    }
    const cp = step(t, 0.85, 1.0);
    if (cap.current) {
      const idle = cp >= 1 ? Math.sin((t - 1.85) * 1.4) * 0.025 : 0;
      cap.current.position.y = CAP_REST_Y + (1 - easeOutBounce(cp)) * 2.6 + idle;
      cap.current.rotation.y = 0.35 + (1 - easeOutCubic(cp)) * Math.PI * 1.5;
      cap.current.visible = cp > 0;
    }

    if (rig.current) {
      rig.current.rotation.y = THREE.MathUtils.damp(
        rig.current.rotation.y,
        -0.45 +
          pointer.x * 0.25 +
          scroll.current.t * 0.4 +
          Math.sin(clock.elapsedTime * 0.3) * 0.05,
        3,
        d,
      );
      rig.current.rotation.x = THREE.MathUtils.damp(
        rig.current.rotation.x,
        0.32 - pointer.y * 0.08,
        3,
        d,
      );
    }
  });

  return (
    <group ref={rig}>
      <Float speed={1.3} rotationIntensity={0.08} floatIntensity={0.3}>
        <group ref={bottom} rotation={[0, 0.04, 0]}>
          <Book width={BOTTOM.w} depth={BOTTOM.d} height={BOTTOM.h} color={BLUE} pages={pages} />
        </group>
        <group ref={top} rotation={[0, -0.1, 0]}>
          <Book width={TOP.w} depth={TOP.d} height={TOP.h} color={ORANGE} pages={pages} />
        </group>
        <group ref={diploma} position={[-1.25, -0.05, 1.05]} rotation={[0, -0.35, 0]}>
          <Diploma />
        </group>
        <group ref={cap} position={[0.05, CAP_REST_Y, -0.05]} rotation={[0.02, 0.35, -0.03]}>
          <GradCap />
        </group>
      </Float>
    </group>
  );
}

/** Books, a rolled diploma and a graduation cap. Used in the call-to-action section. */
export default function MasteryScene() {
  const mobile = useIsMobile();
  return (
    <SceneShell
      camera={{ position: [0, 0.9, 7], fov: 36 }}
      fallback={<StaticFallback src="/images/3d/education-platform.webp" alt="" />}
    >
      <Studio />
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 6, 5]} intensity={1.5} />
      <pointLight position={[-4, 2, 3]} intensity={25} color={SKY} />
      <pointLight position={[4, 0, 3]} intensity={30} color={ORANGE} />
      <group position={[0, -0.45, 0]} scale={mobile ? 0.65 : 0.82}>
        <Composition />
        <ContactShadows
          position={[0, -0.3, 0]}
          opacity={0.45}
          scale={7}
          blur={2.4}
          far={2.5}
          color="#000814"
        />
      </group>
      <Sparkles count={mobile ? 12 : 24} scale={[6, 4, 2]} size={1.8} speed={0.3} color="#cfe3ff" />
    </SceneShell>
  );
}
