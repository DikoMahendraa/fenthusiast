import { Navbar } from "@/components/molecules/navbar"
import { HeroSection } from "@/components/organisms/hero-section"
import { BenefitsSection } from "@/components/organisms/benefits-section"
import { CurriculumSection } from "@/components/organisms/curriculum-section"
import { MaterialsPreview } from "@/components/organisms/materials-preview"
import { LearningSystem } from "@/components/organisms/learning-system"
import { CTASection } from "@/components/organisms/cta-section"
import { Footer } from "@/components/organisms/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <BenefitsSection />
        <CurriculumSection />
        <MaterialsPreview />
        <LearningSystem />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
