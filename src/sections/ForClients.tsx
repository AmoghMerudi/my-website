import { motion, useReducedMotion } from "framer-motion"

type StoryPhase = {
  id: string
  title: string
  description: string
}

const storyPhases: StoryPhase[] = [
  {
    id: "01",
    title: "Align",
    description: "Define outcomes first, then turn them into a practical roadmap with clear tradeoffs.",
  },
  {
    id: "02",
    title: "Build",
    description: "Core product work ships in focused sprints with visible progress at each checkpoint.",
  },
  {
    id: "03",
    title: "Refine",
    description: "Polish, performance, and handoff close the loop so your team can run with confidence.",
  },
]

const heroPills = [
  "AI product features",
  "Full-stack delivery",
  "Performance-first",
  "Design-aware engineering",
]

export default function ForClients() {
  const prefersReducedMotion = useReducedMotion()

  const reveal = prefersReducedMotion
    ? { initial: { opacity: 1 }, whileInView: { opacity: 1 } }
    : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 } }

  const transition = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.65, ease: "easeOut" as const }

  return (
    <section id="clients" className="relative px-4 sm:px-6 py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          className="rounded-3xl border border-black/10 dark:border-white/10 bg-[color:var(--surface)]/85 glass p-7 sm:p-10 md:p-14"
          initial={reveal.initial}
          whileInView={reveal.whileInView}
          viewport={{ once: true, amount: 0.25 }}
          transition={transition}
        >
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-white/45 mb-5">
            For Clients
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-[-0.03em] leading-[0.95] text-slate-900 dark:text-white max-w-4xl">
            Big ideas deserve calm, <span className="accent-text">trustworthy execution.</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-white/65 max-w-3xl leading-relaxed">
            I build digital products as a guided story, not a noisy process. You get sharp decisions,
            visible progress, and software that feels considered from first click to handoff.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-xs sm:text-sm text-slate-600 dark:text-white/65">
            {heroPills.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-black/10 dark:border-white/15 px-3 py-1.5 bg-[color:var(--surface-strong)]"
              >
                {pill}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-10 md:mt-16 rounded-3xl border border-black/10 dark:border-white/10 bg-[color:var(--surface)] p-6 sm:p-8 md:p-10"
          initial={reveal.initial}
          whileInView={reveal.whileInView}
          viewport={{ once: true, amount: 0.2 }}
          transition={transition}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-white/40 mb-6">
            Build Journey
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5">
            {storyPhases.map((phase) => (
              <article
                key={phase.id}
                className="rounded-2xl border border-black/10 dark:border-white/10 bg-[color:var(--surface-strong)] p-5 sm:p-6"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-white/40 mb-2">
                  Phase {phase.id}
                </p>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{phase.title}</h3>
                <p className="text-slate-600 dark:text-white/65 leading-relaxed">{phase.description}</p>
              </article>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-10 md:mt-16 rounded-3xl border border-orange-500/25 dark:border-orange-300/30 bg-gradient-to-r from-orange-500/10 via-red-500/5 to-transparent p-6 sm:p-8 md:p-10"
          initial={reveal.initial}
          whileInView={reveal.whileInView}
          viewport={{ once: true, amount: 0.25 }}
          transition={transition}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-white/40 mb-3">
            Closing Offer
          </p>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight max-w-3xl">
            If your next product move matters, let's make it clear, fast, and hard to ignore.
          </h3>
          <p className="mt-4 text-slate-600 dark:text-white/65 max-w-2xl leading-relaxed">
            Open to selective collaborations this term. Tell me what you are building, and I will outline the
            smartest way to ship it.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 sm:gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black px-5 py-2.5 text-sm font-medium transition hover:opacity-90"
            >
              Start a Project Conversation
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-black/15 dark:border-white/20 bg-[color:var(--surface)] px-5 py-2.5 text-sm font-medium text-slate-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition"
            >
              View Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
