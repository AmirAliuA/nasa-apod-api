"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { getMultipleAPODs, type APOD, getValidDateRange } from "@/lib/nasa-api"
import { formatDate, cn } from "@/lib/utils"
import { AnimatedSkeleton } from "@/components/animated-skeleton"
import { AnimatedCard } from "@/components/animated-card"
import { subDays, format, parseISO } from "date-fns"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp, Calendar, ImageIcon, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const POSTS_PER_LOAD = 9
const SCROLL_THRESHOLD = 200 // Show back-to-top after scrolling this many pixels

interface APODGalleryProps {
  selectedDate?: string
}

// Individual APOD Card Component
function APODCard({ apod, index }: { apod: APOD; index: number }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/apod/${apod.date}`} className="block h-full">
        <AnimatedCard>
          <Card className="overflow-hidden h-full bg-gradient-to-br from-card to-card/80 border border-border hover:border-border/80 transition-all duration-300 shadow-lg hover:shadow-xl group">
            <div className="relative aspect-video overflow-hidden bg-muted">
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <AnimatedSkeleton className="w-full h-full" />
                </div>
              )}

              {imageError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted text-muted-foreground">
                  <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                  <span className="text-sm">Image unavailable</span>
                </div>
              ) : (
                <img
                  src={apod.url || "/logo.png"}
                  alt={apod.title}
                  className={cn(
                    "w-full h-full object-cover transition-all duration-500 group-hover:scale-105",
                    !imageLoaded && "opacity-0",
                    imageLoaded && "opacity-100",
                  )}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              )}

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs text-white/90 line-clamp-2">{apod.explanation}</p>
              </div>
            </div>

            <CardContent className="p-4 flex flex-col justify-between space-y-2">
              <div>
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-lg font-semibold line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                    {apod.title}
                  </h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="outline" className="shrink-0 whitespace-nowrap">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(apod.date, "short")}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View APOD for {formatDate(apod.date, "full")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <p className="mt-1 text-xs text-muted-foreground">© {apod.copyright || "Unknown"}</p>
              </div>
            </CardContent>
          </Card>
        </AnimatedCard>
      </Link>
    </motion.div>
  )
}

// Skeleton Card Component
function SkeletonCard() {
  return (
    <Card className="overflow-hidden h-full bg-card border border-border">
      <div className="aspect-video w-full">
        <AnimatedSkeleton className="h-full w-full" />
      </div>
      <CardContent className="p-4 space-y-3">
        <AnimatedSkeleton className="h-6 w-4/5" />
        <AnimatedSkeleton className="h-4 w-1/3" />
      </CardContent>
    </Card>
  )
}

export function APODGallery({ selectedDate }: APODGalleryProps) {
  const [apods, setApods] = useState<APOD[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const loadingRef = useRef<HTMLDivElement>(null)
  const { startDate } = getValidDateRange()

  const fetchAPODs = useCallback(
    async (endDate: Date) => {
      setLoadingMore(true)
      setError(null)

      try {
        const startDate = subDays(endDate, POSTS_PER_LOAD - 1)
        const startDateString = format(startDate, "yyyy-MM-dd")
        const endDateString = format(endDate, "yyyy-MM-dd")

        const data = await getMultipleAPODs(startDateString, endDateString)
        const imageApods = data.filter((item) => item.media_type === "image")

        // Sort by date to ensure correct chronological order
        const sortedApods = imageApods.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

        setApods((prevApods) => {
          const existingDates = new Set(prevApods.map((apod) => apod.date))
          const newApods = sortedApods.filter((apod) => !existingDates.has(apod.date))
          return [...prevApods, ...newApods]
        })

        // Check if we've reached the earliest APOD date
        const earliestFetchedDate = new Date(sortedApods[sortedApods.length - 1]?.date || endDateString)
        const firstAPODDate = new Date(startDate)

        if (earliestFetchedDate <= firstAPODDate || imageApods.length < POSTS_PER_LOAD) {
          setHasMore(false)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch astronomy pictures")
        console.error("Error fetching APODs:", err)
      } finally {
        setLoading(false)
        setLoadingMore(false)
      }
    },
    [startDate],
  )

  useEffect(() => {
    // Initial fetch
    setLoading(true)
    setApods([])
    setHasMore(true)

    const initialDate = selectedDate ? new Date(selectedDate) : new Date()
    fetchAPODs(initialDate)

    // Add scroll listener for back-to-top button
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > SCROLL_THRESHOLD)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [fetchAPODs, selectedDate])

  // Infinite scroll logic
  useEffect(() => {
    if (!hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0]
        if (target.isIntersecting && hasMore && !loadingMore && !loading) {
          const oldestApodDate = apods[apods.length - 1]?.date
          if (oldestApodDate) {
            const nextEndDate = subDays(parseISO(oldestApodDate), 1)
            fetchAPODs(nextEndDate)
          }
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0.1,
      },
    )

    const currentLoadingRef = loadingRef.current
    if (currentLoadingRef) {
      observer.observe(currentLoadingRef)
    }

    return () => {
      if (currentLoadingRef) {
        observer.unobserve(currentLoadingRef)
      }
    }
  }, [apods, hasMore, loadingMore, fetchAPODs, loading])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Initial loading state
  if (loading && apods.length === 0) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array(POSTS_PER_LOAD)
          .fill(0)
          .map((_, i) => (
            <SkeletonCard key={i} />
          ))}
      </div>
    )
  }

  // Error state with no data
  if (error && apods.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center p-12 text-center space-y-4"
      >
        <div className="rounded-full bg-destructive/20 p-4">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">Failed to load gallery</h3>
        <p className="text-muted-foreground max-w-md">{error}</p>
        <Button
          onClick={() => {
            setLoading(true)
            setError(null)
            fetchAPODs(new Date())
          }}
        >
          Try Again
        </Button>
      </motion.div>
    )
  }

  // Empty state
  if (apods.length === 0 && !loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center p-12 text-center space-y-4"
      >
        <div className="rounded-full bg-muted p-4">
          <ImageIcon className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">No images found</h3>
        <p className="text-muted-foreground max-w-md">
          {selectedDate
            ? `No astronomy pictures available for ${formatDate(selectedDate)}.`
            : "No astronomy pictures available."}
        </p>
        {selectedDate && (
          <Button
            variant="outline"
            onClick={() => {
              window.location.href = "/gallery"
            }}
          >
            View Recent Pictures
          </Button>
        )}
      </motion.div>
    )
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {apods.map((apod, index) => (
            <APODCard key={apod.date} apod={apod} index={index} />
          ))}
        </AnimatePresence>

        {/* Loading more indicator */}
        {loadingMore &&
          Array(3)
            .fill(0)
            .map((_, i) => <SkeletonCard key={`loading-more-${i}`} />)}

        {/* Intersection observer target */}
        <div ref={loadingRef} className="h-10" />

        {/* End of content message */}
        {!hasMore && apods.length > 0 && !loadingMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full flex flex-col items-center justify-center py-12 space-y-3 text-center"
          >
            <div className="rounded-full bg-muted p-3">
              <Calendar className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-foreground">You've reached the beginning</h4>
              <p className="text-sm text-muted-foreground mt-1">
                These are the earliest astronomy pictures available (since June 16, 1995)
              </p>
            </div>
            <Button variant="outline" onClick={scrollToTop} className="mt-2">
              Back to Top
            </Button>
          </motion.div>
        )}

        {/* Error while loading more */}
        {error && apods.length > 0 && !loadingMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full flex flex-col items-center justify-center py-8 space-y-3"
          >
            <div className="rounded-full bg-destructive/20 p-3">
              <AlertCircle className="h-5 w-5 text-destructive" />
            </div>
            <p className="text-muted-foreground">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setError(null)
                const oldestApodDate = apods[apods.length - 1]?.date
                if (oldestApodDate) {
                  const nextEndDate = subDays(parseISO(oldestApodDate), 1)
                  fetchAPODs(nextEndDate)
                }
              }}
            >
              Try Again
            </Button>
          </motion.div>
        )}
      </div>

      {/* Back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <Button size="icon" className="rounded-full shadow-lg bg-primary/90 hover:bg-primary" onClick={scrollToTop}>
              <ChevronUp className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}