"use client"

type Country = {
  code: string
  name: string
  flag: string
  currency: "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "JPY" | "KRW"
}
type Language = {
  code: string
  label: string
  flag: string
}

const COUNTRIES: Country[] = [
  { code: "US", name: "United States", flag: "🇺🇸", currency: "USD" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", currency: "GBP" },
  { code: "FR", name: "France", flag: "🇫🇷", currency: "EUR" },
  { code: "DE", name: "Germany", flag: "🇩🇪", currency: "EUR" },
  { code: "ES", name: "Spain", flag: "🇪🇸", currency: "EUR" },
  { code: "IT", name: "Italy", flag: "🇮🇹", currency: "EUR" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱", currency: "EUR" },
  { code: "CA", name: "Canada", flag: "🇨🇦", currency: "CAD" },
  { code: "AU", name: "Australia", flag: "🇦🇺", currency: "AUD" },
  { code: "JP", name: "Japan", flag: "🇯🇵", currency: "JPY" },
  { code: "KR", name: "South Korea", flag: "🇰🇷", currency: "KRW" },
]

const LANGUAGES: Language[] = [
  { code: "en", label: "English", flag: "🌐" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
]

export default function CountryLanguageSelector() {
  return null
}
