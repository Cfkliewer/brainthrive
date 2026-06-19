import type { Metadata } from "next";
import { NEWSLETTERS } from "@/lib/content/pages";
import { SITE } from "@/lib/content/site";
import CtaBand from "../_components/CtaBand";
import Reveal from "../_components/Reveal";
import {
  ARROW_LINK,
  CARD,
  CONTAINER,
  EYEBROW,
  EYEBROW_ON_LIGHT,
} from "../_components/styles";

export const metadata: Metadata = {
  title: "Newsletters",
  description:
    "Plain-language explainers on the science of brain wellness, practical brain-health tips, and news from the Brain Thrive Wellness clinic.",
};

export default function NewslettersPage() {
  return (
    <>
      <section className="bg-white">
        <div className={`${CONTAINER} pb-14 pt-14 lg:pb-20 lg:pt-20`}>
          <Reveal>
            <p className={EYEBROW_ON_LIGHT}>From the Clinic</p>
            <h1 className="mt-5 text-balance text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.025em] text-brand-navy">
              Newsletters
            </h1>
            <p className="mt-7 max-w-[58ch] text-lg leading-relaxed text-medical-gray-600">
              {NEWSLETTERS.intro}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-medical-gray-50">
        <div className={`${CONTAINER} py-20 lg:py-24`}>
          <Reveal stagger={0.06} className="grid gap-6 md:grid-cols-3">
            {NEWSLETTERS.entries.map((entry, index) => (
              <article key={entry.title} className={`flex flex-col p-8 ${CARD}`}>
                <div className="flex items-baseline justify-between gap-4">
                  <span
                    aria-hidden
                    className="v2-display text-5xl leading-none text-medical-gray-200"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={`${EYEBROW} text-medical-gray-500`}>
                    {entry.date}
                  </span>
                </div>
                <h2 className="mt-5 text-balance text-xl font-semibold leading-snug tracking-tight text-brand-navy">
                  {entry.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-medical-gray-600">
                  {entry.summary}
                </p>
              </article>
            ))}
          </Reveal>

          <Reveal className="mt-12 rounded-2xl border border-medical-gray-200 bg-white p-8 md:p-10">
            <p className={EYEBROW_ON_LIGHT}>Join the list</p>
            <p className="mt-4 max-w-[30ch] text-balance text-2xl font-semibold leading-snug tracking-tight text-brand-navy md:text-3xl">
              One email at a time, written to be understood.
            </p>
            <a
              href={`mailto:${SITE.email}?subject=Newsletter%20signup`}
              className={`mt-6 inline-flex ${ARROW_LINK}`}
            >
              Email {SITE.email} <span aria-hidden>&rarr;</span>
            </a>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
