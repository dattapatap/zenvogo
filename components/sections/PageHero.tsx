import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { WaveField } from "@/components/three";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  crumbs?: { label: string; href?: string }[];
  children?: React.ReactNode;
  /** Optional 3D scene to replace the default particle wave. */
  scene?: React.ReactNode;
  /** Show the floating wireframe crystal above the default particle wave. */
  crystal?: boolean;
  /** Enable or disable background 3D animations entirely. Defaults to true. */
  animated?: boolean;
  /** Extra classes for the section, e.g. more bottom padding for an overlapping card. */
  className?: string;
};

/** Navy hero for inner pages with an animated 3D particle wave behind it. */
export function PageHero({
  eyebrow,
  title,
  text,
  crumbs,
  children,
  scene,
  crystal = false,
  animated = true,
  className,
}: Props) {
  return (
    <section
      className={cn(
        "dark-section relative isolate overflow-hidden bg-navy py-16 text-white/75 sm:py-20 lg:py-28",
        className,
      )}
    >
      {animated && !scene && (
        <div className="absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black_55%,transparent)] opacity-70">
          <WaveField crystal={crystal} />
        </div>
      )}
      {animated && scene && (
        <div className="absolute inset-y-0 right-0 -z-10 w-full opacity-30 sm:opacity-45 lg:w-[52%] lg:opacity-100">
          {scene}
        </div>
      )}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-orange/60 to-transparent"
      />
      <div aria-hidden className="absolute inset-0 -z-20 dot-grid-light" />
      <div
        aria-hidden
        className="absolute -top-32 -left-32 -z-10 size-[28rem] rounded-full bg-blue/30 blur-[120px]"
      />

      <Container>
        {crumbs && (
          <Reveal y={8}>
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/60">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                {crumbs.map((c) => (
                  <li key={c.label} className="flex items-center gap-1.5">
                    <ChevronRight className="size-3.5" />
                    {c.href ? (
                      <Link href={c.href} className="hover:text-white">
                        {c.label}
                      </Link>
                    ) : (
                      <span className="text-white">{c.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        )}
        <Reveal className="flex max-w-3xl flex-col gap-5">
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          <h1 className="text-[34px] font-bold text-balance sm:text-[42px] lg:text-[52px]">
            {title}
          </h1>
          {text && <p className="max-w-2xl text-[17px] text-pretty lg:text-lg">{text}</p>}
          {children}
        </Reveal>
      </Container>
    </section>
  );
}
