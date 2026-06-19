"use client";

import { useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { NAV } from "@/lib/content/nav";
import { SITE } from "@/lib/content/site";
import {
  type QuizConfig,
  getScoringQuestionCount,
  isQuestionFlagged,
  isScoringQuestion,
} from "@/lib/content/quiz";
import {
  BTN_GHOST_DARK,
  BTN_GHOST_LIGHT,
  BTN_PRIMARY,
  CONTAINER,
} from "./styles";

interface QuizProps {
  quiz: QuizConfig;
}

type Answers = Record<string, string[]>;

/**
 * Self-assessment quiz rendered as a one-question-at-a-time stepper. Each
 * step animates in (slide + fade, gated on reduced motion). The final step
 * is the result: target-flagged answers the user picked vs. the total
 * available, branched on the configured threshold for the booking CTA.
 */
export default function Quiz({ quiz }: QuizProps) {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);

  const total = quiz.questions.length;
  const isResults = step >= total;
  const question = isResults ? null : quiz.questions[step];

  // Direction of the last navigation, so the incoming panel slides in from
  // the correct side. Set by the nav handlers, read by the GSAP transition.
  const directionRef = useRef(1);
  const panelRef = useRef<HTMLDivElement>(null);

  const scoringCount = useMemo(() => getScoringQuestionCount(quiz), [quiz]);
  const currentAnswered = !!question && (answers[question.id]?.length ?? 0) > 0;

  function toggle(questionId: string, answerId: string, multi: boolean) {
    setAnswers((prev) => {
      const current = prev[questionId] ?? [];
      if (!multi) return { ...prev, [questionId]: [answerId] };
      const next = current.includes(answerId)
        ? current.filter((id) => id !== answerId)
        : [...current, answerId];
      return { ...prev, [questionId]: next };
    });
  }

  function goNext() {
    directionRef.current = 1;
    setStep((s) => Math.min(total, s + 1));
  }

  function goBack() {
    directionRef.current = -1;
    setStep((s) => Math.max(0, s - 1));
  }

  function restart() {
    directionRef.current = -1;
    setAnswers({});
    setStep(0);
  }

  // Slide/fade the active panel in whenever the step changes.
  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(panel, {
          autoAlpha: 0,
          x: directionRef.current * 56,
          duration: 0.45,
          ease: "power2.out",
        });
      });
    },
    { dependencies: [step], scope: panelRef },
  );

  // Scoring (only meaningful on the results step): the share of scoring
  // questions where the user picked at least one concern answer.
  const flaggedCount = quiz.questions.filter(
    (q) => isScoringQuestion(q) && isQuestionFlagged(q, answers[q.id] ?? []),
  ).length;
  const pct =
    scoringCount > 0 ? Math.round((flaggedCount / scoringCount) * 100) : 0;
  const recommend = pct >= quiz.threshold;

  const progress = isResults ? 100 : Math.round((step / total) * 100);

  return (
    <section className="bg-medical-gray-50">
      <div className={`${CONTAINER} py-16 lg:py-20`}>
        <div className="mx-auto max-w-2xl">
          {/* Progress header */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-medical-gray-500">
              <span>{isResults ? "Complete" : `Question ${step + 1} of ${total}`}</span>
              <span>{progress}%</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-medical-gray-200">
              <div
                className="h-full rounded-full bg-linear-to-r from-brand-ultraviolet to-brand-purple transition-[width] duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Animated panel (one question, or the result) */}
          <div ref={panelRef}>
            {question ? (
              <fieldset className="v2-card-shadow rounded-2xl bg-white p-8 md:p-10">
                <legend className="float-left pb-8 text-xl font-semibold leading-snug tracking-tight text-brand-navy md:text-2xl">
                  {question.text}
                  <span className="mt-1.5 block text-xs font-medium uppercase tracking-[0.18em] text-medical-gray-500">
                    {question.type === "multi" ? "Select all that apply" : "Select one"}
                  </span>
                </legend>
                <div className="clear-both flex flex-col gap-3">
                  {question.answers.map((a) => {
                    const multi = question.type === "multi";
                    const checked = (answers[question.id] ?? []).includes(a.id);
                    return (
                      <label
                        key={a.id}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border px-5 py-4 transition-colors ${
                          checked
                            ? "border-brand-ultraviolet bg-brand-ultraviolet/5"
                            : "border-medical-gray-200 hover:border-brand-ultraviolet/60"
                        }`}
                      >
                        <input
                          type={multi ? "checkbox" : "radio"}
                          name={question.id}
                          value={a.id}
                          checked={checked}
                          onChange={() => toggle(question.id, a.id, multi)}
                          className="h-5 w-5 shrink-0 accent-brand-ultraviolet"
                        />
                        <span className="text-medical-gray-800">{a.text}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ) : (
              <div className="v2-band-dark relative overflow-hidden rounded-2xl bg-brand-navy p-8 text-white md:p-12">
                <div aria-hidden className="v2-grid-pattern absolute inset-0" />
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                    Your result
                  </p>
                  <p
                    className="v2-display mt-3 leading-none text-brand-teal"
                    style={{ fontSize: "clamp(3.5rem, 11vw, 7rem)" }}
                  >
                    {pct}%
                  </p>
                  <h2 className="mt-3 text-balance text-[clamp(1.7rem,3.6vw,2.6rem)] font-semibold leading-[1.08] tracking-tight">
                    {recommend ? quiz.result.aboveHeading : quiz.result.belowHeading}
                  </h2>
                  <p className="mt-4 max-w-[54ch] leading-relaxed text-white/75">
                    {recommend ? quiz.result.aboveBody : quiz.result.belowBody}
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    {recommend ? (
                      <a href={NAV.cta.href} className={BTN_PRIMARY}>
                        {NAV.cta.label}
                      </a>
                    ) : (
                      <a href={`mailto:${SITE.email}`} className={BTN_GHOST_DARK}>
                        Send us a message
                      </a>
                    )}
                    <button type="button" onClick={restart} className={BTN_GHOST_DARK}>
                      Retake the quiz
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation (hidden on the result step) */}
          {!isResults && (
            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 0}
                className={`${BTN_GHOST_LIGHT} disabled:cursor-not-allowed disabled:opacity-40`}
              >
                Back
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={!currentAnswered}
                className={`${BTN_PRIMARY} disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none`}
              >
                {step === total - 1 ? "See my result" : "Next"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
