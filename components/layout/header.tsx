"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

import { motion } from "framer-motion"
import { Menu, Search, Rocket } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { APIStatusBanner } from "@/components/layout/api-status-banner"

export function Header() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/archive", label: "Archive" },
    { href: "/about", label: "About" },
  ]

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Header */}
        <div className="hidden md:flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="relative p-2 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"
                >
                  <Rocket className="h-6 w-6 text-white" />
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </motion.div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                  APOD Explorer
                </span>
                <span className="text-xs text-muted-foreground -mt-1 font-medium">NASA Astronomy</span>
              </div>
            </Link>
          </motion.div>

          {/* Navigation */}
          <nav className="flex items-center space-x-1">
            {navItems.map((item, index) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href) || (item.href === "/gallery" && pathname.startsWith("/apod"))

              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              )
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/gallery">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg hover:bg-accent hover:text-accent-foreground text-muted-foreground"
                >
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <ThemeToggle />
            </motion.div>

            <APIStatusBanner />
          </div>
        </div>

        {/* Mobile Header */}
        <div className="flex md:hidden h-16 items-center justify-between">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="relative p-2 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"
                >
                  <Rocket className="h-5 w-5 text-white" />
                  <motion.div
                    className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </motion.div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  APOD Explorer
                </span>
                <span className="text-xs text-muted-foreground -mt-1 font-medium">NASA Astronomy</span>
              </div>
            </Link>
          </motion.div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg hover:bg-accent hover:text-accent-foreground text-muted-foreground"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background/95 backdrop-blur-xl border-border w-full h-full">
              <div className="flex flex-col h-full">
                {/* Mobile Logo */}
                <div className="flex items-center space-x-3 pb-6 border-b border-border">
                  <div className="relative">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
                      <Rocket className="h-5 w-5 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-foreground text-lg">APOD Explorer</span>
                    <span className="text-xs text-muted-foreground font-medium">NASA Astronomy</span>
                  </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex flex-col gap-2 py-6">
                  {navItems.map((item) => {
                    const isActive =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href) || (item.href === "/gallery" && pathname.startsWith("/apod"))

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center px-4 py-3 text-lg font-medium rounded-xl transition-all",
                          "hover:bg-accent hover:text-accent-foreground",
                          isActive
                            ? "text-foreground bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-border"
                            : "text-muted-foreground",
                        )}
                      >
                        {item.label}
                      </Link>
                    )
                  })}
                </nav>

                {/* Mobile Actions */}
                <div className="mt-auto pt-6 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground font-medium">Theme</span>
                    <ThemeToggle />
                    <APIStatusBanner />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}