import { experiences } from "../data/experiences"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.15"],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section
      id="experience"
      className="min-h-screen px-4 sm:px-6 py-16 md:py-24 flex justify-center"
    >
      <div className="w-full max-w-6xl relative">
        <motion.h2 
            className = "text-4xl sm:text-5xl md:text-6xl text-indigo-600 dark:text-indigo-500 text-left font-bold tracking-tighter mb-10 md:mb-12"
            initial = {{opacity: 0, y:16 }}
            whileInView = {{opacity: 1, y: 0}}
            viewport = {{once: false}}
            transition = {{duration: 0.5, ease: "easeOut"}}
        >
            Work Experience
        </motion.h2>

       <div
          ref={containerRef}
          className="relative flex flex-col gap-y-10 md:gap-y-16"
       >
          <div className="absolute left-[20px] top-0 bottom-0 hidden md:flex justify-center">
            <motion.div
              style={{ height: lineHeight }}
              className="
                absolute top-0
                w-[6px]
                bg-purple-400/30 dark:bg-purple-500/30
                blur-md
                origin-top
                z-0
              "
            />

            <motion.div
              style={{ height: lineHeight }}
              className="
                absolute top-0
                w-[3px]
                bg-gradient-to-b
                from-indigo-300
                to-purple-400
                origin-top
                z-10
                dark:from-indigo-900 dark:to-purple-500
              "
            />
          </div>

          {experiences.map((exp) => {

            return (
              <div
                key={exp.id}
                className="grid grid-cols-1 md:grid-cols-[40px_minmax(220px,280px)_1fr] gap-y-4 md:gap-x-10"
              >
                <div className="relative py-6 md:py-14 z-20 hidden md:block">
                  <div
                    className="
                      absolute left-1/2 -translate-x-1/2
                      h-5 w-5
                      flex items-center justify-center
                      rounded-full
                      bg-indigo-500 dark:bg-indigo-400
                      shadow-[0_0_18px_rgba(168,85,247,0.7)]
                    "
                  >
                    <div className="h-2 w-2 rounded-full bg-purple-500" />
                  </div>
                </div>

                <div className="py-2 md:py-14">
                  <h3
                    className={`
                      text-xl sm:text-2xl font-semibold leading-tight
                    `}
                  >
                    {exp.role}
                  </h3>
                </div>

                <div className="py-2 md:py-14">
                  <p className="text-base sm:text-lg font-medium text-slate-900 dark:text-white mb-1">
                    {exp.org}
                  </p>

                  <p className="text-sm text-slate-500 dark:text-white/50 mb-4">
                    {exp.timeframe}
                  </p>

                  <ul className="text-slate-600 dark:text-white/60 space-y-2">
                    {exp.highlights.map((h) => (
                      <li key={h}>• {h}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

