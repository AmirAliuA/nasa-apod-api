import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { getAPOD } from "@/lib/nasa-api"
import { formatDate } from "@/lib/utils"

import { Calendar, ChevronLeft, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FadeIn } from "@/components/fade-in"
import { PageTransition } from "@/components/page-transition"
import { ImageLightboxWrapper } from "@/components/apod/image-lightbox-wrapper"
import { Badge } from "@/components/ui/badge"

interface APODDetailPageProps {
  params: {
    date: string
  }
}

export async function generateMetadata({ params }: APODDetailPageProps): Promise<Metadata> {
  try {
    const apod = await getAPOD(params.date)
    return {
      title: `${apod.title} | NASA APOD Explorer`,
      description: apod.explanation.substring(0, 160),
      openGraph: {
        title: apod.title,
        description: apod.explanation.substring(0, 160),
        images: [
          {
            url: apod.media_type === "image" ? apod.url : "/logo.png",
            width: 1200,
            height: 630,
            alt: apod.title,
          },
        ],
        type: "article",
        publishedTime: apod.date,
      },
      twitter: {
        card: "summary_large_image",
        title: apod.title,
        description: apod.explanation.substring(0, 160),
        images: [apod.media_type === "image" ? apod.url : "/logo.png"],
      },
    }
  } catch (error) {
    return {
      title: "APOD Detail | NASA APOD Explorer",
      description: "View details of NASA's Astronomy Picture of the Day",
      openGraph: {
        title: "APOD Detail | NASA APOD Explorer",
        description: "View details of NASA's Astronomy Picture of the Day",
        images: [
          {
            url: "/logo.png",
            width: 1200,
            height: 630,
            alt: "NASA APOD Explorer",
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "APOD Detail | NASA APOD Explorer",
        description: "View details of NASA's Astronomy Picture of the Day",
        images: ["/logo.png"],
      },
    }
  }
}

export default async function APODDetailPage({ params }: APODDetailPageProps) {
  try {
    const apod = await getAPOD(params.date)
    const nasaUrl = `https://apod.nasa.gov/apod/ap${params.date.replace(/-/g, "").substring(2)}.html`

    return (
      <PageTransition>
        <div className="container py-10 w-full max-w-7xl mx-auto">
          <FadeIn>
            <div className="mb-6">
              <Link href="/gallery" className="inline-flex items-center text-muted-foreground hover:text-foreground">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back to Gallery
              </Link>
            </div>
          </FadeIn>

          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3 space-y-6">
              <FadeIn>
                <div className="relative overflow-hidden rounded-lg border border-border bg-card">
                  {apod.media_type === "image" ? (
                    <ImageLightboxWrapper apod={apod}>
                      <div className="relative aspect-video w-full group cursor-pointer">
                        <Image
                          src={apod.url || "/logo.png"}
                          alt={apod.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          priority
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="bg-black/50 rounded-full p-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-white"
                            >
                              <circle cx="11" cy="11" r="8" />
                              <path d="m21 21-4.3-4.3" />
                              <path d="M11 8v6" />
                              <path d="M8 11h6" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </ImageLightboxWrapper>
                  ) : (
                    <div className="relative aspect-video w-full bg-muted">
                      <iframe
                        src={apod.url}
                        title={apod.title}
                        allowFullScreen
                        className="absolute inset-0 h-full w-full"
                      />
                    </div>
                  )}
                </div>
              </FadeIn>

              <div className="space-y-4">
                <FadeIn delay={0.1}>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">{apod.title}</h1>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Badge>
                      <Calendar className="h-4 w-4" />
                      {formatDate(apod.date)}
                    </Badge>
                  </div>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    {apod.explanation.split("\n\n").map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </FadeIn>
              </div>
            </div>

            <div className="lg:col-span-2">
              <FadeIn direction="left" delay={0.2}>
                <Card className="bg-card border-border sticky top-24">
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-foreground">Image Details</h3>
                      <dl className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Date</dt>
                          <dd className="text-foreground">{formatDate(apod.date)}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Copyright</dt>
                          <dd className="text-foreground">{apod.copyright || "Unknown"}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Media Type</dt>
                          <dd className="text-foreground capitalize">{apod.media_type}</dd>
                        </div>
                      </dl>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-medium text-foreground">Actions</h3>
                      <div className="grid gap-2">
                        <Button asChild variant="outline" className="w-full justify-start">
                          <Link href={apod.hdurl || apod.url} target="_blank" rel="noopener noreferrer">
                            <Download className="mr-2 h-4 w-4" />
                            Download HD Image
                          </Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full justify-start">
                          <Link href={nasaUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View on NASA Website
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        </div>
      </PageTransition>
    )
  } catch (error) {
    notFound()
  }
}