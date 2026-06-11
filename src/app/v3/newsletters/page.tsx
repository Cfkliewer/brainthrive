import type { Metadata } from "next";
import { NEWSLETTERS } from "@/lib/content/pages";
import { SITE } from "@/lib/content/site";
import Reveal from "../_components/Reveal";
import SplitHeading from "../_components/SplitHeading";
import {
  ARROW_LINK,
  BODY,
  CONTAINER,
  EYEBROW,
  GLASS_PANEL,
} from "../_components/styles";

export const metadata: Metadata = {
  title: "Newsletters",
  description:
    "Plain-language brain wellness explainers, practical tips, and clinic news from Brain Thrive Wellness in Choctaw, Oklahoma.",
};

export default function NewslettersPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(50rem 30rem at 20% 0%, rgba(53,243,230,0.1), transparent 60%), radial-gradient(45rem 28rem at 85% 60%, rgba(83,98,239,0.15), transparent 60%)",
          }}
        />
        <div className={`${CONTAINER} relative pb-16 pt-36 md:pt-44`}>
          <p className={EYEBROW}>Signal, not noise</p>
          <SplitHeading
            as="h1"
            className="v3-display mt-5 max-w-4xl text-balance text-[clamp(3rem,9vw,8rem)] leading-[0.92] text-white"
          >
            Newsletters<span className="text-brand-teal">.</span>
          </SplitHeading>
          <p className={`${BODY} mt-7 max-w-2xl`}>{NEWSLETTERS.intro}</p>
          <a href={`mailto:${SITE.email}`} className={`${ARROW_LINK} mt-6`}>
            {SITE.email} <span aria-hidden>&rarr;</span>
          </a>
        </div>
      </section>

      <section aria-label="Newsletter issues" className={`${CONTAINER} pb-24`}>
        <Reveal stagger={0.1} className="grid gap-6 md:grid-cols-3">
          {NEWSLETTERS.entries.map((entry) => (
            <article key={entry.title} className={`${GLASS_PANEL} flex flex-col p-7`}>
              <p className={EYEBROW}>{entry.date}</p>
              <h2 className="v3-display mt-3 text-2xl leading-[1.05] text-white">
                {entry.title}
              </h2>
              <p className="mt-3 text-[15px] leading-[1.7] text-white/70">
                {entry.summary}
              </p>
            </article>
          ))}
        </Reveal>
      </section>
    </>
  );
}
