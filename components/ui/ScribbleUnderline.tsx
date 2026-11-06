"use client";

import { motion, useReducedMotion } from "motion/react";

/** Orange word with a hand-drawn underline that draws itself when scrolled into view. */
export function ScribbleUnderline({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <span className="relative inline-block whitespace-nowrap text-orange">
      {children}
      <svg
        aria-hidden
        viewBox="0 0 200 14"
        preserveAspectRatio="none"
        className="absolute -bottom-2 left-0 h-3 w-full overflow-visible"
      >
        <motion.path
          d="M3 9 C 45 3, 110 2, 197 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>
    </span>
  );
}
