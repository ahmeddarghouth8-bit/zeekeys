import Link from "next/link"
import { ShieldCheck, Lock, Mail, MessageCircle } from "lucide-react"

export default function SiteFooter() {
  return (
    <footer className="w-full bg-gray-50 border-t mt-10">
      <div className="mx-auto max-w-7xl px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand / Trust */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">ZeeKeys</h3>
          <p className="text-sm text-muted-foreground">
            Secure, instant delivery of digital keys and gift cards at great prices.
          </p>
          <div className="flex items-center gap-2 text-sm text-emerald-700">
            <ShieldCheck className="h-4 w-4" />
            Guaranteed safe checkout
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            SSL secured site
          </div>
          <div className="flex items-center gap-2 text-sm">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tether-usdt-logo-AHM8t4vIiw7L2ltJYyt1DCpRYoQvva.png"
              alt="USDT"
              width={24}
              height={24}
              loading="lazy"
            />
            <span className="text-muted-foreground">USDT (TRC-20) supported</span>
          </div>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-semibold mb-3">Support</h4>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">support@zeekeys.com</span>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-emerald-700" />
              <span className="text-muted-foreground">Live chat: 24/7 · Free</span>
            </li>
            <li>
              <Link href="/help/usdt" className="hover:underline">
                How to pay with USDT (TRC-20)
              </Link>
            </li>
          </ul>
        </div>

        {/* Company / Legal Entities */}
        <div className="text-sm space-y-4">
          <h4 className="font-semibold">Company</h4>
          <div>
            <p className="font-medium">ZeeKeys.COM Limited (opérateur de la plate-forme)</p>
            <p className="text-muted-foreground">
              Address: 31/F, Tower Two, Times Square, 1 Matheson Street, Causeway Bay, Hong Kong
            </p>
            <p className="text-muted-foreground">Numéro d&apos;enregistrement de l&apos;entreprise : 634201</p>
          </div>
          <div>
            <p className="font-medium">ZeeKeys LLC (opérateur de plateforme)</p>
            <p className="text-muted-foreground">Address: 701 South Carson Street, Suite 200, Nevada 8701, USA</p>
            <p className="text-muted-foreground">Numéro d&apos;enregistrement de l&apos;entreprise : E0627762014-7</p>
          </div>
          <div>
            <p className="font-medium">ZeeKeys.COM Direct B.V. (platform support)</p>
            <p className="text-muted-foreground">Address: Wattstraat 77 A 3, 1097DL Amsterdam, Pays-Bas</p>
            <p className="text-muted-foreground">Numéro d&apos;enregistrement de l&apos;entreprise : 8995561</p>
          </div>
        </div>

        {/* Policies */}
        <div>
          <h4 className="font-semibold mb-3">Policies</h4>
          <ul className="text-sm space-y-2">
            <li>
              <Link href="/terms" className="hover:underline">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:underline">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/refund-policy" className="hover:underline">
                Refund Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-4 text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>© {new Date().getFullYear()} ZeeKeys. All rights reserved.</div>
          <div className="flex gap-3">
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/refund-policy" className="hover:underline">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
