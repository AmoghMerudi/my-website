import { useEffect, useRef } from "react"
import { useAchievements } from "../context/AchievementContext"

const SEQUENCE = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
]

export function useKonamiCode(onActivate: () => void) {
  const idx = useRef(0)
  const { unlock } = useAchievements()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const expected = SEQUENCE[idx.current]
      if (e.key === expected || e.key.toLowerCase() === expected) {
        idx.current++
        if (idx.current === SEQUENCE.length) {
          idx.current = 0
          unlock("konami")
          onActivate()
        }
      } else {
        idx.current = 0
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onActivate, unlock])
}
