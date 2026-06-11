import Image from "next/image";
import Link from "next/link";
import { TEAM_PHOTO, TEAM_PHOTO_ALT } from "@/lib/content/assets";
import { CONDITIONS } from "@/lib/content/conditions";
import { ABOUT, FAQ, HOW_IT_WORKS } from "@/lib/content/pages";
import { SITE } from "@/lib/content/site";
import CtaBand from "./_components/CtaBand";
import EditorialList from "./_components/EditorialList";
import Faq from "./_components/Faq";
import HomeHero from "./_components/HomeHero";
import Reveal from "./_components/Reveal";
import {
  ARROW_LINK,
  CONTAINER,
  EYEBROW_ACCENT,
  EYEBROW_MUTED,
  SCROLL_OFFSET,
  SECTION_HEADING,
} from "./_components/styles";

// Metadata (default title + description) comes from ./layout.tsx.

export default function V1HomePage() {
  return (
    <>
      <HomeHero />

      {/* The Practice — silver editorial band */}
      <section className="bg-brand-silver">
        <div
          className={`${CONTAINER} grid gap-x-20 gap-y-12 py-24 lg:grid-cols-12 lg:py-36`}
        >
          <div className="lg:col-span-4">
            <Reveal>
              <p className={EYEBROW_ACCENT}>The Practice</p>
              <h2 className={SECTION_HEADING}>
                Measurement first. Always.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              {TEAM_PHOTO ? (
                <div className="relative mt-10 aspect-[4/5] overflow-hidden">
                  <Image
                    src={TEAM_PHOTO}
                    alt={TEAM_PHOTO_ALT}
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div
                  aria-hidden="true"
                  className="mt-10 aspect-[4/5] bg-[#E4E4E4]"
                />
              )}
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <div className="max-w-[62ch] space-y-6 leading-[1.8] text-brand-navy/80">
                <p className="v1-display text-xl leading-[1.45] text-brand-navy md:text-2xl">
                  {ABOUT.sections[0].body[0]}
                </p>
                <p>{ABOUT.sections[1].body[0]}</p>
                <p>{ABOUT.sections[1].body[1]}</p>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
                <Link href="/v1/about" className={ARROW_LINK}>
                  More about the practice <span aria-hidden>&rarr;</span>
                </Link>
                <Link href="/v1/how-it-works" className={ARROW_LINK}>
                  Our method <span aria-hidden>&rarr;</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How It Works — four numbered editorial steps */}
      <section>
        <div className={`${CONTAINER} py-24 lg:py-36`}>
          <Reveal className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
            <div>
              <p className={EYEBROW_ACCENT}>How It Works</p>
              <h2 className={SECTION_HEADING}>
                Assess. Personalize. Train. Verify.
              </h2>
            </div>
            <Link href="/v1/how-it-works" className={ARROW_LINK}>
              The full method <span aria-hidden>&rarr;</span>
            </Link>
          </Reveal>
          <Reveal variant="rule" className="mt-14 h-px bg-brand-navy/10" />
          <ol className="grid gap-x-12 gap-y-12 pt-10 md:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.steps.map((step, index) => (
              <li key={step.title}>
                <Reveal delay={index * 0.08}>
                  <span className="v1-display text-lg text-brand-ultraviolet tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-balance text-lg font-medium leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-brand-navy/70">
                    {step.excerpt}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Who We Help — full ten-item editorial index */}
      <section
        id="who-we-help"
        className={`${SCROLL_OFFSET} border-t border-brand-navy/10`}
      >
        <div className={`${CONTAINER} py-24 lg:py-36`}>
          <Reveal className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
            <div>
              <p className={EYEBROW_ACCENT}>Who We Help</p>
              <h2 className={`${SECTION_HEADING} max-w-[20ch]`}>
                Ten reasons people walk through our door.
              </h2>
            </div>
            <p className="max-w-[36ch] text-sm leading-relaxed text-brand-navy/70">
              Every protocol begins with objective measurement, so the training
              is tailored to your brain and your goals.
            </p>
          </Reveal>
          <div className="mt-14">
            <EditorialList
              columns={2}
              items={CONDITIONS.map((condition, index) => ({
                number: String(index + 1).padStart(2, "0"),
                title: condition.navLabel,
                kicker: condition.eyebrow,
                href: `/v1/who-we-help/${condition.slug}`,
              }))}
            />
          </div>
        </div>
      </section>

      {/* Silver pull-quote band */}
      <section className="bg-brand-silver">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center md:px-10 lg:py-36">
          <Reveal>
            <div aria-hidden className="mx-auto h-0.5 w-14 bg-brand-dark-teal" />
            <blockquote className="v1-display mt-10 text-balance text-[clamp(2.25rem,5vw,4.5rem)] italic leading-[1.08] tracking-[-0.015em]">
              &ldquo;Your brain is not hard-wired or fixed.&rdquo;
            </blockquote>
            <p className={`mt-10 ${EYEBROW_MUTED}`}>
              The principle behind everything we do —{" "}
              <Link
                href="/v1/how-it-works#why-neurofeedback"
                className="text-brand-ultraviolet transition-colors hover:text-brand-purple"
              >
                why neurofeedback
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div
          className={`${CONTAINER} grid gap-x-20 gap-y-12 py-24 lg:grid-cols-12 lg:py-36`}
        >
          <div className="lg:col-span-4">
            <Reveal>
              <p className={EYEBROW_ACCENT}>FAQ</p>
              <h2 className={SECTION_HEADING}>
                Common questions, plain answers.
              </h2>
              <p className="mt-6 max-w-[34ch] text-sm leading-relaxed text-brand-navy/70">
                Don&rsquo;t see yours? Call {SITE.phone.display} or write to us
                — we&rsquo;re happy to talk it through.
              </p>
              <a href={`mailto:${SITE.email}`} className={`mt-6 inline-block ${ARROW_LINK}`}>
                Ask us directly <span aria-hidden>&rarr;</span>
              </a>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
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
