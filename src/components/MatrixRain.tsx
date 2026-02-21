import { useEffect, useRef } from "react"

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*"
const FONT_SIZE = 14
const DURATION_MS = 3500

export default function MatrixRain({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const cols = Math.ceil(canvas.width / FONT_SIZE)
    const drops = new Array(cols).fill(0).map(() => Math.random() * -20)

    let raf = 0
    const start = performance.now()

    const tick = () => {
      const elapsed = performance.now() - start
      const fade = elapsed > DURATION_MS - 800
        ? Math.max(0, 1 - (elapsed - (DURATION_MS - 800)) / 800)
        : 1

      ctx.fillStyle = `rgba(0, 0, 0, 0.06)`
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${FONT_SIZE}px monospace`

      for (let i = 0; i < cols; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        const x = i * FONT_SIZE
        const y = drops[i] * FONT_SIZE

        ctx.fillStyle = `rgba(0, 255, 70, ${0.9 * fade})`
        ctx.fillText(char, x, y)

        if (drops[i] * FONT_SIZE > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i] += 0.6 + Math.random() * 0.4
      }

      if (elapsed < DURATION_MS) {
        raf = requestAnimationFrame(tick)
      } else {
        onDone()
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9997]"
      aria-hidden="true"
    />
  )
}
