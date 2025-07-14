export const SITE_CONFIG = {
  name: "GreenCart",
  description: "Tu mercado de confianza con los mejores productos frescos y de calidad",
  phone: "+51 980-023-263",
  email: "info@greenmarket.com",
  address: "Av. Principal 123, Centro Comercial Plaza",
  hours: "Lun-Dom: 7:00 AM - 10:00 PM",
  freeShippingThreshold: 50,
  deliveryFee: 3.99,
} as const

export const NAVIGATION_ITEMS = [
  { name: "Inicio", href: "/" },
  { name: "Productos", href: "/productos" },
  { name: "Servicios", href: "/servicios" },
  { name: "Ubicación", href: "/ubicacion" },
] as const

export const PRICE_RANGE = {
  min: 0,
  max: 50,
  step: 1,
} as const

export const WHATSAPP_CONFIG = {
  phoneNumber: "51980023263", // Reemplaza con tu número de WhatsApp
  defaultMessage: "¡Hola! Me interesa conocer más sobre sus productos.",
} as const
