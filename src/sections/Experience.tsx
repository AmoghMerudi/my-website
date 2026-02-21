import { experiences } from "../data/experiences"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 40%"],
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
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Work <span className="accent-text">Experience</span>
        </motion.h2>

        <div className="relative pl-4 sm:pl-6 space-y-6">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-black/10 dark:bg-white/10" />
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-orange-500/90 via-red-500/70 to-transparent"
            style={{ scaleY: lineScaleY }}
          />
          {experiences.map((exp) => (
            <motion.article
              key={exp.id}
              className="rounded-2xl bg-[color:var(--surface)] glass p-6 sm:p-7"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <div className="flex flex-wrap gap-3 items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white">
                    {exp.role}
                  </h3>
                  <p className="text-slate-600 dark:text-white/65 mt-1">{exp.org}</p>
                </div>
                <p className="text-xs sm:text-sm uppercase tracking-[0.14em] text-slate-500 dark:text-white/45">
                  {exp.timeframe}
                </p>
              </div>

              <ul className="space-y-2.5 text-sm sm:text-base text-slate-600 dark:text-white/65 leading-relaxed">
                {exp.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5">
                    <span className="mt-[0.45em] h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-white/40 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
