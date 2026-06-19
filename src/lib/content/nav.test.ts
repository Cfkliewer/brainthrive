import { describe, it, expect } from "vitest";
import { NAV, QUICK_LINKS } from "./nav";
import { CONDITIONS } from "./conditions";

describe("NAV", () => {
  it("uses root-relative hrefs everywhere", () => {
    const allHrefs = [
      ...NAV.primary.map((l) => l.href),
      ...NAV.whoWeHelp.map((l) => l.href),
      NAV.cta.href,
    ];
    for (const href of allHrefs) {
      expect(href.startsWith("/")).toBe(true);
      expect(href.startsWith("/v")).toBe(false);
    }
  });

  it("exposes 10 whoWeHelp condition links matching CONDITIONS order", () => {
    expect(NAV.whoWeHelp).toHaveLength(10);
    NAV.whoWeHelp.forEach((link, i) => {
      expect(link.label).toBe(CONDITIONS[i].navLabel);
      expect(link.href).toBe(`/who-we-help/${CONDITIONS[i].slug}`);
    });
  });

  it("points the cta at /contact", () => {
    expect(NAV.cta).toEqual({
      label: "Schedule Consultation",
      href: "/contact",
    });
  });

  it("includes the three primary pages", () => {
    expect(NAV.primary).toEqual([
      { label: "How It Works", href: "/how-it-works" },
      { label: "About Us", href: "/about" },
      { label: "Newsletters", href: "/newsletters" },
    ]);
  });
});

describe("QUICK_LINKS", () => {
  it("resolves SITE.quickLinks paths verbatim", () => {
    expect(QUICK_LINKS.length).toBeGreaterThan(0);
    expect(QUICK_LINKS).toContainEqual({
      label: "Services",
      href: "/how-it-works#services",
    });
    for (const link of QUICK_LINKS) {
      expect(link.href.startsWith("/")).toBe(true);
    }
  });
});
