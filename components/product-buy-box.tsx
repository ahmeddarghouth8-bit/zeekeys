"use client"

import { useMemo, useState } from "react"
import AddToCartButton from "@/components/add-to-cart-button"
import { getVariantsBySlug, getVariantById, type Variant } from "@/lib/variations"
import { applyDiscountCents, discountFor } from "@/lib/pricing"
import Link from "next/link"
import Money from "@/components/money"
import { REGION_OPTIONS, regionRequiredForSlug } from "@/lib/regions"

export default function ProductBuyBox({
  product,
}: {
  product: { id: string; slug: string; title: string; priceCents: number; imageUrl?: string }
}) {
  const variants = getVariantsBySlug(product.slug)
  const [variantId, setVariantId] = useState<string | undefined>(variants?.[0]?.id)
  const variant: Variant | null = useMemo(() => getVariantById(product.slug, variantId), [product.slug, variantId])

  const percent = discountFor(product.id, product.slug)
  const basePrice = variant ? variant.priceCents : product.priceCents
  const discounted = applyDiscountCents(basePrice, percent)

  const needsRegion = regionRequiredForSlug(product.slug)
  const [region, setRegion] = useState<string | undefined>(needsRegion ? "na" : undefined)

  return (
    <div className="space-y-4">
      {variants && (
        <div className="grid gap-2">
          <label className="text-sm font-medium">Choose an option</label>
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setVariantId(v.id)}
                className={`h-9 px-3 rounded border text-sm ${
                  variantId === v.id ? "bg-amber-600 text-white border-amber-600" : "hover:bg-muted"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {needsRegion && (
        <div className="grid gap-2">
          <label className="text-sm font-medium">Card Region</label>
          <div className="flex flex-wrap gap-2">
            {REGION_OPTIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => setRegion(r.id)}
                className={`h-9 px-3 rounded border text-sm ${
                  region === r.id ? "bg-emerald-600 text-white border-emerald-600" : "hover:bg-muted"
                }`}
                title={r.label}
              >
                {r.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Make sure the region matches your account. Regions include North America, Europe/Middle East/Africa/Oceania,
            Asia, Japan, and South Korea.
          </p>
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className="text-3xl font-bold text-emerald-700">
          <Money cents={discounted} />
        </div>
        <div className="text-lg text-muted-foreground line-through">
          <Money cents={basePrice} />
        </div>
        {percent > 0 && (
          <span className="text-sm rounded bg-emerald-50 text-emerald-700 px-2 py-1 font-semibold">{percent}% OFF</span>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <AddToCartButton
          product={{ id: product.id, title: product.title, imageUrl: product.imageUrl }}
          unitPriceCents={discounted}
          variant={variant}
          region={region}
          className="inline-flex items-center justify-center rounded-md bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 font-semibold"
        >
          Add to Cart
        </AddToCartButton>

        <Link
          href={`/checkout?pid=${encodeURIComponent(product.id)}${variant ? `&vid=${encodeURIComponent(variant.id)}` : ""}${
            region ? `&region=${encodeURIComponent(region)}` : ""
          }`}
          className={`inline-flex items-center justify-center rounded-md border px-6 py-3 ${
            needsRegion && !region ? "pointer-events-none opacity-60" : ""
          }`}
          aria-disabled={needsRegion && !region}
          title={needsRegion && !region ? "Select a region to continue" : "Checkout Now"}
        >
          Checkout Now
        </Link>
      </div>
    </div>
  )
}
