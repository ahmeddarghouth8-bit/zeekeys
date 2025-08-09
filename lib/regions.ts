export type RegionOption = { id: string; label: string }

export const REGION_OPTIONS: RegionOption[] = [
  { id: "na", label: "North America (US/CA/MX)" },
  { id: "emea", label: "Europe, Middle East, Africa, Oceania" },
  { id: "asia", label: "Asia" },
  { id: "jp", label: "Japan" },
  { id: "kr", label: "South Korea" },
]

// Determine if a region choice is required for a product slug
export function regionRequiredForSlug(slug: string | undefined | null) {
  const s = (slug || "").toLowerCase()
  return (
    s.includes("psn") ||
    s.includes("playstation") ||
    s.includes("steam-gift-card") ||
    s.includes("steam-wallet") ||
    s === "steam-gift-card"
  )
}
