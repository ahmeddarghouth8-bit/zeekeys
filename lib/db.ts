/*
Server-side totals:
- Applies discounts and variant pricing.
- Carries region field on items (mock orders). DB persistence ignores region for simplicity.
*/
import "server-only"
import { mockProducts } from "./mock-data"
import { getPrisma } from "./prisma"
type OrderStatus = "PENDING" | "PAID" | "CANCELLED"
import { applyDiscountCents, discountFor } from "./pricing"
import { getVariantById } from "./variations"

const mockOrders: {
  id: string
  email: string
  status: OrderStatus
  totalCents: number
  usdtAmount: number | string
  chain: string
  walletAddress: string
  paymentCode: string
  createdAt: Date
  updatedAt: Date
  items: {
    productId: string
    quantity: number
    priceCents: number
    variantId?: string | null
    region?: string | null
  }[]
}[] = []

function hasDb() {
  return !!process.env.DATABASE_URL
}

export async function listProducts() {
  if (!hasDb()) {
    return mockProducts.filter((p) => p.active)
  }
  try {
    const prisma = getPrisma()
    return await prisma.product.findMany({ where: { active: true }, orderBy: { createdAt: "desc" } })
  } catch (err) {
    console.warn("[DB] listProducts failed, falling back to mock products:", err)
    return mockProducts.filter((p) => p.active)
  }
}

export async function getProductBySlug(slug: string) {
  if (!hasDb()) {
    return mockProducts.find((p) => p.slug === slug) ?? null
  }
  try {
    const prisma = getPrisma()
    return await prisma.product.findUnique({ where: { slug } })
  } catch (err) {
    console.warn("[DB] getProductBySlug failed, falling back to mock:", err)
    return mockProducts.find((p) => p.slug === slug) ?? null
  }
}

export async function createOrder(input: {
  email: string
  items: { productId: string; quantity: number; variantId?: string | null; region?: string | null }[]
  walletAddress: string
}) {
  if (!input.email || !/^\S+@\S+\.\S+$/.test(input.email)) throw new Error("Invalid email")
  if (!input.items?.length) throw new Error("No items")
  const chain = "TRON"

  const computeLineItemsFrom = (products: any[]) =>
    input.items.map((it) => {
      const p = products.find((pp) => pp.id === it.productId)
      if (!p) throw new Error("Invalid product")
      let basePrice = p.priceCents
      const variant = getVariantById(p.slug as any, it.variantId || undefined)
      if (variant) basePrice = variant.priceCents
      const percent = discountFor(p.id, p.slug as any)
      const priceCents = applyDiscountCents(basePrice, percent)
      return {
        productId: p.id,
        quantity: it.quantity,
        priceCents,
        variantId: it.variantId || null,
        region: it.region || null,
      }
    })

  if (!hasDb()) {
    const lineItems = computeLineItemsFrom(mockProducts as any[])
    const totalCents = lineItems.reduce((acc, li) => acc + li.priceCents * li.quantity, 0)
    const usdtAmount = totalCents / 100
    const id = `ord_${Math.random().toString(36).slice(2)}`
    const paymentCode = id.slice(-8).toUpperCase()
    const now = new Date()
    const order = {
      id,
      email: input.email,
      status: "PENDING" as const,
      totalCents,
      usdtAmount,
      chain,
      walletAddress: input.walletAddress,
      paymentCode,
      createdAt: now,
      updatedAt: now,
      items: lineItems,
    }
    mockOrders.unshift(order)
    return order
  }

  try {
    const prisma = getPrisma()
    const productIds = input.items.map((i) => i.productId)
    const products = await prisma.product.findMany({ where: { id: { in: productIds } } })
    const lineItems = computeLineItemsFrom(products as any[])
    const totalCents = lineItems.reduce((acc, li) => acc + li.priceCents * li.quantity, 0)
    const usdtAmount = (totalCents / 100).toFixed(2)
    const paymentCode = Math.random().toString(36).slice(2, 10).toUpperCase()
    const order = await prisma.order.create({
      data: {
        email: input.email,
        status: "PENDING",
        totalCents,
        usdtAmount: usdtAmount as any,
        chain,
        walletAddress: input.walletAddress,
        paymentCode,
        items: {
          create: lineItems.map((li) => ({
            productId: li.productId,
            quantity: li.quantity,
            priceCents: li.priceCents,
          })),
        },
      },
      include: { items: true },
    })
    return order
  } catch (err) {
    console.warn("[DB] createOrder failed, falling back to mock:", err)
    const lineItems = computeLineItemsFrom(mockProducts as any[])
    const totalCents = lineItems.reduce((acc, li) => acc + li.priceCents * li.quantity, 0)
    const usdtAmount = totalCents / 100
    const id = `ord_${Math.random().toString(36).slice(2)}`
    const paymentCode = id.slice(-8).toUpperCase()
    const now = new Date()
    const order = {
      id,
      email: input.email,
      status: "PENDING" as const,
      totalCents,
      usdtAmount,
      chain,
      walletAddress: input.walletAddress,
      paymentCode,
      createdAt: now,
      updatedAt: now,
      items: lineItems,
    }
    mockOrders.unshift(order)
    return order
  }
}

export async function adminListOrders() {
  if (!hasDb()) {
    // Return in-memory orders (most recent first)
    return mockOrders
  }
  try {
    const prisma = getPrisma()
    return await prisma.order.findMany({ orderBy: { createdAt: "desc" }, include: { items: true } })
  } catch (err) {
    console.warn("[DB] adminListOrders failed, falling back to mock:", err)
    return mockOrders
  }
}
