import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate, insights } from "@/lib/data/insights";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Blogs & Insights on Executive Education",
  description: "Blogs on industry-led learning, leadership development and AI ventures.",
  alternates: { canonical: "/blogs" },
};

export default function BlogsPage() {
  const [featured, ...rest] = insights;
  return (
    <>
      <PageHero
        eyebrow="Blogs"
        crumbs={[{ label: "Blogs" }]}
        title="Ideas on learning, leadership and AI"
        text="Perspectives from the Zenvogo team on designing learning that works — and building the ventures shaping the future of work."
      />

      <Section>
        <Container className="flex flex-col gap-6">
          <Reveal>
            <Link
              href={`/blogs/${featured.slug}`}
              className="group grid card-hover overflow-hidden card lg:grid-cols-2"
            >
              <div className="dark-section relative min-h-56 overflow-hidden bg-navy">
                <div className="absolute inset-0 dot-grid-light" />
                <div className="absolute -right-10 -bottom-16 size-64 rounded-full border-[24px] border-blue/40 transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-10 right-24 size-14 rotate-12 rounded-xl bg-orange/80 transition-transform duration-700 group-hover:rotate-45" />
                <span className="absolute top-6 left-6 rounded-md bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                  Featured
                </span>
              </div>
              <div className="flex flex-col justify-center gap-3 p-6 sm:gap-4 sm:p-10">
                <Eyebrow>{featured.category}</Eyebrow>
                <h2 className="text-[22px] font-bold transition-colors group-hover:text-blue sm:text-[32px]">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground">{featured.excerpt}</p>
                <p className="text-xs text-muted-foreground">
                  <time dateTime={featured.date}>{formatDate(featured.date)}</time> ·{" "}
                  {featured.readTime}
                </p>
              </div>
            </Link>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link
                  href={`/blogs/${p.slug}`}
                  className="group flex h-full card-hover flex-col card p-6 sm:p-8"
                >
                  <Eyebrow>{p.category}</Eyebrow>
                  <h2 className="mt-3 text-xl font-semibold transition-colors group-hover:text-blue sm:mt-4 sm:text-[22px]">
                    {p.title}
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground">{p.excerpt}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-blue">
                    Read article
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  );
}
