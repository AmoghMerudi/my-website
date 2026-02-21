import { useEffect, useRef } from "react"

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  w: number
  h: number
  color: string
  rotation: number
  rotSpeed: number
  life: number
}

const COLORS = [
  "#f97316", "#ef4444", "#eab308", "#22c55e",
  "#3b82f6", "#a855f7", "#ec4899", "#06b6d4",
]

export default function Confetti({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: window.innerWidth / 2 + (Math.random() - 0.5) * 400,
        y: window.innerHeight * 0.3 + (Math.random() - 0.5) * 200,
        vx: (Math.random() - 0.5) * 12,
        vy: Math.random() * -14 - 2,
        w: Math.random() * 8 + 4,
        h: Math.random() * 6 + 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.3,
        life: 1,
      })
    }

    let raf = 0
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let alive = false

      for (const p of particles) {
        if (p.life <= 0) continue
        alive = true
        p.vy += 0.25
        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rotSpeed
        p.life -= 0.008
        p.vx *= 0.99

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.globalAlpha = Math.max(0, p.life)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
      }

      if (alive) {
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
      className="pointer-events-none fixed inset-0 z-[9998]"
      aria-hidden="true"
    />
  )
}
