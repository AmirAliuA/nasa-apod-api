import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format as fnsFormat } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string, style: "full" | "short" = "full") {
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return dateString
    }

    if (style === "short") {
      return fnsFormat(date, "MMM d, yyyy")
    }

    return fnsFormat(date, "MMMM d, yyyy")
  } catch (error) {
    return dateString
  }
}