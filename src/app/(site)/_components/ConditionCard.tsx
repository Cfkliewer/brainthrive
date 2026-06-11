import Link from "next/link";
import type { ConditionContent } from "@/lib/content/types";
import { CARD, EYEBROW } from "./styles";

interface ConditionCardProps {
  condition: ConditionContent;
  /** Canonical 0-based index in CONDITIONS — rendered as a Bebas numeral. */
  index: number;
  className?: string;
}

/**
 * White condition card shared by the homepage carousel and the
 * RelatedConditions row: oversized Bebas number, navLabel, excerpt, and a
 * stretched link (whole card clickable, single tab stop, DOM reading order).
 */
export default function ConditionCard({
  condition,
  index,
  className,
}: ConditionCardProps) {
  return (
    <article
      className={`group relative flex h-full flex-col p-7 transition-shadow duration-300 ${CARD} ${className ?? ""}`}
    >
      <div className="flex items-start justify-between">
        <span
          aria-hidden
          className="v2-display text-5xl leading-none text-medical-gray-200 transition-colors duration-300 group-hover:text-brand-ultraviolet md:text-6xl"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          aria-hidden
          className="mt-1 flex h-9 w-9 items-center justify-center rounded-full border border-medical-gray-200 text-brand-purple transition-colors duration-300 group-hover:border-brand-ultraviolet group-hover:bg-brand-ultraviolet group-hover:text-white"
        >
          &rarr;
        </span>
      </div>
      <p className={`mt-6 ${EYEBROW} text-medical-gray-500`}>
        {condition.eyebrow}
      </p>
      <h3 className="mt-2 text-xl font-semibold leading-snug tracking-tight text-brand-navy">
        <Link
          href={`/who-we-help/${condition.slug}`}
          className="after:absolute after:inset-0 after:rounded-2xl"
        >
          {condition.navLabel}
        </Link>
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-medical-gray-600">
        {condition.excerpt}
      </p>
    </article>
  );
}
