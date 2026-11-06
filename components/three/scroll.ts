"use client";

import { createContext, useContext } from "react";

/**
 * Scroll state for a 3D scene, measured from its container element.
 *
 * - `value`: 0 when the container's top enters the bottom of the viewport,
 *   1 when its bottom leaves the top.
 * - `t`: `value` re-centred so 0 is the scene's "designed" pose — the
 *   position at page load for scenes already on screen (e.g. the hero),
 *   or the middle of the viewport for scenes further down. Roughly -0.5…0.5.
 *
 * Stored in a mutable ref and read inside `useFrame`, so scrolling never
 * triggers React re-renders.
 */
export type ScrollState = { value: number; t: number };

export const ScrollContext = createContext<React.RefObject<ScrollState>>({
  current: { value: 0, t: 0 },
});

export const useScrollProgress = () => useContext(ScrollContext);
