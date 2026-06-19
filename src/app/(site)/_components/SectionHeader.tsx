import {
  EYEBROW_ON_DARK,
  EYEBROW_ON_LIGHT,
  INDEX_NUMERAL,
  SECTION_HEADING,
} from "./styles";

interface SectionHeaderProps {
  /** Two-digit section index ("02") rendered as an oversized Bebas numeral. */
  index: string;
  eyebrow: string;
  heading: React.ReactNode;
  tone: "light" | "dark";
  className?: string;
}

/**
 * The recurring V2 section lockup: oversized Bebas index numeral beside
 * an uppercase eyebrow and an Inter heading ("01 / WHO WE HELP").
 */
export default function SectionHeader({
  index,
  eyebrow,
  heading,
  tone,
  className,
}: SectionHeaderProps) {
  const isDark = tone === "dark";
  return (
    <div className={`flex items-start gap-5 md:gap-7 ${className ?? ""}`}>
      <span
        aria-hidden
        className={`${INDEX_NUMERAL} ${
          isDark ? "text-white/20" : "text-medical-gray-300"
        }`}
      >
        {index}
      </span>
      <div className="pt-0.5">
        <p className={isDark ? EYEBROW_ON_DARK : EYEBROW_ON_LIGHT}>{eyebrow}</p>
        <h2
          className={`mt-3 ${SECTION_HEADING} ${
            isDark ? "text-white" : "text-brand-navy"
          }`}
        >
          {heading}
        </h2>
      </div>
    </div>
  );
}
