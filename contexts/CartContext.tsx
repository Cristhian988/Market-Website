"use client"

import type React from "react"
import { createContext, useContext, useCallback } from "react"
import type { CartItem } from "@/types"
import { useLocalStorage } from "@/hooks/useLocalStorage"

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Omit<CartItem, "quantity">) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
  isInCart: (id: number) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems, isLoaded] = useLocalStorage<CartItem[]>("mercado-fresco-cart", [])

  const addToCart = useCallback(
    (product: Omit<CartItem, "quantity">) => {
      setItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === product.id)
        if (existingItem) {
          return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
        }
        return [...prevItems, { ...product, quantity: 1 }]
      })
    },
    [setItems],
  )

  const removeFromCart = useCallback(
    (id: number) => {
      setItems((prevItems) => prevItems.filter((item) => item.id !== id))
    },
    [setItems],
  )

  const updateQuantity = useCallback(
    (id: number, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(id)
        return
      }
      setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
    },
    [setItems, removeFromCart],
  )

  const clearCart = useCallback(() => {
    setItems([])
  }, [setItems])

  const getCartTotal = useCallback(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [items])

  const getCartCount = useCallback(() => {
    return items.reduce((count, item) => count + item.quantity, 0)
  }, [items])

  const isInCart = useCallback(
    (id: number) => {
      return items.some((item) => item.id === id)
    },
    [items],
  )

  if (!isLoaded) {
    return null // or a loading spinner
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
