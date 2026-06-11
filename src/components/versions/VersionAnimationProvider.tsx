"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Register plugin on client side only.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface VersionAnimationProviderProps {
  /** false disables smooth scroll entirely; otherwise pass the Lenis duration. */
  lenis: false | { duration: number };
  /** Applied via ScrollTrigger.defaults() on mount if provided. */
  scrollTriggerDefaults?: Record<string, unknown>;
  children: React.ReactNode;
}

/**
 * Parameterized animation provider for the /v1, /v2, /v3 subtrees.
 * Mirrors the wiring of the root AnimationProvider (Lenis -> ScrollTrigger.update,
 * gsap.ticker drives lenis.raf) but keeps configuration per-version. Only one
 * animation provider may be mounted per route subtree.
 *
 * Individual triggers are cleaned up by useGSAP in the components that create
 * them; this provider only tears down what it created.
 */
export default function VersionAnimationProvider({
  lenis,
  scrollTriggerDefaults,
  children,
}: VersionAnimationProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (scrollTriggerDefaults) {
      ScrollTrigger.defaults(scrollTriggerDefaults);
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    let tickerFn: ((time: number) => void) | null = null;

    if (lenis && isDesktop && !prefersReducedMotion) {
      const instance = new Lenis({
        duration: lenis.duration,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        syncTouch: false,
      });
      lenisRef.current = instance;

      // Connect Lenis to ScrollTrigger and drive it from the GSAP ticker.
      instance.on("scroll", ScrollTrigger.update);
      tickerFn = (time: number) => {
        instance.raf(time * 1000);
      };
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
    }

    return () => {
      if (tickerFn) {
        gsap.ticker.remove(tickerFn);
      }
      lenisRef.current?.destroy();
      lenisRef.current = null;
      // Triggers created within this subtree are cleaned by useGSAP in their
      // components; just recalculate positions after teardown.
      ScrollTrigger.refresh();
    };
    // lenis config and defaults are set once per mount of a version subtree.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
