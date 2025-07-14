"use client"

import { Button } from "@/components/ui/button"
import { Plus, Minus } from "lucide-react"

interface QuantitySelectorProps {
  quantity: number
  onQuantityChange: (quantity: number) => void
  min?: number
  max?: number
  disabled?: boolean
}

export function QuantitySelector({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
  disabled = false,
}: QuantitySelectorProps) {
  const handleDecrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1)
    }
  }

  const handleIncrease = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1)
    }
  }

  return (
    <div className="flex items-center border rounded-lg">
      <Button size="sm" variant="ghost" onClick={handleDecrease} disabled={disabled || quantity <= min}>
        <Minus className="w-4 h-4" />
      </Button>
      <span className="px-4 py-2 font-medium">{quantity}</span>
      <Button size="sm" variant="ghost" onClick={handleIncrease} disabled={disabled || quantity >= max}>
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  )
}
