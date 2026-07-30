import { Hero } from "@/components/hero";
import { StatBand } from "@/components/stat-band";
import { MissionSection } from "@/components/mission-section";
import { FeaturesSection } from "@/components/features-section";
import { ResourcesSection } from "@/components/resources-section";
import { CtaBand } from "@/components/cta-band";

export default function Home() {
  return (
    <>
      <Hero />
      <StatBand />
      <MissionSection />
      <FeaturesSection />
      <ResourcesSection />
      <CtaBand />
    </>
  );
}
