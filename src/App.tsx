import { useEffect } from "react"
import Navbar from "./components/Navbar"
import Hero from "./sections/Hero"
import About from "./sections/About"
import Contact from "./sections/Contact"
import Experience from "./sections/Experience"
import Projects from "./sections/Projects"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"

function App() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      return
    }

    let rafId = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const update = () => {
      const width = window.innerWidth || 1
      const height = window.innerHeight || 1
      const offsetX = (targetX / width - 0.5) * 32
      const offsetY = (targetY / height - 0.5) * 32

      currentX += (offsetX - currentX) * 0.08
      currentY += (offsetY - currentY) * 0.08

      document.documentElement.style.setProperty("--dot-x", `${currentX}px`)
      document.documentElement.style.setProperty("--dot-y", `${currentY}px`)

      rafId = window.requestAnimationFrame(update)
    }

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      if (!rafId) {
        rafId = window.requestAnimationFrame(update)
      }
    }

    window.addEventListener("pointermove", onMove, { passive: true })

    return () => {
      window.removeEventListener("pointermove", onMove)
      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }
    }
  }, [])

  return (
    <div className="relative min-h-screen text-slate-900 dark:text-white">
    
      {/* Global ambient background */}
      <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/[0.04] via-transparent to-transparent dark:from-white/[0.04]" />
        <div
          className="
            absolute top-[-25%] left-[-15%]
            w-[800px] h-[800px]
            bg-purple-300/35
            rounded-full
            blur-[140px]
            dark:bg-purple-600/25
          "
        />
        <div
          className="
            absolute top-[20%] right-[-10%]
            w-[700px] h-[700px]
            bg-indigo-300/30
            rounded-full
            blur-[140px]
            dark:bg-indigo-500/25
          "
        />
        <div
          className="
            absolute bottom-[-25%] left-[25%]
            w-[700px] h-[700px]
            bg-blue-300/25
            rounded-full
            blur-[160px]
            dark:bg-blue-500/20
          "
        />
      </div>

      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App
