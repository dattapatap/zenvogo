import { interleave, partners } from "@/lib/data/partners";
import { Container } from "@/components/ui/Container";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { Reveal } from "@/components/ui/Reveal";
import { Accent, Eyebrow } from "@/components/ui/SectionHeading";

const all = interleave(partners);
const half = Math.ceil(all.length / 2);
const rows = [all.slice(0, half), all.slice(half)];

/** Featured card that overlaps the hero: headline and two scrolling logo rows. */
export function PartnersHighlight() {
  return (
    <section
      aria-labelledby="ecosystem-heading"
      className="relative z-10 flow-root bg-background pb-14 sm:pb-16 lg:pb-20"
    >
      <Container>
        <Reveal className="-mt-24 overflow-hidden rounded-3xl border border-border/70 bg-white shadow-[0_32px_80px_-32px_rgb(8_29_72/0.35)] sm:-mt-28 lg:-mt-32">
          <div className="p-6 sm:p-8 lg:p-12">
            <div className="flex max-w-3xl flex-col gap-4">
              <Eyebrow>Our partner ecosystem</Eyebrow>
              <h2
                id="ecosystem-heading"
                className="text-[26px] font-bold text-balance sm:text-[34px] lg:text-[40px]"
              >
                Institutions &amp; organisations <Accent>we work with.</Accent>
              </h2>
              <p className="max-w-xl text-base text-pretty text-muted-foreground sm:text-[17px]">
                From IITs and global universities to technology, finance and industry leaders — one
                connected network behind every Zenvogo programme.
              </p>
            </div>
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
