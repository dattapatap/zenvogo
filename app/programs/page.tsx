import type { Metadata } from "next";
import { CatalogLanding } from "@/components/catalog/CatalogLanding";

export const metadata: Metadata = {
  title: "Our Programmes",
  description:
    "Industry-focused executive education programmes in leadership, AI, analytics, finance, marketing and entrepreneurship — in development with IIM Kozhikode and IIT Dharwad.",
  alternates: { canonical: "/programs" },
};

export default function ProgrammesPage() {
  return <CatalogLanding kind="programme" />;
}
