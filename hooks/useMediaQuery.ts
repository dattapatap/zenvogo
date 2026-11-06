"use client";

import { useSyncExternalStore } from "react";

/** Subscribes to a CSS media query. Returns `false` during server rendering. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** True below the `lg` breakpoint (1024px). */
export const useIsMobile = () => useMediaQuery("(max-width: 1023px)");

/** True when the user prefers reduced motion. */
export const usePrefersReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");
