import type { IconName } from "@/lib/icons";
import {
  categories,
  getInstitution,
  kindLabel,
  programmeHref,
  programmesOf,
  type ProgrammeKind,
} from "./programmes";
import { destinations, formats } from "./immersions";

/**
 * Header mega-menu data, derived from the programme and immersion catalogues.
 * Each menu lists groups (categories) on the left and the items of the hovered
 * group on the right. Groups appear in the order of their first item.
 */
export type CatalogItem = {
  slug: string;
  title: string;
  text: string;
  href: string;
  icon: IconName;
  group: string;
  /** Link for the group itself (e.g. a filtered listing). */
  groupHref?: string;
  /** Small line above the title — institution, audience or region. */
  eyebrow: string;
  image?: string;
  logo?: string;
};

export type MegaMenu = {
  title: string;
  viewAll: { label: string; href: string };
  items: CatalogItem[];
};

function programmeItems(kind: ProgrammeKind): CatalogItem[] {
  const base = kindLabel[kind].base;
  // Keep category order.
  return categories.flatMap((c) =>
    programmesOf(kind)
      .filter((p) => p.category === c.slug)
      .map((p) => {
        const inst = getInstitution(p.institution);
        return {
          slug: p.slug,
          title: p.title,
          text: p.summary,
          href: programmeHref(p),
          icon: c.icon,
          group: c.name,
          groupHref: `${base}?category=${c.slug}`,
          eyebrow: inst ? `${inst.name} · Coming soon` : "Coming soon",
          image: c.image,
        };
      }),
  );
}

const immersionItems: CatalogItem[] = [
  ...destinations.map((d) => ({
    slug: d.slug,
    title: d.name,
    text: d.title,
    href: `/immersion-programs/${d.slug}`,
    icon: "globe" as IconName,
    group: "Destinations",
    groupHref: "/immersion-programs#destinations",
    eyebrow: d.region,
    image: d.image,
  })),
  ...formats.map((f) => ({
    slug: f.slug,
    title: f.title,
    text: f.text,
    href: `/immersion-programs#${f.slug}`,
    icon: f.icon,
    group: "Programme Formats",
    groupHref: "/immersion-programs#formats",
    eyebrow: "Format",
    image: f.image,
  })),
];

export const megaMenus = {
  programs: {
    title: "Our Programs",
    viewAll: { label: "View all programmes", href: "/programs" },
    items: programmeItems("programme"),
  },
  immersion: {
    title: "Immersion Programs",
    viewAll: { label: "View all immersions", href: "/immersion-programs" },
    items: immersionItems,
  },
  certifications: {
    title: "Certifications",
    viewAll: { label: "View all certifications", href: "/certifications" },
    items: programmeItems("certification"),
  },
} satisfies Record<string, MegaMenu>;

export type MegaMenuKey = keyof typeof megaMenus;

/** Items grouped by `group`, in order of first appearance. */
export function groupItems(items: CatalogItem[]) {
  const map = new Map<string, CatalogItem[]>();
  for (const item of items) map.set(item.group, [...(map.get(item.group) ?? []), item]);
  return [...map.entries()].map(([name, list]) => ({
    name,
    href: list[0].groupHref,
    items: list,
  }));
}
