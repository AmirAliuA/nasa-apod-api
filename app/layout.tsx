import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Mona_Sans as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from "@/components/theme-provider"

import { Header } from "@/components/layout/header"
import Footer from "@/components/layout/footer"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "NASA APOD Explorer",
  description: "Explore NASA's Astronomy Picture of the Day with this beautiful interface",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased overflow-x-hidden", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">
              {children}
            </div>
            <Analytics mode="production" />;
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}