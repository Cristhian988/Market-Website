"use client"

import { useCart } from "@/contexts/CartContext"
import { ProductCard } from "@/components/ui/ProductCard"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import type { Product } from "@/types"

interface ProductGridProps {
  products: Product[]
  searchQuery?: string
}

export function ProductGrid({ products, searchQuery }: ProductGridProps) {
  const { addToCart, isInCart } = useCart()

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
    })
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <ShoppingCart className="w-16 h-16 mx-auto mb-4" />
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron productos</h3>
        <p className="text-gray-500">
          {searchQuery
            ? `No hay productos que coincidan con "${searchQuery}"`
            : "Intenta ajustar los filtros para ver más productos"}
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {searchQuery ? `Resultados para "${searchQuery}"` : "Todos los Productos"}
        </h2>
        <p className="text-gray-600">{products.length} productos encontrados</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            isInCart={isInCart(product.id)}
          />
        ))}
      </div>

      {/* Paginación (Placeholder) */}
      {/* <div className="flex justify-center mt-8">
        <div className="flex space-x-2">
          <Button variant="outline" disabled>
            Anterior
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">1</Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <Button variant="outline">Siguiente</Button>
        </div>
      </div> */}
    </div>
  )
}
