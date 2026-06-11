"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { NAV } from "@/lib/content/nav";
import { SITE } from "@/lib/content/site";
import type { ResolvedHeroSlide } from "@/lib/content/heroSlides";
import MagneticButton from "./MagneticButton";
import {
  BTN_GHOST_DARK,
  BTN_PRIMARY,
  CONTAINER,
  EYEBROW_ON_DARK,
} from "./styles";

/** Time each slide stays up before auto-advancing. */
const SLIDE_MS = 5500;
/** Ken Burns drift: 1.0 -> 1.04 across the slide's duration. */
const KEN_BURNS_SCALE = 1.04;

/**
 * Auto-advance for the carousel. Rotation pauses while hovered or
 * focus-within (returned handlers), while the tab is hidden, while the
 * carousel is scrolled off-screen, and entirely under reduced motion.
 */
function useAutoRotate(
  slideCount: number,
  stageRef: React.RefObject<HTMLDivElement | null>
) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(true);
  const [tabHidden, setTabHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, [stageRef]);

  const playing = !reducedMotion && !hovered && !focused && !tabHidden && inView;

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(
      () => setActive((index) => (index + 1) % slideCount),
      SLIDE_MS
    );
    return () => window.clearTimeout(id);
  }, [playing, active, slideCount]);

  return {
    active,
    goTo: setActive,
    pauseHandlers: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onFocus: () => setFocused(true),
      onBlur: () => setFocused(false),
    },
  };
}

/**
 * Styled full-bleed stand-in for a slide whose photo hasn't been added
 * yet: navy gradient + engineering grid + soft color blooms, with the
 * slide's eyebrow as an art-direction motif in the upper-right (the area
 * the legibility overlay leaves clear).
 */
function SlidePlaceholder({ slide }: { slide: ResolvedHeroSlide }) {
  return (
    <div className="absolute inset-0">
      <div
        data-kenburns
        aria-hidden
        className="absolute inset-0 bg-linear-to-br from-brand-navy via-brand-navy/95 to-medical-gray-600"
      >
        <div className="v2-grid-pattern absolute inset-0" />
        <div className="absolute left-[16%] top-[20%] h-80 w-80 rounded-full bg-brand-ultraviolet/30 blur-3xl" />
        <div className="absolute right-[10%] top-[28%] h-96 w-96 rounded-full bg-brand-teal/15 blur-3xl" />
        <div className="absolute bottom-[12%] right-[30%] h-64 w-64 rounded-full bg-brand-purple/25 blur-3xl" />
      </div>
      {/* Eyebrow motif, kept out of the bottom-left text zone. */}
      <div className="absolute right-0 top-[28%] hidden w-1/2 flex-col items-center gap-3 px-8 text-center md:flex">
        <span aria-hidden className="h-px w-12 bg-brand-teal/60" />
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/90">
          {slide.eyebrow}
        </p>
        <span aria-hidden className="h-px w-12 bg-brand-teal/60" />
      </div>
    </div>
  );
}

/**
 * Full-screen hero: rotating full-bleed imagery (crossfade + subtle Ken
 * Burns, ~5.5s per slide) under a layered navy legibility overlay, with
 * the headline + dual CTA overlaid bottom-left and the caption chip +
 * dots bottom-right. Slides without a purchased photo render a gradient
 * placeholder treatment instead.
 *
 * The transparent-over-hero header relies on this section being exactly
 * the first thing in <main> at 72svh (.v2-hero-vh) — Header.tsx flips to
 * its solid style at the matching HERO_EXIT_RATIO threshold.
 *
 * Ken Burns and the load-in stagger are gated to no-preference; the
 * crossfade is a CSS opacity transition driven by React state, so dot
 * navigation still works (instantly) under reduced motion.
 */
export default function HeroCarousel({
  slides,
}: {
  /** Resolved server-side (heroSlides.ts is node-only) and passed down. */
  slides: ResolvedHeroSlide[];
}) {
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const { active, goTo, pauseHandlers } = useAutoRotate(
    slides.length,
    stageRef
  );
  // Preload the first slide that actually has a photo (it's above the fold
  // even while crossfaded out, and may be the page's LCP element).
  const firstImageIndex = slides.findIndex((slide) => slide.resolvedSrc);
  const activeSlide = slides[active];

  useGSAP(
    () => {
      const section = ref.current;
      if (!section) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Staggered load-in for the overlaid content.
        gsap.from("[data-hero-intro]", {
          autoAlpha: 0,
          y: 32,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.09,
        });
      });
    },
    { scope: ref }
  );

  // Ken Burns on the active slide: restart 1.0 -> 1.04 each time it takes
  // the stage. The outgoing slide keeps its scale while fading out and is
  // re-set from 1.0 on its next turn, so there is no visible snap.
  useGSAP(
    () => {
      const stage = stageRef.current;
      if (!stage) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const layer = stage.querySelector<HTMLElement>(
          `[data-slide="${active}"] [data-kenburns]`
        );
        if (!layer) return;
        gsap.fromTo(
          layer,
          { scale: 1 },
          { scale: KEN_BURNS_SCALE, duration: SLIDE_MS / 1000 + 1, ease: "none" }
        );
      });
    },
    { scope: stageRef, dependencies: [active] }
  );

  return (
    <section
      ref={ref}
      {...pauseHandlers}
      className="v2-hero-vh v2-band-dark relative isolate flex flex-col justify-end overflow-hidden bg-brand-navy text-white"
    >
      {/* Full-bleed rotating imagery */}
      <div
        ref={stageRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="What a visit looks like"
        className="absolute inset-0 -z-10"
      >
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            data-slide={index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
            aria-hidden={index !== active}
            className={`absolute inset-0 transition-opacity duration-[900ms] ease-out motion-reduce:transition-none ${
              index === active ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            {slide.resolvedSrc ? (
              <div data-kenburns className="absolute inset-0">
                <Image
                  src={slide.resolvedSrc}
                  alt={slide.alt}
                  fill
                  priority={index === firstImageIndex}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <SlidePlaceholder slide={slide} />
            )}
          </div>
        ))}

        {/* Legibility overlay: a soft navy wash, a directional gradient
            rising from the bottom-left text zone (guarantees AA contrast
            for the white copy on photos AND placeholders), and a top
            scrim under the transparent header. Photos still read in the
            upper-right. */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-medical-secondary/35" />
          <div className="absolute inset-0 bg-linear-to-tr from-medical-secondary/90 via-medical-secondary/45 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-44 bg-linear-to-b from-medical-secondary/60 to-transparent" />
        </div>
      </div>

      {/* Overlaid content */}
      <div className={`${CONTAINER} relative w-full pb-16 pt-36 md:pb-20 lg:pt-44`}>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          {/* Copy */}
          <div className="max-w-2xl">
            <p data-hero-intro className={EYEBROW_ON_DARK}>
              Brain wellness clinic in{" "}
              <span className="whitespace-nowrap">
                {SITE.address.city}, {SITE.address.state}
              </span>
            </p>
            <h1
              data-hero-intro
              className="mt-5 text-balance text-[clamp(2.4rem,5.2vw,4.4rem)] font-semibold leading-[1.04] tracking-[-0.025em] text-white"
            >
              Feel like{" "}
              <span className="bg-linear-to-r from-brand-teal to-brand-ultraviolet bg-clip-text text-transparent">
                yourself
              </span>{" "}
              again.
            </h1>
            <p
              data-hero-intro
              className="mt-6 max-w-[52ch] text-pretty text-base leading-relaxed text-white/85 md:text-lg"
            >
              We start with a qEEG brain map to see what&rsquo;s going on, then
              use gentle, drug-free therapies like neurofeedback and light
              therapy to help. Right here in Choctaw, Oklahoma.
            </p>
            <div
              data-hero-intro
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <MagneticButton href={NAV.cta.href} className={BTN_PRIMARY}>
                {NAV.cta.label}
              </MagneticButton>
              <a href={SITE.phone.href} className={BTN_GHOST_DARK}>
                Call {SITE.phone.display}
              </a>
            </div>
            <p data-hero-intro className="mt-7 text-sm text-white/70">
              {SITE.address.note}
            </p>
          </div>

          {/* Caption chip + slide dots */}
          <div
            data-hero-intro
            className="flex shrink-0 flex-col items-start gap-4 lg:items-end"
          >
            <div
              key={active}
              className="v2-hero-caption-in max-w-xs rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md"
            >
              {/* The placeholder treatment already shows the eyebrow as a
                  motif, so repeat it on the chip only for real photos. */}
              {activeSlide.resolvedSrc ? (
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-teal">
                  {activeSlide.eyebrow}
                </p>
              ) : null}
              <p className="mt-0.5 text-sm font-medium leading-snug text-white">
                {activeSlide.caption}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {slides.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Go to slide ${index + 1}: ${slide.eyebrow}`}
                  aria-current={index === active ? "true" : undefined}
                  className="group cursor-pointer rounded-full p-1.5"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      index === active
                        ? "w-9 bg-brand-teal"
                        : "w-4 bg-white/40 group-hover:bg-white/70"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-5 hidden justify-center md:flex"
      >
        <svg
          viewBox="0 0 16 9"
          className="h-2.5 w-4 fill-none stroke-white/70 motion-safe:animate-bounce"
        >
          <path
            d="M1 1l7 7 7-7"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
