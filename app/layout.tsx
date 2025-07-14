import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { CartProvider } from "@/contexts/CartContext"
import { SITE_CONFIG } from "@/lib/constants"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} - Tu mercado de confianza`,
  description: SITE_CONFIG.description,
  keywords: "mercado, productos frescos, carnes, lácteos, verduras, frutas, supermercado",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
