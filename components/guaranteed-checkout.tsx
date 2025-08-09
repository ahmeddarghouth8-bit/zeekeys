export default function GuaranteedCheckout() {
  return (
    <div className="w-full border rounded-lg p-4">
      <div className="flex items-center gap-3">
        <img
          src="/shield-lock-badge.png"
          alt="Secure Payment"
          width={40}
          height={40}
          className="rounded"
          loading="lazy"
        />
        <div className="flex-1">
          <p className="font-semibold">Guaranteed Safe Checkout</p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="px-2 py-1 rounded bg-gray-100">SSL Secured</span>
            <span className="px-2 py-1 rounded bg-gray-100">Manual Verification</span>
            <span className="px-2 py-1 rounded bg-gray-100">USDT TRC-20</span>
          </div>
        </div>
        <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tether-usdt-logo-AHM8t4vIiw7L2ltJYyt1DCpRYoQvva.png" alt="USDT" width={28} height={28} loading="lazy" />
      </div>
    </div>
  )
}
