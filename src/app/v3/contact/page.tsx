import type { Metadata } from "next";
import { SITE } from "@/lib/content/site";
import Reveal from "../_components/Reveal";
import SplitHeading from "../_components/SplitHeading";
import {
  ARROW_LINK,
  BODY,
  BTN_GLOW,
  CONTAINER,
  EYEBROW,
  GLASS_PANEL,
} from "../_components/styles";

export const metadata: Metadata = {
  title: "Contact",
  description: `Schedule a consultation with ${SITE.name}: call ${SITE.phone.display}, email ${SITE.email}, or visit us in ${SITE.address.cityStateZip}.`,
};

const SOCIALS = [
  { label: "Instagram", href: SITE.socials.instagram },
  { label: "Facebook", href: SITE.socials.facebook },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(55rem 34rem at 70% 10%, rgba(53,243,230,0.13), transparent 60%), radial-gradient(45rem 28rem at 15% 90%, rgba(83,98,239,0.17), transparent 60%)",
          }}
        />
        <div className={`${CONTAINER} relative pb-16 pt-36 md:pt-44`}>
          <p className={EYEBROW}>Contact</p>
          <SplitHeading
            as="h1"
            className="v3-display mt-5 max-w-4xl text-balance text-[clamp(3rem,8vw,7.5rem)] leading-[0.92] text-white"
          >
            Let&rsquo;s talk about your brain
            <span className="text-brand-teal">.</span>
          </SplitHeading>
          <p className={`${BODY} mt-7 max-w-xl`}>
            Schedule a consultation — no obligation. We&rsquo;ll answer your
            questions, learn about your goals, and set up your initial brain
            assessment.
          </p>
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a href={SITE.phone.href} className={BTN_GLOW}>
              Call {SITE.phone.display}
            </a>
            <a href={`mailto:${SITE.email}`} className={ARROW_LINK}>
              {SITE.email} <span aria-hidden>&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      <section aria-label="Visit and contact details" className={`${CONTAINER} pb-24`}>
        <Reveal stagger={0.1} className="grid gap-6 md:grid-cols-3">
          <div className={`${GLASS_PANEL} p-7`}>
            <p className={EYEBROW}>Call or text</p>
            <a
              href={SITE.phone.href}
              className="v3-display mt-3 block text-3xl text-white transition-colors hover:text-brand-teal"
            >
              {SITE.phone.display}
            </a>
            <p className="mt-3 text-[15px] leading-relaxed text-white/65">
              The fastest way to schedule your consultation.
            </p>
          </div>
          <div className={`${GLASS_PANEL} p-7`}>
            <p className={EYEBROW}>Email</p>
            <a
              href={`mailto:${SITE.email}`}
              className="v3-display mt-3 block break-all text-2xl text-white transition-colors hover:text-brand-teal"
            >
              {SITE.email}
            </a>
            <p className="mt-3 text-[15px] leading-relaxed text-white/65">
              Questions, records, or newsletter sign-ups — we read everything.
            </p>
          </div>
          <div className={`${GLASS_PANEL} p-7`}>
            <p className={EYEBROW}>Visit</p>
            <a
              href={SITE.address.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="v3-display mt-3 block text-2xl leading-[1.1] text-white transition-colors hover:text-brand-teal"
            >
              {SITE.address.street}
              <br />
              {SITE.address.cityStateZip}
            </a>
            <p className="mt-3 text-[15px] leading-relaxed text-white/65">
              {SITE.address.note}
            </p>
            <a
              href={SITE.address.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`${ARROW_LINK} mt-4`}
            >
              Open in Google Maps <span aria-hidden>&rarr;</span>
            </a>
          </div>
        </Reveal>

        <Reveal className="mt-10">
          <div className={`${GLASS_PANEL} flex flex-wrap items-center justify-between gap-6 p-7`}>
            <p className={EYEBROW}>Follow along</p>
            <div className="flex gap-6">
              {SOCIALS.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm uppercase tracking-[0.18em] text-white/75 transition-colors hover:text-brand-teal"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
