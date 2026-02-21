import { useEffect, useRef } from "react"
import { useAchievements, type AchievementId } from "../context/AchievementContext"

export function useSecretWord(word: string, onActivate: () => void) {
  const buffer = useRef("")
  const timer = useRef<ReturnType<typeof setTimeout>>()
  const { unlock } = useAchievements()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key.length !== 1) return
      buffer.current += e.key.toLowerCase()

      clearTimeout(timer.current)
      timer.current = setTimeout(() => { buffer.current = "" }, 2000)

      if (buffer.current.endsWith(word.toLowerCase())) {
        buffer.current = ""
        unlock(word.toLowerCase() as AchievementId)
        onActivate()
      }
    }
    window.addEventListener("keydown", handler)
    return () => {
      window.removeEventListener("keydown", handler)
      clearTimeout(timer.current)
    }
  }, [word, onActivate, unlock])
}
