"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useDisclosure } from "@/components/versions/DisclosureMenu";
import { CONDITIONS } from "@/lib/content/conditions";
import { navFor } from "@/lib/content/nav";
import { SITE } from "@/lib/content/site";
import { BTN_GLOW_BASE, CONTAINER, EYEBROW } from "./styles";

const NAV = navFor("v3");

/** Nav links zipped with their condition excerpts for the mega-panel. */
const WHO_WE_HELP = NAV.whoWeHelp.map((item, index) => ({
  ...item,
  excerpt: CONDITIONS[index].excerpt,
}));

/**
 * V3 masthead: fixed header that fades from transparent (over the hero)
 * to blurred navy with a bottom hairline once the page scrolls. "Who We
 * Help" opens a near-full-screen dark mega-panel (2x5 numbered grid with
 * excerpts, staggered entrance); mobile gets a full-screen menu.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const whoWeHelp = useDisclosure<HTMLElement>();
  const mobileMenu = useDisclosure<HTMLDivElement>({
    closeAboveQuery: "(min-width: 1024px)",
  });
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll behind the full-screen mobile menu.
  useEffect(() => {
    if (!mobileMenu.open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileMenu.open]);

  // Staggered entrance for the mega-panel grid each time it opens.
  useGSAP(
    () => {
      if (!whoWeHelp.open || !panelRef.current) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(panelRef.current!.querySelectorAll("[data-mega-item]"), {
          autoAlpha: 0,
          y: 18,
          duration: 0.45,
          ease: "power2.out",
          stagger: 0.035,
        });
      });
    },
    { scope: panelRef, dependencies: [whoWeHelp.open] }
  );

  const solid = scrolled || whoWeHelp.open;

  return (
    <header
      ref={whoWeHelp.containerRef}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        solid
          ? "border-white/10 bg-brand-navy/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div
        className={`${CONTAINER} flex items-center justify-between py-4 lg:py-5`}
      >
        <Link href="/v3" className="block">
          <span className="v3-display block text-2xl leading-none text-white md:text-[1.7rem]">
            {SITE.name}
          </span>
          <span className="mt-1 block text-[10px] uppercase tracking-[0.28em] text-brand-teal/90">
            {SITE.tagline}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 text-sm lg:flex"
        >
          <button
            {...whoWeHelp.triggerProps}
            className="flex cursor-pointer items-center gap-1.5 text-white/85 transition-colors hover:text-brand-teal"
          >
            Who We Help
            <svg
              aria-hidden
              viewBox="0 0 10 6"
              className={`h-1.5 w-2.5 fill-none stroke-current transition-transform duration-200 ${
                whoWeHelp.open ? "rotate-180" : ""
              }`}
            >
              <path d="M1 1l4 4 4-4" strokeWidth="1.5" />
            </svg>
          </button>
          {NAV.primary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white/85 transition-colors hover:text-brand-teal"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={NAV.cta.href}
            className={`${BTN_GLOW_BASE} px-5 py-2.5 text-xs`}
          >
            {NAV.cta.label}
          </Link>
        </nav>

        {/* Mobile menu */}
        <div ref={mobileMenu.containerRef} className="lg:hidden">
          <button
            {...mobileMenu.triggerProps}
            className="cursor-pointer text-[13px] uppercase tracking-[0.18em] text-white"
          >
            Menu
          </button>
          <div
            {...mobileMenu.panelProps}
            className="fixed inset-0 z-50 overflow-y-auto bg-medical-secondary"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <span className="v3-display text-2xl text-white">
                {SITE.name}
              </span>
              <button
                onClick={mobileMenu.close}
                className="cursor-pointer text-[13px] uppercase tracking-[0.18em] text-white"
              >
                Close
              </button>
            </div>
            <nav aria-label="Mobile" className="px-6 pb-16 pt-8">
              <ul className="space-y-1">
                {NAV.primary.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="v3-display block py-2 text-4xl text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={NAV.cta.href}
                    className="v3-display block py-2 text-4xl text-brand-teal"
                  >
                    {NAV.cta.label}
                  </Link>
                </li>
              </ul>
              <p className={`mt-10 border-t border-white/10 pt-6 ${EYEBROW}`}>
                Who We Help
              </p>
              <ul className="mt-3">
                {WHO_WE_HELP.map((item, index) => (
                  <li key={item.href} className="border-b border-white/10">
                    <Link
                      href={item.href}
                      className="flex items-baseline gap-4 py-3"
                    >
                      <span className="text-xs tabular-nums text-brand-teal/70">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-lg text-white/90">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-10 space-y-2 text-sm text-white/80">
                <a href={SITE.phone.href} className="block">
                  {SITE.phone.display}
                </a>
                <a href={`mailto:${SITE.email}`} className="block">
                  {SITE.email}
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Who We Help mega-panel */}
      <div
        {...whoWeHelp.panelProps}
        ref={panelRef}
        className="absolute inset-x-0 top-full max-h-[calc(100vh-5rem)] overflow-y-auto border-b border-white/10 bg-medical-secondary/95 shadow-[0_40px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl"
      >
        <div className={`${CONTAINER} py-10`}>
          <p className={EYEBROW} data-mega-item>
            Who We Help
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-x-10 gap-y-2 md:grid-cols-2">
            {WHO_WE_HELP.map((item, index) => (
              <li key={item.href} data-mega-item>
                <Link
                  href={item.href}
                  className="group flex gap-5 rounded-xl border border-transparent px-4 py-3.5 transition-colors hover:border-white/10 hover:bg-white/[0.04]"
                >
                  <span className="v3-display pt-0.5 text-xl tabular-nums text-brand-teal/60 transition-colors group-hover:text-brand-teal">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block font-medium text-white transition-colors group-hover:text-brand-teal">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-white/55">
                      {item.excerpt}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
