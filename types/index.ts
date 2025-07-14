export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  category: string
  discount?: string
  inStock: boolean
  description?: string
  brand?: string
}

export interface CartItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  quantity: number
  category?: string
}

export interface EnlaceRapido {
  id: string
  name: string
  href: string
}

export interface Category {
  id: string
  name: string
  count: number
}

export interface Brand {
  id: string
  name: string
  count: number
}

export interface FilterState {
  selectedCategories: string[]
  selectedBrands: string[]
  priceRange: number[]
  inStockOnly: boolean
  onSaleOnly: boolean
  searchQuery: string
}
