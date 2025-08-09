export default function RefundPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold">Refund Policy</h1>
      <p className="text-sm text-muted-foreground">
        We aim for every key to work on first use. If you encounter an issue, contact us and we&apos;ll help resolve it.
      </p>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Eligibility</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>Refunds are considered for unused keys reported within 7 days of purchase.</li>
          <li>We may require evidence (screenshots, error messages) for troubleshooting.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Non-refundable</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>Keys already redeemed or linked to an account.</li>
          <li>Issues caused by region locks or platform restrictions disclosed on the product page.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">How to request</h2>
        <p className="text-sm text-muted-foreground">
          Email support@zeekeys.com with your Order ID, payment proof, and a detailed description of the problem.
        </p>
      </section>
    </div>
  )
}
