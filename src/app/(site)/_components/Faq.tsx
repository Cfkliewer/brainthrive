import type { FaqEntry } from "@/lib/content/types";
import { CARD } from "./styles";

/**
 * Card accordion built on native <details>/<summary> — keyboard-operable
 * with zero JavaScript. White cards sit on the slate-50 section behind.
 */
export default function Faq({ entries }: { entries: FaqEntry[] }) {
  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <details key={entry.question} className={`group ${CARD}`}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 [&::-webkit-details-marker]:hidden">
            <span className="text-base font-semibold leading-snug text-brand-navy md:text-lg">
              {entry.question}
            </span>
            <span
              aria-hidden
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-medical-gray-200 text-lg leading-none text-brand-purple transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-[70ch] px-6 pb-6 text-[15px] leading-relaxed text-medical-gray-600">
            {entry.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
