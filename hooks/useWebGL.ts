"use client";

import { useSyncExternalStore } from "react";

let cached: boolean | undefined;

function detect() {
  if (cached !== undefined) return cached;
  try {
    const canvas = document.createElement("canvas");
    cached = !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    cached = false;
  }
  return cached;
}

const noop = () => () => {};

/**
 * Whether the browser can render WebGL. `null` on the server / first render,
 * so callers can show a neutral placeholder until it's known.
 */
export function useWebGL(): boolean | null {
  return useSyncExternalStore(noop, detect, () => null);
}
