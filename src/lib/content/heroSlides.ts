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
 * Recommended crop: ~4:5 portrait or 1:1 square, at least 1200px wide.
 * The carousel crops with object-cover, so keep the subject centered.
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
  /** One plain sentence under the eyebrow on the caption chip. */
  caption: string;
}

export interface ResolvedHeroSlide extends HeroSlide {
  /**
   * The image to actually render: `src` when the file exists on disk,
   * a stand-in path, or null — null means "render the placeholder panel".
   */
  resolvedSrc: string | null;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    src: "/images/hero/slide-1.jpg",
    alt: "A client wearing EEG sensors during a neurofeedback training session",
    eyebrow: "Neurofeedback",
    caption: "Training your brain with real-time feedback",
  },
  {
    src: "/images/hero/slide-2.jpg",
    alt: "A clinician reviewing a qEEG brain map with a client",
    eyebrow: "Brain Mapping",
    caption: "We start by seeing how your brain is working",
  },
  {
    src: "/images/hero/slide-3.jpg",
    alt: "A photobiomodulation light therapy session in a calm clinic room",
    eyebrow: "Light Therapy",
    caption: "Gentle, non-invasive support at the cellular level",
  },
  {
    src: "/images/hero/slide-4.jpg",
    alt: "A family enjoying an ordinary, focused day together",
    eyebrow: "Why It Matters",
    caption: "Clearer days at work, school, and home",
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
      return { ...slide, resolvedSrc: slide.src };
    }
    // TEMPORARY stand-in: until the purchased "everyday life" photo for
    // slide 4 arrives, reuse the existing team/clinic photo there (and
    // only there — it's the one real photo we have). Dropping the real
    // slide-4.jpg into /public/images/hero/ replaces it automatically.
    if (index === 3 && TEAM_PHOTO) {
      return { ...slide, resolvedSrc: TEAM_PHOTO, alt: TEAM_PHOTO_ALT };
    }
    return { ...slide, resolvedSrc: null };
  }
);
