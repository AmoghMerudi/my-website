import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaBars, FaTimes, FaMoon, FaSun, FaPlay, FaPause } from "react-icons/fa"
import MagneticButton from "./MagneticButton"
import { useCursor } from "../context/CursorContext"

const links = [
  { label: "Home", href: "#hero"},
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
]

const getInitialTheme = (): "dark" | "light" => {
  if (typeof window === "undefined") return "dark"
  const stored = localStorage.getItem("theme")
  if (stored === "light" || stored === "dark") return stored
  return "dark"
}

const AUDIO_SRC = "/music.mp3"

const desktopLinkBase =
  "text-sm font-semibold text-slate-700 dark:text-white/80 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"

const iconButtonBase =
  "h-8 w-8 rounded-md flex items-center justify-center text-slate-700 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/10 hover:text-orange-600 dark:hover:text-orange-400 transition"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState<"dark" | "light">(getInitialTheme)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { setVariant } = useCursor()

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    audioRef.current = new Audio(AUDIO_SRC)
    audioRef.current.loop = true
    audioRef.current.volume = 0.6

    return () => {
      audioRef.current?.pause()
      audioRef.current = null
    }
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  const toggleAudio = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      return
    }

    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest("nav")) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener("click", handleClickOutside)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        pointer-events-none
      `}
    >
      <div className="w-full flex items-center h-14 px-4 sm:px-6 pointer-events-auto">
        <div className="hidden md:flex items-center gap-6 flex-1 justify-start">
          {links.map((link) => (
            <MagneticButton
              key={link.href}
              strength={0.2}
              cursorVariant="button"
              as="span"
            >
              <a
                href={link.href}
                className={`${desktopLinkBase} px-2 py-1`}
              >
                {link.label}
              </a>
            </MagneticButton>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2 justify-end">
          <MagneticButton strength={0.25} as="span">
            <button
              onClick={toggleTheme}
              onMouseEnter={() => setVariant("button")}
              onMouseLeave={() => setVariant("default")}
              className={`${iconButtonBase} hidden md:flex`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FaSun className="text-xs" /> : <FaMoon className="text-xs" />}
            </button>
          </MagneticButton>

          <MagneticButton strength={0.25} as="span">
            <button
              onClick={toggleAudio}
              onMouseEnter={() => setVariant("button")}
              onMouseLeave={() => setVariant("default")}
              className={`${iconButtonBase} hidden md:flex`}
              aria-label={isPlaying ? "Pause music" : "Play music"}
            >
              {isPlaying ? <FaPause className="text-xs" /> : <FaPlay className="text-xs" />}
            </button>
          </MagneticButton>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`${iconButtonBase} md:hidden`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes className="text-sm" /> : <FaBars className="text-sm" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden mt-1 rounded-xl bg-[color:var(--surface)] glass max-w-xs ml-auto mr-4"
          >
            <div className="flex flex-col gap-1 p-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-2 py-2 text-sm font-medium text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <button
                onClick={toggleTheme}
                className="mt-1 px-2 py-2 text-sm font-medium text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center justify-between"
              >
                <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
                {theme === "dark" ? <FaSun /> : <FaMoon />}
              </button>

              <button
                onClick={toggleAudio}
                className="px-2 py-2 text-sm font-medium text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center justify-between"
              >
                <span>{isPlaying ? "Pause music" : "Play music"}</span>
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
