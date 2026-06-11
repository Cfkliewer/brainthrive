import type { Metadata } from "next";
import Image from "next/image";
import { TEAM_PHOTO, TEAM_PHOTO_ALT } from "@/lib/content/assets";
import { ABOUT } from "@/lib/content/pages";
import CtaBand from "../_components/CtaBand";
import Reveal from "../_components/Reveal";
import { CONTAINER, EYEBROW_ON_LIGHT } from "../_components/styles";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Brain Thrive Wellness is a measurement-first brain wellness practice in Choctaw, Oklahoma — qEEG brain mapping, photobiomodulation, and neurofeedback.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-white">
        <div className={`${CONTAINER} pb-14 pt-14 lg:pb-20 lg:pt-20`}>
          <Reveal>
            <p className={EYEBROW_ON_LIGHT}>About Us</p>
            <h1 className="mt-5 max-w-[18ch] text-balance text-[clamp(2.6rem,5.6vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.025em] text-brand-navy">
              {ABOUT.headline}
            </h1>
            {ABOUT.subhead && (
              <p className="mt-7 max-w-[54ch] text-lg leading-relaxed text-medical-gray-600">
                {ABOUT.subhead}
              </p>
            )}
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className={`${CONTAINER} pb-16 lg:pb-24`}>
          <Reveal>
            {TEAM_PHOTO ? (
              <div className="relative aspect-[16/7] overflow-hidden rounded-3xl">
                <Image
                  src={TEAM_PHOTO}
                  alt={TEAM_PHOTO_ALT}
                  fill
                  priority
                  sizes="(min-width: 1280px) 1280px, 100vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <div
                aria-hidden="true"
                className="v2-grid-pattern aspect-[16/7] rounded-3xl bg-brand-navy"
              />
            )}
          </Reveal>
        </div>
      </section>

      <section className="bg-medical-gray-50">
        <div className={`${CONTAINER} py-20 lg:py-24`}>
          <div className="grid gap-6 lg:grid-cols-3">
            {ABOUT.sections.map((section, index) => (
              <Reveal
                key={section.heading}
                delay={index * 0.08}
                className="v2-card-shadow rounded-2xl bg-white p-8 md:p-9"
              >
                <span
                  aria-hidden
                  className="v2-display block text-6xl leading-none text-medical-gray-200"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-5 text-xl font-semibold tracking-tight text-brand-navy md:text-2xl">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-medical-gray-700">
                  {section.body.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
