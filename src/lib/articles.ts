export type ArticleSection = {
  heading?: string;
  body: string;
};

export type Article = {
  slug: string;
  tag: string;
  title: string;
  summary: string;
  sections: ArticleSection[];
};

export const ARTICLES: Article[] = [
  {
    slug: "adaptive-scoring-explained",
    tag: "Scoring",
    title: "How digital SAT adaptive scoring actually works",
    summary:
      "The digital SAT adapts between modules, not between questions. Here's what that means for how you should pace each section.",
    sections: [
      {
        heading: "It adapts by module, not by question",
        body: "The digital SAT is broken into two sections — Reading & Writing and Math — and each section has two modules. Module 1 gives every student a mix of easy, medium, and hard questions. Based on how you do on Module 1, Module 2 is swapped in at a higher or lower overall difficulty. Unlike some adaptive tests, the difficulty doesn't shift question-by-question — it only adjusts once, at the module boundary.",
      },
      {
        heading: "Why Module 1 matters more than you'd think",
        body: "Because Module 2's difficulty is locked in based on Module 1 performance, a strong Module 1 unlocks a harder Module 2 — which also has a higher score ceiling. Two students who both answer 90% of questions correctly can end up with different scores if one of them was working from an easier Module 2. That's why rushing or guessing carelessly early in a section can quietly cap your score before you even reach Module 2.",
      },
      {
        heading: "What this means for your pacing",
        body: "Treat Module 1 of each section like it's the whole test: read carefully, don't guess-and-move just to save time, and use \"Mark for Review\" to flag anything you're unsure about rather than rushing past it. In Module 2, your pacing can loosen slightly — you already know which difficulty tier you're in, so focus on accuracy over speed for the remaining questions.",
      },
      {
        heading: "Scoring basics",
        body: "Each section is scored from 200–800, for a combined total of 400–1600. Your score reflects both how many questions you answered correctly and the difficulty tier of the module you were working from — which is exactly why two students with the same raw number of correct answers can end up with different final scores.",
      },
    ],
  },
  {
    slug: "6-week-study-plan",
    tag: "Study plan",
    title: "A 6-week study plan for a 200-point increase",
    summary:
      "A week-by-week structure — diagnostic, targeted drilling, full-length tests, and a taper — that turns scattered studying into a plan.",
    sections: [
      {
        heading: "Week 1: Get your baseline",
        body: "Take a full-length diagnostic test under real timing conditions before you study anything. This is the single most important step — it tells you which section (Reading & Writing or Math) needs more of your time, and which specific skills inside that section are weakest. Skipping this step means guessing at what to study.",
      },
      {
        heading: "Weeks 2–3: Drill your weak areas",
        body: "Use the question bank filtered by your weakest skills from the diagnostic. Work in focused sessions of 15–20 questions per skill rather than random mixed sets — you learn faster when you're reinforcing one pattern at a time. After every session, review every missed question and write one sentence explaining why the correct answer is right, not just what it is.",
      },
      {
        heading: "Week 4: First full-length checkpoint",
        body: "Take a second full-length practice test, timed exactly like test day. Compare the section and skill breakdown against your Week 1 diagnostic. You should see clear movement in the areas you drilled — if you don't, that's a signal to change how you're studying that skill, not just do more of the same.",
      },
      {
        heading: "Week 5: Close the remaining gaps",
        body: "Go back to the question bank, but this time split your time between your still-weak skills and a light review of everything else, so earlier gains don't slip. This is also the week to tighten pacing — practice specific modules under a stricter clock if you're consistently running out of time.",
      },
      {
        heading: "Week 6: Taper and simulate test day",
        body: "Take one final full-length practice test in the first half of the week, then taper down: shorter review sessions, no new material, and one or two nights of just skimming explanations for questions you got wrong earlier in the plan. Go into test day rested, not freshly drilled.",
      },
    ],
  },
  {
    slug: "reading-writing-traps",
    tag: "Reading & Writing",
    title: "The 5 most common Reading & Writing traps",
    summary:
      "The digital SAT's Reading & Writing section is built around a handful of recurring wrong-answer patterns. Learn to spot them.",
    sections: [
      {
        heading: "1. The extreme-language answer",
        body: "Answer choices with words like \"always,\" \"never,\" \"completely,\" or \"proves\" are usually too strong for what the passage actually supports. The correct answer is almost always more measured than the most dramatic-sounding option.",
      },
      {
        heading: "2. The half-right answer",
        body: "Some choices get the first half of a sentence exactly right and then go wrong in the second half — a plausible topic paired with an unsupported claim. Read the entire answer choice, not just the part that sounds familiar from the passage.",
      },
      {
        heading: "3. The true-but-unsupported answer",
        body: "An answer can be factually reasonable, even true in the real world, and still be wrong because the passage itself doesn't say it. Every correct answer has to be directly supported by the text in front of you, not by outside knowledge or common sense.",
      },
      {
        heading: "4. Answering the wrong question",
        body: "Main idea, author's purpose, and specific-detail questions get mixed up more than any other pair. Before looking at answer choices, restate in your own words exactly what's being asked — a detail question needs a detail answer, not a summary of the whole passage.",
      },
      {
        heading: "5. Transition words that almost fit",
        body: "On \"which transition best completes the text\" questions, wrong choices often signal the right relationship (contrast, cause, addition) but the wrong strength — \"however\" where the passage needs \"although,\" or \"therefore\" where it needs \"as a result.\" Identify the logical relationship between the two ideas first, then pick the word that matches it most precisely.",
      },
    ],
  },
];
