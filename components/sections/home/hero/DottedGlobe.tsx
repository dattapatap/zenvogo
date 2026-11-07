"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { globeDots } from "@/lib/data/globe-dots";
import { cn } from "@/lib/utils";

const DEG = Math.PI / 180;
/** Tips the north pole toward the viewer so the northern hemisphere reads better. */
const TILT = 16 * DEG;
/** One full turn every 90 seconds. */
const SPEED = (2 * Math.PI) / 90_000;
/** Redraw cap for the slow rotation (~24 fps). */
const FRAME_MS = 1000 / 24;
/** Longitude facing the viewer at rest (India / Middle East / Europe). */
const FACE_LON = 50;

const INDIA: [number, number] = [20.6, 78.9];
const ROUTES: [number, number][] = [
  [51.5, -0.1], // London
  [25.2, 55.3], // Dubai
  [3.1, 101.7], // Kuala Lumpur
];

type Vec = [number, number, number];

const toVec = (lat: number, lon: number): Vec => [
  Math.cos(lat * DEG) * Math.sin(lon * DEG),
  Math.sin(lat * DEG),
  Math.cos(lat * DEG) * Math.cos(lon * DEG),
];

/** Great-circle points between two coordinates, lifted off the surface mid-way. */
function arc(a: [number, number], b: [number, number], steps = 48): Vec[] {
  const p = toVec(...a);
  const q = toVec(...b);
  const omega = Math.acos(Math.min(1, p[0] * q[0] + p[1] * q[1] + p[2] * q[2]));
  const out: Vec[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const s1 = Math.sin((1 - t) * omega) / Math.sin(omega);
    const s2 = Math.sin(t * omega) / Math.sin(omega);
    const lift = 1 + 0.12 * Math.sin(Math.PI * t);
    out.push([
      (p[0] * s1 + q[0] * s2) * lift,
      (p[1] * s1 + q[1] * s2) * lift,
      (p[2] * s1 + q[2] * s2) * lift,
    ]);
  }
  return out;
}

/** Slowly rotating dotted globe drawn on a 2D canvas; pauses off-screen and for reduced motion. */
export function DottedGlobe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const n = globeDots.length / 2;
    const vecs = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const [x, y, z] = toVec(globeDots[i * 2], globeDots[i * 2 + 1]);
      vecs.set([x, y, z], i * 3);
    }
    const routes = ROUTES.map((dest) => arc(INDIA, dest));

    const cosT = Math.cos(TILT);
    const sinT = Math.sin(TILT);
    let size = 0;
    let dpr = 1;
    let angle = -FACE_LON * DEG;
    let last = 0;
    let frame = 0;
    let visible = true;

    const project = (x: number, y: number, z: number, cosA: number, sinA: number) => {
      const rx = x * cosA + z * sinA;
      const rz = -x * sinA + z * cosA;
      return [rx, y * cosT - rz * sinT, y * sinT + rz * cosT] as const;
    };

    const draw = () => {
      if (!size) return;
      const r = size * 0.48;
      const c = size / 2;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);

      // Glassy sphere body
      const body = ctx.createRadialGradient(c - r * 0.35, c - r * 0.4, r * 0.1, c, c, r);
      body.addColorStop(0, "rgba(255,255,255,0.9)");
      body.addColorStop(0.7, "rgba(206,224,251,0.55)");
      body.addColorStop(1, "rgba(8,102,217,0.2)");
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(c, c, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(8,102,217,0.14)";
      ctx.lineWidth = 1;
      ctx.stroke();

      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const dot = Math.max(1.2, size / 300);

      ctx.fillStyle = "#0866d9";
      for (let i = 0; i < n; i++) {
        const [x, y, z] = project(vecs[i * 3], vecs[i * 3 + 1], vecs[i * 3 + 2], cosA, sinA);
        if (z <= 0.02) continue;
        ctx.globalAlpha = 0.18 + z * 0.6;
        const s = dot * (0.75 + z * 0.55);
        ctx.fillRect(c + x * r - s / 2, c - y * r - s / 2, s, s);
      }

      // Routes from India to immersion destinations
      ctx.lineWidth = Math.max(1, size / 420);
      ctx.strokeStyle = "#ff6818";
      for (const pts of routes) {
        let started = false;
        ctx.beginPath();
        for (const [px, py, pz] of pts) {
          const [x, y, z] = project(px, py, pz, cosA, sinA);
          if (z < 0) {
            started = false;
            continue;
          }
          if (started) ctx.lineTo(c + x * r, c - y * r);
          else ctx.moveTo(c + x * r, c - y * r);
          started = true;
        }
        ctx.globalAlpha = 0.55;
        ctx.stroke();
        const [ex, ey, ez] = project(...pts[pts.length - 1], cosA, sinA);
        if (ez > 0) {
          ctx.globalAlpha = 0.9;
          ctx.fillStyle = "#ff6818";
          ctx.beginPath();
          ctx.arc(c + ex * r, c - ey * r, dot * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      // One turn takes 90s, so 24 fps looks identical to 60 fps at well under half the CPU.
      if (last && now - last < FRAME_MS) return;
      if (last) angle += (now - last) * SPEED;
      last = now;
      draw();
    };
    const start = () => {
      if (frame || reduce || !visible) return;
      last = 0;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const ro = new ResizeObserver(([entry]) => {
      size = entry.contentRect.width;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      draw();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    draw();
    start();
    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
    };
  }, [reduce]);

  return <canvas ref={canvasRef} aria-hidden className={cn("aspect-square", className)} />;
}
