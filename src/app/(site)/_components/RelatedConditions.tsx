import { CONDITIONS } from "@/lib/content/conditions";
import ConditionCard from "./ConditionCard";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { CONTAINER } from "./styles";

/**
 * Three-card "Also explore" row: the conditions following the current one
 * in canonical order (wrapping), each keeping its canonical index number.
 */
export default function RelatedConditions({
  currentSlug,
}: {
  currentSlug: string;
}) {
  const currentIndex = CONDITIONS.findIndex((c) => c.slug === currentSlug);
  const related = [1, 2, 3].map((offset) => {
    const index = (currentIndex + offset) % CONDITIONS.length;
    return { index, condition: CONDITIONS[index] };
  });

  return (
    <section className="bg-medical-gray-50">
      <div className={`${CONTAINER} py-20 lg:py-24`}>
        <Reveal>
          <SectionHeader
            index="02"
            eyebrow="Also Explore"
            heading="Other reasons people visit us."
            tone="light"
          />
        </Reveal>
        <Reveal stagger={0.06} className="mt-12 grid gap-6 md:grid-cols-3">
          {related.map((item) => (
            <ConditionCard
              key={item.condition.slug}
              condition={item.condition}
              index={item.index}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
