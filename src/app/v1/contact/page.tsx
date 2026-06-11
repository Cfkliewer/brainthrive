import type { Metadata } from "next";
import { SITE } from "@/lib/content/site";
import CtaBand from "../_components/CtaBand";
import Reveal from "../_components/Reveal";
import {
  ARROW_LINK,
  CONTAINER,
  EYEBROW_ACCENT,
  EYEBROW_MUTED,
} from "../_components/styles";

export const metadata: Metadata = {
  title: "Contact & Scheduling",
  description: `Schedule a consultation with ${SITE.name} in Choctaw, Oklahoma. Call ${SITE.phone.display} or email ${SITE.email} to get started.`,
};

export default function ContactPage() {
  return (
    <>
      <section>
        <div className={`${CONTAINER} pb-20 pt-12 lg:pb-28 lg:pt-16`}>
          <Reveal>
            <p className={EYEBROW_ACCENT}>Contact</p>
            <h1 className="v1-display mt-5 max-w-[14ch] text-balance text-[clamp(2.75rem,6.5vw,6rem)] leading-[1.0] tracking-[-0.02em]">
              Schedule a consultation.
            </h1>
            <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-brand-navy/75">
              Scheduling starts with a conversation. Call or email and
              we&rsquo;ll answer your questions, learn about your goals, and
              set up your initial brain assessment — there&rsquo;s no
              obligation.
            </p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className={`${CONTAINER} pb-24 lg:pb-32`}>
          {/* Primary scheduling actions */}
          <Reveal>
            <div className="border-t border-brand-navy/10 py-10 lg:py-14">
              <h2 className={EYEBROW_MUTED}>Call us</h2>
              <a
                href={SITE.phone.href}
                className="v1-display mt-4 inline-block text-[clamp(2rem,5vw,4.25rem)] leading-none tracking-[-0.015em] transition-colors hover:text-brand-ultraviolet"
              >
                {SITE.phone.display}
              </a>
              <p className="mt-4 max-w-[48ch] text-sm leading-relaxed text-brand-navy/70">
                The fastest way to schedule — we&rsquo;re happy to explain
                whether our approach is a good fit for you.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="border-t border-brand-navy/10 py-10 lg:py-14">
              <h2 className={EYEBROW_MUTED}>Email us</h2>
              <a
                href={`mailto:${SITE.email}`}
                className="v1-display mt-4 inline-block break-all text-[clamp(1.375rem,3.5vw,3rem)] leading-tight tracking-[-0.01em] transition-colors hover:text-brand-ultraviolet"
              >
                {SITE.email}
              </a>
              <p className="mt-4 max-w-[48ch] text-sm leading-relaxed text-brand-navy/70">
                Tell us a little about what brings you in, and we&rsquo;ll
                reply with next steps.
              </p>
            </div>
          </Reveal>

          {/* Visit */}
          <Reveal>
            <div className="grid gap-x-20 gap-y-8 border-y border-brand-navy/10 py-10 lg:grid-cols-12 lg:py-14">
              <div className="lg:col-span-4">
                <h2 className={EYEBROW_MUTED}>Visit the clinic</h2>
                <p className="v1-display mt-4 text-2xl leading-snug tracking-[-0.01em] md:text-3xl">
                  {SITE.address.street}
                  <br />
                  {SITE.address.cityStateZip}
                </p>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <p className="max-w-[52ch] leading-relaxed text-brand-navy/75">
                  {SITE.address.note}
                </p>
                <a
                  href={SITE.address.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 inline-block ${ARROW_LINK}`}
                >
                  Open in Google Maps <span aria-hidden>&rarr;</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
