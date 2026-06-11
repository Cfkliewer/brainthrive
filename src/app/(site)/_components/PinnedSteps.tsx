"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HOW_IT_WORKS } from "@/lib/content/pages";
import SectionHeader from "./SectionHeader";
import { CONTAINER, DARK_BAND } from "./styles";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Navy "How It Works" with a CSS-sticky left rail (step indicator 01-04 +
 * teal progress line) while the step panels scroll on the right. The rail
 * highlight is driven by per-panel ScrollTriggers and the progress line by
 * a scrubbed tween — both gated to desktop + no-preference, so mobile and
 * reduced-motion users get plain stacked steps (the default markup).
 */
export default function PinnedSteps() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const section = ref.current;
      if (!section) return;
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.utils
            .toArray<HTMLElement>("[data-step-panel]")
            .forEach((panel, index) => {
              ScrollTrigger.create({
                trigger: panel,
                start: "top 55%",
                end: "bottom 55%",
                onEnter: () => setActive(index),
                onEnterBack: () => setActive(index),
              });
            });
          gsap.fromTo("[data-step-progress]", { scaleY: 0 }, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 40%",
              end: "bottom 90%",
              scrub: true,
            },
          });
        }
      );
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className={`relative overflow-clip ${DARK_BAND}`}>
      <div aria-hidden className="v2-grid-pattern absolute inset-0" />
      <div
        aria-hidden
        className="absolute -bottom-48 left-[-8%] h-[26rem] w-[26rem] rounded-full bg-brand-purple/30 blur-3xl"
      />
      <div className={`${CONTAINER} relative py-20 lg:py-28`}>
        <SectionHeader
          index="03"
          eyebrow="How It Works"
          heading="Assess. Personalize. Train. Verify."
          tone="dark"
        />

        <div className="mt-14 grid gap-x-16 gap-y-10 lg:mt-20 lg:grid-cols-12">
          {/* Sticky rail (desktop only) */}
          <div className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-32">
              <div className="relative border-l border-white/15 pl-8">
                <div
                  aria-hidden
                  data-step-progress
                  style={{ transform: "scaleY(0)" }}
                  className="absolute -left-px top-0 h-full w-px origin-top bg-brand-teal"
                />
                <ol className="space-y-7">
                {HOW_IT_WORKS.steps.map((step, index) => (
                  <li
                    key={step.title}
                    className={`transition-colors duration-300 ${
                      active === index ? "text-white" : "text-white/40"
                    }`}
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] tabular-nums">
                      Step {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-1 block text-balance text-lg font-semibold leading-snug">
                      {step.title}
                    </span>
                  </li>
                ))}
                </ol>
              </div>
              <Link
                href="/how-it-works"
                className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-teal transition-colors hover:text-white"
              >
                The full method <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Step panels */}
          <ol className="space-y-6 lg:col-span-7 lg:col-start-6 lg:space-y-10">
            {HOW_IT_WORKS.steps.map((step, index) => (
              <li
                key={step.title}
                data-step-panel
                className="rounded-2xl bg-white/[0.06] p-7 ring-1 ring-white/10 backdrop-blur-sm md:p-9"
              >
                <span
                  aria-hidden
                  className="v2-display block text-6xl leading-none text-white/15"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-balance text-xl font-semibold leading-snug tracking-tight md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm font-medium uppercase tracking-[0.08em] text-brand-teal">
                  {step.excerpt}
                </p>
                <p className="mt-4 leading-relaxed text-white/75">
                  {step.body[0]}
                </p>
              </li>
            ))}
          </ol>
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-teal transition-colors hover:text-white lg:hidden"
          >
            The full method <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
