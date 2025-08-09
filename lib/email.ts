/*
Email sending utility. Configure SMTP_* env vars to enable sending.
In preview (or if not configured), logs the email contents to the server console.
*/
import "server-only"
import nodemailer from "nodemailer"

export async function sendOrderConfirmationEmail(params: {
  to: string
  orderId: string
  usdtAmount: number | string
  walletAddress: string
  paymentCode: string
}) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env
  const subject = `Your ZeeKeys order ${params.orderId}`
  const text = `Thanks for your order!

Order ID: ${params.orderId}
Amount: ${params.usdtAmount} USDT on TRC-20
Wallet Address: ${params.walletAddress}
Your Payment Code: ${params.paymentCode}

Please send the exact amount. Mark as paid after transfer.
`

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
    console.log("[Email Preview] Subject:", subject)
    console.log("[Email Preview] To:", params.to)
    console.log("[Email Preview] Body:\n", text)
    return { preview: true }
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  await transporter.sendMail({
    from: SMTP_FROM,
    to: params.to,
    subject,
    text,
  })
  return { preview: false }
}
