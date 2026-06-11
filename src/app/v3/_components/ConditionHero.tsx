"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import type { ConditionContent } from "@/lib/content/types";
import { CONTAINER, EYEBROW } from "./styles";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

/**
 * Condition-page hero: SplitText line-mask reveal of the headline over
 * static layered radial teal glows (no WebGL off the homepage). Split runs
 * once after fonts.ready; reduced motion gets the static heading.
 */
export default function ConditionHero({
  condition,
}: {
  condition: ConditionContent;
}) {
  const scopeRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const headline = headlineRef.current;
      if (!headline) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let split: SplitText | null = null;
        let cancelled = false;
        document.fonts.ready.then(() => {
          if (cancelled || !headline.isConnected) return;
          split = new SplitText(headline, { type: "lines", mask: "lines" });
          gsap.from(split.lines, {
            yPercent: 110,
            duration: 1,
            ease: "power3.out",
            stagger: 0.12,
            delay: 0.2,
          });
          gsap.from("[data-hero-meta]", {
            autoAlpha: 0,
            y: 20,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
            delay: 0.65,
          });
        });
        return () => {
          cancelled = true;
          split?.revert();
        };
      });
    },
    { scope: scopeRef }
  );

  return (
    <section ref={scopeRef} className="relative overflow-hidden">
      {/* Layered static radial glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55rem 32rem at 80% 0%, rgba(53,243,230,0.13), transparent 60%), radial-gradient(45rem 30rem at 10% 90%, rgba(83,98,239,0.18), transparent 60%)",
        }}
      />
      <div className={`${CONTAINER} relative pb-20 pt-36 md:pb-28 md:pt-44`}>
        <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.18em] text-white/55">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/v3" className="transition-colors hover:text-brand-teal">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <span className="text-white/55">Who We Help</span>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-brand-teal">
              {condition.navLabel}
            </li>
          </ol>
        </nav>
        <p className={`${EYEBROW} mt-10`} data-hero-meta>
          {condition.eyebrow}
        </p>
        <h1
          ref={headlineRef}
          className="v3-display mt-5 max-w-5xl text-balance text-[clamp(3rem,7.5vw,7rem)] leading-[0.92] text-white"
        >
          {condition.headline}
        </h1>
        {condition.subhead && (
          <p
            data-hero-meta
            className="mt-7 max-w-xl text-xl leading-relaxed text-brand-teal [text-shadow:0_0_24px_rgba(53,243,230,0.35)]"
          >
            {condition.subhead}
          </p>
        )}
      </div>
    </section>
  );
}
