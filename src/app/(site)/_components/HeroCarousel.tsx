"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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

/** Seconds each slide stays up before the next takes over. */
const PER = 5;
/** Crossfade / rise duration between slides, in seconds. */
const FADE = 0.5;
/** Ken Burns drift: 1.0 -> this across a slide's visible window. */
const KEN_BURNS_SCALE = 1.06;

/**
 * Build the keyframes + rules that drive the carousel.
 *
 * The auto-advance is intentionally pure CSS: every cycling element (image,
 * headline word, caption chip, dot) runs the SAME animation over a cycle of
 * `n * PER` seconds, each offset by `i * PER` via animation-delay, so they
 * stay in lockstep with zero JavaScript. This is what fixes the cold-load
 * "frozen first slide": the rotation starts at first paint instead of waiting
 * for the route's JS bundle to download and hydrate (which, on a cold cache,
 * can take many seconds). JS only enhances — pause, dot navigation, aria.
 *
 * Percentages are derived from the slide count so the timing is correct for
 * any `n`. Each slide is visible for `PER + FADE` seconds (the FADE overlap
 * is the crossfade with its neighbour), spaced `PER` apart.
 */
function buildHeroStyles(n: number): string {
  const cycle = n * PER;
  const round = (x: number) => Math.round(x * 1000) / 1000;
  const fp = round((FADE / cycle) * 100); // fade ramp, % of cycle
  const vis = round(((PER + FADE) / cycle) * 100); // end of visible window
  const hold = round(vis - fp); // start of fade-out

  return `
@keyframes bt-hero-fade {
  0% { opacity: 0; }
  ${fp}% { opacity: 1; }
  ${hold}% { opacity: 1; }
  ${vis}% { opacity: 0; }
  100% { opacity: 0; }
}
@keyframes bt-hero-word {
  0% { transform: translateY(110%); opacity: 0; }
  ${fp}% { transform: translateY(0); opacity: 1; }
  ${hold}% { transform: translateY(0); opacity: 1; }
  ${vis}% { transform: translateY(-110%); opacity: 0; }
  100% { transform: translateY(-110%); opacity: 0; }
}
@keyframes bt-hero-zoom {
  0% { transform: scale(1); }
  ${vis}% { transform: scale(${KEN_BURNS_SCALE}); }
  100% { transform: scale(${KEN_BURNS_SCALE}); }
}
@keyframes bt-hero-dot {
  0% { width: 1rem; background-color: var(--btd-off); }
  ${fp}% { width: 2.25rem; background-color: var(--btd-on); }
  ${hold}% { width: 2.25rem; background-color: var(--btd-on); }
  ${vis}% { width: 1rem; background-color: var(--btd-off); }
  100% { width: 1rem; background-color: var(--btd-off); }
}
/* Instant (motionless) variant used under reduced motion. */
@keyframes bt-hero-step {
  0% { opacity: 1; }
  ${vis}% { opacity: 1; }
  ${round(vis + 0.001)}% { opacity: 0; }
  100% { opacity: 0; }
}
@keyframes bt-hero-dot-step {
  0% { width: 2.25rem; background-color: var(--btd-on); }
  ${vis}% { width: 2.25rem; background-color: var(--btd-on); }
  ${round(vis + 0.001)}% { width: 1rem; background-color: var(--btd-off); }
  100% { width: 1rem; background-color: var(--btd-off); }
}
@keyframes bt-hero-intro {
  0% { opacity: 0; transform: translateY(32px); }
  100% { opacity: 1; transform: none; }
}

[data-hero-cycle] {
  animation-duration: ${cycle}s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-fill-mode: backwards;
}
[data-hero-img] { animation-name: bt-hero-fade; }
[data-hero-chip] { animation-name: bt-hero-fade; }
[data-hero-word] { animation-name: bt-hero-word; }
[data-hero-dot] { animation-name: bt-hero-dot; }
[data-hero-zoom] {
  animation: bt-hero-zoom ${cycle}s linear infinite backwards;
}
[data-hero-intro] {
  animation: bt-hero-intro 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@media (prefers-reduced-motion: reduce) {
  /* The site-wide reduced-motion rule (globals.css) disables all animation.
     Re-enable just the carousel's cycling so it still auto-advances — but as
     instant, motionless swaps (no fade, rise, or Ken Burns). */
  [data-hero-cycle] {
    animation-duration: ${cycle}s !important;
    animation-iteration-count: infinite !important;
    animation-timing-function: linear !important;
  }
  [data-hero-img],
  [data-hero-chip],
  [data-hero-word] { animation-name: bt-hero-step !important; }
  [data-hero-dot] { animation-name: bt-hero-dot-step !important; }
  [data-hero-zoom] { animation: none !important; transform: none !important; }
  [data-hero-intro] { animation: none !important; opacity: 1 !important; transform: none !important; }
}
`;
}

/**
 * Styled full-bleed stand-in for a slide whose photo hasn't been added
 * yet: navy gradient + engineering grid + soft color blooms, with the
 * slide's eyebrow as an art-direction motif in the upper-right.
 */
function SlidePlaceholder({ slide }: { slide: ResolvedHeroSlide }) {
  return (
    <div data-hero-zoom className="absolute inset-0">
      <div
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
 * A slide whose photo is too small to cover the hero without visible
 * upscaling blur: the image renders near its native size over the navy
 * backdrop with a radial opacity vignette melting its edges in.
 */
function SlideBlend({ slide }: { slide: ResolvedHeroSlide }) {
  return (
    <div data-hero-zoom className="absolute inset-0">
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-br from-brand-navy via-brand-navy/95 to-medical-gray-600"
      >
        <div className="v2-grid-pattern absolute inset-0" />
        <div className="absolute left-[16%] top-[20%] h-80 w-80 rounded-full bg-brand-ultraviolet/30 blur-3xl" />
        <div className="absolute bottom-[12%] right-[30%] h-64 w-64 rounded-full bg-brand-purple/25 blur-3xl" />
      </div>
      <div className="absolute inset-x-0 top-[14%] flex justify-center lg:inset-x-auto lg:right-[7%] lg:top-1/2 lg:-translate-y-[60%]">
        <Image
          src={slide.resolvedSrc!}
          alt={slide.alt}
          width={512}
          height={384}
          sizes="(min-width: 1024px) 30rem, 85vw"
          className="h-auto w-[min(85vw,26rem)] lg:w-[min(34vw,30rem)]"
          style={{
            maskImage:
              "radial-gradient(ellipse 72% 72% at 50% 50%, black 42%, transparent 74%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 72% 72% at 50% 50%, black 42%, transparent 74%)",
          }}
        />
      </div>
    </div>
  );
}

/**
 * Full-screen hero with a CSS-driven rotating-image carousel under a layered
 * navy legibility overlay; headline + dual CTA bottom-left, caption chip +
 * dots bottom-right.
 *
 * Rotation is pure CSS (see buildHeroStyles): it starts at first paint and
 * keeps every cycling element — image, the rotating headline word, the
 * caption chip, and the dots — in sync without any JavaScript, so a slow
 * cold-load hydration never leaves the hero frozen on slide 1. The carousel
 * never pauses — the cycle runs continuously. JavaScript is progressive
 * enhancement only:
 *   - dot navigation (re-bases the cycle to the chosen slide)
 *   - keeping aria-current / aria-hidden in step with the visible slide
 *
 * Under reduced motion the cycle still advances, but as instant swaps (no
 * crossfade, rise, or Ken Burns).
 *
 * The transparent-over-hero header relies on this section being exactly the
 * first thing in <main> at 72svh (.v2-hero-vh) — Header.tsx flips to its
 * solid style at the matching HERO_EXIT_RATIO threshold.
 */
export default function HeroCarousel({
  slides,
}: {
  /** Resolved server-side (heroSlides.ts is node-only) and passed down. */
  slides: ResolvedHeroSlide[];
}) {
  const n = slides.length;
  const rootRef = useRef<HTMLElement>(null);
  const css = buildHeroStyles(n);

  // Which slide leads the cycle (0 by default; a dot click re-bases here).
  const [base, setBase] = useState(0);
  // Bumped on each dot click to trigger an animation restart.
  const [jump, setJump] = useState(0);
  // aria bookkeeping only — the visible rotation is CSS, so this lagging by a
  // little (or not running at all without JS) never freezes the carousel.
  const [current, setCurrent] = useState(0);

  // Preload the first slide that actually has a photo (it's above the fold
  // even while faded out, and may be the page's LCP element).
  const firstImageIndex = slides.findIndex((slide) => slide.resolvedSrc);

  // animation-delay for slide i given the current base, in seconds. Computed
  // in render so it's present in the SSR HTML — the cycle runs pre-hydration.
  const delayFor = (i: number) => ((i - base + n) % n) * PER;

  // Re-seek every cycling element so the chosen (base) slide is on stage
  // immediately after a dot click. Seeking to FADE (rather than 0) lands the
  // base slide just past its fade-in — fully visible at once, and visible even
  // if focus-within then pauses the cycle (a 0-second seek would freeze it on
  // the blank start of the fade). The base slide has delay 0, so its local
  // time is FADE (faded in); every other slide is still pre-delay (hidden).
  const restart = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll<HTMLElement>(
      "[data-hero-cycle],[data-hero-zoom]"
    );
    els.forEach((el) => {
      const anim = el.getAnimations?.()[0];
      if (anim) anim.currentTime = FADE * 1000;
    });
  }, []);

  useLayoutEffect(() => {
    if (jump > 0) restart();
  }, [jump, restart]);

  const goTo = (index: number) => {
    setBase(index);
    setCurrent(index);
    setJump((j) => j + 1);
  };

  // Align aria bookkeeping to the real CSS animation phase on hydration, then
  // step it in time with the cycle. Reading the running animation's
  // currentTime keeps aria-current matching what's on screen even when
  // hydration lands mid-cycle. This is aria-only — the visible rotation is
  // pure CSS, which always runs (the carousel never pauses).
  useEffect(() => {
    const img = rootRef.current?.querySelector<HTMLElement>("[data-hero-img]");
    const anim = img?.getAnimations?.()[0];
    const t = anim?.currentTime;
    if (typeof t === "number") {
      const phase = (t / 1000) % (n * PER);
      setCurrent((base + Math.floor(phase / PER)) % n);
    }
  }, [n, base, jump]);

  useEffect(() => {
    const id = window.setInterval(
      () => setCurrent((c) => (c + 1) % n),
      PER * 1000
    );
    return () => window.clearInterval(id);
  }, [n, jump]);

  return (
    <section
      ref={rootRef}
      className="v2-hero-vh v2-band-dark relative isolate flex flex-col justify-end overflow-hidden bg-brand-navy text-white"
      style={
        {
          "--btd-on": "#35F3E6",
          "--btd-off": "rgb(255 255 255 / 0.4)",
        } as React.CSSProperties
      }
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* Full-bleed rotating imagery */}
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="What a visit looks like"
        className="absolute inset-0 -z-10"
      >
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            data-hero-cycle
            data-hero-img
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${n}`}
            aria-hidden={index !== current}
            style={{ animationDelay: `${delayFor(index)}s` }}
            className="absolute inset-0"
          >
            {slide.resolvedSrc && slide.renderMode === "cover" ? (
              <div data-hero-zoom className="absolute inset-0">
                <Image
                  src={slide.resolvedSrc}
                  alt={slide.alt}
                  fill
                  priority={index === firstImageIndex}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            ) : slide.resolvedSrc ? (
              <SlideBlend slide={slide} />
            ) : (
              <SlidePlaceholder slide={slide} />
            )}
          </div>
        ))}

        {/* Legibility overlay: navy wash + directional gradient rising from
            the bottom-left text zone (guarantees AA contrast for the white
            copy) + a top scrim under the transparent header. */}
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
            {/* Fixed lead-in; only the trailing word rotates with the image.
                The word variants are stacked in one inline-grid cell so the
                line reserves the widest word's width (no reflow). Each word
                rises in / out on the same CSS cycle as its slide. */}
            <h1
              data-hero-intro
              style={{ animationDelay: "0.09s" }}
              className="mt-5 text-balance text-[clamp(2.4rem,5.2vw,4.4rem)] font-semibold leading-[1.04] tracking-[-0.025em] text-white"
            >
              See improvement in your{" "}
              <span className="relative inline-grid overflow-hidden align-baseline">
                {slides.map((slide, index) => (
                  <span
                    key={slide.src}
                    data-hero-cycle
                    data-hero-word
                    aria-hidden={index !== current}
                    style={{ animationDelay: `${delayFor(index)}s` }}
                    className="col-start-1 row-start-1 block whitespace-nowrap"
                  >
                    <em className="italic">{slide.rotatingWord}</em>
                  </span>
                ))}
              </span>
            </h1>
            <p
              data-hero-intro
              style={{ animationDelay: "0.18s" }}
              className="mt-6 max-w-[52ch] text-pretty text-base leading-relaxed text-white/85 md:text-lg"
            >
              We start with a qEEG brain map to see what&rsquo;s going on, then
              use gentle, drug-free therapies like neurofeedback and light
              therapy to help. Right here in Choctaw, Oklahoma.
            </p>
            <div
              data-hero-intro
              style={{ animationDelay: "0.27s" }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <MagneticButton href={NAV.cta.href} className={BTN_PRIMARY}>
                {NAV.cta.label}
              </MagneticButton>
              <a href={SITE.phone.href} className={BTN_GHOST_DARK}>
                Call {SITE.phone.display}
              </a>
            </div>
            <p
              data-hero-intro
              style={{ animationDelay: "0.36s" }}
              className="mt-7 text-sm text-white/70"
            >
              {SITE.address.note}
            </p>
          </div>

          {/* Caption chip + slide dots */}
          <div
            data-hero-intro
            style={{ animationDelay: "0.45s" }}
            className="flex shrink-0 flex-col items-start gap-4 lg:items-end"
          >
            {/* Category tag — cycles in sync with the imagery. */}
            <div className="relative grid">
              {slides.map((slide, index) => (
                <div
                  key={slide.src}
                  data-hero-cycle
                  data-hero-chip
                  aria-hidden={index !== current}
                  style={{ animationDelay: `${delayFor(index)}s` }}
                  className="col-start-1 row-start-1 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 backdrop-blur-md"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-teal">
                    {slide.eyebrow}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              {slides.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Go to slide ${index + 1}: ${slide.eyebrow}`}
                  aria-current={index === current ? "true" : undefined}
                  className="group cursor-pointer rounded-full p-1.5"
                >
                  <span
                    data-hero-cycle
                    data-hero-dot
                    style={{ animationDelay: `${delayFor(index)}s` }}
                    className="block h-1.5 w-4 rounded-full bg-white/40"
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
