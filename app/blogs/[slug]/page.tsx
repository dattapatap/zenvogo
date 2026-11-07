import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { formatDate, getInsight, insights } from "@/lib/data/insights";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema } from "@/lib/seo";

export function generateStaticParams() {
  return insights.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blogs/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getInsight(slug);
  return post
    ? {
        title: post.title,
        description: post.excerpt,
        alternates: { canonical: `/blogs/${post.slug}` },
        openGraph: { type: "article", publishedTime: post.date },
      }
    : {};
}

export default async function InsightPage(props: PageProps<"/blogs/[slug]">) {
  const { slug } = await props.params;
  const post = getInsight(slug);
  if (!post) notFound();

  const more = insights.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <JsonLd data={articleSchema(post)} />
      <PageHero
        eyebrow={post.category}
        crumbs={[{ label: "Blogs", href: "/blogs" }, { label: post.category }]}
        title={post.title}
      >
        <p className="text-sm text-white/60">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readTime}
        </p>
      </PageHero>

      <article className="py-14 sm:py-[72px]">
        <Container className="max-w-3xl">
          <Reveal className="flex flex-col gap-8 sm:gap-10">
            {post.sections.map((s, i) => (
              <section key={i} className="flex flex-col gap-4">
                {s.heading && <h2 className="text-[22px] font-bold sm:text-[26px]">{s.heading}</h2>}
                {s.body.map((p) => (
                  <p
                    key={p}
                    className={
                      i === 0
                        ? "text-lg leading-relaxed text-navy sm:text-xl"
                        : "text-base text-foreground/85 sm:text-lg"
                    }
                  >
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </Reveal>

          <div className="mt-12 border-t border-border pt-8 sm:mt-16">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue hover:text-navy"
            >
              <ArrowLeft className="size-4" /> All blogs
            </Link>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {more.map((p) => (
                <Link key={p.slug} href={`/blogs/${p.slug}`} className="card-hover card p-5">
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
