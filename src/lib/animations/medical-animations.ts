/**
 * Medical Animation Library for BrainThrive
 * Professional, subtle animations designed for healthcare environments
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { medicalEasing, getAnimationDuration, prefersReducedMotion } from "./gsap-setup";

export interface MedicalAnimationOptions {
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  force3D?: boolean;
}

// Check if device is mobile - used throughout for mobile-optimized animations
const isMobile = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 768px)").matches ||
         'ontouchstart' in window ||
         navigator.maxTouchPoints > 0;
};

// Professional fade-in animation for medical content
export const fadeInUp = (
  elements: string | Element | Element[],
  options: MedicalAnimationOptions = {}
) => {
  const {
    duration = 0.8,
    delay = 0,
    stagger = 0.1,
    ease = medicalEasing.professional,
  } = options;

  // Always ensure visibility first
  gsap.set(elements, { visibility: 'visible' });

  if (prefersReducedMotion()) {
    gsap.set(elements, { opacity: 1, y: 0 });
    return;
  }

  // Simpler animation on mobile
  if (isMobile()) {
    return gsap.fromTo(
      elements,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.4,
        delay,
        stagger: stagger * 0.5,
        ease: "power1.out",
      }
    );
  }

  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 30,
      force3D: true,
    },
    {
      opacity: 1,
      y: 0,
      duration: getAnimationDuration(duration),
      delay,
      stagger,
      ease,
    }
  );
};

// Gentle scale animation for interactive elements
export const scaleIn = (
  elements: string | Element | Element[],
  options: MedicalAnimationOptions = {}
) => {
  const {
    duration = 0.6,
    delay = 0,
    ease = medicalEasing.gentle,
  } = options;

  if (prefersReducedMotion()) {
    gsap.set(elements, { opacity: 1, scale: 1 });
    return;
  }

  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      scale: 0.9,
      force3D: true,
    },
    {
      opacity: 1,
      scale: 1,
      duration: getAnimationDuration(duration),
      delay,
      ease,
    }
  );
};

// Professional slide animation for service cards
export const slideInFromLeft = (
  elements: string | Element | Element[],
  options: MedicalAnimationOptions = {}
) => {
  const {
    duration = 0.8,
    delay = 0,
    stagger = 0.15,
    ease = medicalEasing.professional,
  } = options;

  if (prefersReducedMotion()) {
    gsap.set(elements, { opacity: 1, x: 0 });
    return;
  }

  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      x: -50,
      force3D: true,
    },
    {
      opacity: 1,
      x: 0,
      duration: getAnimationDuration(duration),
      delay,
      stagger,
      ease,
    }
  );
};

// Subtle hover animation for buttons and interactive elements
export const hoverLift = (element: string | Element) => {
  if (prefersReducedMotion()) return;

  const target = typeof element === "string" ? document.querySelector(element) : element;
  if (!target) return;

  const handleMouseEnter = () => {
    gsap.to(target, {
      y: -3,
      scale: 1.02,
      duration: 0.3,
      ease: medicalEasing.gentle,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(target, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: medicalEasing.gentle,
    });
  };

  target.addEventListener("mouseenter", handleMouseEnter);
  target.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    target.removeEventListener("mouseenter", handleMouseEnter);
    target.removeEventListener("mouseleave", handleMouseLeave);
  };
};

// Professional scroll-triggered reveal animation
export const scrollReveal = (
  elements: string | Element | Element[],
  options: MedicalAnimationOptions & {
    trigger?: string | Element;
    start?: string;
    end?: string;
  } = {}
) => {
  const {
    duration = 0.8,
    stagger = 0.1,
    ease = medicalEasing.professional,
    trigger,
    start = "top 80%",
    end = "bottom 20%",
  } = options;

  // Reduced motion - make visible immediately
  if (prefersReducedMotion()) {
    gsap.set(elements, { opacity: 1, y: 0, visibility: 'visible' });
    return;
  }

  const isMobileDevice = isMobile();

  // On mobile, use simpler animations with immediate visibility
  if (isMobileDevice) {
    // First ensure elements are visible
    gsap.set(elements, { opacity: 1, y: 0, visibility: 'visible' });

    // Simple fade-in on scroll with no transform
    if (trigger) {
      return ScrollTrigger.create({
        trigger,
        start: "top 95%", // Trigger earlier on mobile
        once: true, // Only play once
        onEnter: () => {
          gsap.fromTo(
            elements,
            { opacity: 0.3 },
            {
              opacity: 1,
              duration: 0.4,
              stagger: stagger * 0.5,
              ease: "power1.out",
            }
          );
        }
      });
    }

    return ScrollTrigger.batch(elements, {
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          duration: 0.4,
          stagger: stagger * 0.5,
          ease: "power1.out",
        });
      },
      start: "top 95%",
      once: true,
    });
  }

  // Desktop: Full animations
  if (trigger) {
    return ScrollTrigger.create({
      trigger,
      start,
      end,
      onEnter: () => {
        gsap.fromTo(
          elements,
          {
            opacity: 0,
            y: 30,
            force3D: true,
          },
          {
            opacity: 1,
            y: 0,
            duration: getAnimationDuration(duration),
            stagger,
            ease,
          }
        );
      }
    });
  }

  return ScrollTrigger.batch(elements, {
    onEnter: (batch) => {
      gsap.fromTo(
        batch,
        {
          opacity: 0,
          y: 30,
          force3D: true,
        },
        {
          opacity: 1,
          y: 0,
          duration: getAnimationDuration(duration),
          stagger,
          ease,
        }
      );
    },
    start,
    end,
  });
};

// Hero section entrance animation
export const heroEntrance = (
  container: string | Element,
  options: MedicalAnimationOptions = {}
) => {
  const {
    duration = 1.2,
    stagger = 0.2,
    ease = medicalEasing.professional,
  } = options;

  // Get the container element
  const containerElement = typeof container === 'string'
    ? document.querySelector(container)
    : container;

  if (!containerElement) return;

  if (prefersReducedMotion()) {
    const heroElements = containerElement.querySelectorAll('.hero-element, .hero-title, .hero-subtitle, .hero-trust, .hero-cta');
    gsap.set(heroElements, { opacity: 1, y: 0 });
    return;
  }

  const tl = gsap.timeline();

  // Background overlay
  const overlay = containerElement.querySelector('.hero-overlay');
  if (overlay) {
    tl.fromTo(
      overlay,
      { opacity: 0 },
      { opacity: 1, duration: getAnimationDuration(0.8), ease: medicalEasing.gentle }
    );
  }

  // Main heading
  const title = containerElement.querySelector('.hero-title');
  if (title) {
    tl.fromTo(
      title,
      { opacity: 0, y: 50, force3D: true },
      {
        opacity: 1,
        y: 0,
        duration: getAnimationDuration(duration),
        ease
      },
      "-=0.4"
    );
  }

  // Subtitle
  const subtitle = containerElement.querySelector('.hero-subtitle');
  if (subtitle) {
    tl.fromTo(
      subtitle,
      { opacity: 0, y: 30, force3D: true },
      {
        opacity: 1,
        y: 0,
        duration: getAnimationDuration(duration * 0.8),
        ease
      },
      "-=0.6"
    );
  }

  // Trust indicators
  const trust = containerElement.querySelector('.hero-trust');
  if (trust) {
    tl.fromTo(
      trust,
      { opacity: 0, y: 20, force3D: true },
      {
        opacity: 1,
        y: 0,
        duration: getAnimationDuration(duration * 0.6),
        ease
      },
      "-=0.4"
    );
  }

  // CTA buttons with stagger
  const ctas = containerElement.querySelectorAll('.hero-cta a');
  if (ctas.length > 0) {
    tl.fromTo(
      ctas,
      { opacity: 0, y: 20, scale: 0.95, force3D: true },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: getAnimationDuration(duration * 0.7),
        stagger: getAnimationDuration(stagger * 0.5),
        ease
      },
      "-=0.3"
    );
  }

  return tl;
};

// Loading state animation
export const loadingPulse = (element: string | Element) => {
  if (prefersReducedMotion()) return;

  return gsap.to(element, {
    opacity: 0.6,
    duration: 1,
    ease: medicalEasing.calm,
    yoyo: true,
    repeat: -1,
  });
};

// Professional card reveal animation for service cards
export const cardReveal = (
  elements: string | Element | Element[],
  options: MedicalAnimationOptions = {}
) => {
  const {
    duration = 0.8,
    stagger = 0.2,
    ease = medicalEasing.professional,
  } = options;

  if (prefersReducedMotion()) {
    gsap.set(elements, { opacity: 1, y: 0, scale: 1 });
    return;
  }

  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 40,
      scale: 0.95,
      force3D: true,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: getAnimationDuration(duration),
      stagger,
      ease,
    }
  );
};

// Gentle pulse animation for trust indicators
export const trustPulse = (element: string | Element) => {
  if (prefersReducedMotion()) return;

  return gsap.to(element, {
    scale: 1.05,
    duration: 2,
    ease: medicalEasing.calm,
    yoyo: true,
    repeat: -1,
  });
};

// Professional stats counter animation
export const statsCounter = (
  element: string | Element,
  targetValue: number,
  options: MedicalAnimationOptions & { suffix?: string } = {}
) => {
  const {
    duration = 2,
    ease = "power2.out",
    suffix = "",
  } = options;

  if (prefersReducedMotion()) {
    const target = typeof element === "string" ? document.querySelector(element) : element;
    if (target) {
      target.textContent = `${targetValue}${suffix}`;
    }
    return;
  }

  const target = typeof element === "string" ? document.querySelector(element) : element;
  if (!target) return;

  const counter = { value: 0 };

  return gsap.to(counter, {
    value: targetValue,
    duration: getAnimationDuration(duration),
    ease,
    onUpdate: () => {
      target.textContent = `${Math.round(counter.value)}${suffix}`;
    }
  });
};

// Page transition animation
export const pageTransition = {
  enter: (element: string | Element) => {
    // Always ensure visibility first
    gsap.set(element, { visibility: 'visible' });

    if (prefersReducedMotion() || isMobile()) {
      gsap.set(element, { opacity: 1, y: 0 });
      return;
    }

    return gsap.fromTo(
      element,
      { opacity: 0, y: 15, force3D: true },
      {
        opacity: 1,
        y: 0,
        duration: getAnimationDuration(0.5),
        ease: medicalEasing.professional
      }
    );
  },
  exit: (element: string | Element) => {
    if (prefersReducedMotion() || isMobile()) {
      gsap.set(element, { opacity: 0 });
      return;
    }

    return gsap.to(element, {
      opacity: 0,
      y: -15,
      duration: getAnimationDuration(0.3),
      ease: medicalEasing.professional,
    });
  },
};

// Medical form animation for smooth interactions
export const medicalFormFocus = (input: string | Element) => {
  if (prefersReducedMotion()) return;

  const target = typeof input === "string" ? document.querySelector(input) : input;
  if (!target) return;

  const handleFocus = () => {
    gsap.to(target, {
      scale: 1.02,
      duration: 0.3,
      ease: medicalEasing.gentle,
    });
  };

  const handleBlur = () => {
    gsap.to(target, {
      scale: 1,
      duration: 0.3,
      ease: medicalEasing.gentle,
    });
  };

  target.addEventListener("focus", handleFocus);
  target.addEventListener("blur", handleBlur);

  return () => {
    target.removeEventListener("focus", handleFocus);
    target.removeEventListener("blur", handleBlur);
  };
};

// Professional button animation with medical precision
export const medicalButtonHover = (button: string | Element) => {
  if (prefersReducedMotion()) return;

  const target = typeof button === "string" ? document.querySelector(button) : button;
  if (!target) return;

  const handleMouseEnter = () => {
    gsap.to(target, {
      y: -2,
      scale: 1.05,
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
      duration: 0.3,
      ease: medicalEasing.gentle,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(target, {
      y: 0,
      scale: 1,
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      duration: 0.3,
      ease: medicalEasing.gentle,
    });
  };

  target.addEventListener("mouseenter", handleMouseEnter);
  target.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    target.removeEventListener("mouseenter", handleMouseEnter);
    target.removeEventListener("mouseleave", handleMouseLeave);
  };
};

// Smooth scroll animation for navigation
export const smoothScrollTo = (targetElement: string | Element, options: MedicalAnimationOptions = {}) => {
  const {
    duration = 1.5,
    ease = medicalEasing.professional
  } = options;

  if (prefersReducedMotion()) {
    const target = typeof targetElement === "string" ? document.querySelector(targetElement) : targetElement;
    if (target) {
      target.scrollIntoView({ behavior: "instant" });
    }
    return;
  }

  const target = typeof targetElement === "string" ? document.querySelector(targetElement) : targetElement;
  if (!target) return;

  return gsap.to(window, {
    duration: getAnimationDuration(duration),
    scrollTo: {
      y: target,
      offsetY: 100
    },
    ease
  });
};

// Professional loading animation for medical forms
export const medicalLoader = (element: string | Element) => {
  if (prefersReducedMotion()) {
    const target = typeof element === "string" ? document.querySelector(element) : element;
    if (target) {
      target.textContent = "Loading...";
    }
    return;
  }

  const target = typeof element === "string" ? document.querySelector(element) : element;
  if (!target) return;

  const tl = gsap.timeline({ repeat: -1 });

  // Create loading dots animation
  tl.to(target, {
    opacity: 0.3,
    duration: 0.6,
    ease: medicalEasing.calm
  })
  .to(target, {
    opacity: 1,
    duration: 0.6,
    ease: medicalEasing.calm
  });

  return tl;
};

// Floating animation for background elements
export const floatingAnimation = (elements: string | Element | Element[]) => {
  if (prefersReducedMotion()) return;

  return gsap.to(elements, {
    y: "random(-20, 20)",
    x: "random(-15, 15)",
    rotation: "random(-5, 5)",
    duration: "random(3, 6)",
    ease: medicalEasing.calm,
    repeat: -1,
    yoyo: true,
    stagger: {
      each: 0.2,
      from: "random"
    }
  });
};