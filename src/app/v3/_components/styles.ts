/**
 * Shared V3 "Immersive Neuro" class recipes. Dark cinematic palette:
 * medical-secondary base, brand-navy raised panels, teal-as-light accents.
 * Keep these single-purpose — call sites compose extras (padding,
 * max-widths) via template literals.
 */

/** Tracked-out uppercase teal eyebrow. */
export const EYEBROW =
  "text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-teal";

/** Page-shell container; call sites add their own vertical padding. */
export const CONTAINER = "mx-auto max-w-7xl px-6 md:px-10";

/** Monumental Bebas section heading set under an eyebrow. */
export const SECTION_HEADING =
  "v3-display mt-5 text-balance text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95] text-white";

/**
 * Teal -> ultraviolet gradient-clipped display words. Starts at the bright
 * teal end so short words/numbers (which only sample the left of the
 * gradient) stay luminous against the navy.
 */
export const GRADIENT_TEXT =
  "bg-gradient-to-r from-brand-teal via-brand-dark-teal to-brand-ultraviolet bg-clip-text text-transparent";

/** Dark-bg body copy: 17px / 1.7, white at 80%. */
export const BODY = "text-[17px] leading-[1.7] text-white/80";

/** Glassy raised panel. */
export const GLASS_PANEL =
  "rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm";

/** Glowing teal-border primary button, unsized — compose padding/text size. */
export const BTN_GLOW_BASE =
  "inline-flex items-center justify-center gap-2 rounded-full border border-brand-teal/70 font-semibold uppercase tracking-[0.18em] text-brand-teal shadow-[0_0_24px_rgba(53,243,230,0.25)] transition-all duration-300 hover:bg-brand-teal hover:text-medical-secondary hover:shadow-[0_0_44px_rgba(53,243,230,0.5)]";

/** Glowing teal-border primary button at the default size. */
export const BTN_GLOW = `${BTN_GLOW_BASE} px-7 py-3.5 text-sm`;

/** Ghost secondary button / tel link. */
export const BTN_GHOST =
  "inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium uppercase tracking-[0.18em] text-white/80 transition-colors duration-300 hover:border-white/40 hover:text-white";

/** Understated teal arrow link. */
export const ARROW_LINK =
  "inline-flex items-center gap-1.5 text-sm font-medium text-brand-teal transition-colors hover:text-white";

/** Anchor-target offset clearing the fixed header. */
export const SCROLL_OFFSET = "scroll-mt-28";
