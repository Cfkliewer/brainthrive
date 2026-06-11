import Link from "next/link";
import { CONDITIONS } from "@/lib/content/conditions";
import { navFor } from "@/lib/content/nav";
import { SITE } from "@/lib/content/site";
import IndexRow from "./IndexRow";
import Reveal from "./Reveal";
import { ARROW_LINK_LG, CONTAINER, EYEBROW_ACCENT, EYEBROW_MUTED } from "./styles";

const NAV = navFor("v1");

/**
 * Statement hero: giant two-line Fraunces headline, short subhead, primary
 * CTA, and a right-rail numbered index of all ten conditions.
 */
export default function HomeHero() {
  return (
    <section>
      <div
        className={`${CONTAINER} grid grid-cols-1 gap-x-20 gap-y-16 pb-24 pt-14 lg:grid-cols-12 lg:pb-32 lg:pt-20`}
      >
        <div className="lg:col-span-12">
          <Reveal>
            <p className={EYEBROW_ACCENT}>
              Neurofeedback &middot; Photobiomodulation &middot; Choctaw,
              Oklahoma
            </p>
            <h1 className="v1-display mt-8 max-w-[15ch] text-balance text-[clamp(3rem,8vw,7.5rem)] leading-[0.98] tracking-[-0.02em]">
              Your brain can change.{" "}
              <em className="text-brand-navy/80">
                We measure it, then train it.
              </em>
            </h1>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.12}>
            <p className="max-w-[46ch] text-lg leading-relaxed text-brand-navy/75">
              Gentle, drug-free brain training — qEEG brain mapping,
              photobiomodulation, and traditional neurofeedback — grounded in
              objective measurement at every step.
            </p>
            <div className="mt-10 flex flex-wrap items-baseline gap-x-12 gap-y-5">
              <Link href={NAV.cta.href} className={ARROW_LINK_LG}>
                {NAV.cta.label} <span aria-hidden>&rarr;</span>
              </Link>
              <a
                href={SITE.phone.href}
                className="text-sm transition-colors hover:text-brand-ultraviolet"
              >
                Call {SITE.phone.display}
              </a>
            </div>
          </Reveal>
        </div>

        <nav
          aria-label="Who we help index"
          className="lg:col-span-4 lg:col-start-9"
        >
          <Reveal delay={0.2}>
            <p className={`border-b border-brand-navy/10 pb-3 ${EYEBROW_MUTED}`}>
              Who We Help
            </p>
            <ol>
              {CONDITIONS.map((condition, index) => (
                <IndexRow
                  key={condition.slug}
                  href={`/v1/who-we-help/${condition.slug}`}
                  index={index}
                  label={condition.navLabel}
                  density="compact"
                />
              ))}
            </ol>
          </Reveal>
        </nav>
      </div>
    </section>
  );
}
