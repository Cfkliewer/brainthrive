"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CONTAINER, DARK_BAND, EYEBROW_ON_DARK } from "./styles";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Honest, verifiable figures only — drawn from the content layer
 * (10 conditions, 2 core therapies, 4 method steps, 1 protocol per person).
 * No invented patient counts or success rates.
 */
const STATS = [
  {
    value: 10,
    label: "Conditions supported",
    note: "From ADHD and anxiety to peak performance",
  },
  {
    value: 2,
    label: "Drug-free core therapies",
    note: "Photobiomodulation + traditional neurofeedback",
  },
  {
    value: 4,
    label: "Measured method steps",
    note: "Map, personalize, train, re-measure",
  },
  {
    value: 1,
    label: "Personalized protocol",
    note: "Designed from your own qEEG brain map",
  },
] as const;

/**
 * Navy stats band: Bebas teal numerals that count up once on first entry
 * (textContent tween with snap). Final values are in the markup, so the
 * band is complete by default and for reduced-motion users.
 */
export default function StatBand() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = ref.current;
      if (!section) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-stat-value]", {
          textContent: 0,
          snap: { textContent: 1 },
          duration: 1.6,
          ease: "power1.inOut",
          stagger: 0.12,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className={`relative overflow-hidden ${DARK_BAND}`}>
      <div aria-hidden className="v2-grid-pattern absolute inset-0" />
      <div className={`${CONTAINER} relative py-16 lg:py-20`}>
        <p className={EYEBROW_ON_DARK}>By the numbers</p>
        <dl className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col border-l border-white/15 pl-6"
            >
              <dt className="order-2 mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-white">
                {stat.label}
              </dt>
              <dd className="order-1 v2-display text-7xl leading-none text-brand-teal md:text-8xl">
                <span data-stat-value>{stat.value}</span>
              </dd>
              <dd className="order-3 mt-2 text-sm leading-relaxed text-white/65">
                {stat.note}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
