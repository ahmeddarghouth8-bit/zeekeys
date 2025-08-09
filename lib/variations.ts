export type Variant = {
  id: string
  label: string
  priceCents: number
}

export function getVariantsBySlug(slug: string): Variant[] | null {
  const s = slug.toLowerCase()

  // PSN Gift Card denominations
  if (s === "psn-gift-card") {
    return [
      { id: "psn-10", label: "PSN Card $10", priceCents: 1000 },
      { id: "psn-20", label: "PSN Card $20", priceCents: 2000 },
      { id: "psn-50", label: "PSN Card $50", priceCents: 5000 },
      { id: "psn-100", label: "PSN Card $100", priceCents: 10000 },
    ]
  }

  // Steam Gift Card denominations
  if (s === "steam-gift-card" || s.includes("steam-wallet-code")) {
    return [
      { id: "steam-10", label: "Steam Card $10", priceCents: 1000 },
      { id: "steam-20", label: "Steam Card $20", priceCents: 2000 },
      { id: "steam-50", label: "Steam Card $50", priceCents: 5000 },
      { id: "steam-100", label: "Steam Card $100", priceCents: 10000 },
    ]
  }

  // PlayStation Plus durations
  if (s === "playstation-plus-12-months" || s.includes("playstation-plus")) {
    return [
      { id: "psplus-1m", label: "PS Plus 1 Month", priceCents: 999 },
      { id: "psplus-3m", label: "PS Plus 3 Months", priceCents: 2999 },
      { id: "psplus-12m", label: "PS Plus 12 Months", priceCents: 5999 },
    ]
  }

  // Platform selection for EA SPORTS FC 25 and GTA V Premium Edition
  if (s === "ea-sports-fc-25" || s === "gta-v-premium-edition") {
    return [
      { id: "platform-pc", label: "PC", priceCents: 2999 },
      { id: "platform-ps5", label: "PS5", priceCents: 3499 },
      { id: "platform-xbox", label: "Xbox", priceCents: 3499 },
    ]
  }

  // Paysafe Card denominations
  if (s === "paysafecard-gift-card") {
    return [
      { id: "psc-10", label: "Paysafecard $10", priceCents: 1000 },
      { id: "psc-25", label: "Paysafecard $25", priceCents: 2500 },
      { id: "psc-50", label: "Paysafecard $50", priceCents: 5000 },
      { id: "psc-100", label: "Paysafecard $100", priceCents: 10000 },
    ]
  }

  // Apple Gift Card denominations
  if (s === "apple-gift-card") {
    return [
      { id: "agc-10", label: "Apple Gift Card $10", priceCents: 1000 },
      { id: "agc-25", label: "Apple Gift Card $25", priceCents: 2500 },
      { id: "agc-50", label: "Apple Gift Card $50", priceCents: 5000 },
      { id: "agc-100", label: "Apple Gift Card $100", priceCents: 10000 },
    ]
  }

  // Netflix Gift Card denominations
  if (s === "netflix-gift-card") {
    return [
      { id: "nfx-25", label: "Netflix Gift Card $25", priceCents: 2500 },
      { id: "nfx-50", label: "Netflix Gift Card $50", priceCents: 5000 },
      { id: "nfx-100", label: "Netflix Gift Card $100", priceCents: 10000 },
    ]
  }

  return null
}

export function getVariantById(slug: string, variantId?: string | null): Variant | null {
  if (!variantId) return null
  const list = getVariantsBySlug(slug)
  return list?.find((v) => v.id === variantId) ?? null
}
