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

    // Mobile detection - disable Lenis on mobile to prevent scroll issues
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const shouldUseLenis = !isMobile && !isTouchDevice;

    if (prefersReducedMotion) {
      // Minimal animations for accessibility - make all elements visible immediately
      gsap.globalTimeline.timeScale(0.01);
      ScrollTrigger.config({
        autoRefreshEvents: "none",
      });
      // Ensure all animated elements are visible
      document.querySelectorAll('.metric-card, .condition-card, .service-card, .medical-card, .faq-item, .reveal-item').forEach(el => {
        gsap.set(el, { opacity: 1, y: 0, scale: 1, visibility: 'visible' });
      });
    } else {
      // Only initialize Lenis on desktop
      if (shouldUseLenis) {
        const lenis = new Lenis({
          duration: 0.8, // Faster response for snappier feel in both directions
          easing: (t) => 1 - Math.pow(1 - t, 3), // Cubic ease-out - feels natural in both directions
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          syncTouch: false, // Disable touch sync for better native feel
        });

        lenisRef.current = lenis;

        // Connect Lenis to ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        // Use GSAP ticker for smooth animation loop
        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      }

      // Full animation configuration
      gsap.defaults({
        duration: isMobile ? 0.5 : 0.8, // Faster animations on mobile
        ease: "power2.out",
        force3D: true,
      });

      // ScrollTrigger configuration
      ScrollTrigger.config({
        limitCallbacks: isMobile,
        ignoreMobileResize: true,
      });

      ScrollTrigger.defaults({
        start: isMobile ? "top 90%" : "top 85%", // Trigger earlier on mobile
        end: "bottom 15%",
        toggleActions: "play none none none",
      });
    }

    // Critical: Refresh ScrollTrigger after hydration with longer delay on mobile
    const refreshDelay = isMobile ? 300 : 100;
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, refreshDelay);

    // Additional refresh after fonts/images load
    const loadRefresh = () => {
      setTimeout(() => ScrollTrigger.refresh(true), 100);
    };
    window.addEventListener("load", loadRefresh);

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
      window.removeEventListener("load", loadRefresh);
      motionMediaQuery.removeEventListener("change", handleMotionChange);
      lenisRef.current?.destroy();
    };
  }, []);

  return <>{children}</>;
}
