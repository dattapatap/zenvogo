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

export function InstitutionMark({ slug, size = 40 }: { slug?: string; size?: number }) {
  const inst = getInstitution(slug);
  const style = { width: size, height: size };
  if (inst?.logo) {
    return (
      <span
        style={style}
        className="relative grid shrink-0 place-items-center overflow-hidden rounded-lg border border-border bg-white p-1"
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
      className="grid shrink-0 place-items-center rounded-lg bg-navy text-[10px] font-bold tracking-wide text-white"
    >
      {inst?.monogram ?? "ZV"}
    </span>
  );
}

/** Listing card for a programme or certification. */
export function ProgrammeCard({ programme: p }: { programme: Programme }) {
  const cat = getCategory(p.category)!;
  const inst = getInstitution(p.institution);
  const href = programmeHref(p);
  const CatIcon = icons[cat.icon];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue/30 hover:shadow-[0_24px_50px_-24px_rgb(8_29_72/0.35)]">
      <Link
        href={href}
        className="relative block aspect-[16/9] overflow-hidden bg-section"
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
          className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent"
        />
        <span className="absolute top-3 left-3 rounded-full bg-orange px-2.5 py-1 text-[11px] font-semibold text-white">
          Coming soon
        </span>
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
          <CatIcon className="size-3.5" aria-hidden /> {cat.name}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2.5">
          <InstitutionMark slug={p.institution} size={34} />
          <span className="text-xs leading-tight text-muted-foreground">
            {inst ? (
              <>
                In development with
                <br />
                <span className="font-semibold text-navy">{inst.name}</span>
              </>
            ) : (
              <>
                Zenvogo
                <br />
                <span className="font-semibold text-navy">{kindLabel[p.kind].singular}</span>
              </>
            )}
          </span>
        </div>
        <h3 className="text-[17px] leading-snug font-semibold text-navy">
          <Link href={href} className="transition-colors hover:text-blue">
            {p.title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{p.summary}</p>

        <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="size-3.5" /> {p.modules.length} modules
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" /> Duration TBA
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Link
            href={href}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-navy text-sm font-semibold text-white transition-colors hover:bg-blue"
          >
            View {kindLabel[p.kind].singular}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href={`${href}#curriculum`}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-border text-sm font-semibold text-navy transition-colors hover:border-blue hover:text-blue"
          >
            Curriculum
          </Link>
        </div>
      </div>
    </article>
  );
}
