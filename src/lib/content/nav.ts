import { CONDITIONS } from "./conditions";
import { SITE } from "./site";
import type { NavConfig } from "./types";

/** Site navigation config (root-relative hrefs). */
export const NAV: NavConfig = {
  primary: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "About Us", href: "/about" },
    { label: "Self-Assessment", href: "/quiz" },
    { label: "Newsletters", href: "/newsletters" },
  ],
  whoWeHelp: CONDITIONS.map((condition) => ({
    label: condition.navLabel,
    href: `/who-we-help/${condition.slug}`,
  })),
  cta: { label: "Schedule Consultation", href: "/contact" },
};

/** SITE.quickLinks resolved to hrefs (paths are already root-relative). */
export const QUICK_LINKS: { label: string; href: string }[] =
  SITE.quickLinks.map((link) => ({
    label: link.label,
    href: link.path,
  }));
