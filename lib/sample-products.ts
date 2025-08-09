export type SampleProduct = {
  slug: string
  title: string
  description: string
  priceCents: number
  imageUrl?: string
  active: boolean
}

// Curated sample catalog (Windows 10 Pro and Nintendo eShop previously removed)
export const sampleProducts: SampleProduct[] = [
  {
    slug: "office-365-personal-12-months",
    title: "Microsoft 365 Personal (12 Months)",
    description: "12-month subscription for 1 user. Includes Word, Excel, PowerPoint, Outlook.",
    priceCents: 3999,
    imageUrl: "/microsoft-365-personal.png",
    active: true,
  },
  {
    slug: "nordvpn-1-year",
    title: "NordVPN 1 Year",
    description: "Stay private online with a 12-month NordVPN subscription.",
    priceCents: 5999,
    imageUrl: "/nordvpn-year-digital.png.png",
    active: true,
  },
  {
    slug: "steam-gift-card",
    title: "Steam Wallet Code",
    description: "Choose your denomination at checkout. Digital code delivered by email.",
    priceCents: 1000,
    imageUrl: "/steam-wallet-code-20.png",
    active: true,
  },
  {
    slug: "psn-gift-card",
    title: "PlayStation (PSN) Gift Card",
    description: "Choose your denomination at checkout. Digital code delivered by email.",
    priceCents: 1000,
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/11-113725_20-psn-card-transparent-hd-png-download%20%281%29-lrK18Y1n09NJFrK3zlPLMxyDTp46XO.png",
    active: true,
  },
  {
    slug: "playstation-plus-12-months",
    title: "PlayStation Plus Essential",
    description: "Online multiplayer, monthly games, and exclusive discounts.",
    imageUrl: "/playstation-plus.jpg.webp.webp",
    priceCents: 5999,
    active: true,
  },
  {
    slug: "paysafecard-gift-card",
    title: "Paysafecard",
    description: "Prepaid online payment card. Choose your denomination at checkout.",
    priceCents: 1000,
    imageUrl: "/paysafecard-gift-card.jpg.webp",
    active: true,
  },
  {
    slug: "apple-gift-card",
    title: "Apple Gift Card",
    description: "Buy apps, games, music, TV shows, and more on the App Store and Apple services.",
    priceCents: 1000,
    // FIRST image -> Apple card
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apple_hero_packshot_360-MOetjEGY0YbZxlY5ZMZxwq8liXSOlt.webp",
    active: true,
  },
  {
    slug: "netflix-gift-card",
    title: "Netflix Gift Card",
    description: "Watch TV shows and movies without a credit card. Choose your balance at checkout.",
    priceCents: 2500,
    imageUrl: "/netflix-gift-card.png..png",
    active: true,
  },
  {
    slug: "ea-sports-fc-25",
    title: "EA SPORTS FC 25",
    description: "Choose platform (PC, PS5, Xbox). Digital key after verification.",
    priceCents: 2999,
    imageUrl: "/ea-sports-fc-24-digital-key.png",
    active: true,
  },
  {
    slug: "gta-v-premium-edition",
    title: "GTA V Premium Edition",
    description: "Choose platform (PC, PS5, Xbox). Explore Los Santos with bonus content.",
    priceCents: 1899,
    imageUrl: "/gta-v-premium-edition.png.webp",
    active: true,
  },
  {
    slug: "minecraft-java-edition-pc",
    title: "Minecraft: Java Edition (PC)",
    description: "Build, explore, and survive in Minecraft: Java Edition.",
    priceCents: 2699,
    imageUrl: "/minecraft-java-bedrock.jpg.webp",
    active: true,
  },
  {
    slug: "adobe-creative-cloud-1-month",
    title: "Adobe Creative Cloud (1 Month)",
    description: "All Creative Cloud apps for one month. Activation code by email.",
    priceCents: 5299,
    imageUrl: "/adobe-creative-cloud.jpg.webp",
    active: true,
  },
]
