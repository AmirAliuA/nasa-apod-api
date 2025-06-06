"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="hover:bg-accent hover:text-accent-foreground text-muted-foreground rounded-xl relative overflow-hidden"
    >
      <motion.div className="relative" whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute top-0 left-0 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}