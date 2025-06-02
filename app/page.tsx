import { Suspense } from "react"

import { HeroAPOD } from "@/components/hero/hero-apod"
import { APODGallery } from "@/components/apod/apod-gallery"
import { AnimatedSkeleton } from "@/components/animated-skeleton"
import { FadeIn } from "@/components/fade-in"
import { HeroButtons } from "@/components/hero/hero-buttons"
import { APIStatusBanner } from "@/components/layout/api-status-banner"
import { CosmicBackground } from "@/components/cosmic-background"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, Star } from "lucide-react"

export default function Home() {
  return (
    <>
      <CosmicBackground />
      <main className="relative flex flex-col items-center gap-12 w-full max-w-7xl mx-auto px-4 pb-20 pt-12 md:px-6 md:pt-24 lg:pt-32">
        <APIStatusBanner />
        <section className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-6">
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mx-auto text-center">
            Discover the Universe with NASA&apos;s Astronomy Picture of the Day
          </h1>
          <p className="max-w-prose text-balance text-muted-foreground md:text-xl mx-auto text-center">
            Dive into the cosmos. Browse through a gallery of breathtaking images from NASA&apos;s APOD archive.
          </p>
          <HeroButtons />
        </section>

        <Suspense fallback={<AnimatedSkeleton className="h-[calc(100vh-200px)] w-full max-w-6xl" />}>
          <FadeIn>
            <HeroAPOD />
          </FadeIn>
        </Suspense>

        {/* Call to Action */}
        <FadeIn delay={0.8}>
          <div className="w-full max-w-12xl">
            <Card className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <CardContent className="px-6 py-6 md:px-14 md:py-8">
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold">Start Exploring the Universe</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    Ready to discover the wonders of space? Browse through decades of stunning astronomy images and
                    learn about the cosmos from NASA&apos;s experts.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <Button asChild size="default" className="min-w-[140px]">
                      <Link href="/gallery">
                        <Calendar className="w-4 h-4 mr-2" />
                        Browse Gallery
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="default" className="min-w-[140px]">
                      <Link href="#todays-picture">
                        <Star className="w-4 h-4 mr-2" />
                        Today&apos;s Picture
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </FadeIn>

        <div className="w-full max-w-6xl">
          <Suspense fallback={<AnimatedSkeleton className="mt-12 h-[600px] w-full" />}>
            <APODGallery />
          </Suspense>
        </div>
      </main>
    </>
  )
}