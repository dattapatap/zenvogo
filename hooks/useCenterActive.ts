"use client";

import { useEffect, useRef } from "react";

/**
 * For a horizontally scrollable row of badges / pills: scrolls the row so the selected
 * item (`[aria-pressed="true"]` by default) sits in the centre. Runs whenever `active`
 * changes — instantly on first render (e.g. a pre-selected category from the URL), smoothly
 * after that. Does nothing when the row isn't scrollable (wide screens where it wraps).
 *
 * Only the row scrolls, never the page.
 */
export function useCenterActive<T extends HTMLElement>(
  active: unknown,
  selector = '[aria-pressed="true"]',
) {
  const ref = useRef<T>(null);
  const firstRun = useRef(true);

  useEffect(() => {
    const row = ref.current;
    const instant = firstRun.current;
    firstRun.current = false;
    if (!row || row.scrollWidth <= row.clientWidth) return;

    const item = row.querySelector<HTMLElement>(selector);
    if (!item) return;

    const rowBox = row.getBoundingClientRect();
    const itemBox = item.getBoundingClientRect();
    const left = row.scrollLeft + (itemBox.left - rowBox.left) - (rowBox.width - itemBox.width) / 2;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    row.scrollTo({ left, behavior: instant || reduce ? "auto" : "smooth" });
  }, [active, selector]);

  return ref;
}
