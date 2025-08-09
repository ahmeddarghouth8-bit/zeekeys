export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground">
        We collect minimal data to process your order and deliver keys securely. We do not sell personal data.
      </p>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">What we collect</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>Email address for delivery and support.</li>
          <li>Order details and technical logs for fraud prevention and service quality.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">How we use data</h2>
        <p className="text-sm text-muted-foreground">
          To deliver products, provide support, prevent fraud, and comply with legal requirements.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Retention & Security</h2>
        <p className="text-sm text-muted-foreground">
          We retain information for as long as necessary for the purposes above. We use technical safeguards to protect your
          data.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Your rights</h2>
        <p className="text-sm text-muted-foreground">
          You may request access, correction, or deletion of your data where applicable. Contact support@zeekeys.com.
        </p>
      </section>
    </div>
  )
}
