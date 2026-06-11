import { CONDITIONS } from "./conditions";
import { SITE } from "./site";
import type { NavConfig, VersionId } from "./types";

/**
 * Builds the navigation config for a given site version, prefixing every
 * href with /v1, /v2, or /v3.
 */
export function navFor(version: VersionId): NavConfig {
  const base = `/${version}`;
  return {
    primary: [
      { label: "How It Works", href: `${base}/how-it-works` },
      { label: "About Us", href: `${base}/about` },
      { label: "Newsletters", href: `${base}/newsletters` },
    ],
    whoWeHelp: CONDITIONS.map((condition) => ({
      label: condition.navLabel,
      href: `${base}/who-we-help/${condition.slug}`,
    })),
    cta: { label: "Schedule Consultation", href: `${base}/contact` },
  };
}

/**
 * Resolves SITE.quickLinks (version-relative paths) to version-prefixed hrefs.
 */
export function quickLinksFor(
  version: VersionId
): { label: string; href: string }[] {
  return SITE.quickLinks.map((link) => ({
    label: link.label,
    href: `/${version}${link.path}`,
  }));
}
