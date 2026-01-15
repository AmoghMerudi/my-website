import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaArrowUp } from "react-icons/fa"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="
            fixed bottom-8 right-8 z-50
            p-4 rounded-full
            bg-white/70 dark:bg-[#111e39]/80 backdrop-blur-sm
            text-slate-800 dark:text-white
            border border-black/10 dark:border-white/10
            shadow-lg
            hover:bg-white/90 dark:hover:bg-[#111e39]/90
            transition-all duration-200
            flex items-center justify-center
          "
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-lg" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
