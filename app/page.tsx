import SiteHeader from "@/components/site-header"
import ProductCard from "@/components/product-card"
import { listProducts } from "@/lib/db"
import SiteFooter from "@/components/site-footer"
import HeroSlider from "@/components/hero-slider"

export const dynamic = "force-dynamic"

export default async function Page({ searchParams }: { searchParams: { q?: string } }) {
  const products = await listProducts()
  const q = (searchParams?.q || "").toLowerCase().trim()
  const filtered = q ? products.filter((p: any) => p.title.toLowerCase().includes(q)) : products

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-6 space-y-6 flex-1 w-full">
        <HeroSlider />

        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold">Explore ZeeKeys Deals</h1>
            <p className="text-muted-foreground">Massive discounts on digital keys, software, and gift cards.</p>
          </div>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p: any) => (
            <ProductCard
              key={p.id}
              id={p.id}
              slug={p.slug}
              title={p.title}
              priceCents={p.priceCents}
              imageUrl={p.imageUrl}
              description={p.description}
            />
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
