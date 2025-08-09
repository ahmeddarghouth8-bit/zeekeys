"use client"

import type React from "react"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { CartItem } from "@/lib/cart-types"

type CartContextType = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "key">) => void
  removeItem: (key: string) => void
  updateQuantity: (key: string, qty: number) => void
  clear: () => void
  count: number
  totalCents: number
}

const CartContext = createContext<CartContextType | null>(null)
const STORAGE_KEY = "zeekeys_cart_v1"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {}
  }, [])
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {}
  }, [items])

  const api: CartContextType = useMemo(() => {
    return {
      items,
      addItem: (item) => {
        const key = `${item.productId}::${item.variantId || "default"}::${item.region || "any"}`
        setItems((prev) => {
          const existing = prev.find((it) => it.key === key)
          if (existing) {
            return prev.map((it) => (it.key === key ? { ...it, quantity: it.quantity + item.quantity } : it))
          }
          const toAdd: CartItem = { ...item, key }
          return [toAdd, ...prev]
        })
      },
      removeItem: (key) => setItems((prev) => prev.filter((it) => it.key !== key)),
      updateQuantity: (key, qty) =>
        setItems((prev) => prev.map((it) => (it.key === key ? { ...it, quantity: Math.max(1, qty) } : it))),
      clear: () => setItems([]),
      count: items.reduce((acc, it) => acc + it.quantity, 0),
      totalCents: items.reduce((acc, it) => acc + it.unitPriceCents * it.quantity, 0),
    }
  }, [items])

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
