"use client";

import Image from "next/image";
import { motion, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * 3D AI Ventures Visual:
 * AI Processor Base with Incubating Idea Lightbulb, Golden Growth Sprout,
 * and Orbiting Holographic Venture Badges (Launch, Funding, Mentorship, Partnerships).
 */
export default function AIVentureScene({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const rx = useSpring(0, { stiffness: 180, damping: 22 });
  const ry = useSpring(0, { stiffness: 180, damping: 22 });

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 10);
    rx.set(-(py - 0.5) * 10);
  }

  function onPointerLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center [perspective:1000px]",
        className,
      )}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {/* ── Interactive 3D Floating Stage ── */}
      <motion.div
        style={{ rotateX: rx, rotateY: ry }}
        className="relative z-10 flex h-full w-full items-center justify-center"
      >
        {/* Floating Levitation Wrapper */}
        <div className="relative aspect-[1038/744] max-h-full w-full animate-float">
          {/* Transparent 3D AI Ventures Illustration */}
          <div className="relative h-full w-full">
            <Image
              src="/images/3d/ai-ventures.png"
              alt="Zenvogo AI Ventures: Idea Incubation, Funding & Growth"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 650px"
              className="object-contain"
            />
          </div>
        </div>
      </motion.div>

      {/* ── Floating Ambient Sparkles ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute top-1/4 left-1/6 size-1.5 animate-pulse rounded-full bg-sky-300 shadow-[0_0_8px_#5c9cff]" />
        <span className="absolute top-1/3 right-1/5 size-2 animate-ping rounded-full bg-amber-400 opacity-60 shadow-[0_0_10px_#ffb21a]" />
        <span className="absolute bottom-1/5 left-1/4 size-1.5 animate-pulse rounded-full bg-orange shadow-[0_0_6px_#ff6818]" />
      </div>
    </div>
  );
}
