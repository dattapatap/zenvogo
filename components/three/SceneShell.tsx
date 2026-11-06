"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { useWebGL } from "@/hooks/useWebGL";
import { cn } from "@/lib/utils";
import { ScrollContext, type ScrollState } from "./scroll";

type Props = Omit<CanvasProps, "frameloop" | "dpr"> & {
  className?: string;
  /** Rendered instead of the canvas when WebGL isn't available. */
  fallback?: React.ReactNode;
};

/**
 * Canvas wrapper that:
 *  - tracks the user's scroll position and exposes it to the scene (`useScrollProgress`),
 *  - only animates while on screen (saves battery/GPU),
 *  - renders at a lower resolution on mobile,
 *  - renders a single still frame for users who prefer reduced motion,
 *  - shows a static fallback when WebGL isn't supported.
 */
export function SceneShell({ className, children, fallback, ...props }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = useRef<ScrollState>({ value: 0, t: 0 });
  const [visible, setVisible] = useState(false);
  const reduce = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const webgl = useWebGL();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "120px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let center: number | null = null;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const value = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      // Scenes visible at load keep their initial pose; others are "neutral" mid-viewport.
      if (center === null) center = value > 0 ? value : 0.5;
      scroll.current.value = value;
      scroll.current.t = value - center;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={cn("absolute inset-0", className)} aria-hidden>
      {webgl === false
        ? fallback
        : webgl && (
            <Canvas
              dpr={mobile ? [1, 1.25] : [1, 1.75]}
              gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
              frameloop={reduce ? "demand" : visible ? "always" : "never"}
              {...props}
            >
              <ScrollContext.Provider value={scroll}>{children}</ScrollContext.Provider>
            </Canvas>
          )}
    </div>
  );
}
