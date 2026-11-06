import { icons, type IconName } from "@/lib/icons";
import { cn } from "@/lib/utils";

type Tone = "blue" | "orange";

/**
 * A 3D-inspired, CSS-only illustration: three translucent isometric plates
 * stacked in perspective with an icon on top. The plates fan apart when the
 * parent `.group` is hovered. No WebGL, so it's cheap to use in card grids.
 */
export function LayeredVisual({
  icon,
  tone = "blue",
  className,
}: {
  icon: IconName;
  tone?: Tone;
  className?: string;
}) {
  const I = icons[icon];
  const accent = tone === "orange" ? "bg-orange" : "bg-blue";
  const glow = tone === "orange" ? "bg-orange/30" : "bg-blue/30";

  return (
    <div
      aria-hidden
      className={cn(
        "dark-section relative isolate grid h-40 place-items-center overflow-hidden rounded-xl bg-navy [perspective:700px]",
        className,
      )}
    >
      <div className="absolute inset-0 -z-10 dot-grid-light" />
      <div
        className={cn(
          "absolute bottom-0 left-1/2 -z-10 size-40 -translate-x-1/2 translate-y-1/2 rounded-full blur-3xl",
          glow,
        )}
      />

      <div className="relative h-20 w-20 [transform:rotateX(58deg)_rotateZ(-42deg)] [transform-style:preserve-3d]">
        {/* base plate */}
        <span className="absolute inset-0 [transform:translateZ(0px)] rounded-xl border border-white/15 bg-white/5 transition-transform duration-500 ease-out group-hover:[transform:translateZ(-10px)]" />
        {/* middle plate */}
        <span className="absolute inset-0 [transform:translateZ(14px)] rounded-xl border border-white/25 bg-[#8fc1ff]/20 backdrop-blur-sm transition-transform duration-500 ease-out group-hover:[transform:translateZ(22px)]" />
        {/* top plate with icon */}
        <span
          className={cn(
            "absolute inset-0 grid [transform:translateZ(28px)] place-items-center rounded-xl text-white shadow-[0_18px_30px_-10px_rgb(0_0_0/0.6)] transition-transform duration-500 ease-out group-hover:[transform:translateZ(52px)]",
            accent,
          )}
        >
          <I className="size-9 [transform:rotateZ(42deg)]" strokeWidth={1.6} />
        </span>
      </div>

      {/* orbit accent */}
      <span className="absolute top-1/2 left-1/2 h-24 w-56 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/10 transition-transform duration-700 group-hover:rotate-12" />
      <span className="absolute top-[22%] right-[22%] size-1.5 rounded-full bg-gold shadow-[0_0_10px_2px_rgb(255_178_26/0.7)]" />
    </div>
  );
}
