import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CONDITIONS, getCondition } from "@/lib/content/conditions";
import ConditionHero from "../../_components/ConditionHero";
import CtaBand from "../../_components/CtaBand";
import RelatedConditions from "../../_components/RelatedConditions";
import Reveal from "../../_components/Reveal";
import StickyMobileCta from "../../_components/StickyMobileCta";

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

  const conditionIndex = CONDITIONS.findIndex((c) => c.slug === slug);
  const bodyParagraphs = condition.paragraphs.slice(0, -1);
  const closingParagraph =
    condition.paragraphs[condition.paragraphs.length - 1];

  return (
    <>
      <ConditionHero
        condition={condition}
        index={conditionIndex}
        total={CONDITIONS.length}
      />

      {/* Body copy with a highlighted closing callout (verbatim copy). */}
      <article className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 md:px-10 lg:py-24">
          <Reveal stagger={0.06}>
            {bodyParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className="mt-6 text-[1.0625rem] leading-[1.8] text-medical-gray-700 first:mt-0"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
          <Reveal className="mt-12">
            <p className="rounded-2xl border-l-4 border-brand-ultraviolet bg-medical-gray-50 p-8 text-balance text-xl font-semibold leading-snug tracking-tight text-brand-navy md:p-10 md:text-2xl">
              {closingParagraph}
            </p>
          </Reveal>
        </div>
      </article>

      <RelatedConditions currentSlug={condition.slug} />

      <CtaBand text={condition.cta} />

      <StickyMobileCta />
    </>
  );
}
