import { Header } from "@/components/layout/Header"
import { HeroSection } from "@/components/sections/HeroSection"
import { FeaturedProductsSection } from "@/components/sections/FeaturedProductsSection"
import { ServicesSection } from "@/components/sections/ServicesSection"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppButton } from "@/components/ui/WhatsAppButton"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <FeaturedProductsSection />
        <ServicesSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
