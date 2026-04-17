import { useRef, type ReactNode, type MouseEvent } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useCursor, type CursorVariant } from "../context/CursorContext"

type Props = {
  children: ReactNode
  className?: string
  strength?: number
  cursorVariant?: CursorVariant
  as?: "div" | "span"
}

const spring = { stiffness: 260, damping: 20, mass: 0.6 }

export default function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  cursorVariant = "button",
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)
  const { setVariant } = useCursor()

  const handleMove = (e: MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
    setVariant("default")
  }

  const handleEnter = () => {
    setVariant(cursorVariant)
  }

  const MotionTag = Tag === "span" ? motion.span : motion.div

  return (
    <MotionTag
      ref={ref as any}
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
    </MotionTag>
  )
}
