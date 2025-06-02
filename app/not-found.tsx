"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Floating Astronaut */}
      <motion.div
        className="absolute top-20 right-20 text-6xl"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        🧑‍🚀
      </motion.div>

      {/* Floating Spaceship */}
      <motion.div
        className="absolute top-32 left-20 text-4xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        🚀
      </motion.div>

      {/* Floating Satellite */}
      <motion.div
        className="absolute bottom-32 right-32 text-3xl"
        animate={{
          y: [0, -25, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        🛰️
      </motion.div>

      {/* Main Content */}
      <div className="text-center space-y-6 z-10 px-4">
        {/* Animated 404 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-8xl md:text-9xl font-bold text-foreground mb-4">404</h1>
        </motion.div>

        {/* Animated Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">Not Found</h2>
        </motion.div>

        {/* Animated Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-lg text-muted-foreground max-w-md mx-auto mb-8">
            The cosmic object you're looking for seems to have drifted into a black hole.
          </p>
        </motion.div>

        {/* Animated Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <ArrowLeft className="w-4 h-4" />
              Return to Earth
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Floating Stars */}
      <motion.div
        className="absolute top-1/4 left-1/4 text-yellow-400"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        ⭐
      </motion.div>

      <motion.div
        className="absolute top-3/4 left-1/3 text-yellow-400"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1.5,
        }}
      >
        ✨
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-1/4 text-yellow-400"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.9, 0.4],
        }}
        transition={{
          duration: 2.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        🌟
      </motion.div>

      {/* Orbiting Planet */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-32 h-32"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        style={{
          transformOrigin: "50% 150px",
        }}
      >
        <div className="text-3xl">🪐</div>
      </motion.div>
    </div>
  )
}