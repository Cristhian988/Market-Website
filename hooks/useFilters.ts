"use client"

import { useState, useCallback, useEffect } from "react"
import type { FilterState } from "@/types"
import { PRICE_RANGE } from "@/lib/constants"

const initialFilters: FilterState = {
  selectedCategories: [],
  selectedBrands: [],
  priceRange: [PRICE_RANGE.min, PRICE_RANGE.max],
  inStockOnly: false,
  onSaleOnly: false,
  searchQuery: "",
}

export function useFilters(initialSearchQuery = "") {
  const [filters, setFilters] = useState<FilterState>({
    ...initialFilters,
    searchQuery: initialSearchQuery,
  })
  
  useEffect(() => {
    setFilters((prev) => ({ ...prev, searchQuery: initialSearchQuery }))
  }, [initialSearchQuery])

  const updateCategoryFilter = useCallback((categoryId: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      selectedCategories: checked
        ? [...prev.selectedCategories, categoryId]
        : prev.selectedCategories.filter((id) => id !== categoryId),
    }))
  }, [])

  const updateBrandFilter = useCallback((brandId: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      selectedBrands: checked ? [...prev.selectedBrands, brandId] : prev.selectedBrands.filter((id) => id !== brandId),
    }))
  }, [])

  const updatePriceRange = useCallback((range: number[]) => {
    setFilters((prev) => ({ ...prev, priceRange: range }))
  }, [])

  const updateInStockFilter = useCallback((checked: boolean) => {
    setFilters((prev) => ({ ...prev, inStockOnly: checked }))
  }, [])

  const updateSaleFilter = useCallback((checked: boolean) => {
    setFilters((prev) => ({ ...prev, onSaleOnly: checked }))
  }, [])

  const clearFilters = useCallback(() => {
    setFilters({ ...initialFilters, searchQuery: filters.searchQuery })
  }, [filters.searchQuery])

  return {
    filters,
    updateCategoryFilter,
    updateBrandFilter,
    updatePriceRange,
    updateInStockFilter,
    updateSaleFilter,
    clearFilters,
  }
}
