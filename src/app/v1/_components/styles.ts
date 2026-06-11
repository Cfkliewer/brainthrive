/**
 * Shared V1 "Editorial Calm" class recipes. Keep these single-purpose —
 * call sites compose extras (vertical padding, max-widths) via template
 * literals so the constants stay the canonical shared shell.
 */

/** Small-caps eyebrow label; compose a color, or use the variants below. */
export const EYEBROW = "text-[11px] uppercase tracking-[0.22em]";
export const EYEBROW_ACCENT = `${EYEBROW} text-brand-ultraviolet`;
export const EYEBROW_MUTED = `${EYEBROW} text-brand-navy/70`;

/** Page-shell container; call sites add their own vertical padding. */
export const CONTAINER = "mx-auto max-w-7xl px-6 md:px-10";

/** Fraunces section heading set under an eyebrow (the clamp recipe). */
export const SECTION_HEADING =
  "v1-display mt-5 text-balance text-[clamp(2rem,3.5vw,3.25rem)] leading-[1.08] tracking-[-0.015em]";

/** Understated arrow link ("More about the practice →"). */
export const ARROW_LINK =
  "text-sm font-medium text-brand-ultraviolet underline decoration-brand-ultraviolet/30 underline-offset-[6px] transition-colors hover:decoration-brand-ultraviolet";

/** Larger arrow link used by the hero and newsletter signup CTAs. */
export const ARROW_LINK_LG =
  "text-lg font-medium text-brand-ultraviolet underline decoration-brand-ultraviolet/30 decoration-2 underline-offset-[8px] transition-colors hover:decoration-brand-ultraviolet";

/** Anchor-target offset clearing the sticky header (unified at 28). */
export const SCROLL_OFFSET = "scroll-mt-28";
