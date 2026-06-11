import type { Metadata } from "next";
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
  title: "Contact & Scheduling",
  description: `Schedule a consultation with ${SITE.name} in Choctaw, Oklahoma. Call ${SITE.phone.display} or email ${SITE.email} to get started.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-white">
        <div className={`${CONTAINER} pb-14 pt-14 lg:pb-20 lg:pt-20`}>
          <Reveal>
            <p className={EYEBROW_ON_LIGHT}>Contact</p>
            <h1 className="mt-5 max-w-[14ch] text-balance text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.025em] text-brand-navy">
              Schedule a consultation.
            </h1>
            <p className="mt-7 max-w-[52ch] text-lg leading-relaxed text-medical-gray-600">
              Scheduling starts with a conversation. Call or email and
              we&rsquo;ll answer your questions, learn about your goals, and
              set up your initial brain assessment — there&rsquo;s no
              obligation.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-medical-gray-50">
        <div className={`${CONTAINER} py-20 lg:py-24`}>
          <Reveal stagger={0.06} className="grid gap-6 lg:grid-cols-2">
            {/* Call */}
            <div className={`p-8 md:p-10 ${CARD}`}>
              <h2 className={`${EYEBROW} text-medical-gray-500`}>Call us</h2>
              <a
                href={SITE.phone.href}
                className="v2-display mt-5 inline-block text-[clamp(3rem,6vw,4.5rem)] leading-none text-brand-navy transition-colors hover:text-brand-purple"
              >
                {SITE.phone.display}
              </a>
              <p className="mt-4 max-w-[44ch] text-sm leading-relaxed text-medical-gray-600">
                The fastest way to schedule — we&rsquo;re happy to explain
                whether our approach is a good fit for you.
              </p>
            </div>

            {/* Email */}
            <div className={`p-8 md:p-10 ${CARD}`}>
              <h2 className={`${EYEBROW} text-medical-gray-500`}>Email us</h2>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-5 inline-block break-all text-2xl font-semibold tracking-tight text-brand-navy transition-colors hover:text-brand-purple md:text-3xl"
              >
                {SITE.email}
              </a>
              <p className="mt-4 max-w-[44ch] text-sm leading-relaxed text-medical-gray-600">
                Tell us a little about what brings you in, and we&rsquo;ll
                reply with next steps.
              </p>
            </div>
          </Reveal>

          {/* Visit */}
          <Reveal className="mt-6">
            <div className={`grid gap-x-16 gap-y-8 p-8 md:p-10 lg:grid-cols-12 ${CARD}`}>
              <div className="lg:col-span-5">
                <h2 className={`${EYEBROW} text-medical-gray-500`}>
                  Visit the clinic
                </h2>
                <p className="mt-5 text-2xl font-semibold leading-snug tracking-tight text-brand-navy md:text-3xl">
                  {SITE.address.street}
                  <br />
                  {SITE.address.cityStateZip}
                </p>
              </div>
              <div className="lg:col-span-7 lg:self-center">
                <p className="max-w-[52ch] leading-relaxed text-medical-gray-700">
                  {SITE.address.note}
                </p>
                <a
                  href={SITE.address.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-5 inline-flex ${ARROW_LINK}`}
                >
                  Open in Google Maps <span aria-hidden>&rarr;</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand heading="Prefer to talk it through first?" />
    </>
  );
}
