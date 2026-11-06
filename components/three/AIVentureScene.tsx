"use client";

import { Edges, Environment, Float, Lightformer, RoundedBox, Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { SceneShell } from "./SceneShell";
import { StaticFallback } from "./StaticFallback";
import { useScrollProgress } from "./scroll";

const CHIP = 1.9; // chip width
const HALF = CHIP / 2;
const PINS_PER_SIDE = 7;
const NAVY_BG = new THREE.Color("#081d48");
const TRACE = new THREE.Color("#5c9cff");

/** Deterministic pseudo-random so the board is identical on every render. */
function rand(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

type Path = { pts: THREE.Vector3[]; lengths: number[]; total: number };

/** Circuit traces leaving every pin: straight, a 45° jog, then straight again. */
function useCircuit() {
  return useMemo(() => {
    const paths: Path[] = [];
    const sides = [
      { dir: new THREE.Vector3(1, 0, 0), perp: new THREE.Vector3(0, 0, 1) },
      { dir: new THREE.Vector3(-1, 0, 0), perp: new THREE.Vector3(0, 0, 1) },
      { dir: new THREE.Vector3(0, 0, 1), perp: new THREE.Vector3(1, 0, 0) },
      { dir: new THREE.Vector3(0, 0, -1), perp: new THREE.Vector3(1, 0, 0) },
    ];
    sides.forEach((side, si) => {
      for (let k = 0; k < PINS_PER_SIDE; k++) {
        const seed = si * 31 + k * 7;
        const offset = ((k + 0.5) / PINS_PER_SIDE - 0.5) * (CHIP - 0.3);
        const p0 = side.dir
          .clone()
          .multiplyScalar(HALF + 0.12)
          .addScaledVector(side.perp, offset);
        const p1 = p0.clone().addScaledVector(side.dir, 0.25 + rand(seed) * 0.6);
        const sign = offset >= 0 ? 1 : -1;
        const jog = 0.3 + rand(seed + 1) * 0.7;
        const p2 = p1
          .clone()
          .addScaledVector(side.dir, jog)
          .addScaledVector(side.perp, sign * jog);
        const p3 = p2.clone().addScaledVector(side.dir, 0.4 + rand(seed + 2) * 1.3);
        const pts = [p0, p1, p2, p3];
        const lengths = [0, p0.distanceTo(p1), p1.distanceTo(p2), p2.distanceTo(p3)];
        paths.push({ pts, lengths, total: lengths.reduce((a, b) => a + b, 0) });
      }
    });

    // Segments ordered by tier (all first legs, then second, then third) so the
    // draw range reveals the circuit growing outward from the chip.
    const pos: number[] = [];
    const col: number[] = [];
    const c = new THREE.Color();
    for (let tier = 0; tier < 3; tier++) {
      paths.forEach(({ pts }) => {
        for (const v of [pts[tier], pts[tier + 1]]) {
          pos.push(v.x, v.y, v.z);
          // Fade traces into the navy background with distance.
          const fade = THREE.MathUtils.clamp((v.length() - HALF) / 3.2, 0, 1);
          c.copy(TRACE).lerp(NAVY_BG, fade * 0.85);
          col.push(c.r, c.g, c.b);
        }
      });
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
    return { paths, geometry, vertexCount: pos.length / 3 };
  }, []);
}

function pointOnPath(path: Path, f: number, out: THREE.Vector3) {
  let d = f * path.total;
  for (let i = 1; i < path.pts.length; i++) {
    if (d <= path.lengths[i] || i === path.pts.length - 1) {
      return out.lerpVectors(path.pts[i - 1], path.pts[i], Math.min(1, d / path.lengths[i]));
    }
    d -= path.lengths[i];
  }
  return out;
}

/** Traces, end pads and data pulses flowing out from the chip. */
function Circuit({ mobile, reveal }: { mobile: boolean; reveal: React.RefObject<number> }) {
  const { paths, geometry, vertexCount } = useCircuit();
  const pads = useRef<THREE.InstancedMesh>(null);
  const pulses = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const pulseCount = mobile ? 14 : 28;
  const pulseData = useMemo(
    () =>
      Array.from({ length: pulseCount }, (_, i) => ({
        path: paths[Math.floor(rand(i + 3) * paths.length)],
        speed: 0.18 + rand(i + 9) * 0.3,
        offset: rand(i + 17),
      })),
    [paths, pulseCount],
  );

  useLayoutEffect(() => {
    const mesh = pads.current;
    if (!mesh) return;
    paths.forEach((p, i) => {
      dummy.position.copy(p.pts[3]);
      dummy.rotation.set(-Math.PI / 2, 0, 0);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [paths, dummy]);

  useFrame(({ clock }) => {
    const r = reveal.current;
    geometry.setDrawRange(0, Math.floor((vertexCount * r) / 2) * 2);
    if (pads.current) pads.current.visible = r > 0.95;
    const mesh = pulses.current;
    if (!mesh) return;
    mesh.visible = r > 0.95;
    pulseData.forEach((p, i) => {
      const f = (clock.elapsedTime * p.speed + p.offset) % 1;
      pointOnPath(p.path, f, tmp);
      dummy.position.set(tmp.x, 0.02, tmp.z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.setScalar(0.6 + Math.sin(f * Math.PI) * 0.8);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial vertexColors transparent opacity={0.9} />
      </lineSegments>
      <instancedMesh ref={pads} args={[undefined, undefined, paths.length]}>
        <ringGeometry args={[0.035, 0.065, 16]} />
        <meshBasicMaterial color="#8fc1ff" transparent opacity={0.7} side={THREE.DoubleSide} />
      </instancedMesh>
      <instancedMesh ref={pulses} args={[undefined, undefined, pulseCount]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshBasicMaterial color="#ffb21a" toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

/** The processor: metallic package, pins on every side and a glowing die. */
function Chip() {
  const die = useRef<THREE.MeshStandardMaterial>(null);
  const pins = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    const mesh = pins.current;
    if (!mesh) return;
    const d = new THREE.Object3D();
    let n = 0;
    for (let s = 0; s < 4; s++) {
      for (let k = 0; k < PINS_PER_SIDE; k++) {
        const offset = ((k + 0.5) / PINS_PER_SIDE - 0.5) * (CHIP - 0.3);
        const along = s < 2;
        const sign = s % 2 === 0 ? 1 : -1;
        d.position.set(
          along ? sign * (HALF + 0.06) : offset,
          -0.02,
          along ? offset : sign * (HALF + 0.06),
        );
        d.rotation.set(0, along ? 0 : Math.PI / 2, 0);
        d.updateMatrix();
        mesh.setMatrixAt(n++, d.matrix);
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame(({ clock }) => {
    if (die.current) die.current.emissiveIntensity = 1.1 + Math.sin(clock.elapsedTime * 2) * 0.35;
  });

  return (
    <group>
      <RoundedBox args={[CHIP, 0.22, CHIP]} radius={0.06} smoothness={4}>
        <meshPhysicalMaterial color="#0c2a63" metalness={0.75} roughness={0.25} clearcoat={1} />
      </RoundedBox>
      <instancedMesh ref={pins} args={[undefined, undefined, PINS_PER_SIDE * 4]}>
        <boxGeometry args={[0.16, 0.05, 0.07]} />
        <meshStandardMaterial color="#ffb21a" metalness={0.9} roughness={0.25} />
      </instancedMesh>
      {/* heat-spreader */}
      <RoundedBox args={[CHIP * 0.72, 0.06, CHIP * 0.72]} radius={0.03} position={[0, 0.13, 0]}>
        <meshPhysicalMaterial color="#dce8fb" metalness={0.9} roughness={0.18} clearcoat={1} />
      </RoundedBox>
      {/* glowing die */}
      <mesh position={[0, 0.17, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[CHIP * 0.42, CHIP * 0.42]} />
        <meshStandardMaterial
          ref={die}
          color="#0866d9"
          emissive="#0866d9"
          emissiveIntensity={1.2}
          toneMapped={false}
        />
        <Edges color="#ff6818" />
      </mesh>
      <pointLight position={[0, 0.6, 0]} color="#5c9cff" intensity={6} distance={4} />
    </group>
  );
}

/** Holographic layers hovering above the chip; they spread apart with scroll. */
function Hologram({ spread }: { spread: React.RefObject<number> }) {
  const layers = useRef<(THREE.Group | null)[]>([]);
  useFrame(({ clock }, d) => {
    layers.current.forEach((g, i) => {
      if (!g) return;
      const target = 0.55 + i * (0.22 + spread.current * 0.28);
      g.position.y = THREE.MathUtils.damp(g.position.y, target, 4, d);
      g.rotation.y = clock.elapsedTime * (0.25 + i * 0.12) * (i % 2 ? -1 : 1);
    });
  });
  const sizes = [1.3, 1.0, 0.7];
  return (
    <group>
      {sizes.map((s, i) => (
        <group key={i} ref={(g) => void (layers.current[i] = g)} position={[0, 0.55 + i * 0.22, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, Math.PI / 4]}>
            <planeGeometry args={[s, s]} />
            <meshBasicMaterial
              color={i === 2 ? "#ff6818" : "#5c9cff"}
              transparent
              opacity={i === 2 ? 0.35 : 0.12}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
            <Edges color={i === 2 ? "#ffb21a" : "#8fc1ff"} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** Small data cubes rising from the board and fading out, on a loop. */
function DataCubes({ count }: { count: number }) {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const cubes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const a = rand(i + 41) * Math.PI * 2;
        const r = 1.6 + rand(i + 43) * 1.6;
        return {
          x: Math.cos(a) * r,
          z: Math.sin(a) * r,
          speed: 0.15 + rand(i + 47) * 0.2,
          offset: rand(i + 53),
        };
      }),
    [count],
  );
  useFrame(({ clock }) => {
    cubes.forEach((c, i) => {
      const m = refs.current[i];
      if (!m) return;
      const f = (clock.elapsedTime * c.speed + c.offset) % 1;
      m.position.set(c.x, f * 2.2, c.z);
      m.rotation.set(f * 3, f * 4, 0);
      (m.material as THREE.MeshStandardMaterial).opacity = Math.sin(f * Math.PI) * 0.85;
    });
  });
  return (
    <>
      {cubes.map((_, i) => (
        <mesh key={i} ref={(m) => void (refs.current[i] = m)}>
          <boxGeometry args={[0.12, 0.12, 0.12]} />
          <meshStandardMaterial
            color={i % 3 ? "#8fc1ff" : "#ffb21a"}
            emissive={i % 3 ? "#0866d9" : "#ff6818"}
            emissiveIntensity={0.6}
            transparent
          />
        </mesh>
      ))}
    </>
  );
}

function Board({ mobile }: { mobile: boolean }) {
  const root = useRef<THREE.Group>(null);
  const scroll = useScrollProgress();
  const reveal = useRef(0);
  const spread = useRef(0);

  useFrame(({ pointer }, d) => {
    const t = scroll.current.t;
    // Circuit draws itself as the section scrolls in; layers lift apart towards the centre.
    const target = THREE.MathUtils.clamp((t + 0.45) / 0.35, 0, 1);
    reveal.current = THREE.MathUtils.damp(reveal.current, target, 3, d);
    spread.current = THREE.MathUtils.damp(spread.current, 1 - Math.min(1, Math.abs(t) * 2.5), 3, d);
    if (root.current) {
      root.current.rotation.y = THREE.MathUtils.damp(
        root.current.rotation.y,
        0.6 + t * 1.6 + pointer.x * 0.25,
        3,
        d,
      );
      root.current.rotation.x = THREE.MathUtils.damp(
        root.current.rotation.x,
        0.55 + t * 0.35 - pointer.y * 0.12,
        3,
        d,
      );
    }
  });

  return (
    <group ref={root} position={[0, -0.35, 0]}>
      <Circuit mobile={mobile} reveal={reveal} />
      <Float speed={1.4} floatIntensity={0.25} rotationIntensity={0}>
        <Chip />
        <Hologram spread={spread} />
      </Float>
      <DataCubes count={mobile ? 6 : 12} />
    </group>
  );
}

/** AI processor on a circuit board — represents AI startup incubation and innovation. */
export default function AIVentureScene() {
  const mobile = useIsMobile();
  return (
    <SceneShell
      camera={{ position: [0, 2.2, 7], fov: 42 }}
      fallback={<StaticFallback src="/images/3d/glass-staircase.webp" alt="" />}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 6, 4]} intensity={1.4} />
      <pointLight position={[-4, 2, 3]} intensity={20} color="#ff8a4c" />
      <Environment resolution={128} frames={1}>
        <Lightformer intensity={2} position={[0, 5, -2]} scale={[10, 3, 1]} />
        <Lightformer
          intensity={1.2}
          position={[-5, 1, 2]}
          rotation-y={Math.PI / 2}
          scale={[6, 4, 1]}
          color="#8fc1ff"
        />
        <Lightformer
          intensity={1}
          position={[5, 0, 2]}
          rotation-y={-Math.PI / 2}
          scale={[5, 3, 1]}
          color="#ff6818"
        />
      </Environment>
      <Board mobile={mobile} />
      <Sparkles
        count={mobile ? 12 : 30}
        scale={[9, 5, 6]}
        size={1.6}
        speed={0.3}
        color="#bcd8ff"
        opacity={0.5}
      />
    </SceneShell>
  );
}
