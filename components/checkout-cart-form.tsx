"use client"

import { useCart } from "@/components/cart-provider"
import { useActionState, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PaymentPanel from "@/components/payment-panel"
import Money from "@/components/money"
import { createOrderFromCartAction } from "@/lib/server-actions"

export default function CheckoutCartForm({ walletAddress }: { walletAddress: string }) {
  const { items, totalCents } = useCart()
  const [email, setEmail] = useState("")
  const [state, action, pending] = useActionState(createOrderFromCartAction, { ok: false } as any)

  const totalQty = useMemo(() => items.reduce((sum, it) => sum + it.quantity, 0), [items])
  const minQtyInvalid = totalQty < 3
  const disableSubmit = pending || items.length === 0 || minQtyInvalid

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground">Your cart is empty.</p>
          ) : (
            <form action={action} className="space-y-4">
              <input type="hidden" name="walletAddress" value={walletAddress} />
              <input
                type="hidden"
                name="items"
                value={JSON.stringify(
                  items.map((it) => ({
                    productId: it.productId,
                    quantity: it.quantity,
                    variantId: it.variantId || null,
                    region: it.region || null,
                  })),
                )}
              />
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
                />
                <p className="text-xs text-muted-foreground">
                  You will receive your activation key by email after payment confirmation.
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Subtotal</div>
                <div className="text-xl font-bold">
                  <Money cents={totalCents} />
                </div>
              </div>

              {/* Order Summary inside checkout box */}
              <div className="pt-4 mt-4 border-t">
                <h3 className="text-sm font-semibold mb-3">Order Summary</h3>
                <div className="text-sm space-y-3">
                  {items.map((it) => (
                    <div key={it.key} className="flex items-start justify-between gap-3 border-b pb-2 last:border-b-0">
                      <div className="min-w-0">
                        <div className="font-medium truncate">{it.title}</div>
                        {it.variantLabel && (
                          <div className="text-xs text-muted-foreground">Option: {it.variantLabel}</div>
                        )}
                        {it.region && (
                          <div className="text-xs text-muted-foreground">Region: {it.region.toUpperCase()}</div>
                        )}
                        <div className="text-xs text-muted-foreground">Qty: {it.quantity}</div>
                      </div>
                      <div className="font-medium whitespace-nowrap">
                        <Money cents={it.unitPriceCents * it.quantity} />
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-muted-foreground">Total quantity</span>
                    <span className="font-semibold">{totalQty}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Minimum total quantity to place an order is 3.</p>
                </div>
              </div>

              <Button disabled={disableSubmit} className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                {pending ? "Creating Order..." : "Place Order"}
              </Button>
              {minQtyInvalid && (
                <p className="text-xs text-red-600">Minimum total quantity is 3 to continue the purchase.</p>
              )}
              {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
            </form>
          )}
        </CardContent>
      </Card>

      <div className="lg:col-span-2 space-y-4">
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
