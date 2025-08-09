import { sampleProducts } from "./sample-products"

export type MockProduct = {
  id: string
  slug: string
  title: string
  description: string
  priceCents: number
  imageUrl?: string
  active: boolean
}

// Base items (ensure unique slugs). Update images per request.
const baseProducts: MockProduct[] = [
  {
    id: "p1",
    slug: "windows-11-pro-key",
    title: "Windows 11 Pro Key",
    description: "Genuine activation key for Windows 11 Pro. Instant delivery.",
    priceCents: 2499,
    imageUrl: "/windows-11-pro-license-box.png.webp",
    active: true,
  },
  {
    id: "p2",
    slug: "psn-gift-card",
    title: "PlayStation (PSN) Gift Card",
    description: "Choose your denomination at checkout. Digital code delivered by email.",
    priceCents: 1000,
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/playstation-capa-wmSfatev2zpzNmNiBIcvuKlGse5KE8.webp",
    active: true,
  },
  {
    id: "p3",
    slug: "steam-gift-card",
    title: "Steam Wallet Code",
    description: "Choose your denomination at checkout. Digital code delivered by email.",
    priceCents: 1000,
    // 4TH image -> Steam cards
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/steamcards_physical-XmB8VjabD1kPCu7HIMhMBE5YRU0zyJ.png",
    active: true,
  },
]

// Map curated samples into mock products
const extraMock: MockProduct[] = sampleProducts.map((p, i) => ({
  id: `px${i + 1}`,
  slug: p.slug,
  title: p.title,
  description: p.description,
  priceCents: p.priceCents,
  imageUrl: p.imageUrl,
  active: p.active,
}))

// De-duplicate by slug (first occurrence wins)
const combined = [...baseProducts, ...extraMock]
const seen = new Set<string>()
export const mockProducts: MockProduct[] = combined.filter((p) => {
  if (seen.has(p.slug)) return false
  seen.add(p.slug)
  return true
})
