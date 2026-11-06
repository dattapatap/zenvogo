"use client";

import { Float, Line, Sparkles } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import landTopology from "world-atlas/land-110m.json";
import { globalNetwork } from "@/lib/data/content";
import { SceneShell } from "./SceneShell";
import { StaticFallback } from "./StaticFallback";
import { useScrollProgress } from "./scroll";

const R = 2;
// Brand palette
const BLUE = new THREE.Color("#0866d9");
const SKY = new THREE.Color("#8fc1ff");
const ORANGE = new THREE.Color("#ff6818");
const GOLD = new THREE.Color("#ffb21a");

type Theme = "dark" | "light";

/** Colours per background: glowing on navy, solid and crisp on white. */
const palettes = {
  dark: {
    dotFrom: BLUE,
    dotTo: SKY,
    dotOpacity: 0.85,
    blending: THREE.AdditiveBlending,
    sphere: { color: "#061637", emissive: "#0a2a6b", emissiveIntensity: 0.45 },
    atmosphere: new THREE.Color("#2f86ff"),
    atmosphereStrength: 0.75,
    marker: GOLD,
    arcA: "#8fc1ff",
    arcB: "#ff8a4c",
    pulse: "#ffffff",
    orbitA: "#8fc1ff",
    sparkles: "#bcd8ff",
  },
  light: {
    dotFrom: new THREE.Color("#0b4fae"),
    dotTo: new THREE.Color("#3d8bff"),
    dotOpacity: 0.9,
    blending: THREE.NormalBlending,
    sphere: { color: "#eef4ff", emissive: "#dbe8fc", emissiveIntensity: 0.35 },
    atmosphere: new THREE.Color("#5c9cff"),
    atmosphereStrength: 0.45,
    marker: BLUE,
    arcA: "#0866d9",
    arcB: "#ff6818",
    pulse: "#081d48",
    orbitA: "#0866d9",
    sparkles: "#0866d9",
  },
  /** Light background with the classic blue map globe: warm arcs read on the blue. */
  map: {
    dotFrom: new THREE.Color("#0b4fae"),
    dotTo: new THREE.Color("#3d8bff"),
    dotOpacity: 0.9,
    blending: THREE.NormalBlending,
    sphere: { color: "#0b5ad6", emissive: "#0a3fae", emissiveIntensity: 0.3 },
    atmosphere: new THREE.Color("#3d8bff"),
    atmosphereStrength: 0.25,
    marker: GOLD,
    arcA: "#ffb21a",
    arcB: "#ff6818",
    pulse: "#ffffff",
    orbitA: "#0866d9",
    sparkles: "#0866d9",
  },
} as const;

const ThemeContext = createContext<Theme | "map">("dark");
const usePalette = () => palettes[useContext(ThemeContext)];

function latLng(lat: number, lng: number, r = R) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

/* ── Dotted shell: evenly spaced points on a sphere (Fibonacci lattice) ── */
function DotShell({ count = 2800 }) {
  const pal = usePalette();
  const geometry = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const t = golden * i;
      pos.set([Math.cos(t) * rad * R * 1.005, y * R * 1.005, Math.sin(t) * rad * R * 1.005], i * 3);
      c.copy(pal.dotFrom).lerp(pal.dotTo, (y + 1) / 2);
      col.set([c.r, c.g, c.b], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return g;
  }, [count, pal]);

  return (
    <points geometry={geometry}>
      <pointsMaterial
        size={0.034}
        vertexColors
        transparent
        opacity={pal.dotOpacity}
        depthWrite={false}
        blending={pal.blending}
      />
    </points>
  );
}

/* ── Classic map globe: blue oceans, light continents, white graticule ── */
const MAP_W = 2048;
const MAP_H = 1024;

function drawWorldMap() {
  const canvas = document.createElement("canvas");
  canvas.width = MAP_W;
  canvas.height = MAP_H;
  const ctx = canvas.getContext("2d")!;
  const x = (lng: number) => ((lng + 180) / 360) * MAP_W;
  const y = (lat: number) => ((90 - lat) / 180) * MAP_H;

  // Ocean
  const ocean = ctx.createLinearGradient(0, 0, 0, MAP_H);
  ocean.addColorStop(0, "#0a3fae");
  ocean.addColorStop(0.5, "#0b5ad6");
  ocean.addColorStop(1, "#0a3fae");
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, MAP_W, MAP_H);

  // Continents
  const topology = landTopology as unknown as Topology<{ land: GeometryCollection }>;
  const land = feature(topology, topology.objects.land) as unknown as {
    features: { geometry: { type: string; coordinates: number[][][] | number[][][][] } }[];
  };
  ctx.beginPath();
  for (const f of land.features) {
    const polys =
      f.geometry.type === "Polygon"
        ? [f.geometry.coordinates as number[][][]]
        : (f.geometry.coordinates as number[][][][]);
    for (const rings of polys) {
      for (const ring of rings) {
        // Unwrap longitudes so rings crossing the antimeridian stay continuous.
        const pts: [number, number][] = [];
        let prev = ring[0][0];
        let shift = 0;
        for (const [lng, lat] of ring) {
          if (lng - prev > 180) shift -= 360;
          else if (prev - lng > 180) shift += 360;
          prev = lng;
          pts.push([lng + shift, lat]);
        }
        // A ring that encircles a pole (Antarctica) is closed through the pole.
        const first = pts[0];
        const last = pts[pts.length - 1];
        if (Math.abs(last[0] - first[0]) > 180) {
          const pole = first[1] < 0 ? -90 : 90;
          pts.push([last[0], pole], [first[0], pole]);
        }
        // Draw wrapped copies so shapes spilling past ±180° appear on the other edge.
        for (const off of [-360, 0, 360]) {
          pts.forEach(([lng, lat], i) =>
            i ? ctx.lineTo(x(lng + off), y(lat)) : ctx.moveTo(x(lng + off), y(lat)),
          );
          ctx.closePath();
        }
      }
    }
  }
  const landFill = ctx.createLinearGradient(0, 0, 0, MAP_H);
  landFill.addColorStop(0, "#d4e9ff");
  landFill.addColorStop(0.5, "#a6d0ff");
  landFill.addColorStop(1, "#d4e9ff");
  ctx.fillStyle = landFill;
  ctx.fill("evenodd");
  ctx.strokeStyle = "rgba(255,255,255,0.55)";
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // Graticule: every 15°
  ctx.strokeStyle = "rgba(255,255,255,0.85)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let lat = -75; lat <= 75; lat += 15) {
    ctx.moveTo(0, y(lat));
    ctx.lineTo(MAP_W, y(lat));
  }
  for (let lng = -180; lng < 180; lng += 15) {
    ctx.moveTo(x(lng), 0);
    ctx.lineTo(x(lng), MAP_H);
  }
  ctx.stroke();

  return canvas;
}

const mapShader = {
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vView;
    void main() {
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vView = normalize(-mv.xyz);
      gl_Position = projectionMatrix * mv;
    }`,
  fragmentShader: /* glsl */ `
    uniform sampler2D uMap;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vView;
    void main() {
      vec3 base = texture2D(uMap, vUv).rgb;
      vec3 N = normalize(vNormal);
      vec3 V = normalize(vView);
      // Key light from the upper left, fixed to the camera like a studio shot.
      vec3 L = normalize(vec3(-0.55, 0.6, 0.75));
      float diff = clamp(dot(N, L), 0.0, 1.0);
      float rim = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 2.2);
      vec3 col = base * (0.62 + 0.55 * diff);
      col = mix(col, col * vec3(0.35, 0.45, 0.75), rim * 0.85);
      float spec = pow(clamp(dot(N, normalize(L + V)), 0.0, 1.0), 28.0);
      col += vec3(0.85, 0.92, 1.0) * spec * 0.35;
      gl_FragColor = vec4(col, 1.0);
    }`,
};

function MapSurface() {
  const gl = useThree((s) => s.gl);
  const texture = useMemo(() => {
    const t = new THREE.CanvasTexture(drawWorldMap());
    t.anisotropy = gl.capabilities.getMaxAnisotropy();
    return t;
  }, [gl]);
  const uniforms = useMemo(() => ({ uMap: { value: texture } }), [texture]);
  useEffect(() => () => texture.dispose(), [texture]);

  return (
    <mesh>
      <sphereGeometry args={[R, 96, 96]} />
      <shaderMaterial args={[mapShader]} uniforms={uniforms} />
    </mesh>
  );
}

/* ── Fresnel atmosphere glow ── */
const atmosphereShader = {
  uniforms: { uColor: { value: new THREE.Color("#2f86ff") }, uStrength: { value: 0.75 } },
  vertexShader: /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vView;
    void main() {
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      vNormal = normalize(normalMatrix * normal);
      vView = normalize(-mv.xyz);
      gl_Position = projectionMatrix * mv;
    }`,
  fragmentShader: /* glsl */ `
    uniform vec3 uColor;
    uniform float uStrength;
    varying vec3 vNormal;
    varying vec3 vView;
    void main() {
      float f = pow(1.0 - abs(dot(vNormal, vView)), 3.0);
      gl_FragColor = vec4(uColor, f * uStrength);
    }`,
};

function Atmosphere() {
  const pal = usePalette();
  const uniforms = useMemo(
    () => ({
      uColor: { value: pal.atmosphere.clone() },
      uStrength: { value: pal.atmosphereStrength },
    }),
    [pal],
  );
  return (
    <mesh scale={1.18}>
      <sphereGeometry args={[R, 64, 64]} />
      <shaderMaterial
        args={[atmosphereShader]}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.BackSide}
        blending={pal.blending}
      />
    </mesh>
  );
}

/* ── Destination marker with an expanding pulse ring ── */
function Marker({
  position,
  hub,
  seed = 0,
}: {
  position: THREE.Vector3;
  hub?: boolean;
  seed?: number;
}) {
  const ring = useRef<THREE.Mesh>(null);
  const pal = usePalette();
  const offset = seed * 0.37;
  const quaternion = useMemo(
    () =>
      new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        position.clone().normalize(),
      ),
    [position],
  );

  useFrame(({ clock }) => {
    if (!ring.current) return;
    const t = (clock.elapsedTime * 0.8 + offset) % 1;
    ring.current.scale.setScalar(1 + t * 2.5);
    (ring.current.material as THREE.MeshBasicMaterial).opacity = 0.8 * (1 - t);
  });

  return (
    <group position={position} quaternion={quaternion}>
      <mesh>
        <sphereGeometry args={[hub ? 0.055 : 0.035, 16, 16]} />
        <meshBasicMaterial color={hub ? ORANGE : pal.marker} toneMapped={false} />
      </mesh>
      <mesh ref={ring}>
        <ringGeometry args={[0.05, 0.065, 32]} />
        <meshBasicMaterial
          color={hub ? ORANGE : pal.marker}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* ── Flight arc with an animated dash and a travelling pulse ── */
function Arc({ from, to, index }: { from: THREE.Vector3; to: THREE.Vector3; index: number }) {
  const { points, curve } = useMemo(() => {
    const mid = from.clone().add(to).multiplyScalar(0.5);
    const lift = 1 + from.distanceTo(to) * 0.28;
    mid.normalize().multiplyScalar(R * lift);
    const c = new THREE.QuadraticBezierCurve3(from, mid, to);
    return { points: c.getPoints(64), curve: c };
  }, [from, to]);

  const pal = usePalette();
  const line = useRef<{ material: { dashOffset: number } }>(null);
  const pulse = useRef<THREE.Mesh>(null);
  const speed = 0.18 + (index % 4) * 0.04;

  useFrame(({ clock }, delta) => {
    if (line.current) line.current.material.dashOffset -= delta * 0.6;
    if (pulse.current) {
      const t = (clock.elapsedTime * speed + index * 0.17) % 1;
      pulse.current.position.copy(curve.getPoint(t));
    }
  });

  return (
    <group>
      <Line
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={line as any}
        points={points}
        color={index % 2 ? pal.arcA : pal.arcB}
        lineWidth={1.2}
        transparent
        opacity={0.6}
        dashed
        dashSize={0.18}
        gapSize={0.1}
      />
      <mesh ref={pulse}>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshBasicMaterial color={pal.pulse} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ── Tilted orbit rings with small "satellites" ── */
function Orbit({
  radius,
  tilt,
  speed,
  color,
}: {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  color: string;
}) {
  const sat = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (sat.current) sat.current.rotation.z += d * speed;
  });
  return (
    <group rotation={tilt}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.004, 8, 200]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} toneMapped={false} />
      </mesh>
      <group ref={sat} rotation={[Math.PI / 2, 0, 0]}>
        <mesh position={[radius, 0, 0]}>
          <octahedronGeometry args={[0.07]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
        </mesh>
      </group>
    </group>
  );
}

/* ── Floating academic symbols orbiting the globe ── */
function MiniCap({ color }: { color: string }) {
  return (
    <group>
      <mesh rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[0.5, 0.03, 0.5]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.25} />
      </mesh>
      <mesh position={[0, -0.09, 0]}>
        <cylinderGeometry args={[0.15, 0.17, 0.16, 24]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.25} />
      </mesh>
      <mesh position={[0.2, -0.08, 0.12]}>
        <cylinderGeometry args={[0.008, 0.008, 0.16, 6]} />
        <meshStandardMaterial color="#ffb21a" emissive="#ffb21a" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

function MiniBook({ color }: { color: string }) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.46, 0.09, 0.34]} />
        <meshStandardMaterial color={color} metalness={0.45} roughness={0.3} />
      </mesh>
      <mesh position={[0.02, 0, 0]}>
        <boxGeometry args={[0.44, 0.07, 0.32]} />
        <meshStandardMaterial color="#f4f7fc" />
      </mesh>
    </group>
  );
}

function Floaters() {
  const ring = useRef<THREE.Group>(null);
  const scroll = useScrollProgress();
  const base = useRef(0);
  useFrame((_, d) => {
    base.current += d * 0.12;
    if (ring.current) ring.current.rotation.y = base.current + scroll.current.t * 2.5;
  });
  const items = [
    { kind: "cap", color: "#0866d9", angle: 0.3, y: 1.6 },
    { kind: "book", color: "#ff6818", angle: 2.0, y: -1.3 },
    { kind: "cap", color: "#ffb21a", angle: 3.6, y: 0.9 },
    { kind: "book", color: "#0866d9", angle: 5.1, y: -0.4 },
  ] as const;
  return (
    <group ref={ring}>
      {items.map((it, i) => (
        <Float key={i} speed={1.5 + i * 0.2} rotationIntensity={0.8} floatIntensity={0.8}>
          <group
            position={[Math.cos(it.angle) * 3.1, it.y, Math.sin(it.angle) * 3.1]}
            rotation={[0.3, it.angle, 0.15]}
          >
            {it.kind === "cap" ? <MiniCap color={it.color} /> : <MiniBook color={it.color} />}
          </group>
        </Float>
      ))}
    </group>
  );
}

function Globe() {
  const group = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const scrollSpin = useRef<THREE.Group>(null);
  const scroll = useScrollProgress();
  const pal = usePalette();
  const theme = useContext(ThemeContext);

  const { hub, others } = useMemo(() => {
    const pts = globalNetwork.map((d) => ({ ...d, v: latLng(d.lat, d.lng) }));
    return { hub: pts.find((p) => p.hub)!, others: pts.filter((p) => !p.hub) };
  }, []);

  useFrame(({ pointer }, delta) => {
    const t = scroll.current.t;
    if (spin.current) spin.current.rotation.y += delta * 0.04;
    // Scrolling turns the globe and tips it forward, like travelling across it.
    if (scrollSpin.current) {
      scrollSpin.current.rotation.y = THREE.MathUtils.damp(
        scrollSpin.current.rotation.y,
        t * 3.2,
        4,
        delta,
      );
    }
    if (group.current) {
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        0.3 + t * 0.6 - pointer.y * 0.2,
        3,
        delta,
      );
      group.current.rotation.z = THREE.MathUtils.damp(
        group.current.rotation.z,
        pointer.x * 0.12,
        3,
        delta,
      );
      group.current.position.x = THREE.MathUtils.damp(
        group.current.position.x,
        pointer.x * 0.25,
        2,
        delta,
      );
      const s = 1 - Math.min(0.18, Math.abs(t) * 0.3);
      group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, s, 4, delta));
    }
  });

  return (
    <group ref={group} rotation={[0.3, 0, 0]}>
      <group ref={scrollSpin}>
        <group ref={spin} rotation={[0, -2.7, 0]}>
          {theme === "map" ? (
            <MapSurface />
          ) : (
            <>
              <mesh>
                <sphereGeometry args={[R * 0.99, 64, 64]} />
                {theme === "light" ? (
                  <meshBasicMaterial color="#f6f9ff" toneMapped={false} />
                ) : (
                  <meshStandardMaterial {...pal.sphere} roughness={0.9} />
                )}
              </mesh>
              <DotShell />
            </>
          )}
          <Marker position={hub.v} hub />
          {others.map((d, i) => (
            <group key={d.name}>
              <Marker position={d.v} seed={i + 1} />
              <Arc from={hub.v} to={d.v} index={i} />
            </group>
          ))}
        </group>
      </group>
      <Atmosphere />
      <Orbit radius={2.75} tilt={[0.25, 0, 0.35]} speed={0.5} color={pal.orbitA} />
      <Orbit radius={3.15} tilt={[0.65, 0, -0.45]} speed={-0.35} color="#ff6818" />
    </group>
  );
}

/* ── Original hero accents: a few floating geometric shapes that drift with scroll ── */
function HeroFloaters() {
  const ref = useRef<THREE.Group>(null);
  const scroll = useScrollProgress();
  useFrame((_, d) => {
    if (!ref.current) return;
    const t = scroll.current.t;
    ref.current.rotation.z = THREE.MathUtils.damp(ref.current.rotation.z, t * 0.8, 3, d);
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, t * 2, 3, d);
  });
  return (
    <group ref={ref}>
      <Float speed={1.6} rotationIntensity={1.2} floatIntensity={1.4}>
        <mesh position={[-2.35, 2.0, -0.5]}>
          <icosahedronGeometry args={[0.32, 0]} />
          <meshStandardMaterial
            color="#0866d9"
            emissive="#06306e"
            emissiveIntensity={0.6}
            metalness={0.6}
            roughness={0.25}
            flatShading
          />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={1} floatIntensity={1.6}>
        <mesh position={[2.5, 1.9, -1.2]}>
          <octahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial
            color="#ff6818"
            emissive="#a33a05"
            emissiveIntensity={0.6}
            flatShading
          />
        </mesh>
      </Float>
      <Float speed={1.3} rotationIntensity={1.6} floatIntensity={1.1}>
        <mesh position={[2.6, -1.7, 0.4]}>
          <torusGeometry args={[0.24, 0.07, 24, 64]} />
          <meshStandardMaterial
            color="#ffb21a"
            emissive="#8a5a00"
            emissiveIntensity={0.5}
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
      </Float>
    </group>
  );
}

/**
 * Interactive globe with arcs from India to partner cities.
 * `variant="hero"` uses the original geometric accents; the default adds
 * orbiting academic symbols (caps and books).
 */
export default function GlobalEducationScene({
  variant = "network",
  theme = "dark",
  surface = variant === "hero" ? "map" : "dots",
}: {
  variant?: "hero" | "network";
  /** `light` for white backgrounds. */
  theme?: Theme;
  /** `map` draws blue oceans with continents and a grid; `dots` is the dotted shell. */
  surface?: "map" | "dots";
}) {
  const hero = variant === "hero";
  const pal = palettes[theme];
  return (
    <SceneShell
      camera={{ position: [0, 0, hero ? 8 : 8.6], fov: 45 }}
      fallback={<StaticFallback src="/images/3d/education-platform.webp" alt="" />}
    >
      <ThemeContext.Provider value={surface === "map" ? "map" : theme}>
        <ambientLight intensity={theme === "light" ? 1.2 : 0.4} />
        <pointLight
          position={[5, 4, 5]}
          intensity={60}
          color={theme === "light" ? "#ffffff" : "#8fc1ff"}
        />
        <pointLight
          position={[-5, -3, 3]}
          intensity={40}
          color={theme === "light" ? "#cfe3ff" : "#ff8a4c"}
        />
        <Globe />
        {hero ? <HeroFloaters /> : <Floaters />}
      </ThemeContext.Provider>
      <Sparkles
        count={40}
        scale={[11, 7, 4]}
        size={2.2}
        speed={0.35}
        color={pal.sparkles}
        opacity={theme === "light" ? 0.35 : 0.6}
      />
    </SceneShell>
  );
}
