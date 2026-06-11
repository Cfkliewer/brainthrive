import { TEAM_PHOTO, TEAM_PHOTO_ALT } from "@/lib/content/assets";
import { CONDITIONS } from "@/lib/content/conditions";
import { FAQ, HOW_IT_WORKS } from "@/lib/content/pages";
import { SITE } from "@/lib/content/site";
import ConditionCarousel from "./_components/ConditionCarousel";
import CtaBand from "./_components/CtaBand";
import Faq from "./_components/Faq";
import HeroParallax from "./_components/HeroParallax";
import Marquee from "./_components/Marquee";
import PinnedSteps from "./_components/PinnedSteps";
import Reveal from "./_components/Reveal";
import SectionHeader from "./_components/SectionHeader";
import StatBand from "./_components/StatBand";
import { ARROW_LINK, CARD, CONTAINER, EYEBROW } from "./_components/styles";

// Metadata (default title + description) comes from ./layout.tsx.

const MARQUEE_ITEMS = CONDITIONS.map((condition) => ({
  label: condition.navLabel,
  href: `/who-we-help/${condition.slug}`,
}));

const TRUST_POINTS = [
  {
    title: "Drug-free by design",
    body: "Photobiomodulation and traditional neurofeedback involve no medications — gentle light and real-time feedback, nothing more.",
  },
  {
    title: "Non-invasive, no downtime",
    body: "Sensors only read your brain's activity, and PBM applies light to the skin. You can return to your day immediately after a session.",
  },
  {
    title: "Measured, never assumed",
    body: "Every protocol starts and ends with objective assessment — qEEG brain mapping and Brain Gauge metrics — so progress shows up in data.",
  },
] as const;

export default function V2HomePage() {
  return (
    <>
      <HeroParallax teamPhoto={TEAM_PHOTO} teamPhotoAlt={TEAM_PHOTO_ALT} />

      <Marquee items={MARQUEE_ITEMS} />

      <StatBand />

      <ConditionCarousel />

      <PinnedSteps />

      {/* Trust band */}
      <section className="bg-white">
        <div className={`${CONTAINER} py-20 lg:py-28`}>
          <Reveal>
            <SectionHeader
              index="04"
              eyebrow="Grounded Care"
              heading="Honest support, inside a neurology clinic."
              tone="light"
            />
          </Reveal>
          <Reveal
            stagger={0.06}
            className="mt-12 grid gap-6 md:grid-cols-3 lg:mt-16"
          >
            {TRUST_POINTS.map((point) => (
              <div
                key={point.title}
                className="rounded-2xl border border-medical-gray-200 bg-medical-gray-50 p-7"
              >
                <h3 className="text-lg font-semibold tracking-tight text-brand-navy">
                  {point.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-medical-gray-600">
                  {point.body}
                </p>
              </div>
            ))}
          </Reveal>
          <Reveal className="mt-12 grid gap-10 rounded-2xl border border-medical-gray-200 p-8 md:p-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className={`${EYEBROW} text-medical-gray-500`}>
                The principle behind it all
              </p>
              <p className="mt-4 text-balance text-xl font-semibold leading-snug tracking-tight text-brand-navy md:text-2xl">
                &ldquo;{HOW_IT_WORKS.why.body[0]}&rdquo;
              </p>
              <a
                href="/how-it-works#why-neurofeedback"
                className={`mt-6 inline-flex ${ARROW_LINK}`}
              >
                Why neurofeedback <span aria-hidden>&rarr;</span>
              </a>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm leading-relaxed text-medical-gray-600">
                {SITE.address.note} Visit us at {SITE.address.street},{" "}
                {SITE.address.cityStateZip}.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-medical-gray-500">
                {SITE.disclaimer}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-medical-gray-50">
        <div
          className={`${CONTAINER} grid gap-x-16 gap-y-12 py-20 lg:grid-cols-12 lg:py-28`}
        >
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeader
                index="05"
                eyebrow="FAQ"
                heading="Common questions, plain answers."
                tone="light"
              />
              <div className={`mt-10 p-7 ${CARD}`}>
                <p className="text-sm leading-relaxed text-medical-gray-600">
                  Don&rsquo;t see your question? Call{" "}
                  <a
                    href={SITE.phone.href}
                    className="font-semibold text-brand-purple"
                  >
                    {SITE.phone.display}
                  </a>{" "}
                  or write to us — we&rsquo;re happy to talk it through.
                </p>
                <a
                  href={`mailto:${SITE.email}`}
                  className={`mt-4 inline-flex ${ARROW_LINK}`}
                >
                  Ask us directly <span aria-hidden>&rarr;</span>
                </a>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <Faq entries={FAQ} />
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
