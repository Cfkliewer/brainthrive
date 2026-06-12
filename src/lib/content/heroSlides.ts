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
  /** Hero headline shown while this slide is up (rotates with the image). */
  headline: string;
  /** Optional substring of `headline` rendered with the teal→ultraviolet
   *  gradient treatment. */
  headlineAccent?: string;
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
    headline: "See how your brain is working",
    headlineAccent: "brain",
  },
  {
    src: "/images/hero/slide-2.jpg",
    alt: "A client wearing EEG sensors during a neurofeedback training session",
    eyebrow: "Neurofeedback",
    headline: "Train your brain with real time feedback",
    headlineAccent: "real time",
  },
  {
    src: "/images/hero/slide-3.jpg",
    alt: "A photobiomodulation light therapy session in a calm clinic room",
    eyebrow: "Light Therapy",
    headline: "Gentle, non-invasive support at the cellular level",
    headlineAccent: "non-invasive",
  },
  {
    src: "/images/hero/slide-4.jpg",
    alt: "A family enjoying an ordinary, focused day together",
    eyebrow: "Why It Matters",
    headline: "Feel like yourself again.",
    headlineAccent: "yourself",
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
    // only there — it's the one real photo we have). It is only 512px
    // wide, so it renders in "blend" mode (near-native size, vignetted
    // into the navy backdrop) instead of a blurry full-bleed stretch.
    // Dropping the real slide-4.jpg into /public/images/hero/ replaces
    // it automatically and switches the slide back to "cover".
    if (index === 3 && TEAM_PHOTO) {
      return {
        ...slide,
        resolvedSrc: TEAM_PHOTO,
        alt: TEAM_PHOTO_ALT,
        renderMode: "blend" as const,
      };
    }
    return { ...slide, resolvedSrc: null, renderMode: "cover" as const };
  }
);
