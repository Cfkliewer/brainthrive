"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import type { ConditionContent } from "@/lib/content/types";
import { CONTAINER, DARK_BAND, EYEBROW_ON_DARK } from "./styles";

/**
 * Splits a headline into 2-3 word-balanced chunks so each can rise out of
 * its own overflow-hidden line wrapper (no SplitText). Chunks still wrap
 * naturally on narrow viewports.
 */
function splitLines(text: string): string[] {
  const words = text.split(" ");
  const lineCount = Math.min(3, Math.max(2, Math.round(text.length / 26)));
  const perLine = Math.ceil(text.length / lineCount);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (current && candidate.length > perLine && lines.length < lineCount - 1) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/**
 * Navy condition hero: breadcrumb, eyebrow, headline rising as masked
 * lines (translate-y inside overflow-hidden wrappers, once on mount), and
 * the subhead. Reduced-motion users see everything immediately
 * (gsap.from inside matchMedia).
 */
export default function ConditionHero({
  condition,
  index,
  total,
}: {
  condition: ConditionContent;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const lines = splitLines(condition.headline);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-hero-line]", {
          yPercent: 110,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.11,
        });
        gsap.from("[data-hero-fade]", {
          autoAlpha: 0,
          y: 16,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.25,
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className={`relative overflow-hidden ${DARK_BAND}`}>
      <div aria-hidden className="v2-grid-pattern absolute inset-0" />
      <div
        aria-hidden
        className="absolute -top-32 right-[-8%] h-80 w-80 rounded-full bg-brand-ultraviolet/25 blur-3xl"
      />
      <div className={`${CONTAINER} relative pb-16 pt-12 lg:pb-24 lg:pt-16`}>
        <nav
          aria-label="Breadcrumb"
          data-hero-fade
          className="flex flex-wrap items-baseline gap-x-3 text-xs font-semibold uppercase tracking-[0.2em]"
        >
          <Link
            href="/#who-we-help"
            className="text-brand-teal transition-colors hover:text-white"
          >
            Who We Help
          </Link>
          <span aria-hidden className="text-white/30">
            /
          </span>
          <span className="text-white/70">{condition.navLabel}</span>
          <span
            aria-hidden
            className="v2-display ml-auto hidden text-5xl normal-case leading-none text-white/15 sm:block"
          >
            {/*   = hair space (the &hairsp; entity is not decoded by the JSX transform) */}
            {`${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`}
          </span>
        </nav>

        <p data-hero-fade className={`mt-12 ${EYEBROW_ON_DARK}`}>
          {condition.eyebrow}
        </p>
        <h1 className="mt-5 max-w-[22ch] text-[clamp(2.1rem,4.6vw,3.9rem)] font-semibold leading-[1.06] tracking-[-0.02em]">
          {lines.map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <span data-hero-line className="block">
                {line}
              </span>
            </span>
          ))}
        </h1>
        {condition.subhead && (
          <p
            data-hero-fade
            className="mt-6 max-w-[50ch] text-lg leading-relaxed text-white/75 md:text-xl"
          >
            {condition.subhead}
          </p>
        )}
      </div>
    </section>
  );
}
