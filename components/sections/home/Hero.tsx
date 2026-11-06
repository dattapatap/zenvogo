"use client";

import { Building2, GraduationCap } from "lucide-react";
import { useRef } from "react";
import { siteConfig } from "@/config/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GlobalEducationScene } from "@/components/three";

const headline = ["Learning", "designed", "around", "the"];
const accent = ["real", "world."];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(
          "[data-hero='eyebrow']",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
        )
          .fromTo(
            "[data-hero='word']",
            { y: 0, yPercent: 110, rotate: 3 },
            { y: 0, yPercent: 0, rotate: 0, duration: 0.9, stagger: 0.07 },
            "-=0.3",
          )
          .fromTo(
            "[data-hero='fade']",
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1 },
            "-=0.5",
          )
          .fromTo(
            "[data-hero='scene']",
            { autoAlpha: 0, scale: 0.9 },
            { autoAlpha: 1, scale: 1, duration: 1.4, ease: "expo.out" },
            0.2,
          )
          .fromTo(
            "[data-hero='tag']",
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.15 },
            "-=1.2",
          );

        // Gentle parallax as the hero scrolls away.
        gsap.to("[data-hero='scene']", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to("[data-hero='copy']", {
          yPercent: -8,
          autoAlpha: 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Reduced motion: just make everything visible.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-hero]", { autoAlpha: 1 });
        gsap.set("[data-hero='word']", { y: 0, yPercent: 0 });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative isolate w-full overflow-hidden bg-white text-muted-foreground"
    >
      <Container className="grid min-h-[calc(100svh-80px)] grid-cols-1 items-center gap-6 py-12 lg:grid-cols-[1.05fr_1fr] lg:py-0">
        <div data-hero="copy" className="relative z-10 flex min-w-0 flex-col gap-7">
          <p
            data-hero="eyebrow"
            className="js-hide inline-flex w-fit items-center gap-2 rounded-full border border-blue/15 bg-blue/5 px-3.5 py-1.5 text-xs font-semibold tracking-[0.14em] text-blue uppercase"
          >
            <span className="size-1.5 rounded-full bg-orange" />
            {siteConfig.tagline}
          </p>

          <h1 className="text-[38px] leading-[1.1] font-bold text-balance text-navy sm:text-5xl lg:text-[60px]">
            {headline.map((w) => (
              <Word key={w}>{w}</Word>
            ))}
            {accent.map((w) => (
              <Word key={w} className="text-orange">
                {w}
              </Word>
            ))}
          </h1>

          <p data-hero="fade" className="js-hide max-w-xl text-[17px] text-pretty lg:text-lg">
            We bring industries, academic institutions and global experts together to create
            learning programmes that solve real business challenges — and we help AI startups turn
            ideas into impact.
          </p>

          <div data-hero="fade" className="js-hide flex flex-wrap gap-3">
            <Button href="/programs" arrow>
              Explore Our Programs
            </Button>
            <Button href="/contact?type=institution" variant="outline">
              Partner With Us
            </Button>
          </div>

          <ul
            data-hero="fade"
            className="js-hide flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-6 text-sm text-navy/80"
          >
            <li className="flex items-center gap-2">
              <Building2 className="size-4 text-orange" /> Industry-led programme design
            </li>
            <li className="flex items-center gap-2">
              <GraduationCap className="size-4 text-orange" /> Delivered with leading institutions
            </li>
          </ul>
        </div>

        <div
          data-hero="scene"
          className="js-hide relative -mx-5 h-[22rem] sm:h-[32rem] lg:mx-0 lg:h-[42rem]"
        >
          <GlobalEducationScene variant="hero" theme="light" />
          <FloatingTag className="top-[12%] left-[4%]" label="Industry" text="Real challenges" />
          <FloatingTag
            className="right-[4%] bottom-[16%]"
            label="Academia"
            text="Expert-designed"
            alt
          />
        </div>
      </Container>
    </section>
  );
}

function Word({ children, className }: { children: string; className?: string }) {
  return (
    <>
      <span className="inline-block overflow-hidden pb-[0.06em] align-bottom">
        <span data-hero="word" className={`inline-block will-change-transform ${className ?? ""}`}>
          {children}
        </span>
      </span>{" "}
    </>
  );
}

function FloatingTag({
  className,
  label,
  text,
  alt,
}: {
  className: string;
  label: string;
  text: string;
  alt?: boolean;
}) {
  return (
    <div data-hero="tag" className={`js-hide absolute z-10 ${className}`}>
      <div
        className="flex animate-float items-center gap-3 rounded-xl border border-border bg-white/90 px-4 py-2.5 text-xs shadow-[0_16px_40px_-16px_rgb(8_29_72/0.35)] backdrop-blur"
        style={alt ? { animationDelay: "-3.5s" } : undefined}
      >
        <span className={`h-8 w-1 rounded-full ${alt ? "bg-blue" : "bg-orange"}`} />
        <span>
          <span className={`block font-semibold ${alt ? "text-blue" : "text-orange"}`}>
            {label}
          </span>
          <span className="text-navy/80">{text}</span>
        </span>
      </div>
    </div>
  );
}
