import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

export type AchievementId =
  | "konami"
  | "name-clicker"
  | "hello"
  | "matrix"
  | "footer-cycler"

type AchievementMeta = { id: AchievementId; title: string; description: string }

export const ACHIEVEMENTS: AchievementMeta[] = [
  { id: "konami", title: "Up Up Down Down...", description: "You entered the Konami Code!" },
  { id: "name-clicker", title: "Rapid Fire", description: "You clicked the name 7 times!" },
  { id: "hello", title: "Hello There!", description: "You typed 'hello'!" },
  { id: "matrix", title: "Red Pill", description: "You entered the Matrix!" },
  { id: "footer-cycler", title: "Fine Print", description: "You found the hidden taglines!" },
]

const STORAGE_KEY = "achievements-unlocked"

type AchievementContextType = {
  unlocked: Set<AchievementId>
  unlock: (id: AchievementId) => void
  latestToast: AchievementMeta | null
  dismissToast: () => void
}

const AchievementContext = createContext<AchievementContextType>({
  unlocked: new Set(),
  unlock: () => {},
  latestToast: null,
  dismissToast: () => {},
})

function loadUnlocked(): Set<AchievementId> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return new Set(JSON.parse(raw) as AchievementId[])
  } catch { /* ignore */ }
  return new Set()
}

export function AchievementProvider({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState<Set<AchievementId>>(loadUnlocked)
  const [latestToast, setLatestToast] = useState<AchievementMeta | null>(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...unlocked]))
  }, [unlocked])

  const unlock = useCallback(
    (id: AchievementId) => {
      if (unlocked.has(id)) return
      setUnlocked((prev) => {
        const next = new Set(prev)
        next.add(id)
        return next
      })
      const meta = ACHIEVEMENTS.find((a) => a.id === id)
      if (meta) setLatestToast(meta)
    },
    [unlocked],
  )

  const dismissToast = useCallback(() => setLatestToast(null), [])

  return (
    <AchievementContext.Provider value={{ unlocked, unlock, latestToast, dismissToast }}>
      {children}
    </AchievementContext.Provider>
  )
}

export function useAchievements() {
  return useContext(AchievementContext)
}
