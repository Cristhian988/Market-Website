"use client"

import { use, useState } from "react"
import { useCart } from "@/contexts/CartContext"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppButton } from "@/components/ui/WhatsAppButton"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { QuantitySelector } from "@/components/ui/QuantitySelector"
import { Star, ShoppingCart, Heart, ArrowLeft, Truck, Shield, RotateCcw } from "lucide-react"
import Link from "next/link"
import { allProducts } from "@/data/products"
import { getRelatedProducts, formatPrice } from "@/lib/utils"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = use(params)
  const { id } = resolvedParams
  const { addToCart, isInCart, items, updateQuantity } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const product = allProducts.find((p) => p.id === Number.parseInt(id))

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <Link href="/productos">
            <Button className="bg-green-600 hover:bg-green-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Productos
            </Button>
          </Link>
        </div>
        <Footer />
        <WhatsAppButton />
      </div>
    )
  }

  const cartItem = items.find((item) => item.id === product.id)
  const currentQuantityInCart = cartItem?.quantity || 0

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
      })
    }
    setQuantity(1)
  }

  const handleUpdateCartQuantity = (newQuantity: number) => {
    updateQuantity(product.id, newQuantity)
  }

  const productImages = [
    product.image,
    "/placeholder.svg?height=400&width=400&text=Vista+2",
    "/placeholder.svg?height=400&width=400&text=Vista+3",
    "/placeholder.svg?height=400&width=400&text=Vista+4",
  ]

  const relatedProducts = getRelatedProducts(allProducts, product)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-green-600">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/productos" className="hover:text-green-600">
            Productos
          </Link>
          <span>/</span>
          <span className="capitalize">{product.category}</span>
          <span>/</span>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Imágenes del producto */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={productImages[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? "border-green-600" : "border-transparent"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Vista ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div> */}
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="capitalize">
                  {product.category}
                </Badge>
                {product.discount && <Badge className="bg-red-500 hover:bg-red-600">{product.discount}</Badge>}
                {product.inStock ? (
                  <Badge className="bg-green-500 hover:bg-green-600">En Stock</Badge>
                ) : (
                  <Badge variant="destructive">Agotado</Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>

              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600">({product.rating}) • 127 reseñas</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl font-bold text-green-600">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-2xl text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
                      Ahorra {formatPrice(product.originalPrice - product.price)}
                    </Badge>
                  </>
                )}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Descripción</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description ||
                  `${product.name} de la más alta calidad. Producto fresco y seleccionado especialmente para ti. Perfecto para tus comidas diarias y ocasiones especiales. Garantizamos frescura y sabor excepcional.`}
              </p>
            </div>

            <Separator />

            {/* Controles de cantidad y carrito */}
            <div className="space-y-4">
              {!isInCart(product.id) ? (
                <div>
                  <label className="block text-sm font-medium mb-2">Cantidad</label>
                  <div className="flex items-center space-x-4 mb-4">
                    <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
                    <span className="text-sm text-gray-600">Total: {formatPrice(product.price * quantity)}</span>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    En tu carrito: {currentQuantityInCart} unidades
                  </label>
                  <div className="flex items-center space-x-4 mb-4">
                    <QuantitySelector quantity={currentQuantityInCart} onQuantityChange={handleUpdateCartQuantity} />
                  </div>
                </div>
              )}

              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-green-600 hover:bg-green-700 h-12"
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {!product.inStock ? "No Disponible" : isInCart(product.id) ? "Agregar Más" : "Agregar al Carrito"}
                </Button>
                <Button variant="outline" size="lg" className="h-12 bg-transparent">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              <Link href="/carrito">
                <Button variant="outline" className="w-full h-12 bg-transparent">
                  Ver Carrito ({currentQuantityInCart})
                </Button>
              </Link>
            </div>

            <Separator />

            {/* Información adicional */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2 text-sm">
                <Truck className="w-4 h-4 text-green-600" />
                <span>Envío gratis +S/.50</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Garantía de frescura</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <RotateCcw className="w-4 h-4 text-green-600" />
                <span>Devolución fácil</span>
              </div>
            </div>
          </div>
        </div>

        {/* Productos relacionados */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8">Productos Relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="group hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                    <Link href={`/productos/${relatedProduct.id}`}>
                      <div className="relative">
                        <img
                          src={relatedProduct.image || "/placeholder.svg"}
                          alt={relatedProduct.name}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        {relatedProduct.discount && (
                          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                            {relatedProduct.discount}
                          </Badge>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2 group-hover:text-green-600 transition-colors">
                          {relatedProduct.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-green-600">{formatPrice(relatedProduct.price)}</span>
                          {relatedProduct.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              {formatPrice(relatedProduct.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
