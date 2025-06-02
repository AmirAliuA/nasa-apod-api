import type { Metadata } from "next"
import Link from "next/link"
import { ExternalLink, Rocket, Database, Code, Star, Calendar, Search, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/fade-in"
import { PageTransition } from "@/components/page-transition"
import { CosmicBackground } from "@/components/cosmic-background"

export const metadata: Metadata = {
  title: "About | NASA APOD Explorer",
  description:
    "Learn about NASA APOD Explorer, how I use NASA's API, and my mission to make space exploration accessible to everyone.",
  openGraph: {
    title: "About | NASA APOD Explorer",
    description:
      "Learn about NASA APOD Explorer, how I use NASA's API, and my mission to make space exploration accessible to everyone.",
    type: "website",
  },
}

export default function AboutPage() {
  return (
    <>
      <CosmicBackground />
      <PageTransition>
        <div className="container relative z-10 py-10 w-full max-w-6xl mx-auto">
          {/* Hero Section */}
          <FadeIn>
            <div className="text-center space-y-6 mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Rocket className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">About NASA APOD Explorer</span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Bringing the Universe
                <span className="block text-primary">to Your Screen</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                NASA APOD Explorer is a modern, beautiful interface for discovering and exploring NASA&apos;s Astronomy
                Picture of the Day archive. We make the wonders of space accessible to everyone.
              </p>
            </div>
          </FadeIn>

          {/* Mission Section */}
          <FadeIn delay={0.1}>
            <Card className="mb-12 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Star className="w-6 h-6 text-primary" />
                  My Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg leading-relaxed">
                  Every day, NASA publishes a stunning astronomy picture along with a detailed explanation written by
                  professional astronomers. My mission is to make this incredible content more discoverable,
                  searchable, and enjoyable through a modern, intuitive interface.
                </p>
                <p className="leading-relaxed">
                  We believe that the beauty and wonder of space should be accessible to everyone, from casual
                  stargazers to dedicated astronomy enthusiasts. That&apos;s why I&apos;ve built a platform that not only
                  showcases these amazing images but also provides tools to explore, search, and learn from NASA&apos;s vast
                  archive.
                </p>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Features Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
            <FadeIn delay={0.2}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Daily Updates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Automatically fetches the latest Astronomy Picture of the Day as soon as NASA publishes it.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.3}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="w-5 h-5 text-primary" />
                    Date Navigation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Browse through decades of space imagery with my intuitive date picker and gallery interface.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.4}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary" />
                    Beautiful Design
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A modern, responsive design that lets the stunning astronomy images shine while providing excellent
                    usability.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          </div>

          {/* NASA API Section */}
          <FadeIn delay={0.5}>
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Database className="w-6 h-6 text-primary" />
                  Powered by NASA&apos;s APOD API
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <p className="leading-relaxed">
                    My application is built on top of NASA&apos;s official Astronomy Picture of the Day API, which provides
                    structured access to this incredible archive of space imagery and educational content.
                  </p>

                  <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Badge variant="outline">API Capabilities</Badge>
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>Fetch daily astronomy pictures with full metadata</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>Access historical data back to June 16, 1995 (the first APOD)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>Retrieve high-resolution images and detailed explanations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>Query specific dates or date ranges efficiently</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 space-y-3">
                    <h4 className="font-semibold flex items-center gap-2 text-amber-800 dark:text-amber-200">
                      <Badge variant="outline" className="border-amber-300 text-amber-700 dark:text-amber-300">
                        Current Limitations
                      </Badge>
                    </h4>
                    <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-1">⚠</span>
                        <span>
                          API only provides access to the structured APOD data, not the full NASA archive pages
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-1">⚠</span>
                        <span>
                          Cannot access additional metadata that might be available on individual NASA web pages
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-1">⚠</span>
                        <span>Rate limiting applies to ensure fair usage across all API consumers</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button asChild variant="outline">
                    <Link href="https://api.nasa.gov/" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      NASA API Documentation
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="https://apod.nasa.gov/apod/" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Official APOD Website
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Future Features Section */}
          <FadeIn delay={0.6}>
            <Card className="mb-12 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  Future Enhancements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="leading-relaxed">
                  While the NASA APOD API provides excellent structured access to the astronomy pictures, we&apos;re
                  exploring additional ways to enhance your experience:
                </p>

                <div className="space-y-4">
                  <div className="bg-white/50 dark:bg-gray-900/50 rounded-lg p-4 space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Badge variant="secondary">Planned Feature</Badge>
                      Archive Page Scraping
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      I&apos;m considering implementing web scraping capabilities to access NASA&apos;s archive pages directly.
                      This would allow me to:
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                      <li>• Extract additional metadata not available through the API</li>
                      <li>• Provide enhanced search capabilities across titles and descriptions</li>
                      <li>• Offer more comprehensive archive browsing features</li>
                      <li>• Access any supplementary information from the original NASA pages</li>
                    </ul>
                    <p className="text-xs text-muted-foreground italic">
                      Note: This feature would be implemented respectfully, following NASA&apos;s robots.txt guidelines and
                      rate limiting to avoid impacting their servers.
                    </p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="bg-white/50 dark:bg-gray-900/50 rounded-lg p-3">
                      <h5 className="font-medium text-sm mb-2">Favorites System</h5>
                      <p className="text-xs text-muted-foreground">
                        Save and organize your favorite astronomy pictures
                      </p>
                    </div>
                    <div className="bg-white/50 dark:bg-gray-900/50 rounded-lg p-3">
                      <h5 className="font-medium text-sm mb-2">Social Features</h5>
                      <p className="text-xs text-muted-foreground">
                        Share discoveries and create community discussions
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Technical Details */}
          <FadeIn delay={0.7}>
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="text-2xl">Technical Implementation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="leading-relaxed">
                  NASA APOD Explorer is built with modern web technologies to ensure fast performance, beautiful design,
                  and excellent user experience:
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Frontend Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Next.js 15</Badge>
                      <Badge variant="outline">React</Badge>
                      <Badge variant="outline">TypeScript</Badge>
                      <Badge variant="outline">Tailwind CSS</Badge>
                      <Badge variant="outline">Framer Motion</Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Features</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Server Components</Badge>
                      <Badge variant="outline">Dark Mode</Badge>
                      <Badge variant="outline">Responsive Design</Badge>
                      <Badge variant="outline">Image Optimization</Badge>
                      <Badge variant="outline">SEO Optimized</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Call to Action */}
          <FadeIn delay={0.8}>
            <Card className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <CardContent className="pt-6 space-y-4">
                <h3 className="text-2xl font-bold">Start Exploring the Universe</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Ready to discover the wonders of space? Browse through decades of stunning astronomy images and learn
                  about the cosmos from NASA&apos;s experts.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button asChild size="lg">
                    <Link href="/gallery">
                      <Calendar className="w-4 h-4 mr-2" />
                      Browse Gallery
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/">
                      <Star className="w-4 h-4 mr-2" />
                      Today&apos;s Picture
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </PageTransition>
    </>
  )
}