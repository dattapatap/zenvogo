import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import {
  getCategory,
  getInstitution,
  kindLabel,
  programmeHref,
  type Programme,
} from "@/lib/data/programmes";
import { icons } from "@/lib/icons";

export function InstitutionMark({ slug, size = 36 }: { slug?: string; size?: number }) {
  const inst = getInstitution(slug);
  const style = { width: size, height: size };
  if (inst?.logo) {
    return (
      <span
        style={style}
        className="relative grid shrink-0 place-items-center overflow-hidden rounded-lg border border-border bg-white p-1 shadow-xs"
      >
        <Image
          src={inst.logo}
          alt={`${inst.name} logo`}
          width={size}
          height={size}
          className="object-contain"
        />
      </span>
    );
  }
  return (
    <span
      style={style}
      className="grid shrink-0 place-items-center rounded-lg bg-navy text-[10px] font-bold tracking-wide text-white shadow-xs"
    >
      {inst?.monogram ?? "ZV"}
    </span>
  );
}

/** Refined listing card for programmes and certifications. */
export function ProgrammeCard({ programme: p }: { programme: Programme }) {
  const cat = getCategory(p.category)!;
  const inst = getInstitution(p.institution);
  const href = programmeHref(p);
  const CatIcon = icons[cat.icon];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-white shadow-[0_4px_20px_-8px_rgb(8_29_72/0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-blue/30 hover:shadow-[0_20px_40px_-15px_rgb(8_29_72/0.14)]">
      {/* ── Visual Media ── */}
      <Link
        href={href}
        className="relative block aspect-[16/10] overflow-hidden bg-section"
        tabIndex={-1}
      >
        <Image
          src={cat.image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/15 to-transparent"
        />
        <span className="absolute top-3.5 left-3.5 rounded-full bg-orange px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
          Coming soon
        </span>
        <span className="absolute bottom-3.5 left-3.5 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
          {CatIcon && <CatIcon className="size-3.5" aria-hidden />}
          <span>{cat.name}</span>
        </span>
      </Link>

      {/* ── Content & Meta ── */}
      <div className="flex flex-1 flex-col gap-3.5 p-5 sm:p-6">
        <div className="flex items-center gap-2.5">
          <InstitutionMark slug={p.institution} size={32} />
          <div className="min-w-0 text-xs leading-tight">
            <span className="block text-muted-foreground">In development with</span>
            <span className="truncate font-semibold text-navy">
              {inst?.name ?? `Zenvogo ${kindLabel[p.kind].singular}`}
            </span>
          </div>
        </div>

        <h3 className="text-base leading-snug font-bold text-navy transition-colors duration-200 group-hover:text-blue sm:text-[17px]">
          <Link href={href} className="line-clamp-2">
            {p.title}
          </Link>
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>

        {/* ── Specs / Metadata ── */}
        <div className="mt-auto flex items-center justify-between border-t border-border/80 pt-3.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <BookOpen className="size-3.5 text-blue" />
            <span>{p.modules.length} modules</span>
          </span>
          <span className="inline-flex items-center gap-1.5 font-medium">
            <Clock className="size-3.5 text-orange" />
            <span>Duration TBA</span>
          </span>
        </div>

        {/* ── Primary Action Button ── */}
        <Link
          href={href}
          className="mt-1 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-navy text-sm font-semibold text-white shadow-sm transition-all duration-200 group-hover:bg-blue group-hover:shadow-md"
        >
          <span>View {kindLabel[p.kind].singular}</span>
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
