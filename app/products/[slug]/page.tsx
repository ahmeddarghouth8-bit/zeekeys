import Image from "next/image"
import SafeImage from "@/components/safe-image"
import SiteHeader from "@/components/site-header"
import TrustBadges from "@/components/trust-badges"
import GuaranteedCheckout from "@/components/guaranteed-checkout"
import { getProductBySlug } from "@/lib/db"
import { notFound } from "next/navigation"
import ProductBuyBox from "@/components/product-buy-box"
import SiteFooter from "@/components/site-footer"
import { generateProductRating } from "@/lib/utils"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug)
  if (!product) return {}
  return {
    title: `${(product as any).title} | ZeeKeys`,
    description: (product as any).description,
    openGraph: {
      title: (product as any).title,
      description: (product as any).description,
      images: (product as any).imageUrl ? [(product as any).imageUrl] : [],
    },
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug)
  if (!product) return notFound()
  const imgSrc: string | undefined = (product as any).imageUrl
  const isRemote = Boolean(imgSrc?.startsWith("http"))

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 w-full">
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border bg-white">
          {isRemote ? (
            <SafeImage src={imgSrc} alt={(product as any).title} className="h-full w-full object-cover" />
          ) : (
            <Image
              src={imgSrc || "/placeholder.svg?height=800&width=1200&query=digital%20product%20image"}
              alt={(product as any).title}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="space-y-5">
          <h1 className="text-2xl font-bold">{(product as any).title}</h1>
          <p className="text-muted-foreground">{(product as any).description}</p>
          {/* Rating */}
          {(() => {
            const { rating, reviews } = generateProductRating((product as any).id || (product as any).slug)
            return (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>{i + 1 <= Math.round(rating) ? "★" : "☆"}</span>
                  ))}
                </div>
                <span className="font-medium text-gray-700">{rating.toFixed(1)}</span>
                <span>({reviews.toLocaleString()} reviews)</span>
              </div>
            )
          })()}

          <ProductBuyBox
            product={{
              id: (product as any).id,
              slug: (product as any).slug,
              title: (product as any).title,
              priceCents: (product as any).priceCents,
              imageUrl: (product as any).imageUrl,
            }}
          />

          <GuaranteedCheckout />
          <TrustBadges />
          <div className="text-xs text-muted-foreground">
            SSL secured. Payments processed via USDT (TRC-20). Never share your key with anyone.
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
