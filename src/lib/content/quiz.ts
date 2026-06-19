import quizData from "./quiz.json";

/** A single selectable answer. `target` flags membership in the tallied list. */
export interface QuizAnswer {
  id: string;
  text: string;
  /** True if this answer counts toward the "good fit" score. */
  target: boolean;
}

/** "single" renders radios (one pick); "multi" renders checkboxes (many). */
export type QuizQuestionType = "single" | "multi";

export interface QuizQuestion {
  id: string;
  text: string;
  type: QuizQuestionType;
  answers: QuizAnswer[];
}

/** Copy shown on the results screen, branched on the threshold. */
export interface QuizResultCopy {
  aboveHeading: string;
  aboveBody: string;
  belowHeading: string;
  belowBody: string;
}

export interface QuizConfig {
  title: string;
  intro: string;
  /** Percentage (0–100) at/above which we recommend booking. */
  threshold: number;
  result: QuizResultCopy;
  questions: QuizQuestion[];
}

/** Typed view of the editable quiz.json data file. */
export const QUIZ: QuizConfig = quizData as QuizConfig;

/** True if a question carries any target-flagged answer (i.e. it scores). */
export function isScoringQuestion(question: QuizQuestion): boolean {
  return question.answers.some((a) => a.target);
}

/** Count of questions that score — the denominator for the result percentage. */
export function getScoringQuestionCount(quiz: QuizConfig): number {
  return quiz.questions.filter(isScoringQuestion).length;
}

/** True if the user picked at least one target answer in this question. */
export function isQuestionFlagged(
  question: QuizQuestion,
  selectedIds: string[],
): boolean {
  return question.answers.some((a) => a.target && selectedIds.includes(a.id));
}
