import { describe, it, expect } from "vitest";
import { navFor, quickLinksFor } from "./nav";
import { CONDITIONS } from "./conditions";
import { VERSION_IDS } from "./types";

describe("navFor", () => {
  it("prefixes every href with the version segment", () => {
    for (const version of VERSION_IDS) {
      const nav = navFor(version);
      const allHrefs = [
        ...nav.primary.map((l) => l.href),
        ...nav.whoWeHelp.map((l) => l.href),
        nav.cta.href,
      ];
      for (const href of allHrefs) {
        expect(href.startsWith(`/${version}/`)).toBe(true);
      }
    }
  });

  it("exposes 10 whoWeHelp condition links matching CONDITIONS order", () => {
    const nav = navFor("v2");
    expect(nav.whoWeHelp).toHaveLength(10);
    nav.whoWeHelp.forEach((link, i) => {
      expect(link.label).toBe(CONDITIONS[i].navLabel);
      expect(link.href).toBe(`/v2/who-we-help/${CONDITIONS[i].slug}`);
    });
  });

  it("points the cta at /vN/contact", () => {
    for (const version of VERSION_IDS) {
      const nav = navFor(version);
      expect(nav.cta).toEqual({
        label: "Schedule Consultation",
        href: `/${version}/contact`,
      });
    }
  });

  it("includes the three primary pages", () => {
    const nav = navFor("v1");
    expect(nav.primary).toEqual([
      { label: "How It Works", href: "/v1/how-it-works" },
      { label: "About Us", href: "/v1/about" },
      { label: "Newsletters", href: "/v1/newsletters" },
    ]);
  });
});

describe("quickLinksFor", () => {
  it("resolves version-relative quick link paths to prefixed hrefs", () => {
    const links = quickLinksFor("v3");
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link.href.startsWith("/v3/")).toBe(true);
    }
  });
});
