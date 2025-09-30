/**
 * BrainThrive Animation Library
 * Professional medical website animations with accessibility support
 */

// Core setup and configuration
export {
  medicalDefaults,
  medicalEasing,
  prefersReducedMotion,
  getAnimationDuration,
  configureMedicalGSAP,
  initMedicalAnimations
} from "./gsap-setup";

// Medical animation functions
export {
  fadeInUp,
  scaleIn,
  slideInFromLeft,
  hoverLift,
  scrollReveal,
  heroEntrance,
  loadingPulse,
  cardReveal,
  trustPulse,
  statsCounter,
  medicalFormFocus,
  medicalButtonHover,
  smoothScrollTo,
  medicalLoader,
  floatingAnimation,
  pageTransition
} from "./medical-animations";

// React hooks
export {
  useFadeInUp,
  useScaleIn,
  useScrollReveal,
  useHeroEntrance,
  useHoverLift,
  useStaggerAnimation,
  usePageTransition,
  useGSAPTimeline,
  useCounterAnimation,
  useCarouselAnimation,
  useCardReveal,
  useTrustPulse,
  useMedicalFormFocus
} from "./hooks";

// Type exports
export type { MedicalAnimationOptions } from "./medical-animations";