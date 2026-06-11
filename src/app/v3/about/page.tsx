import type { Metadata } from "next";
import Image from "next/image";
import { TEAM_PHOTO, TEAM_PHOTO_ALT } from "@/lib/content/assets";
import { ABOUT } from "@/lib/content/pages";
import Reveal from "../_components/Reveal";
import SplitHeading from "../_components/SplitHeading";
import {
  BODY,
  CONTAINER,
  EYEBROW,
  GLASS_PANEL,
  GRADIENT_TEXT,
} from "../_components/styles";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Brain Thrive Wellness brings measurement-first, drug-free brain wellness — qEEG mapping, photobiomodulation, and neurofeedback — to Choctaw, Oklahoma.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(55rem 32rem at 75% 0%, rgba(53,243,230,0.12), transparent 60%), radial-gradient(45rem 30rem at 10% 80%, rgba(83,98,239,0.16), transparent 60%)",
          }}
        />
        <div className={`${CONTAINER} relative pb-16 pt-36 md:pt-44`}>
          <p className={EYEBROW}>The Clinic</p>
          <SplitHeading
            as="h1"
            className="v3-display mt-5 max-w-4xl text-balance text-[clamp(3rem,8vw,7.5rem)] leading-[0.92] text-white"
          >
            {ABOUT.headline}
          </SplitHeading>
          {ABOUT.subhead && (
            <p
              className={`v3-display mt-7 max-w-2xl text-2xl leading-[1.1] md:text-3xl ${GRADIENT_TEXT}`}
            >
              {ABOUT.subhead}
            </p>
          )}
        </div>
      </section>

      <section aria-label="About the practice" className={`${CONTAINER} pb-24`}>
        {TEAM_PHOTO && (
          <Reveal className="mb-14">
            <Image
              src={TEAM_PHOTO}
              alt={TEAM_PHOTO_ALT}
              width={1600}
              height={900}
              className="w-full rounded-2xl border border-white/10 object-cover"
            />
          </Reveal>
        )}
        <div className="space-y-8">
          {ABOUT.sections.map((section) => (
            <Reveal key={section.heading}>
              <div className={`${GLASS_PANEL} p-8 md:p-10`}>
                <h2 className="v3-display text-3xl leading-none text-white md:text-4xl">
                  {section.heading}
                  <span className="text-brand-teal">.</span>
                </h2>
                <div className="mt-5 max-w-3xl space-y-4">
                  {section.body.map((paragraph, index) => (
                    <p key={index} className={BODY}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
