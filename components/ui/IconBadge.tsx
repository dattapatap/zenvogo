import { icons, type IconName } from "@/lib/icons";
import { cn } from "@/lib/utils";

type Tone = "blue" | "orange" | "navy" | "light";

const tones: Record<Tone, string> = {
  blue: "bg-blue/10 text-blue",
  orange: "bg-orange/10 text-orange",
  navy: "bg-navy text-white",
  light: "bg-white/10 text-gold",
};

/** Rounded square containing a line icon. */
export function IconBadge({
  name,
  tone = "blue",
  className,
}: {
  name: IconName;
  tone?: Tone;
  className?: string;
}) {
  const Cmp = icons[name];
  return (
    <span
      className={cn("grid size-14 shrink-0 place-items-center rounded-xl", tones[tone], className)}
    >
      <Cmp className="size-7" strokeWidth={1.75} aria-hidden />
    </span>
  );
}
