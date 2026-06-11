import type { FaqEntry, InfoPage, NewsletterEntry } from "./types";

/**
 * Drafted page copy shared by all three site versions.
 * Tone: professional, empowering, non-clinical. Conditions are help topics,
 * not diagnoses; claims stay grounded ("may help", "designed to support").
 * Factual details are drawn from the clinic reference texts in /data
 * (photobiomodulation, quantitative EEG, Brain Gauge cortical metrics).
 */

export const HOW_IT_WORKS: InfoPage = {
  headline: "How It Works",
  subhead:
    "A measured, step-by-step approach to brain wellness — assess first, personalize second, train third, and verify progress along the way.",
  sections: [
    {
      heading: "Step 1: Measure Your Brain — qEEG Brain Mapping & Brain Gauge",
      body: [
        "Everything we do starts with data, not guesswork. Your first visits include a quantitative EEG (qEEG) brain map — a non-invasive recording of your brain's electrical activity using a comfortable sensor cap. The map shows how different regions of your brain are communicating and highlights patterns that may be associated with the challenges you're experiencing.",
        "We pair the brain map with a Brain Gauge assessment, a quick, FDA-cleared test that measures brain function through gentle vibrations on your fingertips. In about 15 minutes it produces objective scores for reaction time, attention, cognitive speed, plasticity, and fatigue — and your results are explained to you right away.",
        "Together, these two assessments give us an objective baseline of how your brain is performing today.",
      ],
    },
    {
      heading: "Step 2: Your Personalized Protocol",
      body: [
        "No two brains are alike, so no two protocols should be either. Using your qEEG map and Brain Gauge scores, we design a personalized plan that targets the specific patterns we found — including which therapies to use, where to focus them, and how often to train.",
        "We review the plan with you in plain language, answer your questions, and set clear goals so you know exactly what we're working toward.",
      ],
    },
    {
      heading: "Step 3: Train & Restore — Photobiomodulation + Neurofeedback",
      body: [
        "Your sessions combine two gentle, drug-free therapies. Photobiomodulation (PBM) uses medical-grade red and near-infrared light to stimulate your cells: mitochondria absorb the light and produce more energy (ATP), inflammation goes down, and circulation improves. Sessions are relaxing and painless — most last 10 to 20 minutes, with no downtime and no medications.",
        "Traditional Neurofeedback works alongside PBM by showing your brain its own activity in real time and rewarding healthier patterns. Through this gentle feedback loop, your brain gradually learns to regulate itself more efficiently — a process built on neuroplasticity, the brain's lifelong ability to adapt and rewire.",
        "Most people train multiple times per week at first. Sessions are comfortable enough that many clients look forward to them.",
      ],
    },
    {
      heading: "Step 4: Re-Measure & Refine",
      body: [
        "Progress shouldn't be a matter of opinion. At regular intervals we repeat the Brain Gauge assessment and qEEG mapping to objectively measure how your brain is responding, then refine your protocol based on what the data shows.",
        "You see your progress in numbers and maps — not just in how you feel — so you always know whether the training is working.",
      ],
    },
    {
      heading: "Why Neurofeedback",
      body: [
        "Your brain is not hard-wired or fixed. Thanks to neuroplasticity, it remains capable of change and adaptation throughout life — and neurofeedback is a way of guiding that change on purpose.",
        "During a neurofeedback session, sensors read your brain's activity while you relax and watch or listen to simple feedback. When your brain produces healthier, more regulated patterns, it gets rewarded in real time. Over repeated sessions, your brain learns to reach those states on its own — you are literally retraining your brain.",
        "Neurofeedback is non-invasive and drug-free: nothing goes into your brain, and nothing is taken out. It is designed to support healthier self-regulation, which is why people seek it out for focus, calm, sleep, recovery, and performance. It can be used on its own or alongside care from your existing healthcare providers.",
      ],
    },
  ],
};

export const ABOUT: InfoPage = {
  headline: "About Brain Thrive Wellness",
  subhead: "Prioritizing brain health for the Choctaw community and beyond.",
  sections: [
    {
      heading: "Our Story",
      body: [
        "Brain Thrive Wellness was founded on a simple conviction: brain health deserves the same attention, measurement, and care as every other part of your health. Too many people are told to simply live with brain fog, poor focus, restless sleep, or lingering symptoms after an injury. We believe the brain can do better — when it's given the right support.",
        "Located in Choctaw, Oklahoma, inside Quick Access Neurology (next door to FNB Bank), our clinic brings advanced, data-driven brain wellness tools to a community setting — no big-city commute required.",
      ],
    },
    {
      heading: "Our Approach",
      body: [
        "We are a measurement-first practice. Every plan begins with objective assessment — qEEG brain mapping and Brain Gauge cortical metrics — so that your care is grounded in data about your brain, not assumptions.",
        "From there, we use gentle, non-invasive, drug-free therapies — medical-grade photobiomodulation and traditional neurofeedback — to support your brain's natural ability to heal, regulate, and perform. And because we re-measure as you go, you can see your progress objectively.",
      ],
    },
    {
      heading: "Our Mission",
      body: [
        "Our mission is to prioritize brain health: to help children, adults, athletes, and seniors unlock more focus, calm, rest, and resilience. Whatever brought you here — attention struggles, anxiety, an injury, sleep that won't cooperate, or the pursuit of peak performance — we meet you with respect, clear information, and a plan tailored to your brain.",
        "Our services support brain wellness and complement, rather than replace, care from your physician and healthcare team.",
      ],
    },
  ],
};

export const NEWSLETTERS: {
  intro: string;
  entries: NewsletterEntry[];
} = {
  intro:
    "Stay current on brain wellness. Our newsletter shares plain-language explainers on the science behind what we do, practical brain-health tips, and news from the clinic. To join the list, send us an email at admin@brainthrivewellness.com and we'll add you to the next issue.",
  entries: [
    {
      title: "Understanding qEEG Brain Mapping",
      date: "Coming soon",
      summary:
        "What actually happens during a brain map? A plain-language walkthrough of how qEEG records your brain's electrical activity, what the colorful maps mean, and how we use them to personalize your protocol.",
    },
    {
      title: "Photobiomodulation 101: How Light Supports the Brain",
      date: "Coming soon",
      summary:
        "Red and near-infrared light, mitochondria, and cellular energy — an approachable introduction to the science of medical-grade PBM and what to expect from a session.",
    },
    {
      title: "Five Everyday Habits That Support a Healthier Brain",
      date: "Coming soon",
      summary:
        "Sleep, movement, light, nutrition, and focus hygiene: practical, evidence-informed habits you can start this week to support your brain between sessions.",
    },
  ],
};

export const FAQ: FaqEntry[] = [
  {
    question: "Is neurofeedback safe?",
    answer:
      "Yes. Traditional neurofeedback is non-invasive — sensors only read your brain's activity; nothing is sent into your brain. Sessions are gentle and drug-free, and the training simply rewards your brain for producing healthier patterns. Most people find sessions relaxing.",
  },
  {
    question: "What is photobiomodulation (PBM)?",
    answer:
      "Photobiomodulation is a safe, painless therapy that uses red and near-infrared light to gently stimulate your cells. The light helps mitochondria produce more energy, which may reduce inflammation and support the brain's natural healing processes. We use medical-grade devices, which go deeper and work better than over-the-counter wellness lights.",
  },
  {
    question: "What happens at my first visit?",
    answer:
      "Your first visit is about understanding your brain. We'll talk through your goals and history, then complete objective assessments — typically a qEEG brain map and a quick Brain Gauge test. From there we design a personalized protocol and walk you through it in plain language before any training begins.",
  },
  {
    question: "How many sessions will I need?",
    answer:
      "It varies from person to person, because every brain and every goal is different. Many people train multiple times per week at first, and we re-measure at regular intervals to track progress objectively. Your protocol is adjusted based on what your data shows, not a one-size-fits-all schedule.",
  },
  {
    question: "Does this replace medication or my doctor?",
    answer:
      "No. Our services are designed to support brain wellness, not to diagnose or treat medical conditions, and they are not a substitute for care from your physician. Many clients use our therapies alongside their existing treatment plans. Never change medications without consulting your healthcare provider.",
  },
  {
    question: "Is it really drug-free and non-invasive?",
    answer:
      "Yes. Both photobiomodulation and traditional neurofeedback are completely non-invasive and involve no medications. PBM applies gentle light to the skin, and neurofeedback only reads your brain's activity. There's no downtime — you can return to your day immediately after a session.",
  },
  {
    question: "Who can benefit?",
    answer:
      "People come to us for many reasons: focus and attention challenges, anxiety, sleep issues, headaches, recovery after a concussion or TBI, memory concerns, post-COVID brain fog, and even peak athletic performance. Because every protocol starts with objective measurement, the training is tailored to your brain and your goals.",
  },
  {
    question: "Do you work with children?",
    answer:
      "Yes. Neurofeedback and PBM are gentle, non-invasive, and well suited to children and teens, and focus and attention support is one of the most common reasons families visit us. We take time to make young clients comfortable and keep parents informed at every step.",
  },
  {
    question: "How do I get started?",
    answer:
      "Schedule a consultation — call us at 405-563-0816 or email admin@brainthrivewellness.com. We'll answer your questions, learn about your goals, and set up your initial brain assessment. There's no obligation, and we're happy to explain whether our approach is a good fit for you.",
  },
];
