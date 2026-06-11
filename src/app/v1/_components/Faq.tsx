import type { FaqEntry } from "@/lib/content/types";

/**
 * Hairline-ruled FAQ disclosure list built on native <details>/<summary>,
 * so it is keyboard-operable with zero JavaScript.
 */
export default function Faq({ entries }: { entries: FaqEntry[] }) {
  return (
    <div className="border-t border-[#002554]/10">
      {entries.map((entry) => (
        <details
          key={entry.question}
          className="group border-b border-[#002554]/10"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
            <span className="text-base font-medium leading-snug md:text-lg">
              {entry.question}
            </span>
            <span
              aria-hidden
              className="v1-display mt-0.5 text-xl leading-none text-[#5362EF] transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-[65ch] pb-6 text-[15px] leading-relaxed text-[#002554]/75">
            {entry.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
