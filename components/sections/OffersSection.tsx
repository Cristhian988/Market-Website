"use client"

import { useCart } from "@/contexts/CartContext"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, ShoppingCart } from "lucide-react"
import { offers } from "@/data/products"
import { formatPrice } from "@/lib/utils"

export function OffersSection() {
  const { addToCart, isInCart } = useCart()

  const handleAddToCart = (offer: (typeof offers)[0]) => {
    addToCart({
      id: offer.id,
      name: offer.name,
      price: offer.price,
      originalPrice: offer.originalPrice,
      image: offer.image,
      category: "ofertas",
    })
  }

  return (
    <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <small className="text-sm text-gray-600 mb-2.5">¡Solo por tiempo limitado!</small>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">🔥 ¡AHORRA HASTA 70%! 🔥</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Los precios más bajos en productos frescos y de primera calidad</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {offers.map((offer) => (
            <Card key={offer.id} className="group hover:shadow-xl transition-all duration-300 border-2 border-red-100">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={offer.image || "/placeholder.svg"}
                    alt={offer.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white font-bold">
                    {offer.discount}
                  </Badge>
                  <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {offer.timeLeft}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{offer.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{offer.description}</p>

                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-3xl font-bold text-red-600">{formatPrice(offer.price)}</span>
                    <span className="text-lg text-gray-400 line-through">{formatPrice(offer.originalPrice)}</span>
                  </div>

                  <div className="text-sm text-green-600 font-semibold">
                    ¡Ahorras {formatPrice(offer.originalPrice - offer.price)}!
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button
                  onClick={() => handleAddToCart(offer)}
                  className="w-full bg-red-600 hover:bg-red-700 font-semibold"
                  disabled={isInCart(offer.id)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {isInCart(offer.id) ? "En el Carrito" : "Aprovechar Oferta"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="bg-[#f1c232] border border-yellow-200 rounded-lg px-6 py-2 text-center">
          <h3 className="text-xl font-bold text-[#7f6000] mb-2">⚡ Ofertas Flash</h3>
          <p className="text-yellow-700 mb-4">
            Suscríbete a nuestras notificaciones para recibir ofertas exclusivas por tiempo muy limitado
          </p>
        </div>
      </div>
    </section>
  )
}
