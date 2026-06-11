import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CONDITIONS } from "@/lib/content/conditions";
import { ABOUT, FAQ, HOW_IT_WORKS } from "@/lib/content/pages";
import { SITE } from "@/lib/content/site";
import CtaBand from "./_components/CtaBand";
import EditorialList from "./_components/EditorialList";
import Faq from "./_components/Faq";
import HomeHero from "./_components/HomeHero";
import Reveal from "./_components/Reveal";

export const metadata: Metadata = {
  title: `${SITE.name} | ${SITE.tagline}`,
  description:
    "Data-driven neurofeedback and photobiomodulation in Choctaw, Oklahoma. Gentle, drug-free brain training grounded in objective measurement.",
};

const EYEBROW = "text-[11px] uppercase tracking-[0.22em] text-[#5362EF]";
const ARROW_LINK =
  "text-sm font-medium text-[#5362EF] underline decoration-[#5362EF]/30 underline-offset-[6px] transition-colors hover:decoration-[#5362EF]";

const hasTeamPhoto = existsSync(
  join(process.cwd(), "public", "images", "team.jpg")
);

function firstSentence(text: string): string {
  const end = text.indexOf(". ");
  return end === -1 ? text : text.slice(0, end + 1);
}

const STEPS = HOW_IT_WORKS.sections.slice(0, 4).map((section) => ({
  title: section.heading.replace(/^Step \d+:\s*/, ""),
  excerpt: firstSentence(section.body[0]),
}));

export default function V1HomePage() {
  return (
    <>
      <HomeHero />

      {/* The Practice — silver editorial band */}
      <section className="bg-[#F2F2F2]">
        <div className="mx-auto grid max-w-7xl gap-x-20 gap-y-12 px-6 py-24 md:px-10 lg:grid-cols-12 lg:py-36">
          <div className="lg:col-span-4">
            <Reveal>
              <p className={EYEBROW}>The Practice</p>
              <h2 className="v1-display mt-5 text-balance text-[clamp(2rem,3.5vw,3.25rem)] leading-[1.08] tracking-[-0.015em]">
                Measurement first. Always.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              {hasTeamPhoto ? (
                <div className="relative mt-10 aspect-[4/5] overflow-hidden">
                  <Image
                    src="/images/team.jpg"
                    alt="The Brain Thrive Wellness team at the clinic in Choctaw, Oklahoma"
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div
                  role="img"
                  aria-label="Photograph of the Brain Thrive Wellness team, coming soon"
                  className="mt-10 aspect-[4/5] bg-[#E4E4E4]"
                />
              )}
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <div className="max-w-[62ch] space-y-6 leading-[1.8] text-[#002554]/80">
                <p className="v1-display text-xl leading-[1.45] text-[#002554] md:text-2xl">
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
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-36">
          <Reveal className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
            <div>
              <p className={EYEBROW}>How It Works</p>
              <h2 className="v1-display mt-5 text-balance text-[clamp(2rem,3.5vw,3.25rem)] leading-[1.08] tracking-[-0.015em]">
                Assess. Personalize. Train. Verify.
              </h2>
            </div>
            <Link href="/v1/how-it-works" className={ARROW_LINK}>
              The full method <span aria-hidden>&rarr;</span>
            </Link>
          </Reveal>
          <Reveal variant="rule" className="mt-14 h-px bg-[#002554]/10" />
          <ol className="grid gap-x-12 gap-y-12 pt-10 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <li key={step.title}>
                <Reveal delay={index * 0.08}>
                  <span className="v1-display text-lg text-[#5362EF] tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-balance text-lg font-medium leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#002554]/70">
                    {step.excerpt}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Who We Help — full ten-item editorial index */}
      <section id="who-we-help" className="scroll-mt-24 border-t border-[#002554]/10">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-36">
          <Reveal className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
            <div>
              <p className={EYEBROW}>Who We Help</p>
              <h2 className="v1-display mt-5 max-w-[20ch] text-balance text-[clamp(2rem,3.5vw,3.25rem)] leading-[1.08] tracking-[-0.015em]">
                Ten reasons people walk through our door.
              </h2>
            </div>
            <p className="max-w-[36ch] text-sm leading-relaxed text-[#002554]/70">
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
      <section className="bg-[#F2F2F2]">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center md:px-10 lg:py-36">
          <Reveal>
            <div aria-hidden className="mx-auto h-0.5 w-14 bg-[#00D3D2]" />
            <blockquote className="v1-display mt-10 text-balance text-[clamp(2.25rem,5vw,4.5rem)] italic leading-[1.08] tracking-[-0.015em]">
              &ldquo;Your brain is not hard-wired or fixed.&rdquo;
            </blockquote>
            <p className="mt-10 text-[11px] uppercase tracking-[0.22em] text-[#002554]/70">
              The principle behind everything we do —{" "}
              <Link
                href="/v1/how-it-works#why-neurofeedback"
                className="text-[#5362EF] transition-colors hover:text-[#223BA8]"
              >
                why neurofeedback
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="mx-auto grid max-w-7xl gap-x-20 gap-y-12 px-6 py-24 md:px-10 lg:grid-cols-12 lg:py-36">
          <div className="lg:col-span-4">
            <Reveal>
              <p className={EYEBROW}>FAQ</p>
              <h2 className="v1-display mt-5 text-balance text-[clamp(2rem,3.5vw,3.25rem)] leading-[1.08] tracking-[-0.015em]">
                Common questions, plain answers.
              </h2>
              <p className="mt-6 max-w-[34ch] text-sm leading-relaxed text-[#002554]/70">
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
