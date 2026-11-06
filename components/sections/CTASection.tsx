import { GraduationCap, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ScribbleUnderline } from "@/components/ui/ScribbleUnderline";
import { MasteryScene } from "@/components/three";

type Props = {
  eyebrow?: string;
  title?: React.ReactNode;
  text?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export function CTASection({
  eyebrow = "Partner With Zenvogo",
  title = (
    <>
      Let&apos;s Build the Future of Learning <ScribbleUnderline>Together.</ScribbleUnderline>
    </>
  ),
  text = "Whether you're an organisation, academic institution or an industry leader, let's co-create impactful learning experiences.",
  primary = { label: "Partner With Us", href: "/contact" },
  secondary = { label: "Our Approach", href: "/approach" },
}: Props) {
  return (
    <section className="bg-background py-8 sm:py-12 lg:py-14">
      <Container>
        <Reveal className="dark-section relative isolate grid overflow-hidden rounded-3xl bg-[linear-gradient(115deg,#071a42_0%,#0a2560_55%,#0c3380_100%)] shadow-[0_32px_64px_-32px_rgb(8_29_72/0.6)] lg:grid-cols-[1.2fr_0.9fr]">
          {/* ── Background: flowing light waves + glows ── */}
          <svg
            aria-hidden
            viewBox="0 0 1200 520"
            preserveAspectRatio="none"
            className="absolute inset-0 -z-10 h-full w-full"
          >
            <defs>
              <linearGradient id="cta-wave-a" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#0866d9" stopOpacity="0" />
                <stop offset="1" stopColor="#0866d9" stopOpacity="0.45" />
              </linearGradient>
              <linearGradient id="cta-wave-b" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#ff6818" stopOpacity="0" />
                <stop offset="0.7" stopColor="#ff6818" stopOpacity="0.9" />
                <stop offset="1" stopColor="#ffb21a" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path
              className="animate-[cta-drift_14s_ease-in-out_infinite]"
              d="M560 520 C 760 380, 900 470, 1200 300 L1200 520 Z"
              fill="url(#cta-wave-a)"
            />
            <path
              className="animate-[cta-drift_18s_ease-in-out_infinite_reverse]"
              d="M640 0 C 820 90, 980 40, 1200 140 L1200 0 Z"
              fill="url(#cta-wave-a)"
              opacity="0.6"
            />
            <path
              d="M760 520 C 930 470, 1060 440, 1200 360"
              fill="none"
              stroke="url(#cta-wave-b)"
              strokeWidth="2"
            />
          </svg>
          <div
            aria-hidden
            className="absolute -top-32 -left-24 -z-10 size-96 rounded-full bg-blue/25 blur-[110px]"
          />

          {/* ── Copy ── */}
          <div className="flex flex-col justify-center gap-4 p-6 sm:p-8 lg:py-10 lg:pr-4 lg:pl-12">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue/40 bg-blue/20 px-3.5 py-1 text-xs font-medium text-white sm:text-sm">
                <GraduationCap className="size-4 text-orange" aria-hidden />
                {eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="text-[26px] leading-[1.15] font-bold text-balance text-white sm:text-[34px] lg:text-[40px]">
                {title}
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="max-w-xl text-sm text-white/75 sm:text-base">{text}</p>
            </Reveal>
            <Reveal delay={0.24} className="flex flex-wrap gap-3 pt-1">
              <Button href={primary.href} arrow>
                {primary.label}
              </Button>
              <Button href={secondary.href} variant="outline-light">
                {secondary.href === "/approach" && (
                  <PlayCircle className="size-5 transition-transform group-hover:scale-110" />
                )}
                {secondary.label}
              </Button>
            </Reveal>
          </div>

          {/* ── 3D scene with a glowing ring behind it ── */}
          <div className="relative flex h-64 items-center justify-center sm:h-72 lg:h-auto lg:min-h-[22rem]">
            <div
              aria-hidden
              className="absolute top-1/2 left-1/2 aspect-square w-[68%] max-w-[20rem] -translate-x-1/2 -translate-y-1/2"
            >
              <div className="absolute inset-0 animate-[spin_24s_linear_infinite] rounded-full bg-[conic-gradient(from_200deg,#ff6818,#ffb21a_12%,transparent_32%,transparent_55%,#0866d9_72%,#8fc1ff_82%,transparent_95%)] [mask:radial-gradient(farthest-side,transparent_calc(100%-3px),#000_calc(100%-2px))]" />
              <div className="absolute inset-0 animate-[spin_24s_linear_infinite] rounded-full bg-[conic-gradient(from_200deg,#ff6818,transparent_30%,transparent_60%,#0866d9_75%,transparent_95%)] opacity-70 blur-xl [mask:radial-gradient(farthest-side,transparent_calc(100%-14px),#000_calc(100%-6px))]" />
              <div className="absolute inset-[18%] rounded-full bg-blue/25 blur-3xl" />
            </div>
            <MasteryScene />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
