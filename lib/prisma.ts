/*
Server-only Prisma client configured for Neon serverless driver. See [^2].
Falls back gracefully when DATABASE_URL is missing (preview mode).
*/
import "server-only"

let prisma: any | undefined

export function getPrisma() {
  if (prisma) return prisma
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not set. In preview, the app will use mock data. On deployment, set DATABASE_URL to your Neon connection string."
    )
  }
  // Lazy-require to avoid bundling @prisma/client when DATABASE_URL is absent
  const req: NodeRequire = (eval("require") as any)
  const { PrismaNeon } = req("@prisma/adapter-neon")
  const { PrismaClient } = req("@prisma/client")
  const adapter = new PrismaNeon({ connectionString: databaseUrl })
  prisma = new PrismaClient({ adapter })
  return prisma
}
