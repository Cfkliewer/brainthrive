import Link from "next/link";

export interface EditorialListItem {
  number: string;
  title: string;
  /** Small uppercase line under the title (e.g. a condition eyebrow). */
  kicker?: string;
  /** Right-aligned metadata (e.g. a newsletter date). */
  meta?: string;
  description?: string;
  href?: string;
}

interface EditorialListProps {
  items: EditorialListItem[];
  /** 2 lays the rows out in two columns from the sm breakpoint up. */
  columns?: 1 | 2;
}

function RowContent({ item }: { item: EditorialListItem }) {
  return (
    <>
      <span className="v1-display pt-1 text-sm text-brand-ultraviolet tabular-nums">
        {item.number}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-lg leading-snug transition-colors group-hover:text-brand-ultraviolet md:text-xl">
          {item.title}
        </span>
        {item.kicker && (
          <span className="mt-1.5 block text-[11px] uppercase tracking-[0.18em] text-brand-navy/70">
            {item.kicker}
          </span>
        )}
        {item.description && (
          <span className="mt-3 block max-w-[60ch] text-[15px] leading-relaxed text-brand-navy/70">
            {item.description}
          </span>
        )}
      </span>
      {item.meta && (
        <span className="pt-1 text-[11px] uppercase tracking-[0.18em] text-brand-navy/70">
          {item.meta}
        </span>
      )}
      {item.href && (
        <span
          aria-hidden
          className="pt-1 text-brand-navy/30 transition-colors group-hover:text-brand-ultraviolet"
        >
          &rarr;
        </span>
      )}
    </>
  );
}

/**
 * Numbered, hairline-separated editorial rows — the V1 alternative to cards.
 */
export default function EditorialList({
  items,
  columns = 1,
}: EditorialListProps) {
  return (
    <ul
      className={`grid border-b border-brand-navy/10 ${
        columns === 2 ? "gap-x-16 sm:grid-cols-2" : ""
      }`}
    >
      {items.map((item) => (
        <li key={item.number + item.title} className="border-t border-brand-navy/10">
          {item.href ? (
            <Link
              href={item.href}
              className="group flex items-start gap-5 py-6"
            >
              <RowContent item={item} />
            </Link>
          ) : (
            <div className="flex items-start gap-5 py-6">
              <RowContent item={item} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
