"use client"
import { useCallback, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { format } from "date-fns"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"

export function HeroDatePicker() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialDate = searchParams.get("date")

  const [date, setDate] = useState<Date | undefined>(initialDate ? new Date(initialDate) : undefined)

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams],
  )

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd")
      router.push(`/?${createQueryString("date", formattedDate)}`, { scroll: false })
    } else {
      router.push("/", { scroll: false })
    }
  }

  return (
    <div className="relative w-full max-w-xs">
      {/* Gradient border effect */}
      <div className="absolute inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg opacity-30 blur transition duration-300 group-hover:opacity-60" />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "relative w-full justify-start text-left font-normal px-4 py-2 bg-card/50 border border-border rounded-lg",
              "hover:bg-card/60",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span className="text-muted-foreground">Select date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
        </PopoverContent>
      </Popover>
    </div>
  )
}