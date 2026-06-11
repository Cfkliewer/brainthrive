import Link from "next/link";
import { CONDITIONS } from "@/lib/content/conditions";
import { SITE } from "@/lib/content/site";
import type { ConditionContent } from "@/lib/content/types";
import IndexRow from "./IndexRow";
import Reveal from "./Reveal";
import { CONTAINER, EYEBROW_ACCENT, EYEBROW_MUTED } from "./styles";

/**
 * Editorial article template for a condition page: breadcrumb eyebrow,
 * Fraunces headline, ~65ch prose column with the closing paragraph styled
 * as a large inset quote, and a sticky contact aside.
 */
export default function ConditionArticle({
  condition,
}: {
  condition: ConditionContent;
}) {
  const conditionIndex = CONDITIONS.findIndex(
    (c) => c.slug === condition.slug
  );
  const number = String(conditionIndex + 1).padStart(2, "0");
  // The three conditions following this one in canonical order (wrapping),
  // keeping each one's canonical index for its row number.
  const related = [1, 2, 3].map((offset) => {
    const index = (conditionIndex + offset) % CONDITIONS.length;
    return { index, condition: CONDITIONS[index] };
  });
  const bodyParagraphs = condition.paragraphs.slice(0, -1);
  const closingParagraph =
    condition.paragraphs[condition.paragraphs.length - 1];

  return (
    <article>
      <div className={`${CONTAINER} pb-24 pt-12 lg:pb-32 lg:pt-16`}>
        <Reveal>
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-baseline gap-x-3 text-[11px] uppercase tracking-[0.2em]"
          >
            <Link
              href="/v1#who-we-help"
              className="text-brand-ultraviolet transition-colors hover:text-brand-purple"
            >
              Who We Help
            </Link>
            <span aria-hidden className="text-brand-navy/30">
              /
            </span>
            <span className="text-brand-navy/70">{condition.navLabel}</span>
            <span className="v1-display ml-auto text-sm normal-case tracking-normal text-brand-ultraviolet tabular-nums">
              {number} / {String(CONDITIONS.length).padStart(2, "0")}
            </span>
          </nav>

          <p className={`mt-12 ${EYEBROW_ACCENT}`}>{condition.eyebrow}</p>
          <h1 className="v1-display mt-5 max-w-[18ch] text-balance text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[1.04] tracking-[-0.015em]">
            {condition.headline}
          </h1>
          {condition.subhead && (
            <p className="v1-display mt-6 text-xl italic text-brand-navy/70 md:text-2xl">
              {condition.subhead}
            </p>
          )}
        </Reveal>

        <Reveal
          variant="rule"
          className="mt-12 h-px bg-brand-navy/10 lg:mt-16"
        />

        <div className="grid gap-x-20 gap-y-16 pt-12 lg:grid-cols-12 lg:pt-16">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="max-w-[65ch] space-y-6 text-[1.0625rem] leading-[1.8] text-brand-navy/80">
                {bodyParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
            <Reveal>
              {/* Closing paragraph, set as a large inset quote (verbatim copy). */}
              <p className="v1-display mt-14 max-w-[30ch] border-l-2 border-brand-dark-teal pl-7 text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.3] tracking-[-0.01em]">
                {closingParagraph}
              </p>
            </Reveal>
          </div>

          <aside className="self-start lg:sticky lg:top-28 lg:col-span-4 lg:col-start-9">
            <Reveal>
              <div className="bg-brand-silver p-8">
                <p className={EYEBROW_MUTED}>Visit the clinic</p>
                <ul className="mt-6 space-y-3 text-sm">
                  <li>
                    <a
                      href={SITE.phone.href}
                      className="font-medium transition-colors hover:text-brand-ultraviolet"
                    >
                      {SITE.phone.display}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="break-all transition-colors hover:text-brand-ultraviolet"
                    >
                      {SITE.email}
                    </a>
                  </li>
                  <li className="border-t border-brand-navy/10 pt-3 text-brand-navy/75">
                    {SITE.address.street}
                    <br />
                    {SITE.address.cityStateZip}
                  </li>
                  <li className="text-[13px] text-brand-navy/70">
                    {SITE.address.note}
                  </li>
                  <li>
                    <a
                      href={SITE.address.mapsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-ultraviolet underline decoration-brand-ultraviolet/30 underline-offset-4 transition-colors hover:decoration-brand-ultraviolet"
                    >
                      Open in Google Maps
                    </a>
                  </li>
                </ul>
              </div>

              <p className={`mt-10 ${EYEBROW_MUTED}`}>Also explore</p>
              <ul className="mt-4">
                {related.map((item) => (
                  <IndexRow
                    key={item.condition.slug}
                    href={`/v1/who-we-help/${item.condition.slug}`}
                    index={item.index}
                    label={item.condition.navLabel}
                    density="cozy"
                  />
                ))}
              </ul>
            </Reveal>
          </aside>
        </div>
      </div>
    </article>
  );
}
