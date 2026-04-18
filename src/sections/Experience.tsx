import { experiences } from "../data/experiences"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 60%"],
  })
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="min-h-screen px-4 sm:px-6 py-16 md:py-24 flex justify-center"
    >
      <div className="w-full max-w-6xl">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white font-extrabold tracking-tight mb-10 md:mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Work <span className="accent-text">Experience</span>
        </motion.h2>

        <div className="relative pl-8 sm:pl-10 space-y-6">
          {/* Track */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-black/15 dark:bg-white/15" />

          {/* Animated fill */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-[2px] origin-top"
            style={{
              scaleY: lineScaleY,
              background: "linear-gradient(to bottom, #f97316 0%, #ef4444 70%, transparent 100%)",
            }}
          />

          {experiences.map((exp) => (
            <div key={exp.id} className="relative">

              <motion.article
                className="rounded-2xl bg-[color:var(--surface)] glass p-6 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="flex flex-wrap gap-3 items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white">
                      {exp.role}
                    </h3>
                    <p className="text-slate-600 dark:text-white/65 mt-0.5">{exp.org}</p>
                  </div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-white/50 mt-1">
                    {exp.timeframe}
                  </p>
                </div>

                <ul className="space-y-2 text-sm sm:text-base text-slate-600 dark:text-white/65 leading-relaxed">
                  {exp.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5">
                      <span className="mt-[0.5em] h-1 w-1 rounded-full bg-slate-400 dark:bg-white/30 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
