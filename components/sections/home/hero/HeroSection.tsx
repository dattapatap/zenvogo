import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { HeroContent } from "./HeroContent";
import { HeroVisual } from "./HeroVisual";

/**
 * `children` (e.g. the trust bar) straddles the hero's bottom edge: the strip it sits in
 * switches to the next section's colour exactly at its vertical midpoint, at any height.
 * On desktop the hero fills the viewport minus the 80px header and half the ~152px trust
 * bar (`--hero-offset`), so the first screen ends at the bar's midpoint.
 */
export function HeroSection({ children }: { children?: React.ReactNode }) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate w-full overflow-hidden bg-white"
    >
      <HeroBackground />
      <Container className="grid grid-cols-1 items-center gap-6 pt-6 pb-10 sm:pt-14 sm:pb-14 md:gap-12 lg:gap-14 xl:min-h-[min(calc(100svh-var(--hero-offset)),1000px)] xl:grid-cols-[45fr_55fr] xl:gap-10 xl:pt-16 xl:pb-12 xl:[--hero-offset:156px]">
        <HeroContent />
        <HeroVisual />
      </Container>

      {children && (
        <div className="relative">
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-section" />
          <Container className="relative">{children}</Container>
        </div>
      )}
    </section>
  );
}

function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <Image
        src="/images/hero/hero-background.webp"
        alt=""
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        className="object-cover object-center opacity-60"
      />
      {/* Lift the copy side so the headline stays crisp over the waves */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(255_255_255/0.75),rgb(255_255_255/0.35)_45%,transparent_75%)]" />
      {/* Soft blue wash behind the illustration */}
      <div className="absolute bottom-[8%] left-1/2 size-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(8_102_217/0.1),transparent)] xl:top-[2%] xl:right-[-10%] xl:bottom-auto xl:left-auto xl:size-[62rem] xl:translate-x-0" />
      {/* Warm orange glow on the right edge */}
      <div className="absolute top-[20%] -right-56 size-[34rem] rounded-full bg-[radial-gradient(closest-side,rgb(255_104_24/0.12),transparent)]" />
    </div>
  );
}
