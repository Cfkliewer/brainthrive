import type { Metadata } from "next";
import { QUIZ } from "@/lib/content/quiz";
import CtaBand from "../_components/CtaBand";
import Quiz from "../_components/Quiz";
import Reveal from "../_components/Reveal";
import { CONTAINER, EYEBROW_ON_LIGHT } from "../_components/styles";

export const metadata: Metadata = {
  title: "Self-Assessment Quiz",
  description:
    "Take our quick self-assessment to see whether BrainThrive's approach might be a good fit, then schedule a consultation.",
};

export default function QuizPage() {
  return (
    <>
      <section className="bg-white">
        <div className={`${CONTAINER} pb-14 pt-14 lg:pb-20 lg:pt-20`}>
          <Reveal>
            <p className={EYEBROW_ON_LIGHT}>Self-Assessment</p>
            <h1 className="mt-5 max-w-[18ch] text-balance text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.025em] text-brand-navy">
              {QUIZ.title}
            </h1>
            <p className="mt-7 max-w-[56ch] text-lg leading-relaxed text-medical-gray-600">
              {QUIZ.intro}
            </p>
          </Reveal>
        </div>
      </section>

      <Quiz quiz={QUIZ} />

      <CtaBand heading="Prefer to talk it through first?" />
    </>
  );
}
