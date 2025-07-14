"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart } from "lucide-react"
import type { Product } from "@/types"
import { formatPrice } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
  isInCart: boolean
}

export function ProductCard({ product, onAddToCart, isInCart }: ProductCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300 relative">
      <CardContent className="p-0">
        <Link href={`/productos/${product.id}`}>
          <div className="relative">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            
            {product.discount && (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">{product.discount}</Badge>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-t-lg">
                <span className="text-white font-semibold">Agotado</span>
              </div>
            )}
          </div>
        </Link>

        <Button size="sm" variant="ghost" className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-white z-10">
          <Heart className="w-4 h-4" />
        </Button>

        <div className="p-4">
          <Link href={`/productos/${product.id}`}>
            <h3 className="font-semibold text-lg mb-2 group-hover:text-green-600 transition-colors cursor-pointer">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <span className="text-2xl font-bold text-green-600">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="capitalize text-xs">
              {product.category}
            </Badge>
            {product.brand && (
              <Badge variant="outline" className="capitalize text-xs">
                {product.brand}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => onAddToCart(product)}
          className="w-full bg-green-600 hover:bg-green-700"
          disabled={!product.inStock || isInCart}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {!product.inStock ? "No Disponible" : isInCart ? "En el Carrito" : "Agregar al Carrito"}
        </Button>
      </CardFooter>
    </Card>
  )
}
