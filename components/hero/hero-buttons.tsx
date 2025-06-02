"use client"

import Link from "next/link"
import { motion } from "framer-motion"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroButtonsProps {
  apodDate?: string
}

export function HeroButtons({ apodDate }: HeroButtonsProps) {
  return (
    <div className="flex flex-col gap-3 min-[400px]:flex-row">
      {apodDate ? (
        <Link href={`/apod/${apodDate}`}>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-300" />
            <Button size="lg" className="relative bg-white text-black hover:bg-white/90 font-semibold gap-2">
              View Full Details
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </Link>
      ) : (
        <Link href="/gallery">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-300" />
            <Button size="lg" className="relative bg-white text-black hover:bg-white/90 font-semibold gap-2">
              Explore Gallery
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </Link>
      )}
    </div>
  )
}