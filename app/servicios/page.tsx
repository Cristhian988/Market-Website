import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppButton } from "@/components/ui/WhatsAppButton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Truck, Clock, Shield, Headphones, CreditCard, Users, MapPin, Smartphone } from "lucide-react"
import type { Metadata } from "next"
import { WHATSAPP_CONFIG } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Servicios - Mercado Fresco",
  description: "Conoce todos nuestros servicios y beneficios para una mejor experiencia de compra",
}

const mainServices = [
  {
    icon: Truck,
    title: "Delivery a Domicilio",
    description: "Entrega rápida y segura en toda la ciudad",
    features: ["Envío gratis en compras +$50", "Entrega en 30-60 minutos", "Seguimiento en tiempo real"],
    price: "Desde $3.99",
  },
  {
    icon: Smartphone,
    title: "Pedidos por WhatsApp",
    description: "Ordena fácilmente por mensaje de texto",
    features: ["Atención 24/7", "Catálogo completo", "Confirmación inmediata"],
    price: "Sin costo adicional",
  },
  {
    icon: CreditCard,
    title: "Múltiples Formas de Pago",
    description: "Paga como prefieras, sin complicaciones",
    features: ["Efectivo", "Tarjetas de crédito/débito", "Transferencias bancarias", "Pago móvil"],
    price: "Sin recargos",
  },
  {
    icon: Users,
    title: "Programa de Fidelidad",
    description: "Acumula puntos y obtén beneficios exclusivos",
    features: ["Puntos por cada compra", "Descuentos especiales", "Ofertas exclusivas"],
    price: "Gratis",
  },
]

const additionalServices = [
  {
    icon: Shield,
    title: "Garantía de Frescura",
    description: "Si no estás satisfecho, te devolvemos tu dinero",
  },
  {
    icon: Clock,
    title: "Horario Extendido",
    description: "Abierto todos los días de 7:00 AM a 10:00 PM",
  },
  {
    icon: Headphones,
    title: "Soporte al Cliente",
    description: "Atención personalizada para resolver tus dudas",
  },
  {
    icon: MapPin,
    title: "Múltiples Ubicaciones",
    description: "Encuentra nuestra tienda más cercana a ti",
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-[#1E3A8A] text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Nuestros Servicios</h1>
          <p className="text-xl">Diseñados para hacer tu experiencia de compra excepcional</p>
        </div>
      </div>

      {/* Servicios principales */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Servicios Principales</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {mainServices.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <p className="text-blue-600 font-semibold">{service.price}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-4 bg-[#1E3A8A] hover:bg-[#1E3A8A]/90">Solicitar Servicio</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Servicios adicionales */}
        <h2 className="text-3xl font-bold text-center mb-12">Beneficios Adicionales</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {additionalServices.map((service, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sección de contacto para servicios */}
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">¿Necesitas un servicio personalizado?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Contáctanos para servicios especiales como catering, pedidos corporativos, o cualquier necesidad específica
            que tengas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Contactar por WhatsApp
            </Button>
            <Button size="lg" variant="outline">
              Llamar Ahora
            </Button>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
