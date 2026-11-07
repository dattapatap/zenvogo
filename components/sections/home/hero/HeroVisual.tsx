"use client";

import { useEffect } from "react";
import {
  ArrowUpRight,
  Award,
  Bot,
  Globe,
  Landmark,
  LaptopMinimal,
  Server,
  type LucideIcon,
} from "lucide-react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";
import { DottedGlobe } from "./DottedGlobe";

type Tone = "blue" | "orange" | "navy" | "gold";

const stages: { label: string; icon: LucideIcon; tone: Tone }[] = [
  { label: "Training & Skills", icon: LaptopMinimal, tone: "blue" },
  { label: "Advanced Labs", icon: Bot, tone: "orange" },
  { label: "AI Infrastructure", icon: Server, tone: "navy" },
  { label: "IIT Academic Exposure", icon: Landmark, tone: "blue" },
  { label: "Global Immersions", icon: Globe, tone: "navy" },
  { label: "Recognised Certifications", icon: Award, tone: "gold" },
];

const tileTone: Record<Tone, string> = {
  blue: "bg-[linear-gradient(145deg,#4d97f5,#0866d9_55%,#0750ad)] shadow-[inset_0_2px_0_rgb(255_255_255/0.45),inset_0_-3px_0_rgb(0_0_0/0.15),0_10px_18px_-8px_rgb(8_102_217/0.7)]",
  orange:
    "bg-[linear-gradient(145deg,#ffa063,#ff6818_55%,#e0500a)] shadow-[inset_0_2px_0_rgb(255_255_255/0.45),inset_0_-3px_0_rgb(0_0_0/0.12),0_10px_18px_-8px_rgb(255_104_24/0.7)]",
  navy: "bg-[linear-gradient(145deg,#2c5aa8,#0c2a63_55%,#081d48)] shadow-[inset_0_2px_0_rgb(255_255_255/0.3),inset_0_-3px_0_rgb(0_0_0/0.2),0_10px_18px_-8px_rgb(8_29_72/0.7)]",
  gold: "bg-[linear-gradient(145deg,#ffd36b,#ffb21a_50%,#ff8a1f)] shadow-[inset_0_2px_0_rgb(255_255_255/0.5),inset_0_-3px_0_rgb(0_0_0/0.12),0_10px_18px_-8px_rgb(255_150_26/0.7)]",
};

const ease = [0.22, 1, 0.36, 1] as const;

/* Staircase geometry, in units of a 1000 × 680 stage (1 unit = 0.1cqw). */
const u = (n: number) => `${n / 10}cqw`;
const G = { x0: 20, w: 150, ground: 620, top0: 530, rise: 62, depth: 50, cardW: 124, cardH: 185 };
/** How far back on each tread the card stands (0 = front edge, 1 = back edge). */
const CARD_SET_BACK = 0.62;
const stepTop = (i: number) => G.top0 - i * G.rise;

export function HeroVisual() {
  const reduce = useReducedMotion();

  // Subtle pointer tilt (desktop pointers only).
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });
  const rotateY = useTransform(sx, [-1, 1], [-5, 5]);
  const rotateX = useTransform(sy, [-1, 1], [4, -4]);
  const globeX = useTransform(sx, [-1, 1], [10, -10]);
  const globeY = useTransform(sy, [-1, 1], [8, -8]);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width) * 2 - 1);
    py.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onPointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.15, ease }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      // Phones (< 768px): the compact visual leads, the headline and buttons follow below it.
      className="relative mx-auto w-full max-w-[760px] min-w-0 [perspective:1600px] max-md:order-first xl:-ml-[3%] xl:w-[103%] xl:max-w-none"
    >
      <h2 className="sr-only">Your learning journey</h2>

      {/* ≥ md: 3D staircase */}
      <div className="@container relative hidden aspect-[1000/680] w-full md:block">
        <motion.div
          aria-hidden
          style={{ x: globeX, y: globeY, left: u(250), top: u(-30), width: u(700) }}
          className="absolute"
        >
          <DottedGlobe className="w-full" />
        </motion.div>

        <motion.div
          style={{ rotateX, rotateY }}
          className="absolute inset-0 [transform-style:preserve-3d]"
        >
          {/* ground shadow */}
          <div
            aria-hidden
            className="absolute rounded-[50%] bg-blue/20 blur-2xl"
            style={{ left: u(10), top: u(590), width: u(980), height: u(80) }}
          />

          {stages.map((_, i) => (
            <Step key={i} i={i} reduce={!!reduce} />
          ))}

          <GrowthCurve play={!reduce} />

          <ol className="contents">
            {stages.map((s, i) => (
              <motion.li
                key={s.label}
                initial={{ opacity: 0, y: reduce ? 0 : -18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55 + i * 0.1, ease }}
                className="absolute"
                style={{
                  left: u(G.x0 + i * G.w + (G.w - G.cardW) / 2 + G.depth * CARD_SET_BACK),
                  top: u(stepTop(i) - G.depth * CARD_SET_BACK - G.cardH),
                  width: u(G.cardW),
                  height: u(G.cardH),
                }}
              >
                <Float i={i} reduce={!!reduce}>
                  <StageCard {...s} />
                </Float>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>

      {/* < md: ascending card grid */}
      <div className="relative pt-4 pb-10 md:hidden">
        <DottedGlobe className="absolute top-1/2 left-1/2 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2" />
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 size-full overflow-visible"
        >
          <path
            d="M-2 98 C 35 98, 70 80, 97 4"
            fill="none"
            stroke="#ff6818"
            strokeWidth="2.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity="0.75"
          />
        </svg>
        <ArrowUpRight
          aria-hidden
          className="absolute -top-3 -right-1 size-7 text-orange"
          strokeWidth={2.5}
        />
        <ol className="relative grid grid-cols-3 gap-2.5 sm:gap-4">
          {stages.map((s, i) => (
            <motion.li
              key={s.label}
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.08, ease }}
              className={cn(
                "h-full",
                i % 3 === 0 && "translate-y-6",
                i % 3 === 1 && "translate-y-3",
              )}
            >
              <StageCard {...s} compact />
            </motion.li>
          ))}
        </ol>
      </div>
    </motion.div>
  );
}

function Step({ i, reduce }: { i: number; reduce: boolean }) {
  const top = stepTop(i);
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 + i * 0.07, ease }}
      className="absolute"
      style={{
        left: u(G.x0 + i * G.w),
        top: u(top),
        width: u(G.w),
        height: u(G.ground - top),
      }}
    >
      {/* tread */}
      <span
        className="absolute inset-x-0 bottom-full origin-bottom-left -skew-x-45 border border-b-2 border-white bg-[linear-gradient(90deg,#f2f7ff,#cfe0fa)] shadow-[inset_0_-8px_14px_-8px_rgb(8_102_217/0.4)]"
        style={{ height: u(G.depth) }}
      />
      {/* right face */}
      <span
        className="absolute top-0 left-full h-full origin-top-left -skew-y-45 border border-white/70 bg-[linear-gradient(180deg,#c9dcf8,#a9c4ee)]"
        style={{ width: u(G.depth) }}
      />
      {/* riser / front face */}
      <span className="absolute inset-0 border border-white bg-[linear-gradient(180deg,rgb(255_255_255/0.95),rgb(226_237_253/0.92)_45%,rgb(196_216_248/0.92))] shadow-[inset_0_2px_0_white,inset_0_-40px_50px_-34px_rgb(8_102_217/0.3),-10px_0_18px_-14px_rgb(8_29_72/0.35)]" />
      {/* glowing front edge */}
      <span className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgb(8_102_217/0.55),transparent)] shadow-[0_0_8px_1px_rgb(8_102_217/0.35)]" />
    </motion.div>
  );
}

/** Gentle idle bob, offset per card so they don't move in unison. */
function Float({ i, reduce, children }: { i: number; reduce: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      className="size-full"
      animate={reduce ? undefined : { y: [0, -5, 0] }}
      transition={{
        duration: 4.5 + (i % 3) * 0.7,
        delay: 1.6 + i * 0.35,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

function StageCard({
  label,
  icon: Icon,
  tone,
  compact,
}: {
  label: string;
  icon: LucideIcon;
  tone: Tone;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex size-full flex-col items-center text-center",
        "rounded-2xl border border-white bg-white/75 backdrop-blur-md",
        "shadow-[0_18px_40px_-18px_rgb(8_29_72/0.35),0_0_0_1px_rgb(8_102_217/0.08),inset_0_1px_0_white]",
        "transition-transform duration-300 hover:-translate-y-1",
        compact ? "gap-2.5 px-2 py-3.5" : "justify-center",
      )}
      style={compact ? undefined : { gap: u(14), padding: `${u(14)} ${u(8)}` }}
    >
      <span
        className={cn(
          "grid shrink-0 place-items-center rounded-xl text-white",
          tileTone[tone],
          compact && "size-11",
        )}
        style={compact ? undefined : { width: u(62), height: u(62), borderRadius: u(16) }}
      >
        <Icon
          aria-hidden
          strokeWidth={1.8}
          className={compact ? "size-5" : undefined}
          style={compact ? undefined : { width: u(30), height: u(30) }}
        />
      </span>
      <span
        lang="en"
        className={cn(
          "font-display leading-tight font-bold tracking-[-0.01em] text-balance hyphens-auto text-navy",
          compact ? "text-[11.5px] sm:text-[13px]" : "text-[clamp(11px,1.75cqw,15px)]",
        )}
      >
        {label}
      </span>
    </div>
  );
}

/** Orange growth curve sweeping beneath the steps and up to an arrow at the top right. */
function GrowthCurve({ play }: { play: boolean }) {
  const d = "M10 668 C 380 668, 720 640, 880 500 S 975 200, 990 70";
  const progress = useMotionValue(0);
  const arrowOpacity = useTransform(progress, [0.9, 1], [0, 1]);

  useEffect(() => {
    if (!play) {
      progress.set(1);
      return;
    }
    const controls = animate(progress, 1, { duration: 1.8, delay: 0.9, ease: [0.65, 0, 0.35, 1] });
    return () => controls.stop();
  }, [play, progress]);

  return (
    <svg
      aria-hidden
      viewBox="0 0 1000 680"
      className="pointer-events-none absolute inset-0 size-full overflow-visible"
    >
      <defs>
        <linearGradient id="hero-growth" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#ffb21a" stopOpacity="0" />
          <stop offset="0.25" stopColor="#ffb21a" />
          <stop offset="1" stopColor="#ff6818" />
        </linearGradient>
      </defs>
      <motion.path
        d={d}
        fill="none"
        stroke="#ff6818"
        strokeOpacity="0.16"
        strokeWidth="18"
        strokeLinecap="round"
        style={{ pathLength: progress }}
      />
      <motion.path
        d={d}
        fill="none"
        stroke="url(#hero-growth)"
        strokeWidth="5"
        strokeLinecap="round"
        style={{ pathLength: progress }}
      />
      <motion.path
        d="M995 30 L1010 74 L970 70 Z"
        fill="#ff6818"
        stroke="#ff6818"
        strokeWidth="4"
        strokeLinejoin="round"
        style={{ opacity: arrowOpacity }}
      />
    </svg>
  );
}
