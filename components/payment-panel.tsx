"use client"

import { useEffect, useMemo, useState } from "react"
import { Copy, Check, Clock, Info } from "lucide-react"

export default function PaymentPanel({
  amountUSDT,
  walletAddress,
  minutes = 15,
}: {
  amountUSDT: number
  walletAddress: string
  minutes?: number
}) {
  const [copied, setCopied] = useState(false)
  const [now, setNow] = useState(() => Date.now())
  const [expiresAt] = useState<number>(() => Date.now() + minutes * 60_000)
  const rate = 1.0

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  const countdown = useMemo(() => {
    const ms = Math.max(0, expiresAt - now)
    const m = Math.floor(ms / 60000)
    const s = Math.floor((ms % 60000) / 1000)
    return `${m.toString().padStart(2, "0")}m ${s.toString().padStart(2, "0")}s`
  }, [expiresAt, now])

  const qrUrl = useMemo(
    () => `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(walletAddress)}`,
    [walletAddress],
  )

  return (
    <div className="rounded-lg border overflow-hidden bg-white">
      <div className="flex items-center justify-between p-3 bg-muted/50">
        <div className="flex items-center gap-2 text-sm font-medium">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tether-usdt-logo-AHM8t4vIiw7L2ltJYyt1DCpRYoQvva.png"
            alt="USDT"
            width={18}
            height={18}
          />
          <span>USDT (TRC20)</span>
        </div>
        <div className="text-xs text-muted-foreground">{amountUSDT.toFixed(2)} USDT</div>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col items-center gap-2">
          <div className="border rounded-lg p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrUrl || "/placeholder.svg"}
              alt="USDT QR Code (Binance Pay compatible)"
              width={220}
              height={220}
            />
          </div>
          <div className="text-xs text-muted-foreground text-center">
            Scan with your wallet (Binance Pay compatible) to send USDT over TRC‑20.
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm">
            Network: <span className="font-semibold">Tron (TRC20)</span>
          </div>

          <div className="text-sm">
            Send <span className="font-semibold">{amountUSDT.toFixed(2)} USDT</span> by single transaction to:
          </div>

          <div className="flex items-center gap-2">
            <input
              readOnly
              value={walletAddress}
              className="flex-1 h-9 px-2 border rounded font-mono text-xs"
              aria-label="Wallet Address"
            />
            <button
              className="h-9 px-3 border rounded text-sm"
              onClick={() => {
                navigator.clipboard.writeText(walletAddress)
                setCopied(true)
                setTimeout(() => setCopied(false), 1500)
              }}
              title="Copy address"
            >
              {copied ? <Check className="inline h-4 w-4 text-emerald-600" /> : <Copy className="inline h-4 w-4" />}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Status:</span>
              <span className="text-rose-600">Waiting for payment</span>
            </div>
            <div>
              <span className="text-muted-foreground">Amount to pay:</span>{" "}
              <span className="font-medium">{amountUSDT.toFixed(2)} USDT</span>
            </div>
            <div>
              <span className="text-muted-foreground">Exc. Rate 1 USDT:</span>{" "}
              <span className="font-medium">{rate.toFixed(6)} USD</span>
            </div>
            <div>
              <span className="text-muted-foreground">Date:</span>{" "}
              <span className="font-medium">{new Date(now).toUTCString()}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Minimum deposit:</span>{" "}
              <span className="font-medium">{">"}0.01 USDT</span>
            </div>
            <div>
              <span className="text-muted-foreground">Confirmations:</span>{" "}
              <span className="font-medium">1 Confirmation</span>
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Expires in:</span>{" "}
              <span className="font-medium text-amber-700">{countdown}</span>
            </div>
          </div>

          <div className="rounded-md bg-amber-50 border border-amber-200 p-2 text-xs text-amber-900 flex items-start gap-2">
            <Info className="h-4 w-4 mt-0.5" />
            <div>
              <div>Use TRC‑20 network only. Sender pays network fees.</div>
              <div>You will receive your activation key by email after payment confirmation.</div>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-2">
            <a
              href="/checkout"
              className="inline-flex items-center justify-center h-9 px-3 rounded bg-amber-600 hover:bg-amber-700 text-white text-sm"
            >
              Back to Payment Options
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
