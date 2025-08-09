import { ShieldCheck, Lock, Shield } from 'lucide-react'

export default function TrustBadges() {
  return (
    <section className="w-full bg-gray-50 border rounded-lg p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="h-6 w-6 text-emerald-600 mt-0.5" />
          <div>
            <h4 className="font-semibold">Guaranteed safe checkout</h4>
            <p className="text-sm text-muted-foreground">USDT TRC-20 trusted payments.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Lock className="h-6 w-6 text-amber-600 mt-0.5" />
          <div>
            <h4 className="font-semibold">SSL secure connection</h4>
            <p className="text-sm text-muted-foreground">Your data is protected end-to-end.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Shield className="h-6 w-6 text-sky-600 mt-0.5" />
          <div>
            <h4 className="font-semibold">Buyer protection</h4>
            <p className="text-sm text-muted-foreground">We guarantee valid, unique keys.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
