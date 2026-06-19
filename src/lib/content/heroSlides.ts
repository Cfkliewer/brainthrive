import { existsSync } from "node:fs";
import { join } from "node:path";
import { TEAM_PHOTO, TEAM_PHOTO_ALT } from "./assets";

/**
 * Homepage hero carousel slides.
 *
 * These four entries are SLOTS for licensed stock photos the owner is
 * purchasing. To activate a slide, save the purchased image to
 * /public/images/hero/ using the exact filename in `src` below
 * (slide-1.jpg ... slide-4.jpg) and rebuild.
 *
 * The hero renders slides full-bleed (object-cover at every viewport),
 * so buy wide landscape crops — ~16:9, at least 1920px wide — and keep
 * the subject in the upper-right half: a navy legibility gradient covers
 * the bottom-left where the headline and CTAs sit.
 *
 * Photo-to-file mapping (note slide-1 is BRAIN MAPPING, slide-2 is
 * NEUROFEEDBACK — the headline copy is keyed to this order):
 *   slide-1.jpg  clinician reviewing a brain map with a client
 *   slide-2.jpg  neurofeedback session (EEG sensors)
 *   slide-3.jpg  light therapy session
 *   slide-4.jpg  everyday-life outcome shot
 *
 * Availability is resolved server-side at build time (node:fs — do not
 * import this module from client components; see assets.ts for the same
 * pattern). A slide whose file is missing renders a styled navy/silver
 * gradient placeholder panel instead of a broken image.
 */
export interface HeroSlide {
  /** Public-root path where the purchased photo must be saved. */
  src: string;
  alt: string;
  /** Short uppercase label shown on the caption chip and placeholder. */
  eyebrow: string;
  /**
   * The word that completes the static headline "See improvement in your
   * ___". Only this word rotates with the image; the lead-in is fixed.
   */
  rotatingWord: string;
  /**
   * How `rotatingWord` is treated. Every slide currently uses plain italic
   * emphasis (white text); the field is kept for per-slide flexibility.
   * Defaults to "italic" when omitted.
   */
  accentStyle?: "italic";
}

export interface ResolvedHeroSlide extends HeroSlide {
  /**
   * The image to actually render: `src` when the file exists on disk,
   * a stand-in path, or null — null means "render the placeholder panel".
   */
  resolvedSrc: string | null;
  /**
   * How the resolved image is rendered:
   * - "cover": full-bleed object-cover (for purchased high-res photos)
   * - "blend": near-native size over the navy backdrop with a radial
   *   opacity vignette — for images too small to cover the hero without
   *   visible upscaling blur (e.g. the 512px team-photo stand-in).
   */
  renderMode: "cover" | "blend";
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    src: "/images/hero/slide-1.jpg",
    alt: "A clinician reviewing a qEEG brain map with a client",
    eyebrow: "Brain Mapping",
    rotatingWord: "memory",
    accentStyle: "italic",
  },
  {
    src: "/images/hero/slide-2.jpg",
    alt: "A client wearing EEG sensors during a neurofeedback training session",
    eyebrow: "Neurofeedback",
    rotatingWord: "sleep",
    accentStyle: "italic",
  },
  {
    src: "/images/hero/slide-3.jpg",
    alt: "A photobiomodulation light therapy session in a calm clinic room",
    eyebrow: "Light Therapy",
    rotatingWord: "focus",
    accentStyle: "italic",
  },
  {
    src: "/images/hero/slide-4.jpg",
    alt: "A family enjoying an ordinary, focused day together",
    eyebrow: "Why It Matters",
    rotatingWord: "anxiety",
    accentStyle: "italic",
  },
];

const heroImageOnDisk = (slide: HeroSlide) =>
  existsSync(join(process.cwd(), "public", slide.src.replace(/^\//, "")));

/**
 * HERO_SLIDES with on-disk availability resolved (build time, like
 * TEAM_PHOTO). Pass this to the client carousel from a server component.
 */
export const RESOLVED_HERO_SLIDES: ResolvedHeroSlide[] = HERO_SLIDES.map(
  (slide, index) => {
    if (heroImageOnDisk(slide)) {
      return { ...slide, resolvedSrc: slide.src, renderMode: "cover" as const };
    }
    // TEMPORARY stand-in: until the purchased "everyday life" photo for
    // slide 4 arrives, reuse the existing team/clinic photo there (and
    // only there — it's the one real photo we have). It renders full-bleed
    // ("cover"). The source is a Lanczos-upscaled 1920px copy of the 512px
    // original, so the stretch reads cleanly rather than blurry. Dropping
    // the real slide-4.jpg into /public/images/hero/ replaces it.
    if (index === 3 && TEAM_PHOTO) {
      return {
        ...slide,
        resolvedSrc: TEAM_PHOTO,
        alt: TEAM_PHOTO_ALT,
        renderMode: "cover" as const,
      };
    }
    return { ...slide, resolvedSrc: null, renderMode: "cover" as const };
  }
);
