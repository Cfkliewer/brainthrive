import type { Metadata } from "next";
import { HOW_IT_WORKS } from "@/lib/content/pages";
import Reveal from "../_components/Reveal";
import SplitHeading from "../_components/SplitHeading";
import TimelineHowItWorks from "../_components/TimelineHowItWorks";
import {
  BODY,
  CONTAINER,
  EYEBROW,
  GLASS_PANEL,
  SCROLL_OFFSET,
} from "../_components/styles";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Our measured approach to brain wellness: qEEG brain mapping, a personalized protocol, photobiomodulation + neurofeedback training, and objective re-measurement.",
};

export default function HowItWorksPage() {
  return (
    <>
      {/* The timeline is the page: services anchor + the four steps,
          spine drawn by scroll. */}
      <section id="services" className={`${SCROLL_OFFSET} relative pt-16`}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[40rem]"
          style={{
            background:
              "radial-gradient(50rem 30rem at 75% 10%, rgba(83,98,239,0.16), transparent 60%), radial-gradient(40rem 26rem at 15% 30%, rgba(53,243,230,0.1), transparent 60%)",
          }}
        />
        <TimelineHowItWorks detail="full" headingLevel="h1" />
      </section>

      {/* Why Neurofeedback */}
      <section
        id="why-neurofeedback"
        className={`${SCROLL_OFFSET} border-t border-white/10 bg-brand-navy/30`}
      >
        <div className={`${CONTAINER} py-24 md:py-32`}>
          <Reveal>
            <p className={EYEBROW}>The Science</p>
          </Reveal>
          <SplitHeading className="v3-display mt-5 max-w-3xl text-balance text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95] text-white">
            {HOW_IT_WORKS.why.heading}
          </SplitHeading>
          <Reveal stagger={0.12} className="mt-12 max-w-3xl space-y-6">
            {HOW_IT_WORKS.why.body.map((paragraph, index) => (
              <div key={index} className={`${GLASS_PANEL} p-7 md:p-8`}>
                <p className={BODY}>{paragraph}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
