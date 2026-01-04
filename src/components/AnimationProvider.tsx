"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Register plugins on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimationProviderProps {
  children: React.ReactNode;
}

export default function AnimationProvider({ children }: AnimationProviderProps) {
  const initialized = useRef(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Minimal animations for accessibility
      gsap.globalTimeline.timeScale(0.01);
      ScrollTrigger.config({
        autoRefreshEvents: "none",
      });
    } else {
      // Initialize Lenis smooth scroll
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        touchMultiplier: 2,
      });

      lenisRef.current = lenis;

      // Connect Lenis to ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);

      // Use GSAP ticker for smooth animation loop
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);

      // Full animation configuration
      gsap.defaults({
        duration: 0.8,
        ease: "power2.out",
        force3D: true,
      });

      // Mobile-specific optimizations
      const isMobile = window.matchMedia("(max-width: 768px)").matches;

      ScrollTrigger.config({
        limitCallbacks: isMobile,
        ignoreMobileResize: true,
      });

      ScrollTrigger.defaults({
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none none",
      });
    }

    // Critical: Refresh ScrollTrigger after hydration
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 100);

    // Refresh on resize (debounced)
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    };

    window.addEventListener("resize", handleResize);

    // Listen for motion preference changes
    const motionMediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        gsap.globalTimeline.timeScale(0.01);
        lenisRef.current?.destroy();
        lenisRef.current = null;
      } else {
        gsap.globalTimeline.timeScale(1);
      }
    };
    motionMediaQuery.addEventListener("change", handleMotionChange);

    // Cleanup
    return () => {
      clearTimeout(refreshTimeout);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      motionMediaQuery.removeEventListener("change", handleMotionChange);
      lenisRef.current?.destroy();
    };
  }, []);

  return <>{children}</>;
}
