import type { Metadata } from "next";
import CtaBand from "../_components/CtaBand";
import Reveal from "../_components/Reveal";
import SectionHeader from "../_components/SectionHeader";
import { HOW_IT_WORKS } from "@/lib/content/pages";
import {
  CONTAINER,
  DARK_BAND,
  EYEBROW_ON_LIGHT,
  SCROLL_OFFSET,
} from "../_components/styles";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Our measured, step-by-step approach to brain wellness: qEEG brain mapping, a personalized protocol, PBM and neurofeedback training, and objective re-measurement.",
};

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white">
        <div className={`${CONTAINER} pb-14 pt-14 lg:pb-20 lg:pt-20`}>
          <Reveal>
            <p className={EYEBROW_ON_LIGHT}>The Method</p>
            <h1 className="mt-5 max-w-[16ch] text-balance text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.025em] text-brand-navy">
              {HOW_IT_WORKS.headline}
            </h1>
            {HOW_IT_WORKS.subhead && (
              <p className="mt-7 max-w-[54ch] text-lg leading-relaxed text-medical-gray-600">
                {HOW_IT_WORKS.subhead}
              </p>
            )}
          </Reveal>
        </div>
      </section>

      {/* The four steps — anchor target for the "Services" quick link */}
      <section
        id="services"
        className={`${SCROLL_OFFSET} bg-medical-gray-50`}
      >
        <div className={`${CONTAINER} py-20 lg:py-24`}>
          <Reveal>
            <SectionHeader
              index="01"
              eyebrow="The Services"
              heading="Four steps, in order, every time."
              tone="light"
            />
          </Reveal>
          <ol className="mt-12 space-y-6 lg:mt-16 lg:space-y-8">
            {HOW_IT_WORKS.steps.map((step, index) => (
              <li key={step.title}>
                <Reveal className="v2-card-shadow grid gap-x-16 gap-y-6 rounded-2xl bg-white p-8 md:p-10 lg:grid-cols-12">
                  <div className="lg:col-span-5">
                    <span
                      aria-hidden
                      className="v2-display block text-6xl leading-none text-medical-gray-200 md:text-7xl"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mt-5 max-w-[20ch] text-balance text-xl font-semibold leading-snug tracking-tight text-brand-navy md:text-2xl">
                      {step.title}
                    </h2>
                    <p className="mt-3 text-sm font-medium uppercase tracking-[0.08em] text-brand-purple">
                      {step.excerpt}
                    </p>
                  </div>
                  <div className="space-y-5 leading-relaxed text-medical-gray-700 lg:col-span-7">
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

      {/* Why Neurofeedback — navy band, anchor target for the quick link */}
      <section
        id="why-neurofeedback"
        className={`${SCROLL_OFFSET} relative overflow-hidden ${DARK_BAND}`}
      >
        <div aria-hidden className="v2-grid-pattern absolute inset-0" />
        <div
          aria-hidden
          className="absolute -top-40 left-[-8%] h-96 w-96 rounded-full bg-brand-ultraviolet/20 blur-3xl"
        />
        <div
          className={`${CONTAINER} relative grid gap-x-16 gap-y-12 py-20 lg:grid-cols-12 lg:py-28`}
        >
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeader
                index="02"
                eyebrow="The Principle"
                heading={HOW_IT_WORKS.why.heading}
                tone="dark"
              />
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal stagger={0.06}>
              <p className="text-balance text-xl font-semibold leading-snug tracking-tight text-white md:text-2xl">
                {HOW_IT_WORKS.why.body[0]}
              </p>
              {HOW_IT_WORKS.why.body.slice(1).map((paragraph, index) => (
                <p
                  key={index}
                  className="mt-6 leading-relaxed text-white/75"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
