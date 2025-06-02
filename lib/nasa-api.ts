// NASA API key is loaded from environment variables
// Falls back to DEMO_KEY if not set or if the API key fails
const NASA_API_KEY = process.env.NASA_API_KEY || "DEMO_KEY"

// Log key usage (safely)
console.log(
  "Using NASA API Key:",
  NASA_API_KEY !== "DEMO_KEY" ? `${NASA_API_KEY.slice(0, 4)}...${NASA_API_KEY.slice(-4)}` : "DEMO_KEY",
)

const NASA_API_URL = "https://api.nasa.gov/planetary/apod"

// NASA APOD valid date range
const APOD_START_DATE = "1995-06-16" // First available APOD
const APOD_END_DATE = new Date().toISOString().split("T")[0] // Today's date

// Rate limiting state
let rateLimitReset: number | null = null

// Shorter revalidation time during development
const REVALIDATION_TIME = process.env.NODE_ENV === "development" ? 60 : 3600

export interface APOD {
  date: string
  explanation: string
  hdurl?: string
  media_type: "image" | "video"
  service_version: string
  title: string
  url: string
  copyright?: string
}

/**
 * Validates if a date is within the valid APOD range
 */
function isValidAPODDate(date: string): boolean {
  const inputDate = new Date(date)
  const startDate = new Date(APOD_START_DATE)
  const endDate = new Date(APOD_END_DATE)

  // Check if date is valid
  if (isNaN(inputDate.getTime())) {
    return false
  }

  // Check if date is within range
  return inputDate >= startDate && inputDate <= endDate
}

/**
 * Validates and adjusts a date to be within valid APOD range
 */
function validateAndAdjustDate(date: string): string {
  if (!isValidAPODDate(date)) {
    const inputDate = new Date(date)
    const startDate = new Date(APOD_START_DATE)
    const endDate = new Date(APOD_END_DATE)

    if (inputDate < startDate) {
      console.warn(`Date ${date} is before APOD start date, using ${APOD_START_DATE}`)
      return APOD_START_DATE
    } else if (inputDate > endDate) {
      console.warn(`Date ${date} is after current date, using ${APOD_END_DATE}`)
      return APOD_END_DATE
    }
  }
  return date
}

/**
 * Get the valid date range for APOD
 */
export function getValidDateRange(): { startDate: string; endDate: string } {
  return {
    startDate: APOD_START_DATE,
    endDate: APOD_END_DATE,
  }
}

/**
 * Makes a request to NASA API with optional fallback
 */
async function makeNASARequest(url: string, apiKey: string): Promise<Response> {
  // Check if we're currently rate limited
  if (rateLimitReset && Date.now() < rateLimitReset) {
    console.warn(`Rate limited, retry after ${new Date(rateLimitReset).toISOString()}`)
    throw new Error(`Rate limited, try again in ${Math.ceil((rateLimitReset - Date.now()) / 1000)}s`)
  }

  const fullUrl = url.replace("PLACEHOLDER_KEY", apiKey)
  const response = await fetch(fullUrl, {
    next: { revalidate: REVALIDATION_TIME },
    headers: { Accept: "application/json" },
  })

  // Handle rate limit
  if (response.status === 429) {
    const resetHeader = response.headers.get("X-RateLimit-Reset")
    const resetTime = Number.parseInt(resetHeader ?? "")
    rateLimitReset = !isNaN(resetTime) ? resetTime * 1000 : Date.now() + 3600000
    throw new Error(`Rate limited, try again in ${Math.ceil((rateLimitReset - Date.now()) / 1000)}s`)
  }

  // Handle invalid key and fallback
  if ((response.status === 403 || response.status === 401) && apiKey !== "DEMO_KEY") {
    console.warn(`API key failed (${response.status}), falling back to DEMO_KEY`)
    return makeNASARequest(url, "DEMO_KEY")
  }

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error")
    console.error("NASA API error response:", response.status, errorText)
    throw new Error(`NASA API request failed: ${response.statusText}`)
  }

  // Log remaining requests
  const remaining = response.headers.get("X-RateLimit-Remaining")
  if (remaining) {
    console.log(`NASA API requests remaining: ${remaining}`)
  }

  return response
}

/**
 * Get the Astronomy Picture of the Day for a specific date
 * @param date - Date in YYYY-MM-DD format, defaults to today
 */
export async function getAPOD(date?: string): Promise<APOD> {
  const params = new URLSearchParams()
  params.append("api_key", "PLACEHOLDER_KEY")

  if (date) {
    // Validate and adjust the date if necessary
    const validDate = validateAndAdjustDate(date)
    params.append("date", validDate)
  }

  const url = `${NASA_API_URL}?${params.toString()}`

  try {
    const response = await makeNASARequest(url, NASA_API_KEY)
    const data = await response.json()
    // The API returns a single object for a specific date
    return data as APOD
  } catch (error) {
    console.error("Failed to fetch APOD:", error)
    throw error
  }
}

/**
 * Get multiple Astronomy Pictures of the Day within a date range
 * @param startDate - Start date in YYYY-MM-DD format
 * @param endDate - End date in YYYY-MM-DD format
 */
export async function getMultipleAPODs(startDate: string, endDate: string): Promise<APOD[]> {
  // Validate and adjust dates
  const validStartDate = validateAndAdjustDate(startDate)
  const validEndDate = validateAndAdjustDate(endDate)

  // Ensure start date is not after end date
  if (new Date(validStartDate) > new Date(validEndDate)) {
    console.warn(`Start date ${validStartDate} is after end date ${validEndDate}, swapping them`)
    const temp = validStartDate
    const finalStartDate = validEndDate
    const finalEndDate = temp

    const params = new URLSearchParams()
    params.append("api_key", "PLACEHOLDER_KEY")
    params.append("start_date", finalStartDate)
    params.append("end_date", finalEndDate)

    const url = `${NASA_API_URL}?${params.toString()}`

    try {
      const response = await makeNASARequest(url, NASA_API_KEY)
      const data = await response.json()
      return Array.isArray(data) ? data : [data]
    } catch (error) {
      console.error("Failed to fetch multiple APODs:", error)
      throw error
    }
  }

  const params = new URLSearchParams()
  params.append("api_key", "PLACEHOLDER_KEY")
  params.append("start_date", validStartDate)
  params.append("end_date", validEndDate)

  const url = `${NASA_API_URL}?${params.toString()}`

  try {
    const response = await makeNASARequest(url, NASA_API_KEY)
    const data = await response.json()
    // The API returns an array of objects for a date range
    return Array.isArray(data) ? data : [data] // Ensure it's always an array
  } catch (error) {
    console.error("Failed to fetch multiple APODs:", error)
    throw error
  }
}

/**
 * Check if the current API key is working
 */
export async function checkAPIKeyStatus(): Promise<{
  isWorking: boolean
  usingDemoKey: boolean
  error?: string
}> {
  const testParams = new URLSearchParams()
  testParams.append("api_key", NASA_API_KEY)
  testParams.append("date", "2023-01-01") // Use a static valid date

  const testUrl = `${NASA_API_URL}?${testParams.toString()}`

  try {
    const response = await fetch(testUrl, {
      headers: { Accept: "application/json" },
    })

    const result = await response.json().catch(() => ({}))
    console.log("Key check response:", response.status, result)

    if (response.ok) {
      return {
        isWorking: true,
        usingDemoKey: NASA_API_KEY === "DEMO_KEY",
      }
    } else if (response.status === 401 || response.status === 403) {
      return {
        isWorking: false,
        usingDemoKey: NASA_API_KEY === "DEMO_KEY",
        error: result?.error?.message || "Invalid or unauthorized API key",
      }
    } else {
      return {
        isWorking: false,
        usingDemoKey: NASA_API_KEY === "DEMO_KEY",
        error: result?.error?.message || `Unexpected error: ${response.statusText}`,
      }
    }
  } catch (error) {
    console.error("Error checking NASA API key:", error)
    return {
      isWorking: false,
      usingDemoKey: NASA_API_KEY === "DEMO_KEY",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}