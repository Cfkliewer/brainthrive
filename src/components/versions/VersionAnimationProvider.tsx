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
  /** Merged over the base ScrollTrigger defaults set on mount (see policy below). */
  scrollTriggerDefaults?: ScrollTrigger.StaticVars;
  children: React.ReactNode;
}

const BASE_GSAP_DEFAULTS = {
  ease: "power2.out",
  duration: 0.8,
};

const BASE_SCROLL_TRIGGER_DEFAULTS: ScrollTrigger.StaticVars = {
  start: "top 85%",
  end: "bottom 15%",
  toggleActions: "play none none none",
};

/**
 * Parameterized animation provider for the site (Lenis -> ScrollTrigger.update,
 * gsap.ticker drives lenis.raf). Only one animation provider may be mounted
 * per route subtree.
 *
 * GSAP global policy (deterministic overwrite): page code must not depend
 * on inherited GSAP globals; this provider deterministically sets them on
 * mount. Every mount writes the complete set of globals it relies on —
 * gsap.defaults (ease, duration) and the full ScrollTrigger.defaults — with
 * caller `scrollTriggerDefaults` merged over the base values. Nothing is
 * inherited from a previously visited route, so animation behavior is never
 * visit-order dependent.
 *
 * Lenis is only created on desktop widths (>= 1024px) without
 * prefers-reduced-motion, and reacts to mid-session changes of either media
 * query (OS reduced-motion toggles destroy it; crossing the width boundary
 * creates/destroys it).
 *
 * Individual triggers are cleaned up by useGSAP in the components that create
 * them; this provider only tears down what it created. A ScrollTrigger
 * refresh is scheduled right after mount so the incoming route is measured
 * correctly.
 */
export default function VersionAnimationProvider({
  lenis,
  scrollTriggerDefaults,
  children,
}: VersionAnimationProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Deterministic overwrite: always set the complete set of globals this
    // subtree relies on, regardless of what a previously visited route set.
    gsap.defaults({ ...BASE_GSAP_DEFAULTS });
    ScrollTrigger.defaults({
      ...BASE_SCROLL_TRIGGER_DEFAULTS,
      ...scrollTriggerDefaults,
    });

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    let tickerFn: ((time: number) => void) | null = null;

    const startLenis = () => {
      if (!lenis || lenisRef.current) return;
      // Never (re)create while reduced motion is on or below desktop width.
      if (reducedMotionQuery.matches || !desktopQuery.matches) return;

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
    };

    const stopLenis = () => {
      if (tickerFn) {
        gsap.ticker.remove(tickerFn);
        tickerFn = null;
      }
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };

    startLenis();

    // React to mid-session changes: stop, then start again only if the
    // current media state still allows it (startLenis re-checks both).
    const handleMediaChange = () => {
      stopLenis();
      startLenis();
    };
    reducedMotionQuery.addEventListener("change", handleMediaChange);
    desktopQuery.addEventListener("change", handleMediaChange);

    // Measure the incoming route after mount/layout. (Refreshing in the
    // unmount cleanup would be mistimed: parent cleanup runs before children
    // tear down their triggers.)
    const refreshRaf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(refreshRaf);
      reducedMotionQuery.removeEventListener("change", handleMediaChange);
      desktopQuery.removeEventListener("change", handleMediaChange);
      stopLenis();
    };
    // lenis config and defaults are set once per mount of a version subtree.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
