"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, ShieldCheck, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useCart } from "@/components/cart-provider"
import CountryLanguageSelector from "@/components/country-language-selector"

export default function SiteHeader() {
  const [q, setQ] = useState("")
  const router = useRouter()
  const { count } = useCart()
  return (
    <header className="w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/zeekeys-logo.png" alt="ZeeKeys" width={120} height={28} />
        </Link>

        <form
          className="hidden md:flex items-center gap-2 flex-1"
          onSubmit={(e) => {
            e.preventDefault()
            router.push(q ? `/?q=${encodeURIComponent(q)}` : "/")
          }}
        >
          <div className="relative w-full max-w-lg">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search games, gift cards, software keys..."
              className="pl-8"
            />
          </div>
          <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">
            Search
          </Button>
        </form>

        <div className="ml-auto flex items-center gap-3">
          <CountryLanguageSelector />
          <ShieldCheck className="h-5 w-5 text-emerald-600" aria-hidden />
          <Link href="/cart" className="relative inline-flex items-center gap-2 text-sm">
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 h-5 min-w-[1.25rem] rounded-full bg-amber-600 text-white text-xs grid place-items-center px-1">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
