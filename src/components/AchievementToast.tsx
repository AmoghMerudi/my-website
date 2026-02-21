import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAchievements } from "../context/AchievementContext"

export default function AchievementToast() {
  const { latestToast, dismissToast } = useAchievements()

  useEffect(() => {
    if (!latestToast) return
    const t = setTimeout(dismissToast, 3500)
    return () => clearTimeout(t)
  }, [latestToast, dismissToast])

  return (
    <AnimatePresence>
      {latestToast && (
        <motion.div
          key={latestToast.id}
          initial={{ opacity: 0, y: -40, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="
            fixed top-16 right-4 z-[9999]
            max-w-xs w-full
            rounded-xl
            bg-[color:var(--surface-strong)]
            glass
            p-4
            pointer-events-auto
          "
          onClick={dismissToast}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-orange-500 font-semibold mb-1">
            Secret Found!
          </p>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            {latestToast.title}
          </p>
          <p className="text-xs text-slate-500 dark:text-white/50 mt-0.5">
            {latestToast.description}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
