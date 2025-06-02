import { Suspense } from "react"
import type { Metadata } from "next"

import { APODGallery } from "@/components/apod/apod-gallery"
import { SearchDate } from "@/components/search-date"
import { AnimatedSkeleton } from "@/components/animated-skeleton"
import { FadeIn } from "@/components/fade-in"
import { PageTransition } from "@/components/page-transition"

export const metadata: Metadata = {
  title: "Gallery | NASA APOD Explorer",
  description: "Browse through NASA's collection of Astronomy Pictures of the Day",
}

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="overflow-hidden rounded-lg border border-border bg-card">
            <AnimatedSkeleton className="aspect-video w-full" />
            <div className="p-4">
              <AnimatedSkeleton className="h-6 w-3/4 mb-2" />
              <AnimatedSkeleton className="h-4 w-full" />
              <AnimatedSkeleton className="h-4 w-2/3 mt-1" />
            </div>
          </div>
        ))}
    </div>
  )
}

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>
}) {
  // Await searchParams before accessing its properties
  const params = await searchParams
  const selectedDate = params.date

  return (
    <PageTransition>
      <div className="container py-10 w-full max-w-7xl mx-auto">
        <div className="flex flex-col gap-6">
          <FadeIn>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
                Astronomy Picture Gallery
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Browse through NASA&apos;s collection of stunning astronomy pictures from different dates.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="w-full max-w-sm">
              <SearchDate initialDate={selectedDate} />
            </div>
          </FadeIn>

          <div className="space-y-8">
            <FadeIn delay={0.2}>
              <h2 className="text-2xl font-bold text-foreground">
                {selectedDate ? `APOD for ${selectedDate}` : "Recent Pictures"}
              </h2>
            </FadeIn>

            <Suspense fallback={<GallerySkeleton />}>
              <APODGallery count={30} selectedDate={selectedDate} />
            </Suspense>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}