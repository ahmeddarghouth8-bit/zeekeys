/*
Minimal admin auth using signed JWT in an HttpOnly cookie.
Set ADMIN_JWT_SECRET and ADMIN_DEFAULT_EMAIL/ADMIN_DEFAULT_PASSWORD on deployment.
In preview, defaults are admin@example.com / password (DO NOT use in production).
*/
import "server-only"
import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { getPrisma } from "./prisma"
import bcrypt from "bcryptjs"

const COOKIE_NAME = "admin_session"
const COOKIE_MAX_AGE = 60 * 60 * 8 // 8 hours

function getSecret() {
  return new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || "insecure-dev-secret")
}

export type AdminSession = { sub: string; email: string }

export async function createAdminSession(payload: AdminSession) {
  const token = await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setExpirationTime("8h").sign(getSecret())
  const c = await cookies()
  c.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  })
}

export async function destroyAdminSession() {
  const c = await cookies()
  c.delete(COOKIE_NAME)
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const c = await cookies()
  const token = c.get(COOKIE_NAME)?.value
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, getSecret())
    return payload as any
  } catch {
    return null
  }
}

export async function loginWithEmailPassword(email: string, password: string) {
  // If DB exists, look up AdminUser; else allow default dev credentials
  if (process.env.DATABASE_URL) {
    const prisma = getPrisma()
    const user = await prisma.adminUser.findUnique({ where: { email } })
    if (!user) return null
    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return null
    return { id: user.id, email: user.email }
  } else {
    const devEmail = process.env.ADMIN_DEFAULT_EMAIL || "admin@example.com"
    const devPass = process.env.ADMIN_DEFAULT_PASSWORD || "password"
    if (email === devEmail && password === devPass) return { id: "dev", email }
    return null
  }
}
