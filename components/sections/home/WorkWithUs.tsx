import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { paths } from "@/lib/data/content";
import { icons } from "@/lib/icons";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

/** "Work With Us": four audience paths as clean, interactive rows. */
export function WorkWithUs() {
  return (
    <Section>
      <Container className="grid gap-8 sm:gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="flex flex-col gap-6 sm:gap-8 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Work With Us"
            title={
              <>
                One platform, <Accent>four ways to grow.</Accent>
              </>
            }
            text="Whether you lead an organisation, an institution, your own career or an AI startup — there's a way to build with Zenvogo."
          />
          <Reveal className="flex flex-wrap items-center gap-4">
            <Button href="/contact" arrow>
              Start a Conversation
            </Button>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-sm text-muted-foreground transition-colors hover:text-blue"
            >
              or email <span className="font-semibold text-navy">{siteConfig.contact.email}</span>
            </a>
          </Reveal>
        </div>

        <ul className="flex flex-col gap-3">
          {paths.map((p, i) => {
            const Icon = icons[p.icon];
            return (
              <Reveal as="li" key={p.title} delay={i * 0.06}>
                <Link
                  href={p.href}
                  className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-border bg-white p-4 transition-all duration-300 hover:border-navy hover:bg-navy hover:shadow-[0_24px_50px_-24px_rgb(8_29_72/0.55)] sm:gap-5 sm:gap-6 sm:p-5 sm:p-6"
                >
                  <span className="hidden w-7 font-display text-sm font-bold text-muted-foreground/60 transition-colors group-hover:text-gold sm:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-blue/10 text-blue transition-colors duration-300 group-hover:bg-orange group-hover:text-white sm:size-14">
                    <Icon aria-hidden className="size-6" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-lg font-semibold text-navy transition-colors group-hover:text-white sm:text-xl">
                      {p.title}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground transition-colors group-hover:text-white/70">
                      {p.text}
                    </span>
                    <span className="mt-2 inline-block text-sm font-semibold text-blue transition-colors group-hover:text-gold">
                      {p.cta}
                    </span>
                  </span>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-border text-navy transition-all duration-300 group-hover:rotate-45 group-hover:border-orange group-hover:bg-orange group-hover:text-white">
                    <ArrowUpRight aria-hidden className="size-5" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
