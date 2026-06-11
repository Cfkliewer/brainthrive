import BrainScrubStory from "./_components/BrainScrubStory";
import Faq from "./_components/Faq";
import GlowCta from "./_components/GlowCta";
import GlowStats from "./_components/GlowStats";
import NeuroHero from "./_components/NeuroHero";
import PinnedConditions from "./_components/PinnedConditions";
import TimelineHowItWorks from "./_components/TimelineHowItWorks";

/**
 * V3 "Immersive Neuro" homepage: a cinematic scroll story in chapters —
 * neuron-web hero, pinned brain fly-in scrub, pinned conditions index,
 * glowing stats, the method timeline, FAQ, and the CTA portal.
 */
export default function V3HomePage() {
  return (
    <>
      <NeuroHero />
      <BrainScrubStory />
      <PinnedConditions />
      <GlowStats />
      <section aria-label="How it works">
        <TimelineHowItWorks detail="excerpt" />
      </section>
      <Faq />
      <GlowCta />
    </>
  );
}
