import SiteHeader from "@/components/site-header"
import CheckoutForm from "@/components/checkout-form"
import GuaranteedCheckout from "@/components/guaranteed-checkout"
import TrustBadges from "@/components/trust-badges"
import { listProducts } from "@/lib/db"
import SiteFooter from "@/components/site-footer"
import CheckoutCartForm from "@/components/checkout-cart-form"

export const dynamic = "force-dynamic"

export default async function CheckoutPage({
  searchParams,
}: { searchParams: { pid?: string; vid?: string; region?: string; source?: string } }) {
  const source = searchParams?.source
  const pid = searchParams?.pid
  const vid = searchParams?.vid
  const region = searchParams?.region

  const products = (await listProducts()) as any[]
  let product: any | null = null
  if (pid) {
    product = products.find((p) => p.id === pid) ?? null
  } else {
    product = products[0] ?? null
  }

  // Default to your wallet address when env is not set
  const defaultWallet = "TMyRWB9qXWfNd8MnL6etp9PDePSZC6vELp"
  const walletAddress = process.env.USDT_TRC20_WALLET_ADDRESS || defaultWallet

  return (
    <div className="min-h-screen flex flex-direction flex-col">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-8 space-y-6 flex-1 w-full">
        <h1 className="text-2xl font-bold">Checkout</h1>
        {source === "cart" ? (
          <CheckoutCartForm walletAddress={walletAddress} />
        ) : product ? (
          <CheckoutForm
            product={{ id: product.id, slug: product.slug, title: product.title, priceCents: product.priceCents }}
            walletAddress={walletAddress}
            variantId={vid}
            regionParam={region}
          />
        ) : (
          <p>No product selected.</p>
        )}
        <GuaranteedCheckout />
        <TrustBadges />
        <p className="text-xs text-muted-foreground">
          For your security, ZeeKeys never stores your card details. Payments are processed via USDT (TRC-20).
        </p>
      </main>
      <SiteFooter />
    </div>
  )
}
