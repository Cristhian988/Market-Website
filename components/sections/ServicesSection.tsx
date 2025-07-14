import { Card, CardContent } from "@/components/ui/card"
import { Truck, Clock, Shield, Headphones } from "lucide-react"

const services = [
  {
    icon: Truck,
    title: "Envío Gratis",
    description: "Envío gratuito en compras mayores a $50. Entrega rápida y segura.",
  },
  {
    icon: Clock,
    title: "Abierto 24/7",
    description: "Estamos disponibles todos los días de la semana para servirte.",
  },
  {
    icon: Shield,
    title: "Calidad Garantizada",
    description: "Productos frescos y de la mejor calidad. Garantía de satisfacción.",
  },
  {
    icon: Headphones,
    title: "Soporte al Cliente",
    description: "Atención personalizada y soporte técnico cuando lo necesites.",
  },
]

export function ServicesSection() {
  return (
    <section id="servicios" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Nuestros Servicios</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ofrecemos servicios de calidad para hacer tu experiencia de compra excepcional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
