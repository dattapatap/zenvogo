import { icons } from "@/lib/icons";
import { interleave, partnerCategories, partners } from "@/lib/data/partners";
import { Container } from "@/components/ui/Container";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { Reveal } from "@/components/ui/Reveal";
import { Accent, Eyebrow } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { categoryStyles } from "./categoryStyles";

const all = interleave(partners);
const half = Math.ceil(all.length / 2);
const rows = [all.slice(0, half), all.slice(half)];

/** Featured card that overlaps the hero: headline, category counts and two scrolling logo rows. */
export function PartnersHighlight() {
  return (
    <section
      aria-labelledby="ecosystem-heading"
      className="relative z-10 flow-root bg-background pb-14 sm:pb-16 lg:pb-20"
    >
      <Container>
        <Reveal className="-mt-24 overflow-hidden rounded-3xl border border-border/70 bg-white shadow-[0_32px_80px_-32px_rgb(8_29_72/0.35)] sm:-mt-28 lg:-mt-32">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-12 lg:p-12">
            <div className="flex flex-col gap-4">
              <Eyebrow>Our partner ecosystem</Eyebrow>
              <h2
                id="ecosystem-heading"
                className="text-[28px] font-bold text-balance sm:text-[34px] lg:text-[40px]"
              >
                Institutions &amp; organisations <Accent>we work with.</Accent>
              </h2>
              <p className="max-w-xl text-[17px] text-pretty text-muted-foreground">
                From IITs and global universities to technology, finance and industry leaders — one
                connected network behind every Zenvogo programme.
              </p>
            </div>

            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <li className="dark-section flex flex-col justify-between gap-3 rounded-2xl bg-navy p-4 text-white">
                <span className="font-display text-[32px] leading-none font-extrabold">
                  {partners.length}
                </span>
                <span className="text-sm font-semibold text-white/80">Partners in total</span>
              </li>
              {partnerCategories.map((c) => {
                const Icon = icons[c.icon];
                const count = partners.filter((p) => p.category === c.id).length;
                return (
                  <li
                    key={c.id}
                    className="flex flex-col justify-between gap-3 rounded-2xl border border-border/70 bg-section/60 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-[28px] leading-none font-extrabold text-navy">
                        {count}
                      </span>
                      <span
                        className={cn(
                          "grid size-8 place-items-center rounded-lg",
                          categoryStyles[c.id].chip,
                        )}
                      >
                        <Icon aria-hidden className="size-4" />
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-navy/80">{c.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-col gap-3 border-t border-border/70 bg-section/50 py-5 sm:py-6">
            <LogoMarquee items={rows[0]} />
            <LogoMarquee items={rows[1]} reverse />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
