"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

interface Star {
  x: number
  y: number
  size: number
  opacity: number
}

export function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const starsRef = useRef<Star[]>([])
  const requestIdRef = useRef<number>(0)
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Determine if we're in dark mode
  const isDarkMode = mounted && (theme === "dark" || (theme === "system" && systemTheme === "dark"))

  // Set mounted state
  useEffect(() => {
    setMounted(true)
  }, [])

  // Initialize stars
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Create static stars when dimensions change
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    const stars: Star[] = []
    const starCount = Math.floor((dimensions.width * dimensions.height) / 4000) // Slightly reduced density

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 1.5 + 0.5, // Slightly smaller stars
        opacity: Math.random() * 0.6 + 0.3, // More consistent opacity
      })
    }

    starsRef.current = stars
  }, [dimensions])

  // Static star rendering (no animation)
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || !mounted) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Static stars
    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      starsRef.current.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)

        // Theme-appropriate star colors
        if (!isDarkMode) {
          ctx.fillStyle = `rgba(50, 50, 80, ${star.opacity * 0.7})` // Darker but more visible in light mode
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 0.9})` // Brighter in dark mode
        }

        ctx.fill()
      })
    }

    drawStars()

    const twinkle = () => {
      starsRef.current.forEach((star) => {
        // Very subtle opacity variation
        if (Math.random() < 0.005) {
          star.opacity = Math.random() * 0.6 + 0.3
        }
      })
      drawStars()
      requestIdRef.current = requestAnimationFrame(twinkle)
    }

    twinkle()

    return () => {
      cancelAnimationFrame(requestIdRef.current)
    }
  }, [dimensions, isDarkMode, mounted])

  // Don't render anything until mounted to avoid hydration issues
  if (!mounted) return null

  return (
    <>
      {/* Theme-aware overlay for space effect */}
      <div className="fixed inset-0 z-0 bg-background/10 dark:bg-black/40 pointer-events-none" />

      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ opacity: isDarkMode ? 0.9 : 0.5 }}
      />
    </>
  )
}