"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { SceneShell } from "./SceneShell";
import { useScrollProgress } from "./scroll";

const waveShader = {
  uniforms: { uTime: { value: 0 }, uScroll: { value: 0 } },
  vertexShader: /* glsl */ `
    uniform float uTime;
    uniform float uScroll;
    varying float vH;
    varying float vX;
    void main() {
      vec3 p = position;
      float h = sin(p.x * 0.45 + uTime * 0.8 + uScroll) * 0.45
              + cos(p.z * 0.6 + uTime * 0.6) * 0.35
              + sin((p.x + p.z) * 0.3 + uTime) * 0.25;
      p.y += h;
      vH = h;
      vX = p.x;
      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      gl_PointSize = (2.6 + h * 1.5) * (12.0 / -mv.z);
      gl_Position = projectionMatrix * mv;
    }`,
  fragmentShader: /* glsl */ `
    varying float vH;
    varying float vX;
    void main() {
      vec2 c = gl_PointCoord - 0.5;
      if (length(c) > 0.5) discard;
      vec3 blue = vec3(0.031, 0.4, 0.851);
      vec3 sky = vec3(0.56, 0.76, 1.0);
      vec3 col = mix(blue, sky, smoothstep(-12.0, 12.0, vX));
      float a = 0.25 + (vH + 1.0) * 0.25;
      gl_FragColor = vec4(col, a);
    }`,
};

function Wave() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const scroll = useScrollProgress();
  const geometry = useMemo(() => {
    const cols = 120;
    const rows = 50;
    const pos = new Float32Array(cols * rows * 3);
    let i = 0;
    for (let x = 0; x < cols; x++) {
      for (let z = 0; z < rows; z++) {
        pos[i++] = (x - cols / 2) * 0.22;
        pos[i++] = 0;
        pos[i++] = (z - rows / 2) * 0.22;
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  useFrame((_, d) => {
    if (mat.current) {
      mat.current.uniforms.uTime.value += d;
      // Scrolling pushes the wave forward.
      const u = mat.current.uniforms.uScroll;
      u.value = THREE.MathUtils.damp(u.value, scroll.current.value * 8, 4, d);
    }
  });

  return (
    <points geometry={geometry} position={[0, -1.6, -2]} rotation={[0.25, 0, 0]}>
      <shaderMaterial
        ref={mat}
        args={[waveShader]}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Animated particle wave used behind inner-page heroes. */
export default function WaveField({ crystal = false }: { crystal?: boolean }) {
  // crystal is permanently disabled across all pages
  void crystal;
  return (
    <SceneShell camera={{ position: [0, 1.2, 7], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 4, 4]} intensity={50} color="#8fc1ff" />
      <pointLight position={[-4, -2, 3]} intensity={30} color="#ff8a4c" />
      <Wave />
    </SceneShell>
  );
}
