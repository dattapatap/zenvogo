import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { formatDate, getInsight, insights } from "@/lib/data/insights";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";

export function generateStaticParams() {
  return insights.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getInsight(slug);
  return post
    ? {
        title: post.title,
        description: post.excerpt,
        openGraph: { type: "article", publishedTime: post.date },
      }
    : {};
}

export default async function InsightPage(props: PageProps<"/insights/[slug]">) {
  const { slug } = await props.params;
  const post = getInsight(slug);
  if (!post) notFound();

  const more = insights.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <PageHero
        eyebrow={post.category}
        crumbs={[{ label: "Insights", href: "/insights" }, { label: post.category }]}
        title={post.title}
      >
        <p className="text-sm text-white/60">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readTime}
        </p>
      </PageHero>

      <article className="py-14 sm:py-[72px]">
        <Container className="max-w-3xl">
          <Reveal className="flex flex-col gap-10">
            {post.sections.map((s, i) => (
              <section key={i} className="flex flex-col gap-4">
                {s.heading && <h2 className="text-[26px] font-bold">{s.heading}</h2>}
                {s.body.map((p) => (
                  <p
                    key={p}
                    className={
                      i === 0 ? "text-xl leading-relaxed text-navy" : "text-lg text-foreground/85"
                    }
                  >
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </Reveal>

          <div className="mt-16 border-t border-border pt-8">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue hover:text-navy"
            >
              <ArrowLeft className="size-4" /> All insights
            </Link>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {more.map((p) => (
                <Link key={p.slug} href={`/insights/${p.slug}`} className="card-hover card p-5">
                  <span className="text-xs font-semibold text-blue">{p.category}</span>
                  <p className="mt-1 font-semibold text-navy">{p.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </article>

      <CTASection />
    </>
  );
}
