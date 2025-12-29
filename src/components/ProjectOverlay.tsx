import { motion } from "framer-motion"
import { useEffect } from "react"

import type { Project } from "../data/projects"

type Props = {
  project: Project
  onClose: () => void
}

export default function ProjectOverlay({ project, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <motion.div
      className="
        fixed inset-0 z-[100]
        bg-black/70 backdrop-blur
        flex items-center justify-center
        px-6
      "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick = {onClose}
    >
      <motion.div
        onClick = {(e) => e.stopPropagation()}
        className="
          relative
          w-full max-w-5xl
          max-h-[90vh]
          overflow-y-auto
          no-scrollbar
          rounded-3xl
          bg-[#0b0b0e]
          border border-white/10
          p-10
        "
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="
            absolute top-6 right-6
            text-white/60 hover:text-white
            transition
          "
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-10">
          <h2 className="text-4xl font-semibold mb-2">
            {project.title}
          </h2>
          <p className="text-white/60">
            {project.subtitle}
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-12 rounded-2xl overflow-hidden border border-white/10">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Architecture */}
        <section className="mb-14">
          <h3 className="text-2xl font-medium mb-4">
            Architecture
          </h3>

          <ul className="list-disc list-inside text-white/60 space-y-2">
          {project.architecture.map((item) => (
            <li key={item}>{item}</li>
          ))}
          </ul>
        </section>

        {/* Results */}
        <section className="mb-6">
        <h3 className="text-2xl font-medium mb-4">
            Results & Impact
        </h3>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.results.map((r) => (
            <li
                key={r.label}
                className="rounded-xl border border-white/10 p-4"
            >
                <p className="text-sm text-white/50">{r.label}</p>
                <p className="text-lg font-medium">{r.value}</p>
            </li>
            ))}
        </ul>
        </section>
      </motion.div>
    </motion.div>
  )
}