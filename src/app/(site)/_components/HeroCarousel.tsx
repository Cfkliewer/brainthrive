"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { NAV } from "@/lib/content/nav";
import { SITE } from "@/lib/content/site";
import type { ResolvedHeroSlide } from "@/lib/content/heroSlides";
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

/** Styled stand-in panel for a slide whose photo hasn't been added yet. */
function SlidePlaceholder({ slide }: { slide: ResolvedHeroSlide }) {
  return (
    <div className="absolute inset-0">
      <div
        data-kenburns
        aria-hidden
        className="absolute inset-0 bg-linear-to-br from-brand-navy via-brand-navy/90 to-medical-gray-500"
      >
        <div className="v2-grid-pattern absolute inset-0" />
        <div className="absolute left-1/4 top-1/4 h-48 w-48 rounded-full bg-brand-ultraviolet/35 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/5 h-40 w-40 rounded-full bg-brand-teal/20 blur-3xl" />
      </div>
      {/* Sits above center so it clears the caption chip on short crops. */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8 pb-16 text-center">
        <span aria-hidden className="h-px w-10 bg-brand-teal/60" />
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white">
          {slide.eyebrow}
        </p>
        <span aria-hidden className="h-px w-10 bg-brand-teal/60" />
      </div>
    </div>
  );
}

/**
 * Split hero: humanized headline + dual CTA on the left; a rotating image
 * carousel on the right (crossfade + subtle Ken Burns, ~5.5s per slide).
 * Slides without a purchased photo render a gradient placeholder panel.
 * Ken Burns, the load-in stagger, and the scroll parallax are gated to
 * no-preference; the crossfade is a CSS opacity transition driven by React
 * state, so dot navigation still works (instantly) under reduced motion.
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
        // Subtle depth parallax while the hero scrolls out of view.
        gsap.utils.toArray<HTMLElement>("[data-depth]").forEach((layer) => {
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
            Brain wellness clinic in{" "}
            <span className="whitespace-nowrap">
              {SITE.address.city}, {SITE.address.state}
            </span>
          </p>
          <h1
            data-hero-intro
            className="mt-6 text-balance text-[clamp(2.6rem,5.4vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.025em] text-brand-navy"
          >
            Feel like{" "}
            <span className="bg-linear-to-r from-brand-ultraviolet to-brand-purple bg-clip-text text-transparent">
              yourself
            </span>{" "}
            again.
          </h1>
          <p
            data-hero-intro
            className="mt-7 max-w-[52ch] text-lg leading-relaxed text-medical-gray-600"
          >
            We start with a qEEG brain map to see what&rsquo;s going on, then
            use gentle, drug-free therapies like neurofeedback and light
            therapy to help. Right here in Choctaw, Oklahoma.
          </p>
          <div data-hero-intro className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton href={NAV.cta.href} className={BTN_PRIMARY}>
              {NAV.cta.label}
            </MagneticButton>
            <a href={SITE.phone.href} className={BTN_GHOST_LIGHT}>
              Call {SITE.phone.display}
            </a>
          </div>
          <p data-hero-intro className="mt-8 text-sm text-medical-gray-500">
            {SITE.address.note}
          </p>
        </div>

        {/* Rotating image carousel */}
        <div data-hero-intro className="relative lg:col-span-6">
          <div
            aria-hidden
            data-depth="0.5"
            className="v2-grid-pattern absolute -right-5 -top-5 hidden h-[calc(100%-2.25rem)] w-full rounded-3xl bg-brand-navy sm:block"
          />
          <div data-depth="0.8" className="relative">
            <div
              ref={stageRef}
              role="region"
              aria-roledescription="carousel"
              aria-label="What a visit looks like"
              {...pauseHandlers}
              className="v2-card-shadow relative aspect-[4/3] overflow-hidden rounded-2xl bg-brand-navy lg:aspect-[5/4]"
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
                    index === active
                      ? "opacity-100"
                      : "pointer-events-none opacity-0"
                  }`}
                >
                  {slide.resolvedSrc ? (
                    <div data-kenburns className="absolute inset-0">
                      <Image
                        src={slide.resolvedSrc}
                        alt={slide.alt}
                        fill
                        priority={index === firstImageIndex}
                        sizes="(min-width: 1024px) 45vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <SlidePlaceholder slide={slide} />
                  )}
                  {/* Caption chip. The placeholder panel already shows the
                      eyebrow front and center, so repeat it only on photos. */}
                  <div className="v2-card-shadow absolute bottom-4 left-4 max-w-[85%] rounded-xl bg-white/95 px-4 py-3 backdrop-blur-sm">
                    {slide.resolvedSrc ? (
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-ultraviolet">
                        {slide.eyebrow}
                      </p>
                    ) : null}
                    <p className="mt-0.5 text-sm font-medium leading-snug text-brand-navy">
                      {slide.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress dots */}
            <div className="mt-4 flex items-center gap-1.5">
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
                        ? "w-9 bg-brand-ultraviolet"
                        : "w-4 bg-medical-gray-300 group-hover:bg-medical-gray-400"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Single floating chip (parallax) */}
          <div
            data-depth="1.6"
            className={`absolute -top-5 left-[-6%] hidden items-center gap-3 px-4 py-3 sm:flex ${CARD}`}
          >
            <span
              aria-hidden
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-navy"
            >
              <svg
                viewBox="0 0 14 11"
                className="h-3.5 w-3.5 fill-none stroke-brand-teal"
              >
                <path d="M1 5.5l4 4L13 1" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <span>
              <span className="block text-sm font-semibold leading-tight text-brand-navy">
                Drug-free &amp; non-invasive
              </span>
              <span className="block text-xs text-medical-gray-500">
                Gentle light and feedback only
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
