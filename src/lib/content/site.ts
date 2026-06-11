import type { SiteContent } from "./types";

/**
 * Clinic-wide contact and identity content shared by all three site versions.
 */
export const SITE: SiteContent = {
  name: "Brain Thrive Wellness",
  tagline: "Prioritizing Brain Health",
  phone: {
    display: "405-563-0816",
    href: "tel:+14055630816",
  },
  email: "admin@brainthrivewellness.com",
  address: {
    street: "15805 NE 23rd St.",
    cityStateZip: "Choctaw, OK 73020",
    note: "Located inside Quick Access Neurology, next door to FNB Bank.",
    mapsHref:
      "https://www.google.com/maps/search/?api=1&query=15805+NE+23rd+St%2C+Choctaw%2C+OK+73020",
  },
  socials: {
    instagram: "https://www.instagram.com/brainthriveok",
    facebook: "https://www.facebook.com/p/Brain-Thrive-61577093643627/",
  },
  // Version-relative paths; resolve to /vN-prefixed hrefs via quickLinksFor() in nav.ts.
  // Note: there is no standalone services index page, so "Services" points at the
  // services section of the How It Works page (/how-it-works#services), where the
  // qEEG -> protocol -> PBM + Neurofeedback flow is described.
  quickLinks: [
    { label: "Why Neurofeedback", path: "/how-it-works#why-neurofeedback" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/how-it-works#services" },
    { label: "Contact Us", path: "/contact" },
  ],
  disclaimer:
    "Our services support brain wellness and are not a substitute for medical diagnosis or treatment. Always consult your healthcare provider.",
};
