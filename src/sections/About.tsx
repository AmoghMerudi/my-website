import { motion } from "framer-motion"
import ForClients from "./ForClients"
import MarbleBackground from "../components/MarbleBackground"
import GitHubContributionGraph from "../components/GitHubContributionGraph"

export default function About() {
  return (
    <motion.section
      id="about"
      className="relative min-h-screen px-6 sm:px-10 md:px-16 py-20 md:py-32 flex items-center justify-center"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <MarbleBackground variant="about" />
      <div className="relative z-10 w-full max-w-6xl flex flex-col gap-24 md:gap-28">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-14 md:gap-20 items-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 flex items-center justify-center mx-auto">
            <div
              className="w-full h-full rounded-full overflow-hidden"
              style={{
                maskImage:
                  "radial-gradient(circle at center, black 72%, transparent 93%)",
                WebkitMaskImage:
                  "radial-gradient(circle at center, black 72%, transparent 93%)",
              }}
            >
              <img
                src="/me.jpeg"
                alt="Amogh"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="max-w-2xl md:text-left text-center mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 md:mb-8">
              About <span className="accent-text">Me</span>
            </h2>

            <p className="text-slate-600 dark:text-white/65 text-base sm:text-lg leading-relaxed mb-5 max-w-2xl">
              Hey, I'm Amogh. This is my little corner of the internet where I
              build things, break them, and try to make them better.
              I enjoy coding, but I'm just as interested in design, creativity, and how people interact with the stuff they use.
              <br/>
              <br/>
              When I'm not working on projects, I'm probably following Formula 1, taking photos, or listening to music. 
              I like the mix of engineering, strategy, and creativity, whether that's in software or on a race weekend. 
              I'm always learning, always experimenting, always wanting to make new stuff, and seeing where curiosity takes me next.
            </p>

            <p className="text-slate-500 dark:text-white/45 text-sm sm:text-base mt-5">
              Currently studying Computer Science at the University of Toronto.
            </p>
          </div>
        </div>
        <div>
          <GitHubContributionGraph username="AmoghMerudi" />
        </div>

        <ForClients/>
      </div>
    </motion.section>
  )
}