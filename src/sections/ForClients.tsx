import { motion } from "framer-motion"

const tileBase =
  "relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-[color:var(--surface)] glass p-6 backdrop-blur-lg"

export default function ForClients() {
  return (
    <section
      id="clients"
      className="min-h-screen px-4 sm:px-6 py-16 md:py-24 flex items-center justify-center"
    >
      <div className="w-full max-w-6xl">
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl text-slate-900 dark:text-white text-left font-bold tracking-tighter mb-10 md:mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          For{" "}
          <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-sky-400 bg-clip-text text-transparent">
            Clients
          </span>
          , with a little curiosity
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className={`lg:col-span-7 ${tileBase}`}>
            <div className="rounded-xl overflow-hidden mb-5 border border-white/10 bg-slate-950">
              <div
                className="h-56 sm:h-64 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('/workflow.png')",
                }}
              />
            </div>
            <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-white/40 mb-2">
              How I build
            </p>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Thoughtful, human‑first software
            </h3>
            <p className="text-slate-600 dark:text-white/60">
              I care about the details people notice: clarity, rhythm, and the
              feel of an interface. The goal is simple tech that works, and
              feels good to use.
            </p>
          </div>

          <div className="lg:col-span-5 grid gap-6">
            <div className={tileBase}>
              <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-white/40 mb-2">
                Collaboration
              </p>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                Clear updates, steady momentum
              </h3>
              <p className="text-slate-600 dark:text-white/60">
                Regular check‑ins, quick demos, and decisions written down so
                nothing gets lost.
              </p>
            </div>

            <div className={tileBase}>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Remote‑friendly across time zones
              </h3>
              <div className="h-36 rounded-xl overflow-hidden border border-white/10 bg-slate-950">
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('/timezone.jpg')",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 grid gap-6 lg:grid-rows-[1fr_1fr]">
            <div className={`${tileBase} flex flex-col`}>
              <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-white/40 mb-2">
                Values
              </p>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                Curious, careful, always improving
              </h3>
              <p className="text-slate-600 dark:text-white/60">
                I like experimenting, learning fast, and shipping the version
                that feels right — then iterating.
              </p>
            </div>

            <div className={`${tileBase} flex flex-col justify-between`}>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                Have a project in mind?
              </h3>
              <p className="text-slate-600 dark:text-white/60 mb-4">
                If it’s a cool idea and needs clean execution, I’m in.
              </p>
              <a
                href="#contact"
                className="
                  inline-flex
                  w-fit
                  self-start
                  px-4 py-2
                  rounded-full
                  bg-slate-900 text-white
                  text-sm font-medium
                  hover:bg-slate-800
                  transition
                  dark:bg-white dark:text-black dark:hover:bg-white/90
                "
              >
                Let’s talk
              </a>
            </div>
          </div>

          <div className={`lg:col-span-8 ${tileBase} h-full`}>
            <div className="text-xs uppercase tracking-widest text-slate-500 dark:text-white/40 mb-2 text-center">
              Tooling I reach for
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 text-center">
              The stack that gets me there
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {[
                // Core languages
                "JavaScript",
                "TypeScript",
                "Python",
                "Java",
                // Frontend
                "HTML5",
                "CSS3",
                "React",
                "Next.js",
                "Tailwind",
                // Backend
                "Node.js",
                "FastAPI",
                // Databases
                "MongoDB",
                "SQL",
                // Tooling
                "Git",
                "GitHub",
                "VS Code",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-black/10 dark:border-white/10 bg-[color:var(--surface)] glass px-3 py-3 text-xs sm:text-sm text-slate-700 dark:text-white/70 text-center
                  transition-all duration-200 ease-out
                  hover:-translate-y-1
                  hover:scale-[1.03]
                hover:bg-black/5 dark:hover:bg-white/10
                hover:border-purple-400/40 dark:hover:border-purple-900/40
                  hover:shadow-[0_12px_40px_rgba(168,85,247,0.18)]
                  dark:hover:shadow-[0_12px_40px_rgba(168,85,247,0.25)]

                  active:scale-[0.98]
                  "
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                "Design‑aware decisions",
                "Smooth UX polish",
                "Performance‑first builds",
                "Readable, tidy code",
                "Clear docs + handoff",
                "Iterate fast",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-black/10 dark:border-white/10 bg-[color:var(--surface)] glass px-3 py-2 text-xs text-slate-600 dark:text-white/60 text-center
                  transition-all duration-200 ease-out
                  hover:-translate-y-1
                  hover:scale-[1.03]
                hover:bg-black/5 dark:hover:bg-white/10
                hover:border-purple-400/40 dark:hover:border-purple-900/40
                  hover:shadow-[0_12px_40px_rgba(168,85,247,0.18)]
                  dark:hover:shadow-[0_12px_40px_rgba(168,85,247,0.25)]

                  active:scale-[0.98]
                  "
                >
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-slate-500 dark:text-white/40 w-full">
              + whatever the project needs
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
