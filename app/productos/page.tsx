import type { Metadata } from "next"
import ProductsPageClient from "./ProductsPageClient"

// Metadata para la página de productos (Server Component)
export const metadata: Metadata = {
  title: "Productos y Ofertas - Mercado Fresco",
  description: "Explora nuestra amplia variedad de productos frescos y aprovecha nuestras ofertas especiales",
}

export default function ProductsPage() {
  return <ProductsPageClient />
}
