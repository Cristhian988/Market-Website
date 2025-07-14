"use client"

import { useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppButton } from "@/components/ui/WhatsAppButton"
import { ProductGrid } from "@/components/products/ProductGrid"
import { ProductsFilters } from "@/components/products/ProductsFilters"
import { OffersSection } from "@/components/sections/OffersSection"
import { useFilters } from "@/hooks/useFilters"
import { filterProducts } from "@/lib/utils"
import { allProducts } from "@/data/products"

export default function ProductsPageClient() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search") || ""

  const {
    filters,
    updateCategoryFilter,
    updateBrandFilter,
    updatePriceRange,
    updateInStockFilter,
    updateSaleFilter,
    clearFilters,
  } = useFilters(searchQuery)

  const filteredProducts = filterProducts(allProducts, filters)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-green-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            {searchQuery ? `Búsqueda: "${searchQuery}"` : "Productos y Ofertas"}
          </h1>
          <p className="text-xl">
            {searchQuery
              ? `${filteredProducts.length} productos encontrados`
              : "Descubre nuestra amplia variedad de productos frescos y aprovecha nuestras ofertas especiales"}
          </p>
        </div>
      </div>

      {/* Sección de Ofertas Especiales - Solo mostrar si no hay búsqueda */}
      {!searchQuery && <OffersSection />}

      {/* Sección de Productos */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ProductsFilters
              selectedCategories={filters.selectedCategories}
              selectedBrands={filters.selectedBrands}
              priceRange={filters.priceRange}
              inStockOnly={filters.inStockOnly}
              onSaleOnly={filters.onSaleOnly}
              onCategoryChange={updateCategoryFilter}
              onBrandChange={updateBrandFilter}
              onPriceRangeChange={updatePriceRange}
              onInStockChange={updateInStockFilter}
              onSaleChange={updateSaleFilter}
              onClearFilters={clearFilters}
              hasActiveFilters={
                filters.selectedCategories.length > 0 ||
                filters.selectedBrands.length > 0 ||
                filters.inStockOnly ||
                filters.onSaleOnly
              }
            />
          </div>
          <div className="lg:col-span-3">
            <ProductGrid products={filteredProducts} searchQuery={searchQuery} />
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
