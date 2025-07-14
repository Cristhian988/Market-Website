import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppButton } from "@/components/ui/WhatsAppButton"
import { LocationContactSection } from "@/components/sections/LocationContactSection"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ubicación y Contacto - Mercado Fresco",
  description: "Encuentra nuestras tiendas y contáctanos para cualquier consulta",
}

export default function LocationContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <LocationContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
