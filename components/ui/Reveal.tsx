"use client";

import { motion, useReducedMotion } from "motion/react";

type Props = React.ComponentProps<typeof motion.div> & {
  delay?: number;
  y?: number;
  /** Render as a list item instead of a div. */
  as?: "div" | "li";
};

/** Fades its children up into view the first time they scroll on screen. */
export function Reveal({ delay = 0, y = 24, as = "div", children, ...props }: Props) {
  const reduce = useReducedMotion();
  const Cmp = (as === "li" ? motion.li : motion.div) as typeof motion.div;
  return (
    <Cmp
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </Cmp>
  );
}
