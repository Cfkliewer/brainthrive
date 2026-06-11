import type { Metadata } from "next";
import { HOW_IT_WORKS } from "@/lib/content/pages";
import CtaBand from "../_components/CtaBand";
import Reveal from "../_components/Reveal";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Our measured, step-by-step approach to brain wellness: qEEG brain mapping, a personalized protocol, PBM and neurofeedback training, and objective re-measurement.",
};

const STEPS = HOW_IT_WORKS.sections.slice(0, 4).map((section) => ({
  ...section,
  title: section.heading.replace(/^Step \d+:\s*/, ""),
}));

const WHY = HOW_IT_WORKS.sections[4];

export default function HowItWorksPage() {
  return (
    <>
      <section>
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-12 md:px-10 lg:pb-28 lg:pt-16">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#5362EF]">
              The Method
            </p>
            <h1 className="v1-display mt-5 max-w-[14ch] text-balance text-[clamp(2.75rem,6.5vw,6rem)] leading-[1.0] tracking-[-0.02em]">
              {HOW_IT_WORKS.headline}
            </h1>
            {HOW_IT_WORKS.subhead && (
              <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-[#002554]/75">
                {HOW_IT_WORKS.subhead}
              </p>
            )}
          </Reveal>
        </div>
      </section>

      {/* The four steps — anchor target for the "Services" quick link */}
      <section id="services" className="scroll-mt-28">
        <div className="mx-auto max-w-7xl px-6 pb-24 md:px-10 lg:pb-32">
          <ol>
            {STEPS.map((step, index) => (
              <li
                key={step.heading}
                className="grid gap-x-20 gap-y-8 border-t border-[#002554]/10 py-12 lg:grid-cols-12 lg:py-16"
              >
                <Reveal className="lg:col-span-5">
                  <div className="flex items-start gap-6">
                    <span className="v1-display pt-1 text-lg text-[#5362EF] tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="v1-display max-w-[18ch] text-balance text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.2] tracking-[-0.01em]">
                      {step.title}
                    </h2>
                  </div>
                </Reveal>
                <Reveal className="lg:col-span-6 lg:col-start-7">
                  <div className="max-w-[65ch] space-y-5 leading-[1.8] text-[#002554]/80">
                    {step.body.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)}>{paragraph}</p>
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
        className="scroll-mt-28 bg-[#F2F2F2]"
      >
        <div className="mx-auto grid max-w-7xl gap-x-20 gap-y-12 px-6 py-24 md:px-10 lg:grid-cols-12 lg:py-36">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#5362EF]">
                The Principle
              </p>
              <h2 className="v1-display mt-5 text-balance text-[clamp(2rem,3.5vw,3.25rem)] leading-[1.08] tracking-[-0.015em]">
                {WHY.heading}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <div className="max-w-[62ch] space-y-6 leading-[1.8] text-[#002554]/80">
                <p className="v1-display text-xl leading-[1.45] text-[#002554] md:text-2xl">
                  {WHY.body[0]}
                </p>
                {WHY.body.slice(1).map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
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
