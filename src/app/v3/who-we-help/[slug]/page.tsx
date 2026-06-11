import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CONDITIONS, getCondition } from "@/lib/content/conditions";
import ConditionHero from "../../_components/ConditionHero";
import GlowCta from "../../_components/GlowCta";
import Reveal from "../../_components/Reveal";
import {
  ARROW_LINK,
  BODY,
  CONTAINER,
  EYEBROW,
  GLASS_PANEL,
} from "../../_components/styles";

export const dynamicParams = false;

export function generateStaticParams() {
  return CONDITIONS.map((condition) => ({ slug: condition.slug }));
}

interface ConditionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ConditionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const condition = getCondition(slug);
  if (!condition) return {};
  return {
    title: condition.navLabel,
    description: condition.metaDescription,
  };
}

export default async function ConditionPage({ params }: ConditionPageProps) {
  const { slug } = await params;
  const condition = getCondition(slug);
  if (!condition) notFound();

  // The next three conditions in canonical order, wrapping around.
  const index = CONDITIONS.findIndex((c) => c.slug === condition.slug);
  const related = [1, 2, 3].map(
    (offset) => CONDITIONS[(index + offset) % CONDITIONS.length]
  );

  return (
    <>
      <ConditionHero condition={condition} />

      {/* Body copy in elevated glassy panels */}
      <section aria-label="About this support" className={`${CONTAINER} pb-24`}>
        <Reveal stagger={0.12} className="max-w-3xl space-y-6">
          {condition.paragraphs.map((paragraph, pIndex) => (
            <div key={pIndex} className={`${GLASS_PANEL} p-7 md:p-8`}>
              <p className={BODY}>{paragraph}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Related conditions */}
      <section
        aria-label="Related conditions"
        className="border-t border-white/10 bg-brand-navy/30"
      >
        <div className={`${CONTAINER} py-20 md:py-24`}>
          <Reveal>
            <p className={EYEBROW}>Keep exploring</p>
            <h2 className="v3-display mt-4 text-[clamp(2.25rem,4.5vw,4rem)] leading-[0.95] text-white">
              We also help with
              <span className="text-brand-teal">&hellip;</span>
            </h2>
          </Reveal>
          <Reveal stagger={0.1} className="mt-10 grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/v3/who-we-help/${item.slug}`}
                className={`${GLASS_PANEL} group block p-7 transition-all duration-300 hover:border-brand-teal/40 hover:shadow-[0_0_36px_rgba(53,243,230,0.15)]`}
              >
                <p className={EYEBROW}>{item.eyebrow}</p>
                <span className="v3-display mt-3 block text-2xl leading-[1.05] text-white transition-colors group-hover:text-brand-teal">
                  {item.navLabel}
                </span>
                <span className="mt-3 block text-[15px] leading-relaxed text-white/70">
                  {item.excerpt}
                </span>
                <span className={`${ARROW_LINK} mt-5`}>
                  Explore <span aria-hidden>&rarr;</span>
                </span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <GlowCta text={condition.cta} />
    </>
  );
}
