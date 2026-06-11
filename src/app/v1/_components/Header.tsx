"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDisclosure } from "@/components/versions/DisclosureMenu";
import { navFor } from "@/lib/content/nav";
import { SITE } from "@/lib/content/site";
import WhoWeHelpPanel from "./WhoWeHelpPanel";

const NAV = navFor("v1");

/** "Choctaw, OK" — cityStateZip with the trailing ZIP removed. */
const CITY_STATE = SITE.address.cityStateZip.replace(/\s*\d{5}(-\d{4})?$/, "");

/**
 * V1 masthead: hairline utility bar (phone + city), sticky wordmark header
 * with a "Who We Help" disclosure panel, and a full-screen mobile menu.
 * The sticky header fades from transparent to white with a bottom hairline
 * after the page scrolls (cheap rAF-free scroll listener).
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const whoWeHelp = useDisclosure<HTMLElement>();
  const mobileMenu = useDisclosure<HTMLDivElement>();

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
      <div className="border-b border-[#002554]/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5 text-[11px] uppercase tracking-[0.18em] md:px-10">
          <a
            href={SITE.phone.href}
            className="transition-colors hover:text-[#5362EF]"
          >
            {SITE.phone.display}
          </a>
          <span className="text-[#002554]/70">{CITY_STATE}</span>
        </div>
      </div>

      <header
        ref={whoWeHelp.containerRef}
        className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
          solid
            ? "border-[#002554]/10 bg-white"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 lg:py-5">
          <Link href="/v1" className="block">
            <span className="v1-display block text-xl leading-none tracking-tight md:text-[1.4rem]">
              {SITE.name}
            </span>
            <span className="mt-1.5 block text-[10px] uppercase tracking-[0.28em] text-[#002554]/70">
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
              className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-[#5362EF]"
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
                className="transition-colors hover:text-[#5362EF]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={NAV.cta.href}
              className="font-medium text-[#5362EF] underline decoration-[#5362EF]/30 underline-offset-[6px] transition-colors hover:decoration-[#5362EF]"
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
              <div className="flex items-center justify-between border-b border-[#002554]/10 px-6 py-4">
                <span className="v1-display text-xl tracking-tight">
                  {SITE.name}
                </span>
                <button
                  onClick={() => mobileMenu.setOpen(false)}
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
                      className="v1-display block py-2 text-3xl tracking-tight text-[#5362EF]"
                    >
                      {NAV.cta.label}
                    </Link>
                  </li>
                </ul>
                <p className="mt-10 border-t border-[#002554]/10 pt-6 text-[11px] uppercase tracking-[0.22em] text-[#5362EF]">
                  Who We Help
                </p>
                <ul className="mt-3">
                  {NAV.whoWeHelp.map((item, index) => (
                    <li
                      key={item.href}
                      className="border-b border-[#002554]/10"
                    >
                      <Link
                        href={item.href}
                        className="flex items-baseline gap-4 py-3"
                      >
                        <span className="v1-display text-xs text-[#5362EF] tabular-nums">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-base">{item.label}</span>
                      </Link>
                    </li>
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
