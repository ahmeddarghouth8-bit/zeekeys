export type DiscountRule = {
  match: (id: string, slug: string) => boolean
  percent: number
}

/**
 * Simple discount rules configured by slug patterns.
 * You can extend this to load from DB or environment config later.
 */
const rules: DiscountRule[] = [
  // Apple Gift Cards => 25% (capped)
  {
    match: (_id, slug) => /apple|app-?store|itunes/.test(slug),
    percent: 25,
  },
  // Windows 11 Pro Key => 20%
  {
    match: (_id, slug) => /windows-?11-?pro|win11-?pro/.test(slug),
    percent: 20,
  },
]

/**
 * Returns the discount percent for a product.
 * Falls back to 30% if no specific rule matches.
 */
function boundedPercentFromKey(key: string, min: number, max: number): number {
  let hash = 0
  for (let i = 0; i < key.length; i += 1) hash = (hash * 31 + key.charCodeAt(i)) >>> 0
  const span = Math.max(0, max - min)
  return min + (hash % (span + 1))
}

export function discountFor(id: string, slug: string): number {
  // Dynamic bands: PSN/PlayStation, Steam, Paysafecard → 5%..15%
  if (/psn|playstation|steam|paysafe/.test(slug)) {
    const pct = boundedPercentFromKey(`${id}:${slug}`, 5, 15)
    return Math.min(25, Math.max(0, pct))
  }

  const found = rules.find((r) => r.match(id, slug))
  const pct = found ? found.percent : 0
  // Clamp to the requested range [0, 25]
  return Math.min(25, Math.max(0, pct))
}

/**
 * Apply a percentage discount to a price in cents.
 */
export function applyDiscountCents(priceCents: number, percent: number): number {
  const discounted = Math.round(priceCents * (1 - percent / 100))
  return Math.max(0, discounted)
}
