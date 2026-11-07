import type { Metadata } from "next";
import Image from "next/image";
import { Check, Eye, Flag, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { comparison, teamBackgrounds, values } from "@/lib/data/content";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { IconBadge } from "@/components/ui/IconBadge";
import { Button } from "@/components/ui/Button";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "About Us",
  description: `The vision, mission and team behind ${siteConfig.name}, a part of ${siteConfig.parent}.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Zenvogo"
        crumbs={[{ label: "About Us" }]}
        title="Bridging industry, academia and innovation"
        text={`${siteConfig.name} is an Indian company and a part of ${siteConfig.parent}. We exist to make professional learning genuinely useful — by designing it around the challenges industries actually face.`}
      />

      <Section>
        <Container className="flex flex-col gap-12 sm:gap-14">
          <div className="grid gap-12 lg:grid-cols-2">
            <SectionHeading
              eyebrow="Our story"
              title={
                <>
                  Built by people who know <Accent>learning from the inside.</Accent>
                </>
              }
            />
            <Reveal className="flex flex-col gap-4 text-base text-muted-foreground sm:gap-5 sm:text-lg">
              <p>
                Zenvogo was started by a team of {siteConfig.founders}, joined by professionals who
                have helped build some of India&apos;s best-known learning companies. We&apos;ve
                seen first-hand how learning is sold — and where it falls short.
              </p>
              <p>
                Most platforms resell what institutions already offer. Very few design programmes
                exclusively around what an industry needs. So we built a company that does exactly
                that: research the challenge, design the curriculum with expert faculty, and deliver
                it through leading institutions.
              </p>
              <p>
                Alongside learning, we help AI startups incubate, grow and raise funding — because
                the future of work will be shaped by both.
              </p>
            </Reveal>
          </div>

          {/* Three featured photos from the programme and immersion documents */}
          <div className="grid gap-6 sm:grid-cols-3">
            <Reveal
              delay={0.06}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-section">
                <Image
                  src="/images/programs/coming-soon-classroom.webp"
                  alt="Executive education and academic learning session"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h3 className="font-display text-base font-bold text-navy">
                    Executive Education
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Rigorous executive development programmes designed around the real challenges
                    industries face.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal
              delay={0.12}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-section">
                <Image
                  src="/images/immersion/europe.webp"
                  alt="Global university campus immersion and international perspectives"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h3 className="font-display text-base font-bold text-navy">Global Immersions</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Transformative international learning journeys across premier universities and
                    global innovation hubs.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal
              delay={0.18}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-section">
                <Image
                  src="/images/immersion/hero-cohort.webp"
                  alt="Corporate interactions and real-world business exposure"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h3 className="font-display text-base font-bold text-navy">
                    Industry &amp; Corporate Access
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Direct engagements with global companies, corporate headquarters and executive
                    mentors.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Why we're different (moved from the homepage) */}
      <Section tone="light">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Why we're different"
              title={
                <>
                  Beyond traditional <Accent>learning models.</Accent>
                </>
              }
              text="Most learning platforms sell what institutions already offer. Zenvogo starts with the industry — its people, its challenges, its future — and builds programmes around them with leading academic experts and institutions."
            />
            <Reveal className="btn-group">
              <Button href="/approach" variant="secondary" arrow>
                Our Approach
              </Button>
              <Button href="/programs" variant="outline" className="bg-white">
                Explore Programmes
              </Button>
            </Reveal>
          </div>

          <div className="relative">
            <Reveal>
              <ParallaxImage
                src="/images/immersion/hero-students.webp"
                alt="Students walking together across an international university campus lawn"
                className="aspect-[16/10] rounded-2xl bg-white shadow-[var(--shadow-card)]"
              />
            </Reveal>
            <Reveal
              delay={0.15}
              className="relative -mt-16 grid overflow-hidden card sm:mx-8 sm:grid-cols-2"
            >
              <div className="p-6 sm:p-7">
                <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                  Typical platforms
                </p>
                <ul className="mt-5 flex flex-col gap-4">
                  {comparison.them.map((t) => (
                    <li key={t} className="flex gap-3 text-sm text-muted-foreground">
                      <X className="mt-0.5 size-4 shrink-0 text-muted-foreground/60" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="dark-section bg-navy p-6 text-white/85 sm:p-7">
                <p className="text-xs font-semibold tracking-[0.14em] text-gold uppercase">
                  The Zenvogo way
                </p>
                <ul className="mt-5 flex flex-col gap-4">
                  {comparison.us.map((t) => (
                    <li key={t} className="flex gap-3 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-orange" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-6 md:grid-cols-2">
          <Reveal className="card p-6 sm:p-10">
            <span className="grid size-12 place-items-center rounded-xl bg-blue/10 text-blue">
              <Eye className="size-6" />
            </span>
            <h2 className="mt-5 text-[22px] font-bold sm:text-[26px]">Our vision</h2>
            <p className="mt-3 text-muted-foreground">
              A world where every professional programme is designed around real industry needs —
              connecting people, institutions and ideas across borders.
            </p>
          </Reveal>
          <Reveal
            delay={0.08}
            className="dark-section rounded-2xl bg-navy p-6 text-white/75 sm:p-10"
          >
            <span className="grid size-12 place-items-center rounded-xl bg-orange/15 text-orange">
              <Flag className="size-6" />
            </span>
            <h2 className="mt-5 text-[22px] font-bold sm:text-[26px]">Our mission</h2>
            <p className="mt-3">
              To bring industries, academic experts and leading institutions together to create
              learning that solves real business challenges — and to back the AI ventures building
              what comes next.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="light">
        <Container className="flex flex-col gap-12">
          <SectionHeading align="center" eyebrow="What drives us" title="Our values" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06} className="card-hover card p-6 sm:p-7">
                <IconBadge name={v.icon} tone={i % 2 ? "orange" : "blue"} />
                <h3 className="mt-5 text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="navy" className="overflow-hidden">
        <div aria-hidden className="absolute inset-0 dot-grid-light" />
        <Container className="relative grid items-center gap-10 lg:grid-cols-2">
          <SectionHeading
            tone="dark"
            eyebrow="Leadership"
            title="Experience from across the learning industry"
            text="Our founding and leadership team brings together management-school alumni and professionals from leading EdTech companies."
          />
          <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
            {teamBackgrounds.map((t) => (
              <div
                key={t}
                className="grid h-20 place-items-center panel p-3 text-center font-display text-base font-bold text-white sm:h-24 sm:p-4 sm:text-lg"
              >
                {t}
              </div>
            ))}
          </Reveal>
        </Container>
      </Section>

      <CTASection />
    </>
  );
}
