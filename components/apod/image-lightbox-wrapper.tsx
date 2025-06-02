"use client"

import type React from "react"

import { useState } from "react"
import type { APOD } from "@/lib/nasa-api"

import { ImageLightbox } from "./image-lightbox"

interface ImageLightboxWrapperProps {
  children: React.ReactNode
  apod: APOD
}

export function ImageLightboxWrapper({ children, apod }: ImageLightboxWrapperProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{children}</div>
      <ImageLightbox isOpen={isOpen} onClose={() => setIsOpen(false)} apod={apod} />
    </>
  )
}