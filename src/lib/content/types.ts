/**
 * Shared content-layer types consumed by the three site versions (/v1, /v2, /v3).
 * Keep these shapes stable — multiple version builds code against them.
 */

export type VersionId = "v1" | "v2" | "v3";

export interface ConditionContent {
  slug: string;
  navLabel: string;
  eyebrow: string;
  headline: string;
  subhead?: string;
  /** Body copy, one entry per paragraph (verbatim source copy). */
  paragraphs: string[];
  /** The "Schedule a consultation today..." closing line. */
  cta: string;
  /** <=160 chars, used for the page's meta description. */
  metaDescription: string;
}

export interface SiteContent {
  name: string;
  tagline: string;
  phone: {
    display: string;
    href: string;
  };
  email: string;
  address: {
    street: string;
    cityStateZip: string;
    note: string;
    mapsHref: string;
  };
  socials: {
    instagram: string;
    facebook: string;
  };
  /** Version-relative paths — resolve with quickLinksFor(version) from nav.ts. */
  quickLinks: { label: string; path: string }[];
  disclaimer: string;
}

export interface NavConfig {
  /** How It Works, About Us, Newsletters */
  primary: { label: string; href: string }[];
  /** 10 condition links */
  whoWeHelp: { label: string; href: string }[];
  /** Schedule Consultation -> /vN/contact */
  cta: { label: string; href: string };
}

export interface InfoSection {
  heading: string;
  body: string[];
}

export interface InfoPage {
  headline: string;
  subhead?: string;
  sections: InfoSection[];
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface NewsletterEntry {
  title: string;
  date: string;
  summary: string;
}
