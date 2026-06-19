/**
 * Shared content-layer types for the site.
 */

/**
 * Design-version id used by the [data-version] theming hooks in globals.css.
 * Only the v2 "Modern Clinical" design remains (it serves at the root paths).
 */
export type VersionId = "v2";

export interface ConditionContent {
  slug: string;
  navLabel: string;
  eyebrow: string;
  headline: string;
  subhead?: string;
  /** Body copy, one entry per paragraph (verbatim source copy). */
  paragraphs: string[];
  /** One short hand-written sentence summarizing the condition copy. */
  excerpt: string;
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
    city: string;
    state: string;
    zip: string;
    /** Pre-joined "City, ST 00000" display form. */
    cityStateZip: string;
    note: string;
    mapsHref: string;
  };
  socials: {
    instagram: string;
    facebook: string;
  };
  /** Root-relative paths — exposed as hrefs via QUICK_LINKS in nav.ts. */
  quickLinks: { label: string; path: string }[];
  disclaimer: string;
}

export interface NavConfig {
  /** How It Works, About Us, Newsletters */
  primary: { label: string; href: string }[];
  /** 10 condition links */
  whoWeHelp: { label: string; href: string }[];
  /** Schedule Consultation -> /contact */
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

export interface HowItWorksStep {
  /** Step title without any "Step N:" prefix — render numbering yourself. */
  title: string;
  body: string[];
  /** One short hand-written sentence for compact step summaries. */
  excerpt: string;
}

export interface HowItWorksPage {
  headline: string;
  subhead?: string;
  /** The four method steps, in order. */
  steps: HowItWorksStep[];
  /** The "Why Neurofeedback" explainer. */
  why: InfoSection;
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
