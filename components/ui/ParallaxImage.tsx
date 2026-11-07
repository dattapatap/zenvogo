"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  /** How far the image drifts, in percent of its height. */
  amount?: number;
  priority?: boolean;
};

/** Image that drifts subtly inside its frame as the page scrolls. */
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  amount = 8,
  priority,
}: Props) {
  const frame = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-parallax]",
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: "none",
            scrollTrigger: {
              trigger: frame.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: frame },
  );

  return (
    <div ref={frame} className={cn("relative overflow-hidden", className)}>
      <div data-parallax className="absolute inset-x-0 -inset-y-[12%]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={priority}
          className={cn("object-cover", imgClassName)}
        />
      </div>
    </div>
  );
}
