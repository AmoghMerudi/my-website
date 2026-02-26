import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"
import MagneticButton from "../components/MagneticButton"
import MarbleBackground from "../components/MarbleBackground"
import { useCursor } from "../context/CursorContext"
import { useAchievements } from "../context/AchievementContext"

type TrailPoint = {
  id: number
  x: number
  y: number
  r: number
  life: number
}

type HeroProps = {
  helloWave: boolean
  onHelloWaveDone: () => void
}

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;:',.<>?/~`0123456789"

export default function Hero({ helloWave, onHelloWaveDone }: HeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const nameRef = useRef<HTMLSpanElement | null>(null)
  const nextPointId = useRef(0)
  const targetRef = useRef<{ x: number; y: number } | null>(null)
  const smoothRef = useRef<{ x: number; y: number } | null>(null)
  const clickTimestamps = useRef<number[]>([])

  const [isHovering, setIsHovering] = useState(false)
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const [maskSize, setMaskSize] = useState({ w: 0, h: 0 })
  const [glitching, setGlitching] = useState(false)
  const [glitchText, setGlitchText] = useState("")
  const { setVariant } = useCursor()
  const { unlock } = useAchievements()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const heroScale = useTransform(scrollYProgress, [0, 0.9], [1, 0.92])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.44])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -34])
  const eyebrowY = useTransform(scrollYProgress, [0, 1], [0, -20])
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -56])
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.94])
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -36])
  const ctaY = useTransform(scrollYProgress, [0, 1], [0, -48])

  const handleNameMouseMove = (event: React.MouseEvent<HTMLSpanElement>) => {
    if (!nameRef.current) return
    const rect = nameRef.current.getBoundingClientRect()
    targetRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }

  useEffect(() => {
    if (!nameRef.current) return
    const element = nameRef.current

    const updateSize = () => {
      const rect = element.getBoundingClientRect()
      setMaskSize({ w: rect.width, h: rect.height })
    }

    updateSize()
    const observer = new ResizeObserver(updateSize)
    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let raf = 0

    const tick = () => {
      setTrail((prev) => {
        const decayed = prev
          .map((p) => ({ ...p, life: p.life - 0.03, r: p.r * 0.992 }))
          .filter((p) => p.life > 0)

        if (isHovering && targetRef.current) {
          if (!smoothRef.current) {
            smoothRef.current = { ...targetRef.current }
          } else {
            smoothRef.current = {
              x: smoothRef.current.x + (targetRef.current.x - smoothRef.current.x) * 0.24,
              y: smoothRef.current.y + (targetRef.current.y - smoothRef.current.y) * 0.24,
            }
          }

          decayed.push({
            id: nextPointId.current++,
            x: smoothRef.current.x + (Math.random() - 0.5) * 3,
            y: smoothRef.current.y + (Math.random() - 0.5) * 3,
            r: 30 + Math.random() * 22,
            life: 1,
          })
        }

        return decayed.slice(-26)
      })

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isHovering])

  const triggerGlitch = useCallback(() => {
    if (glitching) return
    setGlitching(true)
    unlock("name-clicker")
    const original = "AMOGH MERUDI"
    let frame = 0
    const maxFrames = 40

    const interval = setInterval(() => {
      frame++
      if (frame >= maxFrames) {
        clearInterval(interval)
        setGlitchText("")
        setGlitching(false)
        return
      }
      const progress = frame / maxFrames
      const resolved = Math.floor(progress * original.length)
      let text = ""
      for (let i = 0; i < original.length; i++) {
        if (original[i] === " ") {
          text += " "
        } else if (i < resolved) {
          text += original[i]
        } else {
          text += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        }
      }
      setGlitchText(text)
    }, 50)
  }, [glitching, unlock])

  const handleNameClick = () => {
    const now = Date.now()
    clickTimestamps.current.push(now)
    clickTimestamps.current = clickTimestamps.current.filter((t) => now - t < 2000)
    if (clickTimestamps.current.length >= 7) {
      clickTimestamps.current = []
      triggerGlitch()
    }
  }

  useEffect(() => {
    if (!helloWave) return
    const t = setTimeout(onHelloWaveDone, 3000)
    return () => clearTimeout(t)
  }, [helloWave, onHelloWaveDone])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-end justify-start px-6 sm:px-10 md:px-16 pb-16 sm:pb-20 pt-24 sm:pt-32"
    >
      <MarbleBackground variant="hero" />
      <motion.div
        className="relative z-10 max-w-4xl w-full text-left"
        style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >

        <motion.p
          className="text-xs sm:text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-white/45 mb-6"
          style={{ y: eyebrowY }}
        >
          Toronto · CS @ UofT · Available for work
        </motion.p>

        <motion.h1
          className="
            text-[clamp(3.1rem,10vw,8rem)]
            font-black
            tracking-[-0.045em]
            leading-[0.95]
            text-slate-900
            dark:text-white
          "
          style={{ y: titleY, scale: titleScale }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span
            ref={nameRef}
            onMouseMove={handleNameMouseMove}
            onMouseEnter={() => { setIsHovering(true); setVariant("name") }}
            onMouseLeave={() => {
              setIsHovering(false)
              targetRef.current = null
              smoothRef.current = null
              setVariant("default")
            }}
            onClick={handleNameClick}
            className="relative inline-block h-[1.02em] overflow-hidden align-top cursor-default select-none"
          >
            <span className="block whitespace-nowrap">
              {glitching && glitchText ? (
                <span
                  className="inline-block text-slate-950 dark:text-white"
                  style={{
                    filter: "url(#hero-goo-filter)",
                    animation: "none",
                    textShadow: "2px 0 #ef4444, -2px 0 #3b82f6",
                  }}
                >
                  {glitchText.split(" ").map((word, i) => (
                    <span key={i}>
                      {i > 0 && " "}
                      {i === 0 ? (
                        <span className="text-slate-950 dark:text-white">{word}</span>
                      ) : (
                        <span className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-400 bg-clip-text text-transparent">
                          {word}
                        </span>
                      )}
                    </span>
                  ))}
                </span>
              ) : (
                <>
                  <span className="text-slate-950 dark:text-white">AMOGH</span>{" "}
                  <span className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-400 bg-clip-text text-transparent">
                    MERUDI
                  </span>
                </>
              )}
            </span>

            <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
              <defs>
                <filter id="hero-goo-filter">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur" />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="
                      1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 18 -8
                    "
                    result="goo"
                  />
                  <feBlend in="SourceGraphic" in2="goo" />
                </filter>
                <mask
                  id="hero-liquid-mask"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width={maskSize.w || 1}
                  height={maskSize.h || 1}
                >
                  <rect x="0" y="0" width={maskSize.w || 1} height={maskSize.h || 1} fill="black" />
                  <g filter="url(#hero-goo-filter)">
                    {trail.map((p) => (
                      <circle key={p.id} cx={p.x} cy={p.y} r={p.r} fill="white" opacity={p.life} />
                    ))}
                  </g>
                </mask>
              </defs>
            </svg>

            <span
              className="absolute inset-0 block whitespace-nowrap bg-[color:var(--surface-strong)] pointer-events-none"
              style={{
                mask: "url(#hero-liquid-mask)",
                WebkitMask: "url(#hero-liquid-mask)",
              }}
            >
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                Full-Stack Dev
              </span>
            </span>
          </span>
        </motion.h1>

        <AnimatePresence mode="wait">
          {helloWave ? (
            <motion.p
              key="hello-wave"
              className="
                mt-7 max-w-2xl
                text-base sm:text-lg
                leading-relaxed
                accent-text font-semibold
              "
              style={{ y: subtitleY }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              Hey! Thanks for typing hello 👋
            </motion.p>
          ) : (
            <motion.p
              key="subtitle"
              className="
                mt-7 max-w-2xl
                text-base sm:text-lg
                text-slate-600 dark:text-white/65
                leading-relaxed
              "
              style={{ y: subtitleY }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ delay: 0.45 }}
            >
              I build AI-powered products, clean interfaces, and reliable systems
              that are practical, polished, and built to ship.
            </motion.p>
          )}
        </AnimatePresence>

        <motion.div
          className="mt-10 flex items-center justify-start gap-3 sm:gap-4 flex-wrap"
          style={{ y: ctaY }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <MagneticButton>
            <motion.a
              href="#contact"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 250, damping: 18 }}
              className="
                px-5 py-2.5 rounded-full
                bg-black dark:bg-white
                text-white dark:text-black
                text-sm font-medium
                transition
                hover:opacity-90
              "
            >
              Get in Touch
            </motion.a>
          </MagneticButton>

          <MagneticButton>
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 250, damping: 18 }}
              className="
                px-5 py-2.5 rounded-full
                border border-black/15 dark:border-white/20
                text-sm font-medium
                text-slate-900 dark:text-white
                bg-[color:var(--surface)] glass
                hover:bg-black/5 dark:hover:bg-white/10
              "
            >
              View Resume
            </motion.a>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  )
}
