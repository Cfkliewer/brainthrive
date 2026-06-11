"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { navFor } from "@/lib/content/nav";
import { SITE } from "@/lib/content/site";
import { BTN_GHOST, BTN_GLOW, CONTAINER, EYEBROW } from "./styles";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

// R3F touches WebGL/window — client-only, route-split so three.js stays
// out of every non-/v3 chunk. Device tier inside auto-degrades to a flat
// navy div on low-end/reduced-motion devices.
const NeuronWebCanvas = dynamic(
  () => import("@/components/brain3d/NeuronWebCanvas"),
  { ssr: false }
);

const NAV = navFor("v3");

/**
 * Chapter 1: full-viewport hero. The pulsing neuron web renders behind a
 * monumental Bebas headline that staggers in character by character
 * (SplitText, after fonts.ready; static under reduced motion).
 */
export default function NeuroHero() {
  const scopeRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const headline = headlineRef.current;
      if (!headline) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let split: SplitText | null = null;
        let cancelled = false;

        // Split only after webfonts resolve, so line/char metrics are final.
        document.fonts.ready.then(() => {
          if (cancelled || !headline.isConnected) return;
          split = new SplitText(headline, {
            type: "words,chars",
            mask: "words",
          });
          gsap.from(split.chars, {
            yPercent: 120,
            autoAlpha: 0,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.022,
            delay: 0.35,
          });
          gsap.from("[data-hero-rise]", {
            autoAlpha: 0,
            y: 26,
            duration: 0.9,
            ease: "power2.out",
            stagger: 0.12,
            delay: 1.1,
          });
        });

        // Looping scroll cue.
        if (cueRef.current) {
          gsap.to(cueRef.current, {
            y: 10,
            opacity: 0.35,
            duration: 1.4,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
          });
        }

        return () => {
          cancelled = true;
          split?.revert();
        };
      });
    },
    { scope: scopeRef }
  );

  return (
    <section
      ref={scopeRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Background layers: ambient radial glows (also the off-tier
          fallback atmosphere) under the neuron web canvas. */}
      <div aria-hidden="true" className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60rem 40rem at 70% 30%, rgba(83,98,239,0.22), transparent 65%), radial-gradient(50rem 36rem at 25% 75%, rgba(53,243,230,0.14), transparent 60%)",
          }}
        />
        <NeuronWebCanvas />
        {/* Legibility scrims + blend into the next chapter */}
        <div className="absolute inset-0 bg-medical-secondary/35 md:bg-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-medical-secondary/85 via-medical-secondary/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-medical-secondary" />
      </div>

      <div className={`${CONTAINER} relative z-10 w-full pb-28 pt-36`}>
        <p className={EYEBROW}>
          Neurofeedback &middot; Photobiomodulation &middot; {SITE.address.cityStateZip}
        </p>
        <h1
          ref={headlineRef}
          className="v3-display mt-6 max-w-5xl text-balance text-[clamp(3.5rem,8.5vw,8.75rem)] leading-[0.88] text-white"
        >
          Your brain can change.{" "}
          <span className="text-brand-teal [text-shadow:0_0_40px_rgba(53,243,230,0.45)]">
            We measure it. We train it.
          </span>
        </h1>
        <p
          data-hero-rise
          className="mt-8 max-w-xl text-lg leading-[1.7] text-white/80"
        >
          qEEG-guided brain mapping, gentle drug-free training, and objective
          re-measurement — so your progress is proven in data, not guesswork.
        </p>
        <div
          data-hero-rise
          className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
        >
          <Link href={NAV.cta.href} className={BTN_GLOW}>
            {NAV.cta.label}
          </Link>
          <a href={SITE.phone.href} className={BTN_GHOST}>
            Call {SITE.phone.display}
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        ref={cueRef}
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-brand-teal/70"
      >
        <span>Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-brand-teal/70 to-transparent" />
      </div>
    </section>
  );
}
