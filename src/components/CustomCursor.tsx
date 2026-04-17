import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useCursor } from "../context/CursorContext"

const springCfg = { stiffness: 300, damping: 28, mass: 0.4 }

const variants: Record<string, { size: number; dotSize: number; borderOpacity: number }> = {
  default:  { size: 36, dotSize: 6,  borderOpacity: 0.35 },
  button:   { size: 56, dotSize: 0,  borderOpacity: 0.5 },
  card:     { size: 48, dotSize: 4,  borderOpacity: 0.25 },
  text:     { size: 2,  dotSize: 0,  borderOpacity: 0 },
  name:     { size: 64, dotSize: 0,  borderOpacity: 0.6 },
}

export default function CustomCursor() {
  const { variant } = useCursor()
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, springCfg)
  const springY = useSpring(cursorY, springCfg)
  const isTouch = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)")
    isTouch.current = mq.matches
    const handler = (e: MediaQueryListEvent) => { isTouch.current = e.matches }
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (isTouch.current) return
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [cursorX, cursorY])

  const v = variants[variant] ?? variants.default

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border border-orange-500 mix-blend-difference hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: v.size,
          height: v.size,
          borderColor: `rgba(249,115,22,${v.borderOpacity})`,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
      />
      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-orange-500 mix-blend-difference hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: v.dotSize,
          height: v.dotSize,
          opacity: v.dotSize > 0 ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />
    </>
  )
}
