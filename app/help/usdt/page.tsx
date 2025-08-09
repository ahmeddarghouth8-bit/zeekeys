import Link from "next/link"

export default function USDTHelpPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">How to pay with USDT (TRC-20)</h1>
        <p className="text-muted-foreground">Learn how USDT TRC-20 works and how we process crypto payments securely.</p>
      </header>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">How does USDT TRC-20 payment work?</h2>
        <ol className="list-decimal pl-5 space-y-2 text-sm leading-6">
          <li>Customer chooses to pay with crypto (USDT TRC-20).</li>
          <li>We generate a payment window with the exact USDT amount and the TRC-20 wallet address.</li>
          <li>The price is calculated in USDT and payment details are provided for the transfer.</li>
          <li>
            You send the payment from your wallet to the provided TRC-20 address. After network confirmation, we verify and
            deliver your order via email.
          </li>
        </ol>
        <p className="text-xs text-muted-foreground">
          Some gateways support hundreds of coins and auto-exchange to the merchant&apos;s wallet. Our flow focuses on USDT TRC-20
          for speed and low fees.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Example payment window</h2>
        {/* If embedding the provided image, use the Source URL exactly (requested) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/payerurl_usdt_payment_page-e1663524576456-QiemTseImgDF5AmzO7V4UxPX4ylCLl.png"
          alt="USDT TRC-20 payment window example"
          className="w-full max-w-md rounded border"
        />
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Why accept USDT TRC-20?</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border p-3">
            <div className="font-semibold">The fastest USDT transactions</div>
            <p className="text-sm text-muted-foreground">TRON network confirmations are quick for a fast checkout.</p>
          </div>
          <div className="rounded-lg border p-3">
            <div className="font-semibold">Low fees</div>
            <p className="text-sm text-muted-foreground">TRC-20 transfers typically have very low fees.</p>
          </div>
          <div className="rounded-lg border p-3">
            <div className="font-semibold">World’s leading stablecoin</div>
            <p className="text-sm text-muted-foreground">USDT leads global volumes alongside BTC and ETH.</p>
          </div>
        </div>
      </section>

      <footer className="text-sm">
        Need help? Email{" "}
        <a className="underline" href="mailto:support@zeekeys.com">support@zeekeys.com</a>.{" "}
        <Link className="underline" href="/">Back to store</Link>.
      </footer>
    </div>
  )
}
