import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CONDITIONS, getCondition } from "@/lib/content/conditions";
import ConditionArticle from "../../_components/ConditionArticle";
import CtaBand from "../../_components/CtaBand";

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

  return (
    <>
      <ConditionArticle condition={condition} />
      <CtaBand text={condition.cta} />
    </>
  );
}
