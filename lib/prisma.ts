/*
Server-only Prisma client configured for Neon serverless driver. See [^2].
Falls back gracefully when DATABASE_URL is missing (preview mode).
*/
import "server-only"
import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"

let prisma: PrismaClient | undefined

export function getPrisma() {
  if (prisma) return prisma
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not set. In preview, the app will use mock data. On deployment, set DATABASE_URL to your Neon connection string."
    )
  }
  const adapter = new PrismaNeon({ connectionString: databaseUrl })
  prisma = new PrismaClient({ adapter })
  return prisma
}
