"use client"

import { useCurrency } from "./currency-provider"

export default function Money({ cents, className }: { cents: number; className?: string }) {
  const { formatCents } = useCurrency()
  return <span className={className}>{formatCents(cents)}</span>
}
