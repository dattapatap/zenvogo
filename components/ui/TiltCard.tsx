"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utils";

type Props = { className?: string; children: React.ReactNode; intensity?: number };

/** A white card that tilts gently in 3D toward the pointer, with a soft blue glow. */
export function TiltCard({ className, children, intensity = 6 }: Props) {
  const reduce = useReducedMotion();
  const rx = useSpring(0, { stiffness: 220, damping: 22 });
  const ry = useSpring(0, { stiffness: 220, damping: 22 });
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const glow = useMotionTemplate`radial-gradient(380px circle at ${mx}% ${my}%, rgb(8 102 217 / 0.08), transparent 60%)`;

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px * 100);
    my.set(py * 100);
    if (reduce) return;
    ry.set((px - 0.5) * intensity);
    rx.set(-(py - 0.5) * intensity);
  }

  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <div className="h-full [perspective:1200px]">
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry }}
        className={cn("group relative h-full card-hover overflow-hidden card", className)}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glow }}
        />
        <div className="relative h-full">{children}</div>
      </motion.div>
    </div>
  );
}
