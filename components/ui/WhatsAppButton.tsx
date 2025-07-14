"use client"

import { FaWhatsapp } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { WHATSAPP_CONFIG } from "@/lib/constants"

export function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(WHATSAPP_CONFIG.defaultMessage)}`
    window.open(url, "_blank")
  }

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg z-50 p-0"
      size="lg"
    >
      <FaWhatsapp className="w-6 h-6 text-white" />
      <span className="sr-only">Contactar por WhatsApp</span>
    </Button>
  )
}
