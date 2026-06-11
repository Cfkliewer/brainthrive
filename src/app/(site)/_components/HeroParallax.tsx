"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { NAV } from "@/lib/content/nav";
import { SITE } from "@/lib/content/site";
import MagneticButton from "./MagneticButton";
import {
  BTN_GHOST_LIGHT,
  BTN_PRIMARY,
  CARD,
  CONTAINER,
  EYEBROW_ON_LIGHT,
} from "./styles";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Floating metric chips layered over the hero imagery. */
const CHIPS = [
  {
    label: "qEEG Brain Mapping",
    sub: "Objective baseline first",
    depth: 1.6,
    position: "left-[-6%] top-[12%]",
    glyph: "bars",
  },
  {
    label: "Drug-free",
    sub: "No medications involved",
    depth: 1,
    position: "right-[-4%] top-[44%]",
    glyph: "check",
  },
  {
    label: "Non-invasive",
    sub: "Gentle light + feedback",
    depth: 2.2,
    position: "bottom-[8%] left-[6%]",
    glyph: "pulse",
  },
] as const;

function ChipGlyph({ glyph }: { glyph: (typeof CHIPS)[number]["glyph"] }) {
  if (glyph === "bars") {
    return (
      <span
        aria-hidden
        className="flex h-9 w-9 items-end justify-center gap-[3px] rounded-lg bg-brand-navy p-2"
      >
        <span className="h-2 w-1 rounded-sm bg-brand-teal" />
        <span className="h-4 w-1 rounded-sm bg-brand-teal" />
        <span className="h-3 w-1 rounded-sm bg-brand-teal/70" />
        <span className="h-5 w-1 rounded-sm bg-brand-teal" />
      </span>
    );
  }
  if (glyph === "check") {
    return (
      <span
        aria-hidden
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-navy"
      >
        <svg viewBox="0 0 14 11" className="h-3.5 w-3.5 fill-none stroke-brand-teal">
          <path d="M1 5.5l4 4L13 1" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
    );
  }
  return (
    <span
      aria-hidden
      className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-navy"
    >
      <svg viewBox="0 0 22 10" className="h-4 w-5 fill-none stroke-brand-teal">
        <path
          d="M0 5h4l2-4 3 8 3-6 2 2h8"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/**
 * Split hero: confident headline + dual CTA on the left, a layered card
 * stack (team photo or navy placeholder) with floating metric chips on the
 * right. Chips drift at different yPercent speeds on scroll (scrub), and
 * the whole hero staggers in on load — both gated to no-preference.
 */
export default function HeroParallax({
  teamPhoto,
  teamPhotoAlt,
}: {
  /** Resolved server-side (assets.ts is node-only) and passed down. */
  teamPhoto: string | null;
  teamPhotoAlt: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = ref.current;
      if (!section) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Staggered load-in.
        gsap.from("[data-hero-intro]", {
          autoAlpha: 0,
          y: 32,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.09,
        });
        // Depth parallax: each layer drifts at its own speed while the
        // hero scrolls out of view.
        gsap.utils
          .toArray<HTMLElement>("[data-depth]")
          .forEach((layer) => {
            const depth = parseFloat(layer.dataset.depth ?? "1");
            gsap.to(layer, {
              yPercent: -9 * depth,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });
          });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="relative overflow-hidden bg-white">
      <div
        aria-hidden
        className="absolute -top-48 left-[-12%] h-[28rem] w-[28rem] rounded-full bg-brand-ultraviolet/10 blur-3xl"
      />
      <div
        className={`${CONTAINER} relative grid items-center gap-x-16 gap-y-16 pb-20 pt-14 lg:grid-cols-12 lg:pb-28 lg:pt-20`}
      >
        {/* Copy */}
        <div className="lg:col-span-6">
          <p data-hero-intro className={EYEBROW_ON_LIGHT}>
            Brain Wellness Clinic &mdash; {SITE.address.city},{" "}
            {SITE.address.state}
          </p>
          <h1
            data-hero-intro
            className="mt-6 text-balance text-[clamp(2.6rem,5.4vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.025em] text-brand-navy"
          >
            Measure your brain. Train it.{" "}
            <span className="bg-linear-to-r from-brand-ultraviolet to-brand-purple bg-clip-text text-transparent">
              Watch it change.
            </span>
          </h1>
          <p
            data-hero-intro
            className="mt-7 max-w-[52ch] text-lg leading-relaxed text-medical-gray-600"
          >
            qEEG brain mapping, photobiomodulation, and traditional
            neurofeedback &mdash; gentle, drug-free brain training guided by
            your own data, not guesswork.
          </p>
          <div data-hero-intro className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton href={NAV.cta.href} className={BTN_PRIMARY}>
              {NAV.cta.label}
            </MagneticButton>
            <a href={SITE.phone.href} className={BTN_GHOST_LIGHT}>
              Call {SITE.phone.display}
            </a>
          </div>
          <p
            data-hero-intro
            className="mt-8 text-sm text-medical-gray-500"
          >
            {SITE.address.note}
          </p>
        </div>

        {/* Layered card stack */}
        <div data-hero-intro className="relative lg:col-span-6">
          <div
            aria-hidden
            data-depth="0.5"
            className="v2-grid-pattern absolute -right-5 -top-5 hidden h-full w-full rounded-3xl bg-brand-navy sm:block"
          />
          <div
            data-depth="0.8"
            className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-brand-navy lg:aspect-[5/4]"
          >
            {teamPhoto ? (
              <Image
                src={teamPhoto}
                alt={teamPhotoAlt}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div aria-hidden className="v2-grid-pattern absolute inset-0">
                <div className="absolute left-1/4 top-1/4 h-48 w-48 rounded-full bg-brand-ultraviolet/40 blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 h-40 w-40 rounded-full bg-brand-teal/25 blur-3xl" />
              </div>
            )}
          </div>
          {CHIPS.map((chip) => (
            <div
              key={chip.label}
              data-depth={chip.depth}
              className={`absolute ${chip.position} flex items-center gap-3 px-4 py-3 ${CARD}`}
            >
              <ChipGlyph glyph={chip.glyph} />
              <span>
                <span className="block text-sm font-semibold leading-tight text-brand-navy">
                  {chip.label}
                </span>
                <span className="block text-xs text-medical-gray-500">
                  {chip.sub}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
