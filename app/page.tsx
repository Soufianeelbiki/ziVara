"use client"

import { useState } from "react"
import { SplashScreen } from "@/components/splash-screen"
import { MainContent } from "@/components/main-content"
import { CartProvider } from "@/lib/cart-context"

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleEnter = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setShowSplash(false)
    }, 1500)
  }

  return (
    <CartProvider>
      <main className="min-h-screen bg-background overflow-hidden">
        {showSplash ? <SplashScreen onEnter={handleEnter} isTransitioning={isTransitioning} /> : <MainContent />}
      </main>
    </CartProvider>
  )
}
