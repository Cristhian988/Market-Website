import { Facebook, Instagram, Twitter, Youtube, Package, Phone, Mail, Clock, MapPin } from "lucide-react"
import Link from "next/link"
import { SITE_CONFIG } from "@/lib/constants"
import { categories } from "@/data/products"
import { enlaces_rapidos } from "@/data/products"

export function Footer() {
  return (
    <footer id="contacto" className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">{SITE_CONFIG.name}</h3>
            </Link>
            <p className="text-gray-300">{SITE_CONFIG.description}</p>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/" target="_blank">
                <Facebook className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer" />
              </Link>
              <Link href="https://www.instagram.com/" target="_blank">
                <Instagram className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer" />
              </Link>
              <Link href="https://twitter.com/" target="_blank">
                <Twitter className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer" />
              </Link>
              <Link href="https://www.youtube.com/" target="_blank">
                <Youtube className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer" />
              </Link>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {enlaces_rapidos.map((enlace) => (
                <li key={enlace.id}>
                  <Link href={enlace.href} className="text-gray-300 hover:text-white">
                    {enlace.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categorías */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categorías</h4>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/productos?selectedCategories=${category.id}`}
                    className="text-gray-300 hover:text-white capitalize"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-4 text-gray-300">
              <p className="flex items-center gap-4"><MapPin className="w-6 h-6 text-gray-300" /> {SITE_CONFIG.address}</p>
              <p className="flex items-center gap-4"><Phone className="w-6 h-6 text-gray-300" /> {SITE_CONFIG.phone}</p>
              <p className="flex items-center gap-4"><Mail className="w-6 h-6 text-gray-300" /> {SITE_CONFIG.email}</p>
              <p className="flex items-center gap-4"><Clock className="w-6 h-6 text-gray-300" /> {SITE_CONFIG.hours}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">© {new Date().getFullYear()} {SITE_CONFIG.name}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
