import Link from "next/link";
import { CONDITIONS } from "@/lib/content/conditions";
import { navFor } from "@/lib/content/nav";
import { SITE } from "@/lib/content/site";
import Reveal from "./Reveal";

const NAV = navFor("v1");

/**
 * Statement hero: giant two-line Fraunces headline, short subhead, primary
 * CTA, and a right-rail numbered index of all ten conditions.
 */
export default function HomeHero() {
  return (
    <section>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-20 gap-y-16 px-6 pb-24 pt-14 md:px-10 lg:grid-cols-12 lg:pb-32 lg:pt-20">
        <div className="lg:col-span-12">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#5362EF]">
              Neurofeedback &middot; Photobiomodulation &middot; Choctaw,
              Oklahoma
            </p>
            <h1 className="v1-display mt-8 max-w-[15ch] text-balance text-[clamp(3rem,8vw,7.5rem)] leading-[0.98] tracking-[-0.02em]">
              Your brain can change.{" "}
              <em className="text-[#002554]/80">
                We measure it, then train it.
              </em>
            </h1>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.12}>
            <p className="max-w-[46ch] text-lg leading-relaxed text-[#002554]/75">
              Gentle, drug-free brain training — qEEG brain mapping,
              photobiomodulation, and traditional neurofeedback — grounded in
              objective measurement at every step.
            </p>
            <div className="mt-10 flex flex-wrap items-baseline gap-x-12 gap-y-5">
              <Link
                href={NAV.cta.href}
                className="text-lg font-medium text-[#5362EF] underline decoration-[#5362EF]/30 decoration-2 underline-offset-[8px] transition-colors hover:decoration-[#5362EF]"
              >
                {NAV.cta.label} <span aria-hidden>&rarr;</span>
              </Link>
              <a
                href={SITE.phone.href}
                className="text-sm transition-colors hover:text-[#5362EF]"
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
            <p className="border-b border-[#002554]/10 pb-3 text-[11px] uppercase tracking-[0.22em] text-[#002554]/70">
              Who We Help
            </p>
            <ol>
              {CONDITIONS.map((condition, index) => (
                <li
                  key={condition.slug}
                  className="border-b border-[#002554]/10"
                >
                  <Link
                    href={`/v1/who-we-help/${condition.slug}`}
                    className="group flex items-baseline gap-4 py-2.5 text-sm"
                  >
                    <span className="v1-display text-xs text-[#5362EF] tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="transition-colors group-hover:text-[#5362EF]">
                      {condition.navLabel}
                    </span>
                    <span
                      aria-hidden
                      className="ml-auto text-[#002554]/25 transition-colors group-hover:text-[#5362EF]"
                    >
                      &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </Reveal>
        </nav>
      </div>
    </section>
  );
}
