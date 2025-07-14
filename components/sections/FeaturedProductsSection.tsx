"use client"

import { useCart } from "@/contexts/CartContext"
import { ProductCard } from "@/components/ui/ProductCard"
import { Button } from "@/components/ui/button"
import { allProducts } from "@/data/products"
import Link from "next/link"

export function FeaturedProductsSection() {
  const { addToCart, isInCart } = useCart()

  const handleAddToCart = (product: (typeof allProducts)[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
    })
  }

  // Seleccionar algunos productos destacados, por ejemplo, los primeros 6
  const featuredProducts = allProducts.slice(0, 6)

  return (
    <section id="productos" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Productos Destacados</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre nuestros productos más populares con ofertas especiales
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              isInCart={isInCart(product.id)}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/productos">
            <Button
              size="lg"
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white bg-transparent"
            >
              Ver Todos los Productos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
