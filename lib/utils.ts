import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Deterministic product rating generator (4.0–5.0) with review count
export function generateProductRating(key: string): { rating: number; reviews: number } {
  // Simple hash
  let hash = 0
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0
  }
  // Map to [0, 1)
  const rand = (hash % 1000) / 1000
  // Rating 4.0–5.0 (one decimal place)
  const ratingRaw = 4 + rand
  const rating = Math.round(ratingRaw * 10) / 10
  // Reviews 120–4200
  const reviews = 120 + Math.floor(rand * 4080)
  return { rating, reviews }
}
