import { navFor } from "@/lib/content/nav";
import { SITE } from "@/lib/content/site";
import MagneticButton from "./MagneticButton";
import {
  BTN_GHOST_DARK,
  BTN_PRIMARY,
  CONTAINER,
  DARK_BAND,
  EYEBROW_ON_DARK,
} from "./styles";

const NAV = navFor("v2");

/**
 * Navy closing CTA band rendered at the bottom of every page (above the
 * footer): heading, optional supporting line (e.g. a condition's verbatim
 * cta copy), gradient MagneticButton, and a tel ghost button.
 */
export default function CtaBand({
  heading = "Ready to start?",
  text,
}: {
  heading?: string;
  text?: string;
}) {
  return (
    <section className={`relative overflow-hidden ${DARK_BAND}`}>
      <div aria-hidden className="v2-grid-pattern absolute inset-0" />
      <div
        aria-hidden
        className="absolute -top-40 right-[-10%] h-96 w-96 rounded-full bg-brand-ultraviolet/25 blur-3xl"
      />
      <div className={`${CONTAINER} relative py-20 lg:py-28`}>
        <div className="max-w-3xl">
          <p className={EYEBROW_ON_DARK}>Next Step</p>
          <h2 className="mt-4 text-balance text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.06] tracking-tight">
            {heading}
          </h2>
          <p className="mt-5 max-w-[58ch] leading-relaxed text-white/75">
            {text ??
              `Call or email and we'll answer your questions, learn about your goals, and set up your initial brain assessment — there's no obligation.`}
          </p>
        </div>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <MagneticButton href={NAV.cta.href} className={BTN_PRIMARY}>
            {NAV.cta.label}
          </MagneticButton>
          <a href={SITE.phone.href} className={BTN_GHOST_DARK}>
            Call {SITE.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
