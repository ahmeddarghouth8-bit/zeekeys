"use client"

import { useActionState, useMemo, useState, useEffect } from "react"
import { createOrderAction } from "@/lib/server-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { applyDiscountCents, discountFor } from "@/lib/pricing"
import PaymentPanel from "@/components/payment-panel"
import { getVariantById, getVariantsBySlug, type Variant } from "@/lib/variations"
import Money from "@/components/money"
import { REGION_OPTIONS, regionRequiredForSlug } from "@/lib/regions"

type Props = {
  product: { id: string; slug: string; title: string; priceCents: number }
  walletAddress: string
  variantId?: string
  regionParam?: string
}

export default function CheckoutForm({ product, walletAddress, variantId, regionParam }: Props) {
  // Minimum quantity 3
  const [quantity, setQuantity] = useState<number>(3)
  const [email, setEmail] = useState("")

  const variants = getVariantsBySlug(product.slug) || null
  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(variantId || variants?.[0]?.id)
  const variant: Variant | null = selectedVariantId ? getVariantById(product.slug, selectedVariantId) : null

  const needsRegion = regionRequiredForSlug(product.slug)
  const [region, setRegion] = useState<string | undefined>(needsRegion ? regionParam || "na" : undefined)
  useEffect(() => {
    if (needsRegion && !region) setRegion("na")
  }, [needsRegion, region])

  const percent = discountFor(product.id, product.slug)
  const basePrice = variant ? variant.priceCents : product.priceCents
  const discountedOne = applyDiscountCents(basePrice, percent)
  const totalCents = useMemo(() => discountedOne * quantity, [discountedOne, quantity])

  const [state, formAction, isPending] = useActionState(createOrderAction, { ok: false } as any)
  const quantityInvalid = quantity < 3
  const disableSubmit = isPending || (needsRegion && !region) || quantityInvalid

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <input type="hidden" name="productId" value={product.id} />
            {selectedVariantId && <input type="hidden" name="variantId" value={selectedVariantId} />}
            {region && <input type="hidden" name="region" value={region} />}

            {variants && (
              <div className="grid gap-2">
                <Label>Choose an option</Label>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariantId(v.id)}
                      className={`h-9 px-3 rounded border text-sm ${
                        selectedVariantId === v.id ? "bg-amber-600 text-white border-amber-600" : "hover:bg-muted"
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
                <Label>Card Region</Label>
                <div className="flex flex-wrap gap-2">
                  {REGION_OPTIONS.map((r) => (
                    <button
                      key={r.id}
                      type="button"
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
                  Select the region that matches your account to ensure the code can be redeemed.
                </p>
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="email">Email for delivery</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              <p className="text-xs text-muted-foreground">
                You will receive your activation key by email after payment confirmation.
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min={3}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(3, Number(e.target.value) || 3))}
              />
              <p className="text-xs text-muted-foreground">Minimum order is 3 units.</p>
              {quantityInvalid && (
                <p className="text-xs text-red-600">Minimum quantity is 3 to continue the purchase.</p>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Estimated price</span>
                <span className="text-sm font-medium text-emerald-700">
                  <Money cents={discountedOne} />
                </span>
                <span className="text-xs text-muted-foreground line-through">
                  <Money cents={basePrice} />
                </span>
                {percent > 0 && (
                  <span className="text-xs rounded bg-emerald-50 text-emerald-700 px-2 py-0.5 font-semibold">
                    {percent}% OFF
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Total</div>
                <div className="text-xl font-bold">
                  <Money cents={totalCents} />
                </div>
              </div>
            </div>

            {/* Order Summary inside checkout box */}
            <div className="pt-4 mt-4 border-t">
              <h3 className="text-sm font-semibold mb-3">Order Summary</h3>
              <div className="text-sm space-y-2">
                <div className="font-medium">{product.title}</div>
                {variant && <div className="text-muted-foreground">Option: {variant.label}</div>}
                {region && (
                  <div className="text-muted-foreground">
                    Region: {REGION_OPTIONS.find((r) => r.id === region)?.label || region.toUpperCase()}
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Quantity</span>
                  <span className="font-medium">{quantity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Item price</span>
                  <span className="font-medium">
                    <Money cents={discountedOne} />
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-semibold">
                    <Money cents={totalCents} />
                  </span>
                </div>
              </div>
            </div>

            <input type="hidden" name="walletAddress" value={walletAddress} />
            <Button
              disabled={disableSubmit}
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white"
            >
              {isPending ? "Creating Order..." : "Place Order"}
            </Button>
            {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
          </form>
        </CardContent>
      </Card>

      <div className="md:col-span-2 space-y-4">
        {state?.ok ? (
          <PaymentPanel amountUSDT={Number(state.order.usdtAmount)} walletAddress={walletAddress} />
        ) : (
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tether-usdt-logo-AHM8t4vIiw7L2ltJYyt1DCpRYoQvva.png"
                alt="USDT"
                width={24}
                height={24}
              />
              <CardTitle>Pay with USDT (TRC-20)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              You will see the payment window with QR code and all details after placing the order.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
