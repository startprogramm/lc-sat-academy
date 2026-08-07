import { db } from "@/db";
import {
  practiceTests,
  testModules,
  questions,
  choices,
  moduleQuestions,
} from "@/db/schema";
import { eq } from "drizzle-orm";

const TEST_SLUG = "diagnostic-practice-test";

type ChoiceInput = { label: "A" | "B" | "C" | "D"; body: string };

type QuestionInput = {
  type: "multiple_choice" | "student_response";
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  stimulus?: string;
  stem: string;
  explanation: string;
  choices?: ChoiceInput[];
  correctLabel?: "A" | "B" | "C" | "D";
  correctResponse?: string;
};

const RW_MODULE_1: QuestionInput[] = [
  {
    type: "multiple_choice",
    topic: "Vocabulary",
    difficulty: "medium",
    stimulus:
      "Marine biologist Ayesha Whitfield spent months observing octopuses in captivity, and she was struck by how quickly the animals could ______ new problem-solving strategies after only one or two failed attempts.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: [
      { label: "A", body: "abandon" },
      { label: "B", body: "devise" },
      { label: "C", body: "publish" },
      { label: "D", body: "resist" },
    ],
    correctLabel: "B",
    explanation:
      "“Devise” means to invent or work out, matching the idea that the octopuses quickly came up with new strategies after failed attempts.",
  },
  {
    type: "multiple_choice",
    topic: "Vocabulary",
    difficulty: "medium",
    stimulus:
      "Although the museum's new wing was designed to be strikingly modern, architect In-Su Park insisted that its glass facade remain ______ with the brick exterior of the original nineteenth-century building next door.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: [
      { label: "A", body: "inconsistent" },
      { label: "B", body: "harmonious" },
      { label: "C", body: "unrelated" },
      { label: "D", body: "identical" },
    ],
    correctLabel: "B",
    explanation:
      "“Harmonious” captures the idea that the new design fits well alongside the old building without being identical to it.",
  },
  {
    type: "multiple_choice",
    topic: "Main idea",
    difficulty: "medium",
    stimulus:
      "The following text is adapted from a short story. Elena has just moved into a new apartment.\n\nThe boxes sat unopened in the corner for the better part of a week. Elena told herself she was busy, that unpacking could wait until the weekend, but each morning she left for work without so much as glancing at them. It wasn't the boxes themselves that stopped her — it was what unpacking them would mean: that this apartment, and not the one she'd shared with her sister, was now simply home.",
    stem: "Which choice best states the main purpose of the text?",
    choices: [
      { label: "A", body: "To describe the process of moving into a new apartment" },
      { label: "B", body: "To suggest that Elena is reluctant to accept a change in her life" },
      { label: "C", body: "To explain why Elena and her sister no longer live together" },
      { label: "D", body: "To criticize Elena for being disorganized" },
    ],
    correctLabel: "B",
    explanation:
      "Elena avoids unpacking not out of busyness but because doing so would mean accepting the new apartment as home — the passage is about her reluctance to accept that change.",
  },
  {
    type: "multiple_choice",
    topic: "Punctuation",
    difficulty: "medium",
    stimulus:
      "The city's new bike-share program proved far more popular than officials had ______ within the first month, every station had run out of available bikes at least once.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "anticipated," },
      { label: "B", body: "anticipated;" },
      { label: "C", body: "anticipated, but" },
      { label: "D", body: "anticipated and" },
    ],
    correctLabel: "B",
    explanation:
      "A semicolon correctly joins two independent clauses without a coordinating conjunction, avoiding both a comma splice and a run-on.",
  },
  {
    type: "multiple_choice",
    topic: "Transitions",
    difficulty: "medium",
    stimulus:
      "Researchers had long assumed that the deep-sea anglerfish rarely encounters other anglerfish, given the vast, dark expanse of its habitat. ______, recent tagging studies have shown that individuals often cross paths multiple times within a single year.",
    stem: "Which choice completes the text with the most logical transition?",
    choices: [
      { label: "A", body: "Similarly," },
      { label: "B", body: "Consequently," },
      { label: "C", body: "However," },
      { label: "D", body: "For example," },
    ],
    correctLabel: "C",
    explanation:
      "The second sentence contradicts the long-held assumption in the first, so a contrast transition is needed.",
  },
  {
    type: "multiple_choice",
    topic: "Command of evidence",
    difficulty: "hard",
    stimulus:
      "A city planner claims that adding dedicated bus lanes to Main Street would reduce average commute times for all drivers, not just bus riders, by easing overall traffic congestion.",
    stem: "Which finding, if true, would most directly support the city planner's claim?",
    choices: [
      { label: "A", body: "Bus ridership on Main Street increased by 12% after dedicated lanes were added in a neighboring city." },
      { label: "B", body: "After a neighboring city added dedicated bus lanes, average car commute times on that street dropped by four minutes." },
      { label: "C", body: "Main Street currently has more traffic congestion during morning rush hour than in the evening." },
      { label: "D", body: "Surveys show that most drivers on Main Street support public transit improvements in general." },
    ],
    correctLabel: "B",
    explanation:
      "The claim is specifically about reducing commute times for all drivers, so evidence that car commute times dropped after similar lanes were added elsewhere most directly supports it.",
  },
];

const RW_MODULE_2: QuestionInput[] = [
  {
    type: "multiple_choice",
    topic: "Vocabulary",
    difficulty: "medium",
    stimulus:
      "Despite the coach's reputation for being demanding, her players describe her feedback as remarkably ______: she rarely raises her voice, choosing instead to explain exactly what went wrong and how to fix it.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: [
      { label: "A", body: "harsh" },
      { label: "B", body: "measured" },
      { label: "C", body: "vague" },
      { label: "D", body: "rare" },
    ],
    correctLabel: "B",
    explanation:
      "“Measured” means careful and controlled, fitting a coach who explains calmly rather than yelling.",
  },
  {
    type: "multiple_choice",
    topic: "Main idea",
    difficulty: "medium",
    stimulus:
      "For decades, most maps of the ocean floor were built almost entirely from sonar readings taken by passing ships, leaving vast stretches of seabed essentially unmapped. Only in the past ten years, as satellite gravity data has been combined with the sparse sonar records, have scientists been able to produce a reasonably complete picture of the planet's underwater terrain.",
    stem: "Which choice best states the main idea of the text?",
    choices: [
      { label: "A", body: "Sonar readings are no longer used in ocean floor mapping." },
      { label: "B", body: "Recent advances have allowed scientists to map the ocean floor more completely than before." },
      { label: "C", body: "Most of the ocean floor remains completely unexplored today." },
      { label: "D", body: "Satellites are more accurate than ships at measuring ocean depth." },
    ],
    correctLabel: "B",
    explanation:
      "The text explains that combining satellite data with sonar records has recently allowed a more complete map than was previously possible.",
  },
  {
    type: "multiple_choice",
    topic: "Grammar",
    difficulty: "easy",
    stimulus:
      "The committee overseeing the scholarship applications ______ each submission carefully before making a final decision.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "review" },
      { label: "B", body: "reviews" },
      { label: "C", body: "reviewing" },
      { label: "D", body: "have reviewed" },
    ],
    correctLabel: "B",
    explanation:
      "“Committee” is a singular collective noun, so it takes the singular verb “reviews.”",
  },
  {
    type: "multiple_choice",
    topic: "Punctuation",
    difficulty: "medium",
    stimulus:
      "By the end of the semester, all three ______ presentations had been rescheduled twice due to conflicts with the auditorium's renovation schedule.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "student's" },
      { label: "B", body: "students" },
      { label: "C", body: "students'" },
      { label: "D", body: "students's" },
    ],
    correctLabel: "C",
    explanation:
      "Three students possessing presentations requires a plural possessive, formed by adding just an apostrophe after the s: students'.",
  },
  {
    type: "multiple_choice",
    topic: "Transitions",
    difficulty: "medium",
    stimulus:
      "The new tax credit was intended to encourage homeowners to install solar panels. ______, in its first year, uptake was far lower than lawmakers had projected.",
    stem: "Which choice completes the text with the most logical transition?",
    choices: [
      { label: "A", body: "Similarly," },
      { label: "B", body: "Yet" },
      { label: "C", body: "Therefore," },
      { label: "D", body: "Specifically," },
    ],
    correctLabel: "B",
    explanation:
      "“Yet” signals the contrast between the credit's intended goal and the disappointing result.",
  },
  {
    type: "multiple_choice",
    topic: "Rhetorical synthesis",
    difficulty: "hard",
    stimulus:
      "While researching a topic, a student has taken the following notes:\n• The Icelandic language has changed very little since the 9th century.\n• Modern Icelandic speakers can generally read medieval Icelandic sagas without translation.\n• Icelandic has resisted borrowing foreign words, preferring to coin new native terms instead.\n• For example, the Icelandic word for “computer,” tölva, combines the words for “number” and “prophetess.”",
    stem: "The student wants to give one specific example illustrating how Icelandic avoids borrowing foreign words. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      { label: "A", body: "Icelandic has changed very little since the 9th century, unlike most other living languages." },
      { label: "B", body: "Modern Icelandic speakers can read medieval sagas without needing a translation." },
      { label: "C", body: "Rather than borrowing a foreign word for “computer,” Icelandic speakers coined tölva, combining the words for “number” and “prophetess.”" },
      { label: "D", body: "Icelandic is known for resisting the adoption of foreign vocabulary." },
    ],
    correctLabel: "C",
    explanation:
      "Only this choice gives the specific tölva example, which is the concrete illustration the student wants.",
  },
];

const MATH_MODULE_1: QuestionInput[] = [
  {
    type: "multiple_choice",
    topic: "Linear equations",
    difficulty: "easy",
    stem: "If 4x + 9 = 33, what is the value of x?",
    choices: [
      { label: "A", body: "6" },
      { label: "B", body: "8" },
      { label: "C", body: "9" },
      { label: "D", body: "24" },
    ],
    correctLabel: "A",
    explanation: "4x + 9 = 33, so 4x = 24 and x = 6.",
  },
  {
    type: "multiple_choice",
    topic: "Percentages",
    difficulty: "easy",
    stem: "A jacket originally priced at $80 is on sale for 25% off. What is the sale price of the jacket, in dollars?",
    choices: [
      { label: "A", body: "$20" },
      { label: "B", body: "$55" },
      { label: "C", body: "$60" },
      { label: "D", body: "$64" },
    ],
    correctLabel: "C",
    explanation: "25% off of $80 is a $20 discount, so the sale price is $80 − $20 = $60.",
  },
  {
    type: "student_response",
    topic: "Systems of equations",
    difficulty: "medium",
    stem: "x + y = 20\n3x − y = 8\nWhat is the value of x in the solution to the system of equations shown?",
    correctResponse: "7",
    explanation: "Adding the two equations eliminates y: 4x = 28, so x = 7.",
  },
  {
    type: "multiple_choice",
    topic: "Functions",
    difficulty: "medium",
    stem: "The function f is defined by f(x) = 2x² − 5. What is the value of f(3)?",
    choices: [
      { label: "A", body: "1" },
      { label: "B", body: "7" },
      { label: "C", body: "13" },
      { label: "D", body: "19" },
    ],
    correctLabel: "C",
    explanation: "f(3) = 2(3)² − 5 = 2(9) − 5 = 18 − 5 = 13.",
  },
  {
    type: "student_response",
    topic: "Geometry",
    difficulty: "medium",
    stem: "A rectangular garden has a length of 12 feet and a width that is 3 feet less than its length. What is the area of the garden, in square feet?",
    correctResponse: "108",
    explanation: "The width is 12 − 3 = 9 feet, so the area is 12 × 9 = 108 square feet.",
  },
  {
    type: "multiple_choice",
    topic: "Ratios",
    difficulty: "easy",
    stem: "In a recipe, the ratio of cups of flour to cups of sugar is 5 to 2. If a baker uses 15 cups of flour, how many cups of sugar should be used?",
    choices: [
      { label: "A", body: "4" },
      { label: "B", body: "5" },
      { label: "C", body: "6" },
      { label: "D", body: "7.5" },
    ],
    correctLabel: "C",
    explanation: "15 cups of flour is 3 times 5, so sugar is 3 times 2 = 6 cups.",
  },
];

const MATH_MODULE_2: QuestionInput[] = [
  {
    type: "multiple_choice",
    topic: "Quadratics",
    difficulty: "medium",
    stem: "What are the solutions to the equation x² − 7x + 12 = 0?",
    choices: [
      { label: "A", body: "x = 3 and x = 4" },
      { label: "B", body: "x = −3 and x = −4" },
      { label: "C", body: "x = 2 and x = 6" },
      { label: "D", body: "x = 1 and x = 12" },
    ],
    correctLabel: "A",
    explanation: "x² − 7x + 12 factors as (x − 3)(x − 4) = 0, so x = 3 or x = 4.",
  },
  {
    type: "multiple_choice",
    topic: "Lines & slope",
    difficulty: "easy",
    stem: "A line in the xy-plane passes through the points (2, 5) and (6, 13). What is the slope of the line?",
    choices: [
      { label: "A", body: "1/2" },
      { label: "B", body: "2" },
      { label: "C", body: "4" },
      { label: "D", body: "8" },
    ],
    correctLabel: "B",
    explanation: "Slope = (13 − 5) / (6 − 2) = 8 / 4 = 2.",
  },
  {
    type: "multiple_choice",
    topic: "Exponential functions",
    difficulty: "hard",
    stem: "A population of bacteria doubles every 3 hours. If the population starts at 200, which of the following functions models the population, P, after t hours?",
    choices: [
      { label: "A", body: "P(t) = 200(2)^(t/3)" },
      { label: "B", body: "P(t) = 200(3)^(t/2)" },
      { label: "C", body: "P(t) = 200(2)^(3t)" },
      { label: "D", body: "P(t) = 200 + 2t/3" },
    ],
    correctLabel: "A",
    explanation: "Doubling every 3 hours means the base is 2 raised to the number of 3-hour periods elapsed, t/3.",
  },
  {
    type: "student_response",
    topic: "Algebra",
    difficulty: "easy",
    stem: "If 3(x − 4) = 2x + 1, what is the value of x?",
    correctResponse: "13",
    explanation: "3x − 12 = 2x + 1, so x = 13.",
  },
  {
    type: "multiple_choice",
    topic: "Right triangles",
    difficulty: "medium",
    stem: "A right triangle has legs of length 9 and 12. What is the length of the hypotenuse?",
    choices: [
      { label: "A", body: "13" },
      { label: "B", body: "15" },
      { label: "C", body: "21" },
      { label: "D", body: "108" },
    ],
    correctLabel: "B",
    explanation: "9² + 12² = 81 + 144 = 225, and √225 = 15.",
  },
  {
    type: "student_response",
    topic: "Statistics",
    difficulty: "medium",
    stem: "The mean of five numbers is 18. If four of the numbers are 12, 15, 20, and 22, what is the fifth number?",
    correctResponse: "21",
    explanation: "The five numbers sum to 5 × 18 = 90. The four given numbers sum to 69, so the fifth is 90 − 69 = 21.",
  },
];

const MODULES: {
  section: "reading_writing" | "math";
  moduleNumber: 1 | 2;
  timeLimitSeconds: number;
  questions: QuestionInput[];
}[] = [
  { section: "reading_writing", moduleNumber: 1, timeLimitSeconds: 32 * 60, questions: RW_MODULE_1 },
  { section: "reading_writing", moduleNumber: 2, timeLimitSeconds: 32 * 60, questions: RW_MODULE_2 },
  { section: "math", moduleNumber: 1, timeLimitSeconds: 35 * 60, questions: MATH_MODULE_1 },
  { section: "math", moduleNumber: 2, timeLimitSeconds: 35 * 60, questions: MATH_MODULE_2 },
];

async function main() {
  const [existing] = await db
    .select({ id: practiceTests.id })
    .from(practiceTests)
    .where(eq(practiceTests.slug, TEST_SLUG))
    .limit(1);

  if (existing) {
    console.log(`Removing existing "${TEST_SLUG}" test before reseeding...`);
    await db.delete(practiceTests).where(eq(practiceTests.id, existing.id));
  }

  const [test] = await db
    .insert(practiceTests)
    .values({
      title: "Diagnostic Practice Test",
      slug: TEST_SLUG,
      description:
        "A short, full-flow sample test across all four Bluebook-style modules — Reading & Writing and Math — timed like the real thing.",
      isPublished: true,
    })
    .returning();

  for (let i = 0; i < MODULES.length; i++) {
    const mod = MODULES[i];
    const [module] = await db
      .insert(testModules)
      .values({
        testId: test.id,
        section: mod.section,
        moduleNumber: mod.moduleNumber,
        orderIndex: i,
        timeLimitSeconds: mod.timeLimitSeconds,
      })
      .returning();

    for (let qIndex = 0; qIndex < mod.questions.length; qIndex++) {
      const q = mod.questions[qIndex];
      const [question] = await db
        .insert(questions)
        .values({
          section: mod.section,
          type: q.type,
          topic: q.topic,
          difficulty: q.difficulty,
          stimulus: q.stimulus ?? null,
          stem: q.stem,
          correctResponse: q.correctResponse ?? null,
          explanation: q.explanation,
        })
        .returning();

      if (q.type === "multiple_choice" && q.choices) {
        await db.insert(choices).values(
          q.choices.map((c) => ({
            questionId: question.id,
            label: c.label,
            body: c.body,
            isCorrect: c.label === q.correctLabel,
          })),
        );
      }

      await db.insert(moduleQuestions).values({
        moduleId: module.id,
        questionId: question.id,
        orderIndex: qIndex,
      });
    }

    console.log(
      `Seeded ${mod.section} module ${mod.moduleNumber}: ${mod.questions.length} questions`,
    );
  }

  console.log(`Done. Test slug: ${TEST_SLUG}`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
