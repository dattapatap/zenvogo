import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { categories } from "@/lib/data/programmes";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Logo } from "./Logo";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Our Approach", href: "/approach" },
      { label: "Partners", href: "/partners" },
      { label: "Careers", href: "/careers" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Our Programs",
    links: categories.map((c) => ({ label: c.name, href: `/programs?category=${c.slug}` })),
  },
  {
    title: "Explore",
    links: [
      { label: "Immersion Programs", href: "/immersion-programs" },
      { label: "Certifications", href: "/certifications" },
      { label: "Blogs", href: "/blogs" },
    ],
  },
];

export function Footer() {
  const { contact } = siteConfig;
  return (
    <footer className="bg-navy text-[#d3dded]">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr]">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <Logo variant="light" className="w-[195px] lg:w-[225px]" />
          <p className="max-w-sm text-sm leading-relaxed text-[#d3dded]/85">
            Bridging industry, academia, and innovation to create impactful learning programmes,
            executive leadership, and scalable growth opportunities.
          </p>
          <p className="max-w-sm text-xs leading-relaxed text-[#d3dded]/60">
            Co-creating real-world curricula with premier academic institutions and incubating
            next-generation AI ventures for global impact.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="mb-4 text-base font-semibold text-white">{col.title}</h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="mb-4 text-base font-semibold text-white">Connect</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2.5 hover:text-white"
              >
                <Mail className="size-4 text-orange" /> {contact.email}
              </a>
            </li>
            <li>
              <a href={contact.phoneHref} className="flex items-center gap-2.5 hover:text-white">
                <Phone className="size-4 text-orange" /> {contact.phone}
              </a>
            </li>
            <li>
              <a
                href={contact.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 leading-relaxed hover:text-white"
              >
                <MapPin className="mt-1 size-4 shrink-0 text-orange" />
                <address className="not-italic">{contact.address}</address>
              </a>
            </li>
          </ul>
          <SocialLinks className="mt-5" />
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-[#d3dded]/60 sm:flex-row">
          <p>© {siteConfig.name}. All rights reserved.</p>
          <p>{siteConfig.tagline}</p>
        </Container>
      </div>
    </footer>
  );
}
