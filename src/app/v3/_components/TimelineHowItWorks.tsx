"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";
import { HOW_IT_WORKS } from "@/lib/content/pages";
import { ARROW_LINK, BODY, CONTAINER, EYEBROW, GLASS_PANEL } from "./styles";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
}

interface TimelineHowItWorksProps {
  /** "excerpt" = compact homepage variant; "full" = the How It Works page. */
  detail?: "excerpt" | "full";
  /** Heading level for the section title. */
  headingLevel?: "h1" | "h2";
}

/**
 * Chapter 6: vertical timeline of the four method steps. An SVG spine is
 * drawn with DrawSVG as you scroll; each step's node pulses on with a teal
 * glow as its card enters. Under reduced motion the spine renders fully
 * drawn and the cards stay static.
 */
export default function TimelineHowItWorks({
  detail = "excerpt",
  headingLevel = "h2",
}: TimelineHowItWorksProps) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<SVGLineElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const list = listRef.current;
      const spine = spineRef.current;
      if (!list || !spine) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Scrub-draw the spine while the list passes through the viewport.
        gsap.fromTo(
          spine,
          { drawSVG: "0%" },
          {
            drawSVG: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: list,
              start: "top 70%",
              end: "bottom 65%",
              scrub: 0.8,
            },
          }
        );

        // Each step: card rises, node pulses on with a teal glow.
        gsap.utils
          .toArray<HTMLElement>(list.querySelectorAll("[data-step]"))
          .forEach((step) => {
            const node = step.querySelector("[data-step-node]");
            const card = step.querySelector("[data-step-card]");
            const tl = gsap.timeline({
              scrollTrigger: { trigger: step, start: "top 75%", once: true },
            });
            if (node) {
              tl.from(node, {
                scale: 0,
                duration: 0.7,
                ease: "back.out(2.5)",
              });
              tl.fromTo(
                node,
                { boxShadow: "0 0 0 0 rgba(53,243,230,0.7)" },
                {
                  boxShadow: "0 0 0 18px rgba(53,243,230,0)",
                  duration: 1.1,
                  ease: "power2.out",
                },
                "<0.15"
              );
            }
            if (card) {
              tl.from(
                card,
                { autoAlpha: 0, y: 36, duration: 0.8, ease: "power3.out" },
                "<"
              );
            }
          });
      });
    },
    { scope: scopeRef }
  );

  const Heading = headingLevel;

  return (
    <div ref={scopeRef} className={`${CONTAINER} py-24 md:py-32`}>
      <p className={EYEBROW}>The Protocol</p>
      <Heading className="v3-display mt-5 max-w-3xl text-balance text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95] text-white">
        {HOW_IT_WORKS.headline}
        <span className="text-brand-teal">.</span>
      </Heading>
      {HOW_IT_WORKS.subhead && (
        <p className={`${BODY} mt-6 max-w-2xl`}>{HOW_IT_WORKS.subhead}</p>
      )}

      <div className="relative mt-16">
        {/* SVG spine, drawn by scroll. Decorative — the ordered list below
            carries the sequence semantics. */}
        <svg
          aria-hidden="true"
          className="absolute bottom-3 left-[15px] top-3 w-0.5 md:left-[19px]"
          viewBox="0 0 2 100"
          preserveAspectRatio="none"
        >
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="100"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <line
            ref={spineRef}
            x1="1"
            y1="0"
            x2="1"
            y2="100"
            stroke="var(--color-brand-teal)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <ol ref={listRef} className="space-y-12 md:space-y-16">
          {HOW_IT_WORKS.steps.map((step, index) => (
            <li key={step.title} data-step className="relative pl-12 md:pl-16">
              <span
                data-step-node
                aria-hidden="true"
                className="absolute left-1.5 top-2.5 block h-5 w-5 rounded-full border-2 border-brand-teal bg-medical-secondary shadow-[0_0_16px_rgba(53,243,230,0.6)] md:left-2.5"
              />
              <div data-step-card className={`${GLASS_PANEL} p-7 md:p-9`}>
                <p className={EYEBROW}>Step {String(index + 1).padStart(2, "0")}</p>
                <h3 className="v3-display mt-3 text-3xl leading-[1.02] text-white md:text-4xl">
                  {step.title}
                </h3>
                {detail === "full" ? (
                  <div className="mt-4 space-y-4">
                    {step.body.map((paragraph, pIndex) => (
                      <p key={pIndex} className={BODY}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className={`${BODY} mt-4`}>{step.excerpt}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      {detail === "excerpt" && (
        <div className="mt-12 pl-12 md:pl-16">
          <Link href="/v3/how-it-works" className={ARROW_LINK}>
            See the full protocol <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      )}
    </div>
  );
}
