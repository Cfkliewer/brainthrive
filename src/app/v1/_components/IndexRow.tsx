import Link from "next/link";

/**
 * Density variants matching the original call sites' spacing/type exactly:
 * - "compact": hero right-rail index (py-2.5, text-sm)
 * - "cozy": condition-article "Also explore" list (py-3, text-sm)
 * - "comfortable": Who We Help dropdown panel (py-3.5, 15px labels)
 * - "mobile": full-screen mobile menu (py-3, text-base, no hover arrow)
 */
const DENSITIES = {
  compact: {
    link: "group flex items-baseline gap-4 py-2.5 text-sm",
    label: "transition-colors group-hover:text-brand-ultraviolet",
    arrow:
      "ml-auto text-brand-navy/25 transition-colors group-hover:text-brand-ultraviolet",
  },
  cozy: {
    link: "group flex items-baseline gap-4 py-3 text-sm",
    label: "transition-colors group-hover:text-brand-ultraviolet",
    arrow:
      "ml-auto text-brand-navy/25 transition-colors group-hover:text-brand-ultraviolet",
  },
  comfortable: {
    link: "group flex items-baseline gap-4 py-3.5",
    label: "text-[15px] transition-colors group-hover:text-brand-ultraviolet",
    arrow:
      "ml-auto text-brand-navy/30 transition-colors group-hover:text-brand-ultraviolet",
  },
  mobile: {
    link: "flex items-baseline gap-4 py-3",
    label: "text-base",
    arrow: null,
  },
} as const;

interface IndexRowProps {
  href: string;
  /** Zero-based position; rendered as a two-digit "01" index. */
  index: number;
  label: string;
  density: keyof typeof DENSITIES;
  /** Which side carries the hairline rule (the dropdown rules the top). */
  borderSide?: "top" | "bottom";
}

/**
 * One numbered editorial index row — hairline rule, two-digit number,
 * label, hover arrow — rendered as an <li>. Shared by the hero index,
 * the nav dropdown, the mobile menu, and condition-article related links.
 */
export default function IndexRow({
  href,
  index,
  label,
  density,
  borderSide = "bottom",
}: IndexRowProps) {
  const styles = DENSITIES[density];
  return (
    <li
      className={`${
        borderSide === "top" ? "border-t" : "border-b"
      } border-brand-navy/10`}
    >
      <Link href={href} className={styles.link}>
        <span className="v1-display text-xs text-brand-ultraviolet tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className={styles.label}>{label}</span>
        {styles.arrow && (
          <span aria-hidden className={styles.arrow}>
            &rarr;
          </span>
        )}
      </Link>
    </li>
  );
}
