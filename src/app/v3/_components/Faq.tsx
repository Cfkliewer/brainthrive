import { FAQ } from "@/lib/content/pages";
import Reveal from "./Reveal";
import { CONTAINER, EYEBROW, GLASS_PANEL } from "./styles";

/**
 * Chapter 7: glassy glow-bordered FAQ accordion. Native <details>/<summary>
 * keeps it keyboard-operable and JS-free.
 */
export default function Faq() {
  return (
    <section aria-label="Frequently asked questions" className={`${CONTAINER} py-24 md:py-32`}>
      <Reveal>
        <p className={EYEBROW}>Questions</p>
        <h2 className="v3-display mt-5 text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95] text-white">
          Answers, before you ask
          <span className="text-brand-teal">.</span>
        </h2>
      </Reveal>
      <Reveal stagger={0.06} className="mt-12 space-y-4">
        {FAQ.map((entry) => (
          <details
            key={entry.question}
            className={`${GLASS_PANEL} group transition-colors open:border-brand-teal/40 open:shadow-[0_0_32px_rgba(53,243,230,0.12)]`}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-7 py-5 text-lg font-medium text-white [&::-webkit-details-marker]:hidden">
              {entry.question}
              <span
                aria-hidden
                className="text-2xl font-light leading-none text-brand-teal transition-transform duration-300 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="px-7 pb-6 text-[16px] leading-[1.7] text-white/75">
              {entry.answer}
            </p>
          </details>
        ))}
      </Reveal>
    </section>
  );
}
