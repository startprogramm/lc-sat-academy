import { auth } from "@/auth";
import { Hero } from "@/components/hero";
import { StatBand } from "@/components/stat-band";
import { MissionSection } from "@/components/mission-section";
import { FeaturesSection } from "@/components/features-section";
import { ProductSpotlight } from "@/components/product-spotlight";
import { TestModuleVisual } from "@/components/visuals/test-module-visual";
import { QuestionCardStack } from "@/components/visuals/question-card-stack";
import { ScoreTrendVisual } from "@/components/visuals/score-trend-visual";
import { ResourcesSection } from "@/components/resources-section";
import { CtaBand } from "@/components/cta-band";

export default async function Home() {
  const session = await auth();
  const signedIn = !!session?.user;

  return (
    <>
      <Hero />
      <StatBand />
      <MissionSection />
      <FeaturesSection />

      <ProductSpotlight
        id="practice-tests"
        eyebrow="Practice tests"
        title="Full-length practice tests, timed like test day"
        body="Every practice test mirrors the real digital SAT: two adaptive modules per section, Bluebook-style timing, and instant scoring the moment you submit."
        signedIn={signedIn}
        visual={<TestModuleVisual />}
        bullets={[
          "14 full-length practice tests, each with two adaptive modules per section",
          "Timing and pacing that matches the real Bluebook app",
          "Auto-scored the second you submit — no waiting on results",
          "Every attempt saved to your dashboard so you can track improvement over time",
        ]}
      />

      <ProductSpotlight
        id="question-bank"
        reverse
        eyebrow="Question bank"
        title="Drill by topic until it clicks"
        body="Browse thousands of Reading & Writing and Math questions, filtered by subject, skill, and difficulty — each with a full explanation, not just an answer key."
        signedIn={signedIn}
        visual={<QuestionCardStack />}
        bullets={[
          "2,400+ questions across Reading & Writing and Math",
          "Filter by subject, skill, and difficulty as you improve",
          "Every question includes an explanation that teaches the underlying skill",
          "Missed questions are queued for review automatically",
        ]}
      />

      <ProductSpotlight
        id="progress"
        eyebrow="Progress"
        title="See exactly what's costing you points"
        body="Score history, section breakdowns, and weak-area tracking — updated after every practice test and question set you complete."
        signedIn={signedIn}
        visual={<ScoreTrendVisual />}
        bullets={[
          "Score trend across every full-length test you take",
          "Section-by-section and skill-by-skill breakdowns",
          "Weak areas surfaced automatically so you know what to study next",
          "One dashboard for every attempt, from your first diagnostic to test day",
        ]}
      />

      <ResourcesSection />
      <CtaBand />
    </>
  );
}
