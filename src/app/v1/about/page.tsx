import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import { ABOUT } from "@/lib/content/pages";
import CtaBand from "../_components/CtaBand";
import Reveal from "../_components/Reveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Brain Thrive Wellness is a measurement-first brain wellness practice in Choctaw, Oklahoma — qEEG brain mapping, photobiomodulation, and neurofeedback.",
};

const hasTeamPhoto = existsSync(
  join(process.cwd(), "public", "images", "team.jpg")
);

export default function AboutPage() {
  return (
    <>
      <section>
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-12 md:px-10 lg:pb-28 lg:pt-16">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#5362EF]">
              About Us
            </p>
            <h1 className="v1-display mt-5 max-w-[16ch] text-balance text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.0] tracking-[-0.02em]">
              {ABOUT.headline}
            </h1>
            {ABOUT.subhead && (
              <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-[#002554]/75">
                {ABOUT.subhead}
              </p>
            )}
          </Reveal>
        </div>
      </section>

      {hasTeamPhoto && (
        <section>
          <div className="mx-auto max-w-7xl px-6 pb-20 md:px-10 lg:pb-28">
            <Reveal>
              <div className="relative aspect-[16/7] overflow-hidden">
                <Image
                  src="/images/team.jpg"
                  alt="The Brain Thrive Wellness team at the clinic in Choctaw, Oklahoma"
                  fill
                  priority
                  sizes="(min-width: 1280px) 1280px, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section>
        <div className="mx-auto max-w-7xl px-6 pb-24 md:px-10 lg:pb-32">
          {ABOUT.sections.map((section, index) => (
            <div
              key={section.heading}
              className="grid gap-x-20 gap-y-8 border-t border-[#002554]/10 py-12 lg:grid-cols-12 lg:py-16"
            >
              <Reveal className="lg:col-span-4">
                <div className="flex items-start gap-6">
                  <span className="v1-display pt-1 text-lg text-[#5362EF] tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="v1-display text-balance text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.2] tracking-[-0.01em]">
                    {section.heading}
                  </h2>
                </div>
              </Reveal>
              <Reveal className="lg:col-span-7 lg:col-start-6">
                <div className="max-w-[65ch] space-y-5 leading-[1.8] text-[#002554]/80">
                  {section.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
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
