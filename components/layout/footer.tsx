import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background/80 backdrop-blur-sm text-muted-foreground text-xs py-4 flex justify-center items-center gap-2">
      <Link
        href="https://www.linkedin.com/in/amiraliu"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-foreground transition-colors duration-200"
      >
        Made by Amir Aliu
      </Link>
      <span aria-hidden="true" className="text-muted-foreground/50">
        ·
      </span>
      <Link
        href="https://api.nasa.gov/"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-foreground transition-colors duration-200"
      >
        Powered by NASA API
      </Link>
      <span aria-hidden="true" className="text-muted-foreground/50">
        ·
      </span>
      <Link
        href="https://apod.nasa.gov/apod/"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-foreground transition-colors duration-200"
      >
        APOD Website
      </Link>
    </footer>
  )
}