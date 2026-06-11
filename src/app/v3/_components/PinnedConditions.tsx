"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CONDITIONS } from "@/lib/content/conditions";
import { ARROW_LINK, CONTAINER, EYEBROW, GLASS_PANEL } from "./styles";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ITEMS = CONDITIONS.map((condition) => ({
  href: `/v3/who-we-help/${condition.slug}`,
  label: condition.navLabel,
  eyebrow: condition.eyebrow,
  excerpt: condition.excerpt,
}));

/**
 * Chapter 4: "Who We Help" pinned scrollytelling. The left column lists all
 * ten conditions as real links (DOM order = reading order); the scrub
 * highlights each in turn while the right panel echoes the active
 * condition's eyebrow and excerpt. Mobile and reduced motion get a plain
 * stacked list with excerpts.
 */
export default function PinnedConditions() {
  const scopeRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const pinSection = pinRef.current;
      if (!pinSection) return;

      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const links = gsap.utils.toArray<HTMLElement>(
            pinSection.querySelectorAll("[data-condition-link]")
          );
          const panels = gsap.utils.toArray<HTMLElement>(
            pinSection.querySelectorAll("[data-condition-panel]")
          );

          let current = -1;
          const setActive = (index: number) => {
            if (index === current) return;
            current = index;
            links.forEach((link, i) => {
              gsap.to(link, {
                color:
                  i === index ? "var(--color-brand-teal)" : "rgba(255,255,255,0.4)",
                x: i === index ? 10 : 0,
                scale: i === index ? 1.04 : 1,
                textShadow:
                  i === index
                    ? "0 0 28px rgba(53,243,230,0.55)"
                    : "0 0 0 rgba(53,243,230,0)",
                duration: 0.45,
                ease: "power2.out",
                overwrite: "auto",
              });
            });
            panels.forEach((panel, i) => {
              gsap.to(panel, {
                autoAlpha: i === index ? 1 : 0,
                y: i === index ? 0 : 14,
                duration: 0.45,
                ease: "power2.out",
                overwrite: "auto",
              });
            });
          };

          const trigger = ScrollTrigger.create({
            trigger: pinSection,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            onUpdate: (self) => {
              setActive(
                Math.min(
                  ITEMS.length - 1,
                  Math.floor(self.progress * ITEMS.length)
                )
              );
            },
          });
          setActive(0);

          return () => trigger.kill();
        }
      );
    },
    { scope: scopeRef }
  );

  return (
    <section
      ref={scopeRef}
      aria-label="Who we help"
      className="relative bg-medical-secondary"
    >
      {/* Static fallback: mobile and reduced motion. */}
      <div className="block lg:motion-safe:hidden">
        <div className={`${CONTAINER} py-24`}>
          <p className={EYEBROW}>Who We Help</p>
          <h2 className="v3-display mt-5 text-[clamp(2.75rem,8vw,5rem)] leading-[0.95] text-white">
            Ten reasons people walk through our door
          </h2>
          <ul className="mt-10 space-y-4">
            {ITEMS.map((item, index) => (
              <li key={item.href} className={`${GLASS_PANEL} p-6`}>
                <Link href={item.href} className="group block">
                  <p className={EYEBROW}>
                    {String(index + 1).padStart(2, "0")} — {item.eyebrow}
                  </p>
                  <span className="v3-display mt-2 block text-3xl text-white transition-colors group-hover:text-brand-teal">
                    {item.label}
                  </span>
                  <span className="mt-2 block text-[15px] leading-relaxed text-white/70">
                    {item.excerpt}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pinned scrub: desktop with motion allowed. */}
      <div
        ref={pinRef}
        className="relative hidden h-[400vh] lg:motion-safe:block"
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(50rem 36rem at 80% 50%, rgba(83,98,239,0.16), transparent 60%)",
            }}
          />
          <div className={`${CONTAINER} relative grid w-full grid-cols-12 gap-10`}>
            {/* Left: all ten links, in DOM/reading order. */}
            <div className="col-span-7">
              <p className={EYEBROW}>Who We Help</p>
              <ul className="mt-6">
                {ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      data-condition-link
                      className="v3-display block origin-left py-1 text-[clamp(2rem,4.2vh,3.4rem)] leading-[1.12] text-white/85 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: visual echo of the active condition (the real,
                accessible content is the links + each condition page). */}
            <div aria-hidden="true" className="relative col-span-5 self-center">
              <div className={`${GLASS_PANEL} relative min-h-[18rem] p-8`}>
                {ITEMS.map((item, index) => (
                  <div
                    key={item.href}
                    data-condition-panel
                    className={`${index === 0 ? "" : "invisible opacity-0"} absolute inset-0 flex flex-col justify-center p-8`}
                  >
                    <p className={EYEBROW}>{item.eyebrow}</p>
                    <p className="v3-display mt-3 text-4xl leading-[0.95] text-white">
                      {item.label}
                    </p>
                    <p className="mt-4 text-[15px] leading-[1.7] text-white/75">
                      {item.excerpt}
                    </p>
                    <span className={`${ARROW_LINK} mt-5`}>
                      Explore <span>&rarr;</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
