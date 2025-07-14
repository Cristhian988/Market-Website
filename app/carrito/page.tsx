"use client"

import { useCart } from "@/contexts/CartContext"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppButton } from "@/components/ui/WhatsAppButton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { SITE_CONFIG } from "@/lib/constants"
import { formatPrice } from "@/lib/utils"

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getCartTotal, getCartCount, clearCart } = useCart()

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const handleCheckout = () => {
    alert("¡Gracias por tu compra! Serás redirigido al proceso de pago.")
    // Aquí iría la lógica de checkout real
  }

  const cartTotal = getCartTotal()
  const shippingCost = cartTotal >= SITE_CONFIG.freeShippingThreshold ? 0 : SITE_CONFIG.deliveryFee
  const finalTotal = cartTotal + shippingCost

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h1>
            <p className="text-gray-600 mb-8">¡Agrega algunos productos deliciosos a tu carrito!</p>
            <Link href="/productos">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continuar Comprando
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
        <WhatsAppButton />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-green-600 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Carrito de Compras</h1>
          <p className="text-green-100">{getCartCount()} productos en tu carrito</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Productos en tu carrito</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg?height=80&width=80"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-green-600 font-bold">{formatPrice(item.price)}</p>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <p className="text-sm text-gray-500 line-through">{formatPrice(item.originalPrice)}</p>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, Number.parseInt(e.target.value) || 0)}
                          className="w-16 text-center"
                          min="0"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-lg">{formatPrice(item.price * item.quantity)}</p>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Vaciar Carrito
                  </Button>
                  <Link href="/productos">
                    <Button variant="outline">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Continuar Comprando
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({getCartCount()} productos)</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Envío</span>
                  <span className="text-green-600">{shippingCost === 0 ? "Gratis" : formatPrice(shippingCost)}</span>
                </div>

                {cartTotal >= SITE_CONFIG.freeShippingThreshold && (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-green-800 text-sm font-medium">🎉 ¡Felicidades! Tienes envío gratis</p>
                  </div>
                )}

                {cartTotal < SITE_CONFIG.freeShippingThreshold && (
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <p className="text-yellow-800 text-sm">
                      Agrega {formatPrice(SITE_CONFIG.freeShippingThreshold - cartTotal)} más para envío gratis
                    </p>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>

                <Button onClick={handleCheckout} className="w-full bg-green-600 hover:bg-green-700 text-lg py-3">
                  Proceder al Pago
                </Button>

                <div className="text-center text-sm text-gray-500">
                  <p>Aceptamos:</p>
                  <div className="flex justify-center space-x-2 mt-2">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">💳 Tarjetas</span>
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">💰 Efectivo</span>
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">📱 Pago móvil</span>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Información de Entrega</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Entrega en 30-60 minutos</li>
                    <li>• Seguimiento en tiempo real</li>
                    <li>• Garantía de frescura</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
