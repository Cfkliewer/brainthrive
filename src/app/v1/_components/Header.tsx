"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDisclosure } from "@/components/versions/DisclosureMenu";
import { navFor } from "@/lib/content/nav";
import { SITE } from "@/lib/content/site";
import IndexRow from "./IndexRow";
import { CONTAINER, EYEBROW_ACCENT } from "./styles";
import WhoWeHelpPanel from "./WhoWeHelpPanel";

const NAV = navFor("v1");

/** "Choctaw, OK" */
const CITY_STATE = `${SITE.address.city}, ${SITE.address.state}`;

/**
 * V1 masthead: hairline utility bar (phone + city), sticky wordmark header
 * with a "Who We Help" disclosure panel, and a full-screen mobile menu.
 * The sticky header fades from transparent to white with a bottom hairline
 * after the page scrolls (cheap rAF-free scroll listener).
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const whoWeHelp = useDisclosure<HTMLElement>();
  // Auto-close when the viewport reaches the desktop nav breakpoint, so the
  // body scroll-lock below can't get stuck behind an invisible menu.
  const mobileMenu = useDisclosure<HTMLDivElement>({
    closeAboveQuery: "(min-width: 1024px)",
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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

  const solid = scrolled || whoWeHelp.open;

  return (
    <>
      {/* Hairline utility bar (scrolls away) */}
      <div className="border-b border-brand-navy/10">
        <div
          className={`${CONTAINER} flex items-center justify-between py-2.5 text-[11px] uppercase tracking-[0.18em]`}
        >
          <a
            href={SITE.phone.href}
            className="transition-colors hover:text-brand-ultraviolet"
          >
            {SITE.phone.display}
          </a>
          <span className="text-brand-navy/70">{CITY_STATE}</span>
        </div>
      </div>

      <header
        ref={whoWeHelp.containerRef}
        className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
          solid
            ? "border-brand-navy/10 bg-white"
            : "border-transparent bg-transparent"
        }`}
      >
        <div
          className={`${CONTAINER} flex items-center justify-between py-4 lg:py-5`}
        >
          <Link href="/v1" className="block">
            <span className="v1-display block text-xl leading-none tracking-tight md:text-[1.4rem]">
              {SITE.name}
            </span>
            <span className="mt-1.5 block text-[10px] uppercase tracking-[0.28em] text-brand-navy/70">
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
              className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-brand-ultraviolet"
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
                className="transition-colors hover:text-brand-ultraviolet"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={NAV.cta.href}
              className="font-medium text-brand-ultraviolet underline decoration-brand-ultraviolet/30 underline-offset-[6px] transition-colors hover:decoration-brand-ultraviolet"
            >
              {NAV.cta.label} <span aria-hidden>&rarr;</span>
            </Link>
          </nav>

          {/* Mobile menu */}
          <div ref={mobileMenu.containerRef} className="lg:hidden">
            <button
              {...mobileMenu.triggerProps}
              className="cursor-pointer text-[13px] uppercase tracking-[0.18em]"
            >
              Menu
            </button>
            <div
              {...mobileMenu.panelProps}
              className="fixed inset-0 z-50 overflow-y-auto bg-white"
            >
              <div className="flex items-center justify-between border-b border-brand-navy/10 px-6 py-4">
                <span className="v1-display text-xl tracking-tight">
                  {SITE.name}
                </span>
                <button
                  onClick={mobileMenu.close}
                  className="cursor-pointer text-[13px] uppercase tracking-[0.18em]"
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
                        className="v1-display block py-2 text-3xl tracking-tight"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href={NAV.cta.href}
                      className="v1-display block py-2 text-3xl tracking-tight text-brand-ultraviolet"
                    >
                      {NAV.cta.label}
                    </Link>
                  </li>
                </ul>
                <p
                  className={`mt-10 border-t border-brand-navy/10 pt-6 ${EYEBROW_ACCENT}`}
                >
                  Who We Help
                </p>
                <ul className="mt-3">
                  {NAV.whoWeHelp.map((item, index) => (
                    <IndexRow
                      key={item.href}
                      href={item.href}
                      index={index}
                      label={item.label}
                      density="mobile"
                    />
                  ))}
                </ul>
                <div className="mt-10 space-y-2 text-sm">
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

        <WhoWeHelpPanel {...whoWeHelp.panelProps} items={NAV.whoWeHelp} />
      </header>
    </>
  );
}
