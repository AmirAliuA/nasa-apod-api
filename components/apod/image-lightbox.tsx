"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { formatDate } from "@/lib/utils"
import type { APOD } from "@/lib/nasa-api"

import { X, Download, ExternalLink, ZoomIn, ZoomOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageLightboxProps {
  isOpen: boolean
  onClose: () => void
  apod: APOD
}

export function ImageLightbox({ isOpen, onClose, apod }: ImageLightboxProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [zoomed, setZoomed] = useState(false)

  // Reset image state when APOD changes
  useEffect(() => {
    setImageLoaded(false)
    setImageError(false)
    setZoomed(false)
  }, [apod.date])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = apod.hdurl || apod.url
    link.download = `nasa-apod-${apod.date}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const toggleZoom = () => {
    setZoomed(!zoomed)
  }

  if (!isOpen) return null

  const nasaUrl = `https://apod.nasa.gov/apod/ap${apod.date.replace(/-/g, "").substring(2)}.html`

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4"
        >
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <span className="text-sm text-white/70">{formatDate(apod.date)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleZoom()
                }}
                className="text-white hover:bg-white/10"
              >
                {zoomed ? <ZoomOut className="w-4 h-4 mr-2" /> : <ZoomIn className="w-4 h-4 mr-2" />}
                {zoomed ? "Zoom Out" : "Zoom In"}
              </Button>

              {apod.hdurl && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDownload()
                  }}
                  className="text-white hover:bg-white/10"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download HD
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(nasaUrl, "_blank")
                }}
                className="text-white hover:bg-white/10"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                NASA Website
              </Button>

              <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/10">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div
          className="flex items-center justify-center min-h-screen p-4 pt-20 pb-32"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            key={apod.date}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`relative ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
            onClick={toggleZoom}
          >
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-lg">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            )}

            {imageError ? (
              <div className="flex flex-col items-center justify-center bg-muted rounded-lg p-12 text-center">
                <div className="text-muted-foreground mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Image unavailable</h3>
                <p className="text-muted-foreground">This image could not be loaded</p>
              </div>
            ) : (
              <img
                src={apod.hdurl || apod.url}
                alt={apod.title}
                className={`rounded-lg shadow-2xl transition-all duration-300 ${
                  zoomed
                    ? "max-w-none max-h-none w-auto h-auto cursor-zoom-out"
                    : "max-w-full max-h-[80vh] w-auto h-auto cursor-zoom-in"
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            )}
          </motion.div>
        </div>

        {/* Footer with title and description */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6"
        >
          <div className="max-w-4xl mx-auto text-center space-y-3">
            <h2 className="text-2xl font-bold text-white">{apod.title}</h2>
            {apod.copyright && (
              <div className="flex items-center justify-center gap-2 text-sm text-white/70">
                <User className="w-4 h-4" />
                <span>© {apod.copyright}</span>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}