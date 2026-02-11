import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative pt-72 pb-32 flex items-center justify-center px-6 overflow-hidden"
    >
      <div className="absolute top-6 left-6 text-sm tracking-wide text-black/60 dark:text-white/60">
        Toronto · UofT CS
      </div>

      <div className="absolute top-6 right-6 text-sm tracking-wide text-black/60 dark:text-white/60">
        Available for work
      </div>

      <motion.div
        className="max-w-5xl w-full"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <motion.h1
          className="
            text-[clamp(3.5rem,10vw,9rem)]
            font-extrabold
            tracking-tight
            leading-[0.95]
            text-slate-900
            dark:text-white
          "
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
            AMOGH
          </span>
          <br />
          <span className="
            font-serif
            italic
            text-black/70
            dark:text-white/80
          ">
            MERUDI
          </span>
        </motion.h1>

        <motion.p
          className="
            mt-6 max-w-xl
            text-lg sm:text-xl
            text-slate-800
            dark:text-white/70
          "
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          I build AI-powered products, clean interfaces,
          <br />
          and systems that actually ship.
        </motion.p>

        <motion.div
          className="mt-10 flex items-center gap-4 flex-wrap"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.a
            href="#contact"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 250, damping: 18 }}
            className="
              px-6 py-3 rounded-full
              bg-slate-900 text-white
              text-sm font-medium
              hover:bg-slate-800
              dark:bg-white dark:text-black dark:hover:bg-white/90
            "
          >
            Get in touch
          </motion.a>

          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 250, damping: 18 }}
            className="
              px-6 py-3 rounded-full
              border border-black/20
              text-sm font-medium
              text-slate-900
              hover:bg-black/5
              dark:border-white/20 dark:text-white dark:hover:bg-white/10
            "
          >
            View resume
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}