"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import type { Variant } from "@/lib/variations"
import { useToast } from "@/hooks/use-toast"

export default function AddToCartButton(props: {
  product: { id: string; title: string; imageUrl?: string }
  unitPriceCents: number
  quantity?: number
  variant?: Variant | null
  region?: string | undefined
  className?: string
  children?: React.ReactNode
}) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const qty = props.quantity ?? 1
  const variant = props.variant ?? null
  const region = props.region

  return (
    <Button
      className={props.className}
      onClick={() => {
        addItem({
          productId: props.product.id,
          title: props.product.title,
          imageUrl: props.product.imageUrl,
          variantId: variant?.id,
          variantLabel: variant?.label,
          region,
          unitPriceCents: props.unitPriceCents,
          quantity: qty,
        })
        toast({
          title: "Added to cart",
          description: `${props.product.title}${variant ? ` • ${variant.label}` : ""}${region ? ` • ${region.toUpperCase()}` : ""}`,
        })
      }}
    >
      {props.children ?? "Add to Cart"}
    </Button>
  )
}
