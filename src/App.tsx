import { Analytics } from "@vercel/analytics/react"
import { motion, useScroll, useSpring } from "framer-motion"
import { CursorProvider } from "./context/CursorContext"
import { AchievementProvider } from "./context/AchievementContext"
import CustomCursor from "./components/CustomCursor"
import GradientSpotlight from "./components/GradientSpotlight"
import AchievementToast from "./components/AchievementToast"
import Navbar from "./components/Navbar"
import Hero from "./sections/Hero"
import About from "./sections/About"
import Contact from "./sections/Contact"
import Experience from "./sections/Experience"
import Projects from "./sections/Projects"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"
import { useKonamiCode } from "./hooks/useKonamiCode"
import { useSecretWord } from "./hooks/useSecretWord"
import Confetti from "./components/Confetti"
import MatrixRain from "./components/MatrixRain"
import { useState } from "react"

function AppInner() {
  const { scrollYProgress } = useScroll()
  const progressX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.2,
  })

  const [showConfetti, setShowConfetti] = useState(false)
  const [showMatrix, setShowMatrix] = useState(false)
  const [helloWave, setHelloWave] = useState(false)

  useKonamiCode(() => setShowConfetti(true))

  useSecretWord("matrix", () => setShowMatrix(true))
  useSecretWord("hello", () => setHelloWave(true))

  return (
    <div className="relative min-h-screen text-slate-900 dark:text-white">
      <motion.div
        className="fixed top-0 left-0 right-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-orange-500 to-red-500"
        style={{ scaleX: progressX }}
      />
      <CustomCursor />
      <GradientSpotlight />
      <Navbar />
      <main>
        <Hero helloWave={helloWave} onHelloWaveDone={() => setHelloWave(false)} />
        <Projects />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <AchievementToast />
      {showConfetti && <Confetti onDone={() => setShowConfetti(false)} />}
      {showMatrix && <MatrixRain onDone={() => setShowMatrix(false)} />}
      <Analytics />
    </div>
  )
}

function App() {
  return (
    <AchievementProvider>
      <CursorProvider>
        <AppInner />
      </CursorProvider>
    </AchievementProvider>
  )
}

export default App
