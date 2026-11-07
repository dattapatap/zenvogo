import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { formatDate, insights, type Insight } from "@/lib/data/insights";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

/** Latest blogs: a featured post beside compact post cards. */
export function BlogsSection() {
  const [featured, ...rest] = insights;
  return (
    <Section tone="light">
      <Container className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Blogs"
            title={
              <>
                Ideas on learning, <Accent>leadership and AI.</Accent>
              </>
            }
          />
          <Reveal className="shrink-0">
            <Button href="/blogs" variant="outline" arrow className="bg-white">
              All Blogs
            </Button>
          </Reveal>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr] lg:gap-6">
          {featured && (
            <Reveal className="h-full">
              <Link
                href={`/blogs/${featured.slug}`}
                className="dark-section group relative isolate flex h-full min-h-[300px] flex-col overflow-hidden rounded-3xl bg-navy p-6 text-white/75 transition-shadow duration-300 hover:shadow-[0_30px_60px_-30px_rgb(8_29_72/0.7)] sm:min-h-[340px] sm:p-7 sm:p-9"
              >
                <span aria-hidden className="absolute inset-0 -z-10 dot-grid-light opacity-70" />
                <span
                  aria-hidden
                  className="absolute -top-24 -right-24 -z-10 size-72 rounded-full bg-blue/45 blur-[100px] transition-transform duration-700 group-hover:scale-110"
                />
                <span
                  aria-hidden
                  className="absolute -bottom-28 -left-20 -z-10 size-64 rounded-full bg-orange/25 blur-[100px]"
                />
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-orange px-3 py-1 text-xs font-semibold text-white">
                    Featured
                  </span>
                  <span className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition-all duration-300 group-hover:rotate-45 group-hover:bg-orange">
                    <ArrowUpRight aria-hidden className="size-5" />
                  </span>
                </div>
                <div className="mt-auto pt-12 sm:pt-16">
                  <Meta post={featured} dark />
                  <h3 className="mt-3 text-[22px] leading-tight font-bold text-balance text-white sm:text-[30px]">
                    {featured.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-[15px] text-white/70">{featured.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
                    Read article
                    <ArrowRight
                      aria-hidden
                      className="size-4 transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          )}

          <div className="flex flex-col gap-5 lg:gap-6">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={(i + 1) * 0.08} className="flex-1">
                <Link
                  href={`/blogs/${p.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue/30 hover:shadow-(--shadow-card-hover) sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <Meta post={p} />
                    <span className="grid size-10 shrink-0 place-items-center rounded-full border border-border text-navy transition-all duration-300 group-hover:rotate-45 group-hover:border-blue group-hover:bg-blue group-hover:text-white">
                      <ArrowUpRight aria-hidden className="size-4" />
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg leading-snug font-semibold transition-colors group-hover:text-blue sm:text-xl">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Meta({ post, dark }: { post: Insight; dark?: boolean }) {
  return (
    <p
      className={
        dark
          ? "flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/60"
          : "flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground"
      }
    >
      <span
        className={
          dark
            ? "rounded-full bg-white/10 px-2.5 py-1 font-semibold text-white"
            : "rounded-full bg-blue/10 px-2.5 py-1 font-semibold text-blue"
        }
      >
        {post.category}
      </span>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span className="inline-flex items-center gap-1">
        <Clock aria-hidden className="size-3.5" /> {post.readTime}
      </span>
    </p>
  );
}
