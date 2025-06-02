"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { format } from "date-fns"

import { getAPOD } from "@/lib/nasa-api"
import { cn } from "@/lib/utils"

import { AlertTriangle } from "lucide-react"
import { AnimatedSkeleton } from "@/components/animated-skeleton"
import { HeroBackground } from "@/components/hero/hero-background"
import { OptimizedImage } from "@/components/optimized-image"

type APOD = {
  date: string
  title: string
  explanation: string
  url: string
  media_type: "image" | "video"
}

const FALLBACK_IMAGE = "https://apod.nasa.gov/apod/image/2506/Arp273Main_HubblePestana_1080.jpg"

export function HeroAPOD() {
  const [apod, setApod] = useState<APOD | null>(null)
  const heroRef = useRef<HTMLElement>(null)
  const [transformStyle, setTransformStyle] = useState({})

  useEffect(() => {
    async function fetchData() {
      const data = await getAPOD()

      if (
        data &&
        data.media_type === "image" &&
        typeof data.date === "string" &&
        typeof data.title === "string" &&
        typeof data.explanation === "string" &&
        typeof data.url === "string"
      ) {
        setApod(data as APOD)
      }
    }

    fetchData()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return

    const { clientX, clientY } = e
    const { left, top, width, height } = heroRef.current.getBoundingClientRect()

    const centerX = left + width / 2
    const centerY = top + height / 2

    const moveX = (clientX - centerX) / (width / 2)
    const moveY = (clientY - centerY) / (height / 2)

    const rotateX = moveY * 5 // Adjust sensitivity
    const rotateY = moveX * -5 // Adjust sensitivity and direction

    setTransformStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      transition: "transform 0.1s ease-out", // Smooth transition
    })
  }

  const handleMouseLeave = () => {
    setTransformStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
      transition: "transform 0.3s ease-out", // Smooth transition back
    })
  }

  if (!apod) {
    return <HeroAPODSkeleton />
  }

  return (
    <Link href={`/apod/${apod.date}`} passHref>
      <section
        id="todays-picture"
        ref={heroRef}
        className="relative mt-12 w-full max-w-6xl overflow-hidden rounded-2xl border border-border bg-card/50 shadow-xl backdrop-blur-lg flex flex-col transform-gpu"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={transformStyle}
      >
        <HeroBackground />
        <div className="relative grid w-full grid-cols-1 md:grid-cols-2 min-h-[350px] md:min-h-[400px]">
          <div className="relative h-full w-full">
            <OptimizedImage
              src={apod.url || FALLBACK_IMAGE}
              alt={apod.title}
              width={800}
              height={800}
              className="h-full w-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" />
          </div>
          <HeroAPODContent apod={apod} />
        </div>
        <div className="w-full -mb-1">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-8 md:h-12">
            <path fill="url(#wave-gradient)" d="M0 0h1440v30c-120 20-360 40-720 20S120 20 0 30V0z" />
            <defs>
              <linearGradient id="wave-gradient" x1="0" x2="1440" y1="0" y2="60" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6366f1" stopOpacity="0.3" />
                <stop offset="1" stopColor="#ec4899" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </Link>
  )
}

function HeroAPODContent({ apod }: { apod: APOD }) {
  return (
    <div className="relative flex flex-col gap-3 p-6 text-left md:p-8">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {format(new Date(apod.date), "MMMM dd, yyyy")}
      </p>
      <h2 className="text-xl font-semibold md:text-2xl text-foreground">{apod.title}</h2>
      <p className="line-clamp-6 text-sm text-muted-foreground">{apod.explanation}</p>
    </div>
  )
}

function HeroAPODSkeleton() {
  return (
    <div
      className={cn(
        "relative mt-12 w-full max-w-6xl overflow-hidden rounded-2xl border border-border bg-card/50 shadow-xl backdrop-blur-lg",
      )}
    >
      <HeroBackground />
      <div className="relative grid w-full grid-cols-1 md:grid-cols-2">
        <div className="flex items-center justify-center h-[300px] w-full md:h-[400px] bg-muted text-muted-foreground text-center p-4">
          <div>
            <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm font-medium">Failed to load APOD data.</p>
            <p className="text-xs mt-1">Please check your NASA API key or try again later.</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 p-6 md:p-8">
          <AnimatedSkeleton className="h-4 w-1/3" />
          <AnimatedSkeleton className="h-6 w-2/3" />
          <AnimatedSkeleton className="h-4 w-full" />
          <AnimatedSkeleton className="h-4 w-5/6" />
          <AnimatedSkeleton className="h-4 w-4/6" />
        </div>
      </div>
    </div>
  )
}