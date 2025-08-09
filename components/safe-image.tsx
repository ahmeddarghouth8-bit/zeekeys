"use client"

import { useEffect, useState } from "react"

type Props = {
  src?: string
  alt: string
  className?: string
  placeholder?: string
}

export default function SafeImage({ src, alt, className, placeholder }: Props) {
  const fallback = placeholder || "/placeholder.svg"
  const [currentSrc, setCurrentSrc] = useState<string>(src || fallback)

  useEffect(() => {
    setCurrentSrc(src || fallback)
  }, [src, fallback])

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (currentSrc !== fallback) setCurrentSrc(fallback)
      }}
      loading="lazy"
    />
  )
}



