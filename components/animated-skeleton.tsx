"use client"

import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

interface AnimatedSkeletonProps {
  className?: string
}

export function AnimatedSkeleton({ className = "" }: AnimatedSkeletonProps) {
  return (
    <motion.div
      animate={{
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        repeat: Number.POSITIVE_INFINITY,
        duration: 1.5,
        ease: "easeInOut",
      }}
    >
      <Skeleton className={className} />
    </motion.div>
  )
}