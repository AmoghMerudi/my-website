import { useRef, type ReactNode, type MouseEvent } from "react"
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion"
import { useCursor } from "../context/CursorContext"

type Props = {
  children: ReactNode
  className?: string
  maxTilt?: number
}

const spring = { stiffness: 260, damping: 24, mass: 0.5 }

export default function TiltCard({ children, className = "", maxTilt = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const highlightX = useMotionValue(50)
  const highlightY = useMotionValue(50)
  const sRx = useSpring(rotateX, spring)
  const sRy = useSpring(rotateY, spring)
  const { setVariant } = useCursor()

  const highlight = useMotionTemplate`radial-gradient(300px circle at ${highlightX}% ${highlightY}%, rgba(255,255,255,0.08), transparent 70%)`

  const handleMove = (e: MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    rotateX.set((py - 0.5) * -maxTilt)
    rotateY.set((px - 0.5) * maxTilt)
    highlightX.set(px * 100)
    highlightY.set(py * 100)
  }

  const handleLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    highlightX.set(50)
    highlightY.set(50)
    setVariant("default")
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        perspective: 800,
        rotateX: sRx,
        rotateY: sRy,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMove}
      onMouseEnter={() => setVariant("card")}
      onMouseLeave={handleLeave}
    >
      {children}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
        style={{ background: highlight }}
        aria-hidden="true"
      />
    </motion.div>
  )
}
