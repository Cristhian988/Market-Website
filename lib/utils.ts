import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Product, FilterState } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return `S/.${price.toFixed(2)}`
}

export function calculateDiscount(originalPrice: number, currentPrice: number): number {
  if (originalPrice <= 0) return 0
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
}

export function filterProducts(products: Product[], filters: FilterState): Product[] {
  return products.filter((product) => {
    // Filtro de búsqueda
    const matchesSearch =
      !filters.searchQuery ||
      product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      (product.brand && product.brand.toLowerCase().includes(filters.searchQuery.toLowerCase()))

    // Filtro de categorías
    const matchesCategory =
      filters.selectedCategories.length === 0 || filters.selectedCategories.includes(product.category)

    // Filtro de marcas
    const matchesBrand =
      filters.selectedBrands.length === 0 || (product.brand && filters.selectedBrands.includes(product.brand))

    // Filtro de precio
    const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]

    // Filtro de stock
    const matchesStock = !filters.inStockOnly || product.inStock

    // Filtro de ofertas
    const matchesSale = !filters.onSaleOnly || (product.originalPrice && product.originalPrice > product.price)

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesStock && matchesSale
  })
}

export function getRelatedProducts(products: Product[], currentProduct: Product, limit = 4): Product[] {
  return products.filter((p) => p.category === currentProduct.category && p.id !== currentProduct.id).slice(0, limit)
}
