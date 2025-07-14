"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCart } from "@/contexts/CartContext"
import { Menu, X, ShoppingCart, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SearchBar } from "@/components/ui/SearchBar"
import { NAVIGATION_ITEMS, SITE_CONFIG } from "@/lib/constants"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { getCartCount } = useCart()

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 text-sm text-gray-600 border-b">
          <div className="flex items-center space-x-4">
            <span>📞 {SITE_CONFIG.phone}</span>
            <span>📧 {SITE_CONFIG.email}</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <span>🕒 {SITE_CONFIG.hours}</span>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
             <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-600">{SITE_CONFIG.name}</h1>
              <p className="text-sm text-gray-500">Tu mercado de confianza</p>
            </div>
          </Link>

          {/* Search bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <SearchBar className="w-full" />
          </div>

          {/* Cart and Menu */}
          <div className="flex items-center space-x-4">
            <Link href="/carrito">
              <Button variant="outline" size="sm" className="hidden md:flex bg-transparent relative">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Carrito
                {getCartCount() > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white text-xs px-1 min-w-[20px] h-5">
                    {getCartCount()}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile cart button */}
            <Link href="/carrito" className="md:hidden relative">
              <Button variant="ghost" size="sm">
                <ShoppingCart className="w-6 h-6" />
                {getCartCount() > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white text-xs px-1 min-w-[18px] h-4">
                    {getCartCount()}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <SearchBar className="w-full" />
          </div>
        )}

        {/* Navigation */}
        <nav className={`${isMenuOpen ? "block" : "hidden"} md:block pb-4 md:pb-0`}>
          <ul className="flex flex-col md:flex-row md:items-center md:space-x-8 space-y-2 md:space-y-0">
            {NAVIGATION_ITEMS.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`block py-2 font-medium transition-colors ${
                    pathname === item.href
                      ? "text-green-600 border-b-2 border-green-600"
                      : "text-gray-700 hover:text-green-600"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
