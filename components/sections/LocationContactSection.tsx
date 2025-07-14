"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, Car, Bus, Navigation, MessageSquare, Send } from "lucide-react"
import { SITE_CONFIG, WHATSAPP_CONFIG } from "@/lib/constants"

const locations = [
  {
    name: "Sucursal Principal",
    address: "Av. Principal 123, Centro Comercial Plaza",
    city: "Ciudad, Estado 12345",
    phone: "+51 917-123-567",
    hours: "Lun-Dom: 7:00 AM - 10:00 PM",
    features: ["Estacionamiento gratuito", "Delivery disponible", "Farmacia", "Panadería"],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d281.76014537850546!2d-76.98514852435254!3d-12.044940314259113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c7f36058ea89%3A0x4e483557044b6248!2sMercado%20Jardines%20de%20Nocheto%20de%20yenny!5e0!3m2!1ses!2spe!4v1752272223127!5m2!1ses!2spe",
  },
  {
    name: "Sucursal Norte",
    address: "Calle Norte 456, Plaza del Norte",
    city: "Ciudad, Estado 12346",
    phone: "+51 970-573-248",
    hours: "Lun-Dom: 8:00 AM - 9:00 PM",
    features: ["Drive-thru", "Delivery disponible", "Cajeros automáticos"],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878459418!3d40.74844097932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sus!4v1635959592521!5m2!1sen!2sus", // Placeholder
  },
  {
    name: "Sucursal Sur",
    address: "Av. Sur 789, Centro Comercial Sur",
    city: "Ciudad, Estado 12347",
    phone: "+51 980-190-563",
    hours: "Lun-Sab: 7:00 AM - 10:00 PM, Dom: 8:00 AM - 9:00 PM",
    features: ["Estacionamiento gratuito", "Delivery disponible", "Área de comidas"],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d281.76014537850546!2d-76.98514852435254!3d-12.044940314259113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c7f36058ea89%3A0x4e483557044b6248!2sMercado%20Jardines%20de%20Nocheto%20de%20yenny!5e0!3m2!1ses!2spe!4v1752272223127!5m2!1ses!2spe",
  },
]

export function LocationContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Formulario enviado:", formData)
    alert("¡Gracias por contactarnos! Te responderemos pronto.")
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" }) // Clear form
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(WHATSAPP_CONFIG.defaultMessage)}`
    window.open(url, "_blank")
  }

  return (
    <section className="bg-gray-50">
      <div className="bg-green-600 text-white py-6 mb-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Ubicación y Contacto</h1>
          <p className="text-xl">Encuentra nuestras tiendas y contáctanos para cualquier consulta</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Mapa principal */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Ubicación Principal</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <iframe src={locations[0].mapEmbedUrl} width="100%" height="400" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>

        {/* Secciones combinadas */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Sucursales */}
          <div>
            <h2 className="text-2xl font-bold mb-8">Nuestras Sucursales</h2>
            <div className="space-y-6">
              {locations.map((location, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-green-600" />
                      {location.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-semibold text-gray-800">Dirección:</p>
                      <p className="text-gray-600">{location.address}</p>
                      <p className="text-gray-600">{location.city}</p>
                    </div>

                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-green-600" />
                      <span className="text-gray-600">{location.phone}</span>
                    </div>

                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-green-600" />
                      <span className="text-gray-600">{location.hours}</span>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-800 mb-2">Servicios:</p>
                      <div className="flex flex-wrap gap-2">
                        {location.features.map((feature, idx) => (
                          <span key={idx} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                        <Navigation className="w-4 h-4 mr-1" />
                        Cómo llegar
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Phone className="w-4 h-4 mr-1" />
                        Llamar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Formulario de contacto */}
          <div>
            <h2 className="text-2xl font-bold mb-8">Contáctanos</h2>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-[#1E3A8A]" />
                  Envíanos un Mensaje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nombre Completo *</Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="Tu número de teléfono"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Asunto</Label>
                    <Select onValueChange={(value) => handleChange("subject", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tema" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consulta">Consulta General</SelectItem>
                        <SelectItem value="pedido">Problema con Pedido</SelectItem>
                        <SelectItem value="delivery">Servicio de Delivery</SelectItem>
                        <SelectItem value="productos">Consulta sobre Productos</SelectItem>
                        <SelectItem value="sugerencia">Sugerencia</SelectItem>
                        <SelectItem value="reclamo">Reclamo</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Mensaje *</Label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Escribe tu mensaje aquí..."
                    />
                  </div>

                  <Button type="submit" className="w-full bg-[#1E3A8A] hover:bg-[#1E3A8A]/90">
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Información de transporte */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Car className="w-5 h-5 mr-2 text-blue-600" />
                En Automóvil
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li>• Estacionamiento gratuito disponible</li>
                <li>• Fácil acceso desde la autopista principal</li>
                <li>• Espacios para personas con discapacidad</li>
                <li>• Servicio de valet parking los fines de semana</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bus className="w-5 h-5 mr-2 text-blue-600" />
                Transporte Público
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li>• Líneas de autobús: 15, 23, 45, 67</li>
                <li>• Parada a 2 cuadras de la tienda</li>
                <li>• Metro: Estación Plaza (Línea Verde)</li>
                <li>• Servicio de taxi y Uber disponible</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Información de contacto rápido */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-center mb-6">Información de Contacto</h3>

          <div className="grid md:grid-cols-4 gap-6 text-center mb-8">
            <div>
              <Phone className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold mb-2">Teléfono Principal</h4>
              <p className="text-gray-600">{SITE_CONFIG.phone}</p>
              <p className="text-sm text-gray-500">Atención 24/7</p>
            </div>

            <div>
              <Mail className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold mb-2">Email</h4>
              <p className="text-gray-600">{SITE_CONFIG.email}</p>
              <p className="text-sm text-gray-500">Respuesta en 24 horas</p>
            </div>

            <div>
              <MapPin className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold mb-2">Oficina Central</h4>
              <p className="text-gray-600">{SITE_CONFIG.address.split(",")[0]}</p>
              <p className="text-sm text-gray-500">{SITE_CONFIG.address.split(",")[1]}</p>
            </div>

            <div>
              <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold mb-2">Horarios</h4>
              <p className="text-gray-600">Lun-Dom</p>
              <p className="text-sm text-gray-500">{SITE_CONFIG.hours}</p>
            </div>
          </div>

          {/* Botones de contacto rápido */}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <Button className="bg-green-600 hover:bg-green-700 h-12">
              <Phone className="w-4 h-4 mr-2" />
              Llamar Ahora
            </Button>
            <Button className="bg-green-500 hover:bg-green-600 h-12" onClick={handleWhatsAppClick}>
              <MessageSquare className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </div>
        </div>

        {/* FAQ rápido */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Preguntas Frecuentes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">¿Cuál es el tiempo de entrega?</h3>
                <p className="text-gray-600 text-sm">
                  Nuestro tiempo de entrega estándar es de 30-60 minutos dentro de la ciudad.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">¿Tienen envío gratis?</h3>
                <p className="text-gray-600 text-sm">Sí, ofrecemos envío gratis en compras mayores a $50.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">¿Qué formas de pago aceptan?</h3>
                <p className="text-gray-600 text-sm">
                  Aceptamos efectivo, tarjetas de crédito/débito, transferencias y pago móvil.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">¿Puedo cambiar mi pedido?</h3>
                <p className="text-gray-600 text-sm">
                  Puedes modificar tu pedido hasta 15 minutos después de realizarlo.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
