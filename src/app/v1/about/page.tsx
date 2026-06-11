import type { Metadata } from "next";
import Image from "next/image";
import { TEAM_PHOTO, TEAM_PHOTO_ALT } from "@/lib/content/assets";
import { ABOUT } from "@/lib/content/pages";
import CtaBand from "../_components/CtaBand";
import Reveal from "../_components/Reveal";
import { CONTAINER, EYEBROW_ACCENT } from "../_components/styles";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Brain Thrive Wellness is a measurement-first brain wellness practice in Choctaw, Oklahoma — qEEG brain mapping, photobiomodulation, and neurofeedback.",
};

export default function AboutPage() {
  return (
    <>
      <section>
        <div className={`${CONTAINER} pb-20 pt-12 lg:pb-28 lg:pt-16`}>
          <Reveal>
            <p className={EYEBROW_ACCENT}>About Us</p>
            <h1 className="v1-display mt-5 max-w-[16ch] text-balance text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.0] tracking-[-0.02em]">
              {ABOUT.headline}
            </h1>
            {ABOUT.subhead && (
              <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-brand-navy/75">
                {ABOUT.subhead}
              </p>
            )}
          </Reveal>
        </div>
      </section>

      <section>
        <div className={`${CONTAINER} pb-20 lg:pb-28`}>
          <Reveal>
            {TEAM_PHOTO ? (
              <div className="relative aspect-[16/7] overflow-hidden">
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
              <div aria-hidden="true" className="aspect-[16/7] bg-brand-silver" />
            )}
          </Reveal>
        </div>
      </section>

      <section>
        <div className={`${CONTAINER} pb-24 lg:pb-32`}>
          {ABOUT.sections.map((section, index) => (
            <div
              key={section.heading}
              className="grid gap-x-20 gap-y-8 border-t border-brand-navy/10 py-12 lg:grid-cols-12 lg:py-16"
            >
              <Reveal className="lg:col-span-4">
                <div className="flex items-start gap-6">
                  <span className="v1-display pt-1 text-lg text-brand-ultraviolet tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="v1-display text-balance text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.2] tracking-[-0.01em]">
                    {section.heading}
                  </h2>
                </div>
              </Reveal>
              <Reveal className="lg:col-span-7 lg:col-start-6">
                <div className="max-w-[65ch] space-y-5 leading-[1.8] text-brand-navy/80">
                  {section.body.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
