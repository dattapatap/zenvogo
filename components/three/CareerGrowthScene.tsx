"use client";

import { Edges, Float, Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { SceneShell } from "./SceneShell";
import { StaticFallback } from "./StaticFallback";
import { useScrollProgress } from "./scroll";

const STEPS = 6;
const STEP_W = 1;
const STEP_H = 0.44;
const DEPTH = 1.5;
const BASE_Y = -1.55;
const FRONT = DEPTH / 2 + 0.03;

const LABELS = [
  "Knowledge",
  "Skills",
  "Expertise",
  "Leadership",
  "Professional growth",
  "Business transformation",
];

const ORANGE = "#ff6818";
const GOLD = "#ffb21a";
/** Step colours: warm pink at the base fading to bright sky blue at the top. */
const BOTTOM = new THREE.Color("#ff4fb0");
const TOP = new THREE.Color("#5fb4ff");
const stepColor = (i: number) => BOTTOM.clone().lerp(TOP, i / (STEPS - 1));

const stepLeft = (i: number) => (i - STEPS / 2) * STEP_W;
const stepTop = (i: number) => BASE_Y + STEP_H * (i + 1);

/** Scroll progress mapped to the climb: 0 at the bottom step, 1 at the summit. */
function useClimb() {
  const scroll = useScrollProgress();
  return () => THREE.MathUtils.clamp((scroll.current.t + 0.35) / 0.6, 0, 1);
}

/* ── Glass steps: translucent columns with glowing edges and lit treads ── */
function GlassStep({ i }: { i: number }) {
  const h = STEP_H * (i + 1);
  const color = stepColor(i);
  return (
    <group position={[stepLeft(i) + STEP_W / 2, BASE_Y + h / 2, 0]}>
      <mesh>
        <boxGeometry args={[STEP_W - 0.04, h, DEPTH]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.3}
          roughness={0.08}
          metalness={0.1}
          clearcoat={1}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
        <Edges color={color.clone().lerp(new THREE.Color("#ffffff"), 0.35)} threshold={15} />
      </mesh>
      {/* glowing tread */}
      <mesh position={[0, h / 2 + 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[STEP_W - 0.06, DEPTH - 0.02]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.5}
          depthWrite={false}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/* ── Soft coloured light pooling on the floor beneath the stairs ── */
function FloorGlow() {
  const texture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, "rgba(255,90,180,0.9)");
    g.addColorStop(0.45, "rgba(150,110,255,0.35)");
    g.addColorStop(1, "rgba(60,140,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(c);
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);
  return (
    <mesh position={[0, BASE_Y - 0.01, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[9, 4.5]} />
      <meshBasicMaterial
        map={texture}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </mesh>
  );
}

/** The growth path traces the front profile of the stairs: up each riser, across each tread. */
function useGrowthPath() {
  return useMemo(() => {
    const path = new THREE.CurvePath<THREE.Vector3>();
    let prev = new THREE.Vector3(stepLeft(0) - 0.5, BASE_Y + 0.02, FRONT);
    const push = (x: number, y: number) => {
      const next = new THREE.Vector3(x, y, FRONT);
      path.add(new THREE.LineCurve3(prev, next));
      prev = next;
    };
    for (let i = 0; i < STEPS; i++) {
      push(stepLeft(i), i === 0 ? BASE_Y + 0.02 : stepTop(i - 1));
      push(stepLeft(i), stepTop(i));
      push(stepLeft(i) + STEP_W, stepTop(i));
    }
    return path;
  }, []);
}

const TUBE_SEGMENTS = 400;
const TUBE_RADIAL = 8;

/* ── The glowing line that draws itself up the stairs, with a climbing orb ── */
function GrowthPath() {
  const path = useGrowthPath();
  const climb = useClimb();
  const k = useRef(0);
  const tube = useRef<THREE.Mesh>(null);
  const orb = useRef<THREE.Group>(null);

  const geometry = useMemo(
    () => new THREE.TubeGeometry(path, TUBE_SEGMENTS, 0.03, TUBE_RADIAL, false),
    [path],
  );
  const ghost = useMemo(() => new THREE.TubeGeometry(path, TUBE_SEGMENTS, 0.012, 6, false), [path]);
  useEffect(
    () => () => {
      geometry.dispose();
      ghost.dispose();
    },
    [geometry, ghost],
  );

  useFrame(({ clock }, d) => {
    k.current = THREE.MathUtils.damp(k.current, climb(), 3, d);
    const p = Math.max(0.002, k.current);
    geometry.setDrawRange(0, Math.floor(p * TUBE_SEGMENTS) * TUBE_RADIAL * 6);
    if (orb.current) {
      orb.current.position.copy(path.getPointAt(Math.min(p, 0.999)));
      orb.current.position.y += 0.12 + Math.abs(Math.sin(clock.elapsedTime * 3)) * 0.05;
    }
  });

  return (
    <group>
      <mesh geometry={ghost}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.18} toneMapped={false} />
      </mesh>
      <mesh ref={tube} geometry={geometry}>
        <meshBasicMaterial color={ORANGE} toneMapped={false} />
      </mesh>
      <group ref={orb}>
        <mesh>
          <sphereGeometry args={[0.11, 32, 32]} />
          <meshStandardMaterial color={GOLD} emissive={ORANGE} emissiveIntensity={1.6} />
        </mesh>
        <pointLight color="#ff8a4c" intensity={5} distance={2.5} />
      </group>
    </group>
  );
}

/* ── Summit flag: success waiting at the top ── */
function SummitFlag() {
  const flag = useRef<THREE.Mesh>(null);
  const climb = useClimb();
  useFrame(({ clock }) => {
    if (!flag.current) return;
    flag.current.rotation.y = Math.sin(clock.elapsedTime * 2) * 0.15;
    const m = flag.current.material as THREE.MeshBasicMaterial;
    m.color.set(climb() > 0.97 ? ORANGE : "#ffb88f");
  });
  const x = stepLeft(STEPS - 1) + STEP_W * 0.7;
  const y = stepTop(STEPS - 1);
  return (
    <group position={[x, y, -0.2]}>
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.9, 8]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>
      <mesh ref={flag} position={[0.17, 0.75, 0]}>
        <planeGeometry args={[0.34, 0.22]} />
        <meshBasicMaterial color={ORANGE} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.92, 0]}>
        <octahedronGeometry args={[0.05]} />
        <meshBasicMaterial color={GOLD} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ── Decorative glass frames echoing the stairs ── */
function GlassFrame({
  position,
  size,
  color,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
}) {
  return (
    <Float speed={1.2} floatIntensity={0.5} rotationIntensity={0.15}>
      <mesh position={position}>
        <boxGeometry args={size} />
        <meshBasicMaterial color={color} transparent opacity={0.06} depthWrite={false} />
        <Edges color={color} threshold={15} />
      </mesh>
    </Float>
  );
}

/* ── Step labels ──
 * Plain DOM elements overlaid on the canvas. Each frame the anchor above a step
 * is projected to screen space and the label is moved there (no extra React roots). */
type LabelEls = React.RefObject<(HTMLDivElement | null)[]>;

/** Path fraction (by length) at the middle of step `i`'s tread. */
const PATH_LEN = 0.5 + STEPS * (STEP_H + STEP_W);
const labelAt = (i: number) => (0.5 + (i + 1) * STEP_H + (i + 0.5) * STEP_W) / PATH_LEN;
const labelLift = (i: number) => (i === STEPS - 1 ? 1.05 : i % 2 ? 1.35 : 0.45);

function LabelAnchors({ els }: { els: LabelEls }) {
  const anchors = useRef<(THREE.Object3D | null)[]>([]);
  const climb = useClimb();
  const v = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ camera, size }) => {
    const k = climb();
    anchors.current.forEach((a, i) => {
      const el = els.current[i];
      if (!a || !el) return;
      v.setFromMatrixPosition(a.matrixWorld).project(camera);
      const x = ((v.x + 1) / 2) * size.width;
      const y = ((1 - v.y) / 2) * size.height;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -100%)`;
      el.style.visibility = "visible";
      el.dataset.on = String(k >= labelAt(i) - 0.03);
    });
  });
  return (
    <>
      {LABELS.map((t, i) => (
        <object3D
          key={t}
          ref={(o) => void (anchors.current[i] = o)}
          position={[stepLeft(i) + STEP_W / 2, stepTop(i) + labelLift(i), 0.3]}
        />
      ))}
    </>
  );
}

function StepLabels({ els, mobile }: { els: LabelEls; mobile: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {LABELS.map((text, i) => (
        <div
          key={text}
          ref={(el) => void (els.current[i] = el)}
          data-on="false"
          style={{ visibility: "hidden" }}
          className="group absolute top-0 left-0 flex flex-col items-center gap-1 text-center transition-opacity duration-500 data-[on=false]:opacity-50"
        >
          <span
            className={`rounded-full border border-white/20 bg-navy/80 px-2.5 py-1 leading-tight font-semibold text-white/80 backdrop-blur transition-colors duration-500 group-data-[on=true]:border-orange group-data-[on=true]:text-white ${
              mobile ? "max-w-20 text-[9px]" : "max-w-28 text-[11px]"
            }`}
          >
            {text}
          </span>
          <span className="h-3 w-px bg-white/30 group-data-[on=true]:bg-orange" />
        </div>
      ))}
    </div>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const scroll = useScrollProgress();
  useFrame(({ pointer, clock }, d) => {
    if (!ref.current) return;
    ref.current.rotation.y = THREE.MathUtils.damp(
      ref.current.rotation.y,
      -0.3 + pointer.x * 0.15 + scroll.current.t * 0.25 + Math.sin(clock.elapsedTime * 0.25) * 0.03,
      2.5,
      d,
    );
    ref.current.rotation.x = THREE.MathUtils.damp(
      ref.current.rotation.x,
      0.16 - pointer.y * 0.05,
      2.5,
      d,
    );
  });
  return <group ref={ref}>{children}</group>;
}

/** Glass staircase charting the career growth a Zenvogo programme unlocks. */
export default function CareerGrowthScene({ labels = true }: { labels?: boolean }) {
  const mobile = useIsMobile();
  const labelEls = useRef<(HTMLDivElement | null)[]>([]);
  return (
    <>
      <SceneShell
        camera={{ position: [0, 0.6, 9], fov: 38 }}
        fallback={<StaticFallback src="/images/3d/glass-staircase.webp" alt="" />}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 6, 5]} intensity={1.6} />
        <pointLight position={[-4, 0, 3]} intensity={30} color="#ff4fb0" />
        <pointLight position={[4, 3, 3]} intensity={30} color="#5fb4ff" />
        <Rig>
          <FloorGlow />
          <GlassFrame position={[3.6, 0.2, -2.4]} size={[0.9, 2.2, 0.9]} color="#8fc1ff" />
          <GlassFrame position={[-3.4, 0.6, -2.2]} size={[0.9, 1.2, 0.9]} color="#ff7fc8" />
          {Array.from({ length: STEPS }, (_, i) => (
            <GlassStep key={i} i={i} />
          ))}
          <GrowthPath />
          <SummitFlag />
          {labels && <LabelAnchors els={labelEls} />}
        </Rig>
        <Sparkles
          count={mobile ? 15 : 35}
          scale={[9, 5, 3]}
          size={2}
          speed={0.3}
          color="#ffc2e6"
          opacity={0.6}
        />
      </SceneShell>
      {labels && <StepLabels els={labelEls} mobile={mobile} />}
    </>
  );
}
