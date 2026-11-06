"use client";

import dynamic from "next/dynamic";

/**
 * WebGL scenes are code-split and loaded client-side only, after the page shell,
 * so they never block the first paint. Each placeholder is a soft brand glow.
 */
const Glow = () => (
  <div className="absolute inset-0 grid place-items-center" aria-hidden>
    <div className="size-[55%] animate-pulse rounded-full bg-blue/20 blur-3xl" />
  </div>
);

export const HeroEducationScene = dynamic(() => import("./HeroEducationScene"), {
  ssr: false,
  loading: Glow,
});
export const CareerGrowthScene = dynamic(() => import("./CareerGrowthScene"), {
  ssr: false,
  loading: Glow,
});
export const GlobalEducationScene = dynamic(() => import("./GlobalEducationScene"), {
  ssr: false,
  loading: Glow,
});
export const AIVentureScene = dynamic(() => import("./AIVentureScene"), {
  ssr: false,
  loading: Glow,
});
export const WaveField = dynamic(() => import("./WaveField"), { ssr: false, loading: Glow });
export const Orb = dynamic(() => import("./Orb"), { ssr: false, loading: Glow });
export const MasteryScene = dynamic(() => import("./MasteryScene"), {
  ssr: false,
  loading: Glow,
});
