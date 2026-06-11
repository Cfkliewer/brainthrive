/**
 * Shared V2 "Modern Clinical" class recipes. Keep these single-purpose —
 * call sites compose extras (vertical padding, max-widths) via template
 * literals so the constants stay the canonical shared shell.
 */

/** Page-shell container; call sites add their own vertical padding. */
export const CONTAINER = "mx-auto max-w-7xl px-6 md:px-10";

/** Uppercase utility eyebrow (Inter, small). Compose a color variant. */
export const EYEBROW = "text-xs font-semibold uppercase tracking-[0.22em]";
export const EYEBROW_ON_LIGHT = `${EYEBROW} text-brand-ultraviolet`;
export const EYEBROW_ON_DARK = `${EYEBROW} text-brand-teal`;

/** Inter section heading set under an eyebrow / index numeral. */
export const SECTION_HEADING =
  "text-balance text-[clamp(1.9rem,3.4vw,3rem)] font-semibold leading-[1.08] tracking-tight";

/** Oversized Bebas section index numeral ("01") — display sizes only. */
export const INDEX_NUMERAL =
  "v2-display block text-5xl leading-none md:text-6xl";

/** Shared button shell — compose with a variant below. */
export const BTN_BASE =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full text-sm font-semibold transition-[box-shadow,background-color,color,border-color] duration-300";

/** Ultraviolet -> purple gradient primary action. */
export const BTN_PRIMARY = `${BTN_BASE} bg-linear-to-r from-brand-ultraviolet to-brand-purple px-7 py-3.5 text-white shadow-lg shadow-brand-ultraviolet/30 hover:shadow-xl hover:shadow-brand-ultraviolet/40`;

/** Ghost action for light surfaces. */
export const BTN_GHOST_LIGHT = `${BTN_BASE} border border-medical-gray-300 px-7 py-3.5 text-medical-gray-900 hover:border-brand-ultraviolet hover:text-brand-purple`;

/** Ghost action for navy surfaces. */
export const BTN_GHOST_DARK = `${BTN_BASE} border border-white/30 px-7 py-3.5 text-white hover:border-brand-teal hover:text-brand-teal`;

/** Navy band shell — pairs with the teal focus-ring override in globals. */
export const DARK_BAND = "v2-band-dark bg-brand-navy text-white";

/** White card on a slate / navy section. */
export const CARD = "v2-card-shadow rounded-2xl bg-white";

/** Understated arrow link for light surfaces. */
export const ARROW_LINK =
  "inline-flex items-center gap-1.5 text-sm font-semibold text-brand-purple transition-colors hover:text-brand-ultraviolet";

/** Anchor-target offset clearing the sticky header. */
export const SCROLL_OFFSET = "scroll-mt-24";
