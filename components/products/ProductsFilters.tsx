"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { categories, brands } from "@/data/products"
import { PRICE_RANGE } from "@/lib/constants"
import { formatPrice } from "@/lib/utils"

interface ProductsFiltersProps {
  selectedCategories: string[]
  selectedBrands: string[]
  priceRange: number[]
  inStockOnly: boolean
  onSaleOnly: boolean
  onCategoryChange: (categoryId: string, checked: boolean) => void
  onBrandChange: (brandId: string, checked: boolean) => void
  onPriceRangeChange: (range: number[]) => void
  onInStockChange: (checked: boolean) => void
  onSaleChange: (checked: boolean) => void
  onClearFilters: () => void
  hasActiveFilters: boolean
}

export function ProductsFilters({
  selectedCategories,
  selectedBrands,
  priceRange,
  inStockOnly,
  onSaleOnly,
  onCategoryChange,
  onBrandChange,
  onPriceRangeChange,
  onInStockChange,
  onSaleChange,
  onClearFilters,
  hasActiveFilters,
}: ProductsFiltersProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Filtros</h2>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            Limpiar
          </Button>
        )}
      </div>

      {/* Filtros activos */}
      {hasActiveFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Filtros Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((categoryId) => {
                const category = categories.find((c) => c.id === categoryId)
                return (
                  <Badge key={categoryId} variant="secondary" className="cursor-pointer">
                    {category?.name}
                    <button onClick={() => onCategoryChange(categoryId, false)} className="ml-1 text-xs">
                      ×
                    </button>
                  </Badge>
                )
              })}
              {selectedBrands.map((brandId) => {
                const brand = brands.find((b) => b.id === brandId)
                return (
                  <Badge key={brandId} variant="secondary" className="cursor-pointer">
                    {brand?.name}
                    <button onClick={() => onBrandChange(brandId, false)} className="ml-1 text-xs">
                      ×
                    </button>
                  </Badge>
                )
              })}
              {inStockOnly && (
                <Badge variant="secondary" className="cursor-pointer">
                  En stock
                  <button onClick={() => onInStockChange(false)} className="ml-1 text-xs">
                    ×
                  </button>
                </Badge>
              )}
              {onSaleOnly && (
                <Badge variant="secondary" className="cursor-pointer">
                  En oferta
                  <button onClick={() => onSaleChange(false)} className="ml-1 text-xs">
                    ×
                  </button>
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categorías */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Categorías</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={(checked) => onCategoryChange(category.id, checked as boolean)}
                />
                <label
                  htmlFor={category.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
                >
                  {category.name}
                </label>
                <span className="text-xs text-gray-500">({category.count})</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rango de precios */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Rango de Precios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={priceRange}
              onValueChange={onPriceRangeChange}
              max={PRICE_RANGE.max}
              step={PRICE_RANGE.step}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Marcas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Marcas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {brands.map((brand) => (
              <div key={brand.id} className="flex items-center space-x-2">
                <Checkbox
                  id={brand.id}
                  checked={selectedBrands.includes(brand.id)}
                  onCheckedChange={(checked) => onBrandChange(brand.id, checked as boolean)}
                />
                <label
                  htmlFor={brand.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
                >
                  {brand.name}
                </label>
                <span className="text-xs text-gray-500">({brand.count})</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Disponibilidad */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Disponibilidad</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="in-stock" checked={inStockOnly} onCheckedChange={onInStockChange} />
              <label htmlFor="in-stock" className="text-sm font-medium cursor-pointer">
                En stock
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="on-sale" checked={onSaleOnly} onCheckedChange={onSaleChange} />
              <label htmlFor="on-sale" className="text-sm font-medium cursor-pointer">
                En oferta
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
