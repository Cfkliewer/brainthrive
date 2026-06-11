import Link from "next/link";
import { navFor } from "@/lib/content/nav";
import { SITE } from "@/lib/content/site";
import Reveal from "./Reveal";
import { CONTAINER, EYEBROW } from "./styles";

const CTA = navFor("v1").cta;

const DEFAULT_TEXT =
  "Schedule a consultation today — we’ll answer your questions, learn about your goals, and set up your initial brain assessment.";

/**
 * The single navy moment on every page: the pre-footer "Schedule
 * Consultation" band. Condition pages pass their own verbatim `cta` copy.
 */
export default function CtaBand({ text = DEFAULT_TEXT }: { text?: string }) {
  return (
    <section
      aria-label="Schedule a consultation"
      className="v1-band-dark bg-brand-navy text-white"
    >
      <div className={`${CONTAINER} py-24 lg:py-32`}>
        <Reveal>
          <div aria-hidden className="h-0.5 w-14 bg-brand-dark-teal" />
          <p className={`mt-8 ${EYEBROW} text-brand-dark-teal`}>
            Take the first step
          </p>
          <h2 className="v1-display mt-5 max-w-4xl text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.04] tracking-tight">
            Begin with a conversation.
          </h2>
          <p className="mt-7 max-w-[58ch] text-lg leading-relaxed text-white/75">
            {text}
          </p>
          <div className="mt-12 flex flex-wrap items-baseline gap-x-12 gap-y-5">
            <Link
              href={CTA.href}
              className="text-lg font-medium underline decoration-brand-dark-teal/60 decoration-2 underline-offset-[8px] transition-colors hover:decoration-brand-dark-teal"
            >
              {CTA.label} <span aria-hidden>&rarr;</span>
            </Link>
            <a
              href={SITE.phone.href}
              className="text-sm text-white/75 transition-colors hover:text-white"
            >
              Call {SITE.phone.display}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="text-sm text-white/75 transition-colors hover:text-white"
            >
              {SITE.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
