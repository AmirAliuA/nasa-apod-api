"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface SearchDateProps {
  initialDate?: string
}

export function SearchDate({ initialDate }: SearchDateProps) {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(initialDate ? new Date(initialDate) : undefined)

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)

    if (selectedDate) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd")
      router.push(`/gallery?date=${formattedDate}`)
    }
  }

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "MMMM d, yyyy") : "Select date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            disabled={(date) => {
              // Disable future dates and dates before June 16, 1995 (first APOD)
              return (
                date > new Date() || date < new Date(1995, 5, 16) // Month is 0-indexed
              )
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}