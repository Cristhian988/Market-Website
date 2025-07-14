import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"
import { Badge } from "../ui/badge"

export function HeroSection() {
  return (
    <div className="relative">
      <img
        src='/main_banner_bg.png'
        alt="main banner"
        className="w-full hidden md:block"
      />
      <img
        src='/main_banner_bg_sm.png'
        alt="main banner"
        className="w-full block md:hidden"
      />

      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-16 md:pb-0 px-4 md:pl-20 lg:pl-60">
        <div className="space-y-6">
          <Badge className="bg-yellow-500 text-black hover:bg-yellow-400 text-sm font-semibold px-3 py-1">
            🔥 OFERTA ESPECIAL - 30% OFF
          </Badge>
        <h1 className="text-3xl md:text-4xl lg:text-6xl text-[#1c2a18] font-bold leading-tight text-center md:text-left max-w-72 md:max-w-fit lg:max-w-full">
          ¡Frescura en la que puede confiar,
          <span className="block text-[#ff9900]">ahorros que le encantarán!</span>
        </h1>
        </div>

        <div className="flex items-center mt-6 md:mt-12 font-medium">
          <Link
            href={"/productos"}
            className="group flex items-center gap-2 px-7 md:px-9 py-3 bg-green-600 hover:bg-[#44ae7c] transition rounded text-white cursor-pointer"
          >
            Shop now{" "}
            
          </Link>
          <Link
            href={"/productos"}
            className="group hidden md:flex items-center gap-2 px-9 py-3cursor-pointer"
          >
            Explore deals{" "}
            <ArrowRightIcon className="w-5 h-5 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}
