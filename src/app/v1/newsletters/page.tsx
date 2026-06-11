import type { Metadata } from "next";
import { NEWSLETTERS } from "@/lib/content/pages";
import { SITE } from "@/lib/content/site";
import CtaBand from "../_components/CtaBand";
import EditorialList from "../_components/EditorialList";
import Reveal from "../_components/Reveal";

export const metadata: Metadata = {
  title: "Newsletters",
  description:
    "Plain-language explainers on the science of brain wellness, practical brain-health tips, and news from the Brain Thrive Wellness clinic.",
};

export default function NewslettersPage() {
  return (
    <>
      <section>
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-12 md:px-10 lg:pb-28 lg:pt-16">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#5362EF]">
              From the Clinic
            </p>
            <h1 className="v1-display mt-5 text-balance text-[clamp(2.75rem,6.5vw,6rem)] leading-[1.0] tracking-[-0.02em]">
              Newsletters
            </h1>
            <p className="mt-8 max-w-[58ch] text-lg leading-relaxed text-[#002554]/75">
              {NEWSLETTERS.intro}
            </p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 pb-24 md:px-10 lg:pb-32">
          <Reveal>
            <EditorialList
              items={NEWSLETTERS.entries.map((entry, index) => ({
                number: String(index + 1).padStart(2, "0"),
                title: entry.title,
                meta: entry.date,
                description: entry.summary,
              }))}
            />
          </Reveal>

          <Reveal className="mt-16 lg:mt-20">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#5362EF]">
              Join the list
            </p>
            <p className="v1-display mt-5 max-w-[26ch] text-balance text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.15] tracking-[-0.01em]">
              One email at a time, written to be understood.
            </p>
            <a
              href={`mailto:${SITE.email}?subject=Newsletter%20signup`}
              className="mt-8 inline-block text-lg font-medium text-[#5362EF] underline decoration-[#5362EF]/30 decoration-2 underline-offset-[8px] transition-colors hover:decoration-[#5362EF]"
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
