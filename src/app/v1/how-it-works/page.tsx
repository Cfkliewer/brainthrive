import type { Metadata } from "next";
import { HOW_IT_WORKS } from "@/lib/content/pages";
import CtaBand from "../_components/CtaBand";
import Reveal from "../_components/Reveal";
import {
  CONTAINER,
  EYEBROW_ACCENT,
  SCROLL_OFFSET,
  SECTION_HEADING,
} from "../_components/styles";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Our measured, step-by-step approach to brain wellness: qEEG brain mapping, a personalized protocol, PBM and neurofeedback training, and objective re-measurement.",
};

export default function HowItWorksPage() {
  return (
    <>
      <section>
        <div className={`${CONTAINER} pb-20 pt-12 lg:pb-28 lg:pt-16`}>
          <Reveal>
            <p className={EYEBROW_ACCENT}>The Method</p>
            <h1 className="v1-display mt-5 max-w-[14ch] text-balance text-[clamp(2.75rem,6.5vw,6rem)] leading-[1.0] tracking-[-0.02em]">
              {HOW_IT_WORKS.headline}
            </h1>
            {HOW_IT_WORKS.subhead && (
              <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-brand-navy/75">
                {HOW_IT_WORKS.subhead}
              </p>
            )}
          </Reveal>
        </div>
      </section>

      {/* The four steps — anchor target for the "Services" quick link */}
      <section id="services" className={SCROLL_OFFSET}>
        <div className={`${CONTAINER} pb-24 lg:pb-32`}>
          <ol>
            {HOW_IT_WORKS.steps.map((step, index) => (
              <li
                key={step.title}
                className="grid gap-x-20 gap-y-8 border-t border-brand-navy/10 py-12 lg:grid-cols-12 lg:py-16"
              >
                <Reveal className="lg:col-span-5">
                  <div className="flex items-start gap-6">
                    <span className="v1-display pt-1 text-lg text-brand-ultraviolet tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="v1-display max-w-[18ch] text-balance text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.2] tracking-[-0.01em]">
                      {step.title}
                    </h2>
                  </div>
                </Reveal>
                <Reveal className="lg:col-span-6 lg:col-start-7">
                  <div className="max-w-[65ch] space-y-5 leading-[1.8] text-brand-navy/80">
                    {step.body.map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex}>{paragraph}</p>
                    ))}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why Neurofeedback — silver band, anchor target for the quick link */}
      <section
        id="why-neurofeedback"
        className={`${SCROLL_OFFSET} bg-brand-silver`}
      >
        <div
          className={`${CONTAINER} grid gap-x-20 gap-y-12 py-24 lg:grid-cols-12 lg:py-36`}
        >
          <div className="lg:col-span-4">
            <Reveal>
              <p className={EYEBROW_ACCENT}>The Principle</p>
              <h2 className={SECTION_HEADING}>{HOW_IT_WORKS.why.heading}</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <div className="max-w-[62ch] space-y-6 leading-[1.8] text-brand-navy/80">
                <p className="v1-display text-xl leading-[1.45] text-brand-navy md:text-2xl">
                  {HOW_IT_WORKS.why.body[0]}
                </p>
                {HOW_IT_WORKS.why.body.slice(1).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
