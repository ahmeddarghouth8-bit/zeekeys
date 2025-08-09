export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold">Terms of Service</h1>
      <p className="text-sm text-muted-foreground">
        These Terms govern your use of ZeeKeys services and storefront. By placing an order, you agree to these Terms.
      </p>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Accounts & Eligibility</h2>
        <p className="text-sm text-muted-foreground">
          You must be legally capable of entering into a binding agreement in your country of residence. Keep your contact
          details accurate to receive delivery emails.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Orders & Delivery</h2>
        <p className="text-sm text-muted-foreground">
          Digital keys are delivered to your email after payment verification. We may request additional verification to
          prevent fraud.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Payments</h2>
        <p className="text-sm text-muted-foreground">
          Payments are processed in USDT (TRC-20). Prices and promotions may change without notice until an order is placed.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Prohibited Conduct</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>Abuse, fraud, chargeback misuse, reselling keys in violation of publishers’ terms.</li>
          <li>Interference with the site or access to non-public areas.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Liability</h2>
        <p className="text-sm text-muted-foreground">
          To the extent permitted by law, ZeeKeys is not liable for indirect or consequential damages. Your exclusive remedy
          for any claim is limited to the amount paid for the product at issue.
        </p>
      </section>
    </div>
  )
}
