"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDisclosure } from "@/components/versions/DisclosureMenu";
import { CONDITIONS } from "@/lib/content/conditions";
import { NAV } from "@/lib/content/nav";
import { SITE } from "@/lib/content/site";
import MagneticButton from "./MagneticButton";
import { BTN_PRIMARY, CONTAINER, EYEBROW_ON_LIGHT } from "./styles";

/** Portion of the viewport height to scroll before the homepage header
 *  trades its transparent-over-hero look for the solid white one.
 *  Tuned to the 72svh hero: flips just before the hero bottom passes
 *  under the header so the white bar never floats over white content. */
const HERO_EXIT_RATIO = 0.6;

const LINK_BASE = "text-sm font-medium transition-colors";
const LINK_ON_LIGHT = `${LINK_BASE} text-medical-gray-700 hover:text-brand-purple`;
const LINK_ON_DARK = `${LINK_BASE} text-white/90 hover:text-brand-teal`;

/**
 * V2 masthead. On the homepage it overlays the hero: fixed,
 * transparent, white text (the hero's top scrim provides the backing),
 * switching to the solid white + blur treatment as the hero scrolls
 * out. Everywhere else it is the solid sticky header from
 * the first paint (state derives from the pathname synchronously, so
 * there is no transparent flash on inner pages). Also hosts the
 * "Who We Help" mega panel and the full-screen mobile menu.
 */
export default function Header() {
  const isHome = usePathname() === "/";
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const whoWeHelp = useDisclosure<HTMLElement>();
  const mobileMenu = useDisclosure<HTMLDivElement>({
    closeAboveQuery: "(min-width: 1024px)",
  });

  // One rAF-throttled listener drives both the padding shrink and the
  // homepage transparent->solid switch; resize re-evaluates the threshold.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 12);
      setPastHero(window.scrollY > window.innerHeight * HERO_EXIT_RATIO);
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
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

  const transparent = isHome && !pastHero;
  const desktopLink = transparent ? LINK_ON_DARK : LINK_ON_LIGHT;

  return (
    <header
      ref={whoWeHelp.containerRef}
      className={`top-0 z-40 border-b transition-colors duration-300 ${
        isHome ? "fixed inset-x-0" : "sticky"
      } ${
        transparent
          ? "v2-band-dark border-transparent bg-transparent"
          : "border-medical-gray-200 bg-white/90 backdrop-blur-md"
      }`}
    >
      <div
        className={`${CONTAINER} flex items-center justify-between transition-[padding] duration-300 ${
          scrolled ? "py-2.5" : "py-4 lg:py-5"
        }`}
      >
        <Link href="/" className="block">
          <span
            className={`block text-lg font-semibold leading-none tracking-tight transition-colors ${
              transparent ? "text-white" : "text-brand-navy"
            }`}
          >
            {SITE.name}
          </span>
          <span
            className={`mt-1 block text-[10px] font-medium uppercase tracking-[0.28em] transition-colors ${
              transparent ? "text-white/70" : "text-medical-gray-500"
            }`}
          >
            {SITE.tagline}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          <button
            {...whoWeHelp.triggerProps}
            className={`flex cursor-pointer items-center gap-1.5 ${desktopLink}`}
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
            <Link key={item.href} href={item.href} className={desktopLink}>
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
            <span
              aria-hidden
              className={`h-0.5 w-6 rounded transition-colors ${
                transparent ? "bg-white" : "bg-brand-navy"
              }`}
            />
            <span
              aria-hidden
              className={`h-0.5 w-4 rounded transition-colors ${
                transparent ? "bg-white" : "bg-brand-navy"
              }`}
            />
          </button>
          <div
            {...mobileMenu.panelProps}
            className="v2-band-light fixed inset-0 z-50 overflow-y-auto bg-white"
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
          blurred surface lets the hero bleed through and muddies the grid.
          v2-band-light restores blue focus rings while the header itself
          is in its dark (transparent-over-hero) state. */}
      <div
        {...whoWeHelp.panelProps}
        className="v2-band-light absolute inset-x-0 top-full border-b border-medical-gray-200 bg-white shadow-xl shadow-brand-navy/10"
      >
        <div className={`${CONTAINER} py-8`}>
          <p className={EYEBROW_ON_LIGHT}>Who We Help</p>
          <ul className="mt-5 grid gap-x-10 gap-y-1 md:grid-cols-2">
            {CONDITIONS.map((condition, index) => (
              <li key={condition.slug}>
                <Link
                  href={`/who-we-help/${condition.slug}`}
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
