"use client"

import Link from "next/link"
import Image from "next/image"
import SafeImage from "@/components/safe-image"
import { discountFor, applyDiscountCents } from "@/lib/pricing"
import AddToCartButton from "@/components/add-to-cart-button"
import { generateProductRating } from "@/lib/utils"
import Money from "@/components/money"

export type ProductCardProps = {
  id: string
  slug: string
  title: string
  priceCents: number
  imageUrl?: string
  description?: string
}

export default function ProductCard({
  id,
  slug,
  title,
  priceCents,
  imageUrl = "/digital-product-thumbnail.png",
  description,
}: ProductCardProps) {
  const percent = discountFor(id, slug)
  const discounted = applyDiscountCents(priceCents, percent)
  const isRemote = Boolean(imageUrl?.startsWith("http"))
  const { rating, reviews } = generateProductRating(id || slug)

  return (
    <div className="group rounded-lg border hover:shadow-md transition overflow-hidden bg-white">
      <Link href={`/products/${slug}`} className="block">
        {/* Restored original responsive image container */}
        <div className="relative w-full h-48 bg-muted">
          {isRemote ? (
            <SafeImage src={imageUrl} alt={title} className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
          )}
          {percent > 0 && (
            <div className="absolute left-2 top-2 rounded bg-emerald-600 text-white text-xs font-semibold px-2 py-1 shadow">
              {percent}% OFF
            </div>
          )}
        </div>
      </Link>
      <div className="p-4 space-y-2">
        <Link href={`/products/${slug}`} className="block">
          <h3 className="font-semibold line-clamp-1">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </Link>
        {/* Stars */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>{i + 1 <= Math.round(rating) ? "★" : "☆"}</span>
            ))}
          </div>
          <span className="font-medium text-gray-700">{rating.toFixed(1)}</span>
          <span>({reviews.toLocaleString()} reviews)</span>
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-emerald-700">
              <Money cents={discounted} />
            </span>
            <span className="text-sm text-muted-foreground line-through">
              <Money cents={priceCents} />
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 pt-2">
          <AddToCartButton
            product={{ id, title, imageUrl }}
            unitPriceCents={discounted}
            className="inline-flex items-center rounded bg-amber-600 hover:bg-amber-700 text-white text-xs px-3 py-2"
          >
            Add to Cart
          </AddToCartButton>
          <Link
            href={`/checkout?pid=${encodeURIComponent(id)}`}
            className="inline-flex items-center rounded border text-xs px-3 py-2 hover:bg-muted"
          >
            Checkout Now
          </Link>
        </div>
      </div>
    </div>
  )
}
