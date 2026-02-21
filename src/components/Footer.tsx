import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAchievements } from "../context/AchievementContext"

const TAGLINES = [
  "Building thoughtful and reliable software.",
  "Fueled by coffee and curiosity.",
  "No bugs were harmed in the making of this site.",
]

export default function Footer() {
  const [taglineIdx, setTaglineIdx] = useState(0)
  const clickCount = useRef(0)
  const { unlock, unlocked } = useAchievements()

  const handleYearClick = () => {
    clickCount.current++
    if (clickCount.current >= 3) {
      clickCount.current = 0
      setTaglineIdx((prev) => {
        const next = (prev + 1) % TAGLINES.length
        if (next !== 0) unlock("footer-cycler")
        return next
      })
    }
  }

  return (
    <footer className="px-4 sm:px-6 py-10 sm:py-12">
      <div className="max-w-4xl mx-auto rounded-2xl bg-[color:var(--surface)] glass px-6 py-5 sm:px-8 sm:py-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="text-center md:text-left">
          <p className="text-base font-semibold text-slate-900 dark:text-white">
            Amogh Merudi
          </p>
          <AnimatePresence mode="wait">
            <motion.p
              key={taglineIdx}
              className="text-sm text-slate-600 dark:text-white/55"
              initial={{ opacity: 0, rotateX: -40 }}
              animate={{ opacity: 1, rotateX: 0 }}
              exit={{ opacity: 0, rotateX: 40 }}
              transition={{ duration: 0.3 }}
            >
              {TAGLINES[taglineIdx]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2">
          {unlocked.has("konami") && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-orange-500/15 text-orange-500 font-medium">
              ★
            </span>
          )}
          <button
            onClick={handleYearClick}
            className="text-xs uppercase tracking-[0.15em] text-slate-500 dark:text-white/35 select-none"
          >
            © {new Date().getFullYear()} All rights reserved
          </button>
        </div>
      </div>
    </footer>
  )
}
