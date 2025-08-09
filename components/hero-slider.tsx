"use client"

import { useEffect, useMemo, useState } from "react"
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react"

type Slide = {
  src: string
  alt: string
  bg?: string
}

const SLIDES: Slide[] = [
  {
    src: "/digital-keys-deals.png.jpg",
    alt: "Only the best digital gaming deals",
    bg: "bg-gradient-to-r from-slate-900 to-slate-800",
  },
  {
    src: "/playstation-plus.jpg.webp.webp.jpg",
    alt: "PlayStation gift cards and top games",
    bg: "bg-black",
  },
  {
    src: "/netflix-gift-card.png..png.jpg",
    alt: "Netflix Gift Cards - No ads. No commitments.",
    bg: "bg-zinc-900",
  },
  {
    src: "/playstation-plus-code.png.jpg",
    alt: "PS Store summer promo up to 75% off",
    bg: "bg-gradient-to-r from-fuchsia-100 to-rose-100",
  },
]

export default function HeroSlider() {
  const [idx, setIdx] = useState(0)
  const total = SLIDES.length
  const go = (i: number) => setIdx((p) => (i + total) % total)

  // Autoplay
  useEffect(() => {
    const t = setInterval(() => go(idx + 1), 5000)
    return () => clearInterval(t)
  }, [idx])

  const slide = useMemo(() => SLIDES[idx], [idx])

  return (
    <section className="w-full rounded-xl overflow-hidden border bg-white">
      <div className={`relative h-[220px] sm:h-[320px] lg:h-[380px] ${slide.bg || ""}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={slide.src || "/placeholder.svg"}
          alt={slide.alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <button
          onClick={() => go(idx - 1)}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 grid place-items-center rounded-full bg-white/90 hover:bg-white shadow"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => go(idx + 1)}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 grid place-items-center rounded-full bg-white/90 hover:bg-white shadow"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full ${i === idx ? "bg-emerald-600" : "bg-white/80 border"}`}
            />
          ))}
        </div>
      </div>

      {/* Trust strip like the example */}
      <div className="hidden sm:grid grid-cols-1 md:grid-cols-3 gap-3 px-4 py-3 bg-white">
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle className="h-4 w-4 text-emerald-600" />
          <span>
            <span className="font-semibold">Instant</span> digital delivery
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle className="h-4 w-4 text-emerald-600" />
          <span>
            Gamers rate us <span className="font-semibold">4.4 / 5</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle className="h-4 w-4 text-emerald-600" />
          <span>
            <span className="font-semibold">Official codes</span> from top brands
          </span>
        </div>
      </div>
    </section>
  )
}
