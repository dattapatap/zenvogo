import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  tone = "light",
  className,
}: Props) {
  return (
    <Reveal
      className={cn(
        "flex max-w-3xl flex-col gap-3 sm:gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2 className="text-[26px] font-bold text-balance sm:text-[34px] lg:text-[38px]">{title}</h2>
      {text && (
        <p
          className={cn(
            "text-base text-pretty sm:text-[17px] lg:text-lg",
            tone === "dark" ? "text-white/70" : "text-muted-foreground",
          )}
        >
          {text}
        </p>
      )}
    </Reveal>
  );
}

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase",
        tone === "dark" ? "text-gold" : "text-blue",
        className,
      )}
    >
      <span className="h-px w-6 bg-orange" />
      {children}
    </span>
  );
}

/** Highlights part of a heading in brand orange. */
export function Accent({ children }: { children: React.ReactNode }) {
  return <span className="text-orange">{children}</span>;
}
