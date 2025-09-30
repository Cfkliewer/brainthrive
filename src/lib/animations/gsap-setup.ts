/**
 * GSAP Setup and Configuration for BrainThrive Medical Website
 * Optimized for professional medical animations with accessibility support
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Observer);
}

// Medical-grade animation defaults
export const medicalDefaults = {
  duration: 0.8,
  ease: "power2.out",
  stagger: 0.1,
  opacity: { from: 0, to: 1 },
  y: { from: 30, to: 0 },
  scale: { from: 0.95, to: 1 },
};

// Professional easing curves for medical interfaces
export const medicalEasing = {
  // Gentle entrance - welcoming and non-threatening
  gentle: "power1.out",
  // Professional - confident but not overwhelming
  professional: "power2.out",
  // Subtle - barely noticeable, accessibility-friendly
  subtle: "power1.inOut",
  // Medical precision - clean and exact
  precise: "expo.out",
  // Calm motion - reduces anxiety
  calm: "sine.inOut",
};

// Reduced motion detection
export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Get appropriate animation duration based on user preferences
export const getAnimationDuration = (baseDuration: number = 0.8): number => {
  return prefersReducedMotion() ? 0.01 : baseDuration;
};

// GSAP configuration for medical applications
export const configureMedicalGSAP = () => {
  if (typeof window === "undefined") return;

  // Reduce animations for users who prefer reduced motion
  if (prefersReducedMotion()) {
    gsap.globalTimeline.timeScale(0.01);
    ScrollTrigger.config({
      autoRefreshEvents: "none",
    });
  }

  // Default GSAP settings for medical interfaces
  gsap.defaults({
    duration: medicalDefaults.duration,
    ease: medicalEasing.professional,
    force3D: true, // Hardware acceleration
    autoAlpha: 1, // Better than opacity for performance
  });

  // ScrollTrigger defaults for smooth scrolling
  ScrollTrigger.defaults({
    scroller: typeof window !== "undefined" ? window : undefined,
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse",
    markers: process.env.NODE_ENV === "development" ? false : false,
  });

  // Optimize for mobile devices
  if (window.matchMedia("(max-width: 768px)").matches) {
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true,
    });
  }
};

// Initialize medical GSAP configuration
export const initMedicalAnimations = () => {
  configureMedicalGSAP();

  // Respect user motion preferences
  const motionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  motionMediaQuery.addEventListener("change", () => {
    configureMedicalGSAP();
  });
};