"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ComponentType } from "react";

/**
 * WebGL scenes are code-split, client-only, and *deferred*: the three.js bundle (~250 KB)
 * is only downloaded once the page has finished loading, the browser is idle, and the
 * scene is within ~300px of the viewport. Until then a soft brand glow holds its place.
 * This keeps three.js out of the initial load (PageSpeed: unused JS / main-thread work).
 */
const Glow = () => (
  <div className="absolute inset-0 grid place-items-center" aria-hidden>
    <div className="size-[55%] animate-pulse rounded-full bg-blue/20 blur-3xl" />
  </div>
);

function deferred<P extends object>(load: () => Promise<{ default: ComponentType<P> }>) {
  const Scene = dynamic(load, { ssr: false, loading: Glow });

  function DeferredScene(props: P) {
    const ref = useRef<HTMLDivElement>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      let io: IntersectionObserver | undefined;
      let idle: number | undefined;
      let timer: ReturnType<typeof setTimeout> | undefined;

      const watch = () => {
        io = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setReady(true);
              io?.disconnect();
            }
          },
          { rootMargin: "300px 0px" },
        );
        io.observe(el);
      };
      const whenIdle = () => {
        if ("requestIdleCallback" in window) idle = requestIdleCallback(watch, { timeout: 2500 });
        else timer = setTimeout(watch, 1200);
      };

      if (document.readyState === "complete") whenIdle();
      else window.addEventListener("load", whenIdle, { once: true });

      return () => {
        window.removeEventListener("load", whenIdle);
        if (idle !== undefined) cancelIdleCallback(idle);
        if (timer !== undefined) clearTimeout(timer);
        io?.disconnect();
      };
    }, []);

    if (ready) return <Scene {...props} />;
    return (
      <div ref={ref} className="absolute inset-0">
        <Glow />
      </div>
    );
  }

  return DeferredScene;
}

export const HeroEducationScene = deferred(() => import("./HeroEducationScene"));
export const CareerGrowthScene = deferred(() => import("./CareerGrowthScene"));
export const GlobalEducationScene = deferred(() => import("./GlobalEducationScene"));
export const WaveField = deferred(() => import("./WaveField"));
export const Orb = deferred(() => import("./Orb"));
export const MasteryScene = deferred(() => import("./MasteryScene"));

/** Not WebGL (an illustration with light motion), so it only needs code-splitting. */
export const AIVentureScene = dynamic(() => import("./AIVentureScene"), {
  ssr: false,
  loading: Glow,
});
