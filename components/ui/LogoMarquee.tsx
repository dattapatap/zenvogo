import Image from "next/image";
import type { Partner } from "@/lib/data/partners";
import { cn } from "@/lib/utils";

/**
 * Seamless auto-scrolling row of logos with faded edges; pauses on hover.
 * The list is rendered twice and the track slides by exactly half its width.
 */
export function LogoMarquee({
  items,
  reverse,
  secondsPerItem = 4,
  className,
}: {
  items: Partner[];
  reverse?: boolean;
  /** Scroll speed: how long each logo takes to pass, so rows of any length move at the same pace. */
  secondsPerItem?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)] motion-reduce:overflow-x-auto",
        className,
      )}
    >
      <ul
        className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{
          animationDuration: `${items.length * secondsPerItem}s`,
          animationDirection: reverse ? "reverse" : undefined,
        }}
      >
        {[...items, ...items].map((p, i) => {
          const copy = i >= items.length;
          return (
            <li
              key={`${p.name}-${i}`}
              aria-hidden={copy || undefined}
              className="flex h-14 shrink-0 items-center px-7 sm:px-10"
            >
              <Image
                src={p.logo}
                alt={copy ? "" : p.name}
                width={p.width}
                height={p.height}
                style={{ height: p.size }}
                className="w-auto transition-transform duration-300 hover:scale-105"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
