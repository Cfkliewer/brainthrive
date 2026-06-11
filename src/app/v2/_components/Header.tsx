"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDisclosure } from "@/components/versions/DisclosureMenu";
import { CONDITIONS } from "@/lib/content/conditions";
import { navFor } from "@/lib/content/nav";
import { SITE } from "@/lib/content/site";
import MagneticButton from "./MagneticButton";
import { BTN_PRIMARY, CONTAINER, EYEBROW_ON_LIGHT } from "./styles";

const NAV = navFor("v2");

const DESKTOP_LINK =
  "text-sm font-medium text-medical-gray-700 transition-colors hover:text-brand-purple";

/**
 * V2 masthead: sticky white header with backdrop blur that shrinks after
 * scrolling, a "Who We Help" card-grid mega panel (2x5 conditions with
 * excerpts), and a full-screen mobile menu.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const whoWeHelp = useDisclosure<HTMLElement>();
  const mobileMenu = useDisclosure<HTMLDivElement>({
    closeAboveQuery: "(min-width: 1024px)",
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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

  return (
    <header
      ref={whoWeHelp.containerRef}
      className="sticky top-0 z-40 border-b border-medical-gray-200 bg-white/90 backdrop-blur-md"
    >
      <div
        className={`${CONTAINER} flex items-center justify-between transition-[padding] duration-300 ${
          scrolled ? "py-2.5" : "py-4 lg:py-5"
        }`}
      >
        <Link href="/v2" className="block">
          <span className="block text-lg font-semibold leading-none tracking-tight text-brand-navy">
            {SITE.name}
          </span>
          <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.28em] text-medical-gray-500">
            {SITE.tagline}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          <button
            {...whoWeHelp.triggerProps}
            className={`flex cursor-pointer items-center gap-1.5 ${DESKTOP_LINK}`}
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
            <Link key={item.href} href={item.href} className={DESKTOP_LINK}>
              {item.label}
            </Link>
          ))}
          <MagneticButton
            href={NAV.cta.href}
            className={`${BTN_PRIMARY} px-6 py-2.5`}
          >
            {NAV.cta.label}
          </MagneticButton>
        </nav>

        {/* Mobile menu */}
        <div ref={mobileMenu.containerRef} className="lg:hidden">
          <button
            {...mobileMenu.triggerProps}
            className="flex cursor-pointer flex-col items-end gap-1.5 p-2"
          >
            <span className="sr-only">Menu</span>
            <span aria-hidden className="h-0.5 w-6 rounded bg-brand-navy" />
            <span aria-hidden className="h-0.5 w-4 rounded bg-brand-navy" />
          </button>
          <div
            {...mobileMenu.panelProps}
            className="fixed inset-0 z-50 overflow-y-auto bg-white"
          >
            <div className="flex items-center justify-between border-b border-medical-gray-200 px-6 py-4">
              <span className="text-lg font-semibold tracking-tight text-brand-navy">
                {SITE.name}
              </span>
              <button
                onClick={mobileMenu.close}
                className="cursor-pointer p-2 text-xs font-semibold uppercase tracking-[0.18em] text-medical-gray-700"
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
                      className="block py-2 text-2xl font-semibold tracking-tight text-brand-navy"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={NAV.cta.href}
                className={`${BTN_PRIMARY} mt-6 w-full`}
              >
                {NAV.cta.label}
              </Link>
              <p
                className={`mt-10 border-t border-medical-gray-200 pt-6 ${EYEBROW_ON_LIGHT}`}
              >
                Who We Help
              </p>
              <ul className="mt-3">
                {NAV.whoWeHelp.map((item, index) => (
                  <li
                    key={item.href}
                    className="border-b border-medical-gray-100"
                  >
                    <Link
                      href={item.href}
                      className="flex items-baseline gap-4 py-3"
                    >
                      <span className="text-xs font-semibold text-medical-gray-400 tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-medium text-brand-navy">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-10 space-y-2 text-sm text-medical-gray-700">
                <a href={SITE.phone.href} className="block">
                  {SITE.phone.display}
                </a>
                <a href={`mailto:${SITE.email}`} className="block break-all">
                  {SITE.email}
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Who We Help mega panel (desktop). Solid white: a translucent/
          blurred surface lets the hero bleed through and muddies the grid. */}
      <div
        {...whoWeHelp.panelProps}
        className="absolute inset-x-0 top-full border-b border-medical-gray-200 bg-white shadow-xl shadow-brand-navy/10"
      >
        <div className={`${CONTAINER} py-8`}>
          <p className={EYEBROW_ON_LIGHT}>Who We Help</p>
          <ul className="mt-5 grid gap-x-10 gap-y-1 md:grid-cols-2">
            {CONDITIONS.map((condition, index) => (
              <li key={condition.slug}>
                <Link
                  href={`/v2/who-we-help/${condition.slug}`}
                  className="group flex items-baseline gap-4 rounded-xl px-3 py-2.5 transition-colors hover:bg-medical-gray-50"
                >
                  <span className="text-xs font-semibold text-medical-gray-400 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-brand-navy transition-colors group-hover:text-brand-purple">
                      {condition.navLabel}
                    </span>
                    <span className="mt-0.5 block text-[13px] leading-snug text-medical-gray-500">
                      {condition.excerpt}
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
