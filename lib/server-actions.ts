"use server"

import { createOrder } from "./db"
import { sendOrderConfirmationEmail } from "./email"

export async function createOrderAction(prevState: any, formData: FormData) {
  try {
    const productId = String(formData.get("productId") || "")
    const variantId = formData.get("variantId") ? String(formData.get("variantId")) : null
    const region = formData.get("region") ? String(formData.get("region")) : null
    const email = String(formData.get("email") || "")
    const quantity = Math.max(1, Number(formData.get("quantity") || 1))
    const walletAddress = String(formData.get("walletAddress") || process.env.USDT_TRC20_WALLET_ADDRESS || "")

    if (!walletAddress) throw new Error("Wallet address is not configured.")

    const order = await createOrder({
      email,
      items: [{ productId, quantity, variantId, region: region || undefined }],
      walletAddress,
    })

    sendOrderConfirmationEmail({
      to: email,
      orderId: order.id,
      usdtAmount: (order as any).usdtAmount,
      walletAddress,
      paymentCode: (order as any).paymentCode,
    }).catch(() => {})

    return { ok: true, order }
  } catch (e: any) {
    return { ok: false, error: e?.message || "Failed to create order" }
  }
}

export async function createOrderFromCartAction(prevState: any, formData: FormData) {
  try {
    const email = String(formData.get("email") || "")
    const walletAddress = String(formData.get("walletAddress") || process.env.USDT_TRC20_WALLET_ADDRESS || "")
    const itemsJson = String(formData.get("items") || "[]")
    const items = JSON.parse(itemsJson) as {
      productId: string
      quantity: number
      variantId?: string | null
      region?: string | null
    }[]

    if (!walletAddress) throw new Error("Wallet address is not configured.")
    if (!Array.isArray(items) || items.length === 0) throw new Error("Your cart is empty.")

    const order = await createOrder({
      email,
      items: items.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
        variantId: i.variantId || undefined,
        region: i.region || undefined,
      })),
      walletAddress,
    })

    sendOrderConfirmationEmail({
      to: email,
      orderId: order.id,
      usdtAmount: (order as any).usdtAmount,
      walletAddress,
      paymentCode: (order as any).paymentCode,
    }).catch(() => {})

    return { ok: true, order }
  } catch (e: any) {
    return { ok: false, error: e?.message || "Failed to create order" }
  }
}
