import { cn } from "@/lib/utils";

type Tone = "white" | "light" | "navy";

const tones: Record<Tone, string> = {
  white: "bg-background",
  light: "bg-section",
  navy: "dark-section bg-navy text-white/80",
};

type Props = React.ComponentProps<"section"> & { tone?: Tone };

/** Page section with the standard 56 / 72 / 100px vertical rhythm. */
export function Section({ tone = "white", className, ...props }: Props) {
  return (
    <section
      className={cn("relative py-14 sm:py-[72px] lg:py-[100px]", tones[tone], className)}
      {...props}
    />
  );
}
