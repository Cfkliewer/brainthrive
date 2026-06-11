import type { Metadata } from "next";
import { SITE } from "@/lib/content/site";
import CtaBand from "../_components/CtaBand";
import Reveal from "../_components/Reveal";

export const metadata: Metadata = {
  title: "Contact & Scheduling",
  description: `Schedule a consultation with ${SITE.name} in Choctaw, Oklahoma. Call ${SITE.phone.display} or email ${SITE.email} to get started.`,
};

const EYEBROW = "text-[11px] uppercase tracking-[0.22em] text-[#002554]/70";

export default function ContactPage() {
  return (
    <>
      <section>
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-12 md:px-10 lg:pb-28 lg:pt-16">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#5362EF]">
              Contact
            </p>
            <h1 className="v1-display mt-5 max-w-[14ch] text-balance text-[clamp(2.75rem,6.5vw,6rem)] leading-[1.0] tracking-[-0.02em]">
              Schedule a consultation.
            </h1>
            <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-[#002554]/75">
              Scheduling starts with a conversation. Call or email and
              we&rsquo;ll answer your questions, learn about your goals, and
              set up your initial brain assessment — there&rsquo;s no
              obligation.
            </p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 pb-24 md:px-10 lg:pb-32">
          {/* Primary scheduling actions */}
          <Reveal>
            <div className="border-t border-[#002554]/10 py-10 lg:py-14">
              <p className={EYEBROW}>Call us</p>
              <a
                href={SITE.phone.href}
                className="v1-display mt-4 inline-block text-[clamp(2rem,5vw,4.25rem)] leading-none tracking-[-0.015em] transition-colors hover:text-[#5362EF]"
              >
                {SITE.phone.display}
              </a>
              <p className="mt-4 max-w-[48ch] text-sm leading-relaxed text-[#002554]/70">
                The fastest way to schedule — we&rsquo;re happy to explain
                whether our approach is a good fit for you.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="border-t border-[#002554]/10 py-10 lg:py-14">
              <p className={EYEBROW}>Email us</p>
              <a
                href={`mailto:${SITE.email}`}
                className="v1-display mt-4 inline-block break-all text-[clamp(1.375rem,3.5vw,3rem)] leading-tight tracking-[-0.01em] transition-colors hover:text-[#5362EF]"
              >
                {SITE.email}
              </a>
              <p className="mt-4 max-w-[48ch] text-sm leading-relaxed text-[#002554]/70">
                Tell us a little about what brings you in, and we&rsquo;ll
                reply with next steps.
              </p>
            </div>
          </Reveal>

          {/* Visit */}
          <Reveal>
            <div className="grid gap-x-20 gap-y-8 border-y border-[#002554]/10 py-10 lg:grid-cols-12 lg:py-14">
              <div className="lg:col-span-4">
                <p className={EYEBROW}>Visit the clinic</p>
                <p className="v1-display mt-4 text-2xl leading-snug tracking-[-0.01em] md:text-3xl">
                  {SITE.address.street}
                  <br />
                  {SITE.address.cityStateZip}
                </p>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <p className="max-w-[52ch] leading-relaxed text-[#002554]/75">
                  {SITE.address.note}
                </p>
                <a
                  href={SITE.address.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block text-sm font-medium text-[#5362EF] underline decoration-[#5362EF]/30 underline-offset-[6px] transition-colors hover:decoration-[#5362EF]"
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
