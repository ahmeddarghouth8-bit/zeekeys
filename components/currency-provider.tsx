"use client"

import type React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

export type CurrencyCode = "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "JPY" | "KRW"
type Rates = Record<CurrencyCode, number> // how many currency units per 1 USD

const DEFAULT_RATES: Rates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  CAD: 1.35,
  AUD: 1.5,
  JPY: 155, // approx units per USD
  KRW: 1350,
}

type CurrencyContextType = {
  currency: CurrencyCode
  rates: Rates
  setCurrency: (c: CurrencyCode) => void
  formatCents: (usdCents: number) => string

  // New: country/language controls
  country?: string
  language?: string
  setCountry: (countryCode: string) => void
  setLanguage: (langCode: string) => void
}

const CurrencyContext = createContext<CurrencyContextType | null>(null)

function detectCountry(): string {
  if (typeof navigator === "undefined") return "US"
  const stored = localStorage.getItem("zeekeys_country")
  if (stored) return stored
  const lang = navigator.language || "en-US"
  return lang.split("-")[1]?.toUpperCase() || "US"
}
function detectLanguage(): string {
  if (typeof navigator === "undefined") return "en"
  const stored = localStorage.getItem("zeekeys_language")
  if (stored) return stored
  const lang = navigator.language || "en-US"
  return lang.split("-")[0].toLowerCase()
}
function currencyForCountry(country: string): CurrencyCode {
  switch (country) {
    case "US":
      return "USD"
    case "GB":
      return "GBP"
    case "CA":
      return "CAD"
    case "AU":
    case "NZ":
      return "AUD"
    case "JP":
      return "JPY"
    case "KR":
      return "KRW"
    default:
      // many countries default to EUR
      return "EUR"
  }
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [country, setCountryState] = useState<string>("US")
  const [language, setLanguageState] = useState<string>("en")
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD")
  const [rates] = useState<Rates>(DEFAULT_RATES)

  useEffect(() => {
    const ctry = detectCountry()
    const lang = detectLanguage()
    setCountryState(ctry)
    setLanguageState(lang)
    setCurrencyState(currencyForCountry(ctry))
  }, [])

  const setCountry = (c: string) => {
    setCountryState(c)
    try {
      localStorage.setItem("zeekeys_country", c)
    } catch {}
    setCurrencyState(currencyForCountry(c))
  }
  const setLanguage = (l: string) => {
    setLanguageState(l)
    try {
      localStorage.setItem("zeekeys_language", l)
    } catch {}
  }

  const setCurrency = (c: CurrencyCode) => setCurrencyState(c)

  const formatCents = (usdCents: number) => {
    const rate = rates[currency] || 1
    const value = (usdCents / 100) * rate
    return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(value)
  }

  const value = useMemo<CurrencyContextType>(
    () => ({ currency, rates, setCurrency, formatCents, country, language, setCountry, setLanguage }),
    [currency, rates, country, language],
  )

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext)
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider")
  return ctx
}
