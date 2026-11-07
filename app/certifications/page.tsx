import type { Metadata } from "next";
import { CatalogLanding } from "@/components/catalog/CatalogLanding";

export const metadata: Metadata = {
  title: "Professional Certifications",
  description:
    "Professional certifications across leadership, technology & AI, banking & finance, marketing, industry & operations and entrepreneurship.",
  alternates: { canonical: "/certifications" },
};

export default function CertificationsPage() {
  return <CatalogLanding kind="certification" />;
}
