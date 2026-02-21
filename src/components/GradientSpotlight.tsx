import { useEffect } from "react"
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion"

const springCfg = { stiffness: 80, damping: 30, mass: 0.8 }

export default function GradientSpotlight() {
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0)
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0)
  const sx = useSpring(mouseX, springCfg)
  const sy = useSpring(mouseY, springCfg)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("mousemove", handler)
    return () => window.removeEventListener("mousemove", handler)
  }, [mouseX, mouseY])

  const bg = useMotionTemplate`radial-gradient(600px circle at ${sx}px ${sy}px, rgba(249,115,22,0.07), transparent 70%)`

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[1] hidden md:block transition-opacity duration-500"
      style={{ background: bg }}
      aria-hidden="true"
    />
  )
}
