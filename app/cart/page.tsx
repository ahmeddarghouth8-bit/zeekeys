"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import Money from "@/components/money"
import { Trash2, Plus, Minus } from "lucide-react"

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalCents, count } = useCart()

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Your Cart</h1>

      {items.length === 0 ? (
        <div className="rounded border p-6 text-center text-sm text-muted-foreground">
          Your cart is empty.{" "}
          <Link className="underline" href="/">
            Continue shopping
          </Link>
          .
        </div>
      ) : (
        <>
          <div className="rounded-lg border overflow-hidden">
            <table className="min-w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3">Item</th>
                  <th className="text-left p-3">Price</th>
                  <th className="text-left p-3">Qty</th>
                  <th className="text-left p-3">Total</th>
                  <th className="text-right p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr key={it.key} className="border-t">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        {it.imageUrl ? (
                          <div className="relative w-12 h-12 rounded border overflow-hidden">
                            <Image
                              src={it.imageUrl || "/placeholder.svg"}
                              alt={it.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded border bg-muted" />
                        )}
                        <div>
                          <div className="font-medium">{it.title}</div>
                          {it.variantLabel && <div className="text-xs text-muted-foreground">{it.variantLabel}</div>}
                          {it.region && (
                            <div className="text-xs text-muted-foreground">Region: {it.region.toUpperCase()}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Money cents={it.unitPriceCents} />
                    </td>
                    <td className="p-3">
                      <div className="inline-flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 bg-transparent"
                          onClick={() => updateQuantity(it.key, it.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center">{it.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 bg-transparent"
                          onClick={() => updateQuantity(it.key, it.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                    <td className="p-3">
                      <Money cents={it.unitPriceCents * it.quantity} />
                    </td>
                    <td className="p-3 text-right">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => removeItem(it.key)}
                        title="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-sm text-muted-foreground">{count} item(s)</div>
            <div className="flex items-center gap-4">
              <div className="text-lg font-semibold">
                Subtotal: <Money cents={totalCents} />
              </div>
              <Link
                href="/checkout?source=cart"
                className="inline-flex items-center h-10 px-6 rounded bg-amber-600 hover:bg-amber-700 text-white"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
