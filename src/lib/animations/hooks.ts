/**
 * React hooks for GSAP animations in the BrainThrive medical website
 * Provides easy-to-use animation hooks with medical UX considerations
 */

import { useRef, useLayoutEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  fadeInUp,
  scaleIn,
  slideInFromLeft,
  scrollReveal,
  heroEntrance,
  hoverLift,
  cardReveal,
  trustPulse,
  statsCounter,
  medicalFormFocus,
  pageTransition,
  MedicalAnimationOptions
} from "./medical-animations";
import { prefersReducedMotion, getAnimationDuration } from "./gsap-setup";

// Hook for fade-in animations
export const useFadeInUp = (
  options: MedicalAnimationOptions = {},
  deps: React.DependencyList = []
) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      const children = containerRef.current.children;
      if (children.length > 0) {
        fadeInUp(Array.from(children), options);
      }
    }
  }, { dependencies: [...deps], scope: containerRef });

  return containerRef;
};

// Hook for scale-in animations
export const useScaleIn = (
  options: MedicalAnimationOptions = {},
  deps: React.DependencyList = []
) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      scaleIn(containerRef.current, options);
    }
  }, { dependencies: [...deps], scope: containerRef });

  return containerRef;
};

// Hook for scroll-triggered reveals
export const useScrollReveal = (
  selector: string = ".reveal-item",
  options: MedicalAnimationOptions & {
    start?: string;
    end?: string;
  } = {}
) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll(selector);
      if (elements.length > 0) {
        scrollReveal(Array.from(elements), {
          trigger: containerRef.current,
          ...options
        });
      }
    }
  }, { scope: containerRef });

  return containerRef;
};

// Hook for hero section entrance
export const useHeroEntrance = (
  options: MedicalAnimationOptions = {},
  deps: React.DependencyList = []
) => {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (heroRef.current) {
      heroEntrance(heroRef.current, options);
    }
  }, { dependencies: [...deps], scope: heroRef });

  return heroRef;
};

// Hook for hover lift effect
export const useHoverLift = <T extends HTMLElement = HTMLElement>() => {
  const elementRef = useRef<T>(null);

  useLayoutEffect(() => {
    if (elementRef.current && !prefersReducedMotion()) {
      const cleanup = hoverLift(elementRef.current);
      return cleanup;
    }
  }, []);

  return elementRef;
};

// Hook for staggered animations
export const useStaggerAnimation = (
  animationType: "fadeInUp" | "scaleIn" | "slideInLeft" = "fadeInUp",
  options: MedicalAnimationOptions = {},
  deps: React.DependencyList = []
) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      const children = Array.from(containerRef.current.children);

      switch (animationType) {
        case "fadeInUp":
          fadeInUp(children, options);
          break;
        case "scaleIn":
          scaleIn(children, options);
          break;
        case "slideInLeft":
          slideInFromLeft(children, options);
          break;
      }
    }
  }, { dependencies: [...deps], scope: containerRef });

  return containerRef;
};

// Hook for page transitions
export const usePageTransition = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  const animateIn = useCallback(() => {
    if (pageRef.current) {
      return pageTransition.enter(pageRef.current);
    }
  }, []);

  const animateOut = useCallback(() => {
    if (pageRef.current) {
      return pageTransition.exit(pageRef.current);
    }
  }, []);

  useGSAP(() => {
    animateIn();
  }, { scope: pageRef });

  return { pageRef, animateIn, animateOut };
};

// Hook for custom GSAP timeline
export const useGSAPTimeline = (
  createTimeline: (tl: gsap.core.Timeline) => void,
  deps: React.DependencyList = []
) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const tl = gsap.timeline();
    createTimeline(tl);
    return () => tl.kill();
  }, { dependencies: [...deps], scope: containerRef });

  return containerRef;
};

// Hook for scroll-triggered counter animation
export const useCounterAnimation = (
  targetNumber: number,
  duration: number = 2,
  deps: React.DependencyList = []
) => {
  const counterRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (counterRef.current && !prefersReducedMotion()) {
      const counter = { value: 0 };

      ScrollTrigger.create({
        trigger: counterRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(counter, {
            value: targetNumber,
            duration: getAnimationDuration(duration),
            ease: "power2.out",
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = Math.round(counter.value).toString();
              }
            }
          });
        }
      });
    }
  }, { dependencies: [...deps], scope: counterRef });

  return counterRef;
};

// Hook for carousel/slider animations
export const useCarouselAnimation = (
  autoPlay: boolean = false,
  interval: number = 5000
) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const currentSlide = useRef(0);
  const autoPlayRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const goToSlide = useCallback((index: number) => {
    if (!carouselRef.current) return;

    const slides = carouselRef.current.querySelectorAll(".carousel-slide");
    if (slides.length === 0) return;

    currentSlide.current = index;

    if (prefersReducedMotion()) {
      slides.forEach((slide, i) => {
        (slide as HTMLElement).style.opacity = i === index ? "1" : "0";
      });
      return;
    }

    gsap.to(slides, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out"
    });

    gsap.to(slides[index], {
      opacity: 1,
      duration: 0.3,
      delay: 0.1,
      ease: "power2.out"
    });
  }, []);

  const nextSlide = useCallback(() => {
    if (!carouselRef.current) return;
    const slides = carouselRef.current.querySelectorAll(".carousel-slide");
    const next = (currentSlide.current + 1) % slides.length;
    goToSlide(next);
  }, [goToSlide]);

  const prevSlide = useCallback(() => {
    if (!carouselRef.current) return;
    const slides = carouselRef.current.querySelectorAll(".carousel-slide");
    const prev = currentSlide.current === 0 ? slides.length - 1 : currentSlide.current - 1;
    goToSlide(prev);
  }, [goToSlide]);

  useLayoutEffect(() => {
    if (autoPlay && !prefersReducedMotion()) {
      autoPlayRef.current = setInterval(nextSlide, interval);
      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
        }
      };
    }
  }, [autoPlay, interval, nextSlide]);

  return {
    carouselRef,
    goToSlide,
    nextSlide,
    prevSlide,
    currentSlide: currentSlide.current
  };
};

// Hook for card reveal animations
export const useCardReveal = (
  options: MedicalAnimationOptions = {},
  deps: React.DependencyList = []
) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.service-card, .medical-card, .faq-item');
      if (cards.length > 0) {
        scrollReveal(Array.from(cards), {
          trigger: containerRef.current,
          ...options
        });
      }
    }
  }, { dependencies: [...deps], scope: containerRef });

  return containerRef;
};

// Hook for trust pulse animation
export const useTrustPulse = (
  deps: React.DependencyList = []
) => {
  const elementRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (elementRef.current && !prefersReducedMotion()) {
      trustPulse(elementRef.current);
    }
  }, { dependencies: [...deps], scope: elementRef });

  return elementRef;
};

// Hook for medical form focus animations
export const useMedicalFormFocus = () => {
  const formRef = useRef<HTMLFormElement>(null);

  useLayoutEffect(() => {
    if (formRef.current && !prefersReducedMotion()) {
      const inputs = formRef.current.querySelectorAll('input, textarea, select');
      const cleanupFunctions: (() => void)[] = [];

      inputs.forEach((input) => {
        const cleanup = medicalFormFocus(input);
        if (cleanup) cleanupFunctions.push(cleanup);
      });

      return () => {
        cleanupFunctions.forEach(cleanup => cleanup());
      };
    }
  }, []);

  return formRef;
};