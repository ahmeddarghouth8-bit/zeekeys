export type CartItem = {
  key: string // unique key in cart (productId + variantId + region)
  productId: string
  title: string
  imageUrl?: string
  variantId?: string
  variantLabel?: string
  region?: string // e.g., "na", "emea", "asia", "jp", "kr"
  unitPriceCents: number // discounted unit price at add time (for display)
  quantity: number
}
