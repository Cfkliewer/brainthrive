import Link from "next/link";
import { CONDITIONS } from "@/lib/content/conditions";
import { SITE } from "@/lib/content/site";
import type { ConditionContent } from "@/lib/content/types";
import Reveal from "./Reveal";

/** The three conditions following this one in canonical order (wrapping). */
function relatedTo(condition: ConditionContent) {
  const index = CONDITIONS.findIndex((c) => c.slug === condition.slug);
  return [1, 2, 3].map(
    (offset) => CONDITIONS[(index + offset) % CONDITIONS.length]
  );
}

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
  const related = relatedTo(condition);
  const number = String(
    CONDITIONS.findIndex((c) => c.slug === condition.slug) + 1
  ).padStart(2, "0");
  const bodyParagraphs = condition.paragraphs.slice(0, -1);
  const closingParagraph =
    condition.paragraphs[condition.paragraphs.length - 1];

  return (
    <article>
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-12 md:px-10 lg:pb-32 lg:pt-16">
        <Reveal>
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-baseline gap-x-3 text-[11px] uppercase tracking-[0.2em]"
          >
            <Link
              href="/v1#who-we-help"
              className="text-[#5362EF] transition-colors hover:text-[#223BA8]"
            >
              Who We Help
            </Link>
            <span aria-hidden className="text-[#002554]/30">
              /
            </span>
            <span className="text-[#002554]/70">{condition.navLabel}</span>
            <span className="v1-display ml-auto text-sm normal-case tracking-normal text-[#5362EF] tabular-nums">
              {number} / {String(CONDITIONS.length).padStart(2, "0")}
            </span>
          </nav>

          <p className="mt-12 text-[11px] uppercase tracking-[0.22em] text-[#5362EF]">
            {condition.eyebrow}
          </p>
          <h1 className="v1-display mt-5 max-w-[18ch] text-balance text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[1.04] tracking-[-0.015em]">
            {condition.headline}
          </h1>
          {condition.subhead && (
            <p className="v1-display mt-6 text-xl italic text-[#002554]/70 md:text-2xl">
              {condition.subhead}
            </p>
          )}
        </Reveal>

        <Reveal
          variant="rule"
          className="mt-12 h-px bg-[#002554]/10 lg:mt-16"
        />

        <div className="grid gap-x-20 gap-y-16 pt-12 lg:grid-cols-12 lg:pt-16">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="max-w-[65ch] space-y-6 text-[1.0625rem] leading-[1.8] text-[#002554]/80">
                {bodyParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
            <Reveal>
              {/* Closing paragraph, set as a large inset quote (verbatim copy). */}
              <p className="v1-display mt-14 max-w-[30ch] border-l-2 border-[#00D3D2] pl-7 text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.3] tracking-[-0.01em]">
                {closingParagraph}
              </p>
            </Reveal>
          </div>

          <aside className="self-start lg:sticky lg:top-28 lg:col-span-4 lg:col-start-9">
            <Reveal>
              <div className="bg-[#F2F2F2] p-8">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#002554]/70">
                  Visit the clinic
                </p>
                <ul className="mt-6 space-y-3 text-sm">
                  <li>
                    <a
                      href={SITE.phone.href}
                      className="font-medium transition-colors hover:text-[#5362EF]"
                    >
                      {SITE.phone.display}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="break-all transition-colors hover:text-[#5362EF]"
                    >
                      {SITE.email}
                    </a>
                  </li>
                  <li className="border-t border-[#002554]/10 pt-3 text-[#002554]/75">
                    {SITE.address.street}
                    <br />
                    {SITE.address.cityStateZip}
                  </li>
                  <li className="text-[13px] text-[#002554]/70">
                    {SITE.address.note}
                  </li>
                  <li>
                    <a
                      href={SITE.address.mapsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#5362EF] underline decoration-[#5362EF]/30 underline-offset-4 transition-colors hover:decoration-[#5362EF]"
                    >
                      Open in Google Maps
                    </a>
                  </li>
                </ul>
              </div>

              <p className="mt-10 text-[11px] uppercase tracking-[0.22em] text-[#002554]/70">
                Also explore
              </p>
              <ul className="mt-4">
                {related.map((item) => (
                  <li key={item.slug} className="border-b border-[#002554]/10">
                    <Link
                      href={`/v1/who-we-help/${item.slug}`}
                      className="group flex items-baseline gap-4 py-3 text-sm"
                    >
                      <span className="v1-display text-xs text-[#5362EF] tabular-nums">
                        {String(
                          CONDITIONS.findIndex((c) => c.slug === item.slug) + 1
                        ).padStart(2, "0")}
                      </span>
                      <span className="transition-colors group-hover:text-[#5362EF]">
                        {item.navLabel}
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
              </ul>
            </Reveal>
          </aside>
        </div>
      </div>
    </article>
  );
}
