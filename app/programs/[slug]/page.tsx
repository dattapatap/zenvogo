import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgrammeDetail } from "@/components/catalog/ProgrammeDetail";
import { getProgramme, programmeHref, programmesOf } from "@/lib/data/programmes";

export function generateStaticParams() {
  return programmesOf("programme").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/programs/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getProgramme("programme", slug);
  return p
    ? {
        title: p.title,
        description: p.summary,
        alternates: { canonical: programmeHref(p) },
      }
    : {};
}

export default async function ProgrammePage(props: PageProps<"/programs/[slug]">) {
  const { slug } = await props.params;
  const p = getProgramme("programme", slug);
  if (!p) notFound();
  return <ProgrammeDetail programme={p} />;
}
