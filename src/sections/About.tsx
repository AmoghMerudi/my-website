import { motion } from "framer-motion"

import Technologies from "./Technologies"

export default function About() {
  return (
    <motion.section
      id="about"
      className="min-h-screen px-6 py-24 flex items-center justify-center"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="w-full max-w-6xl flex flex-col gap-16">

        {/* Photo + text row */}
        <div className="grid md:grid-cols-[380px_1fr] gap-12 items-center justify-center">
          {/* Photo + soft feathered edge */}
          <div className="relative w-96 h-96 flex items-center justify-center">
            {/* Subtle gradient glow */}
            <div
              className="
                absolute inset-0
                rounded-full
                bg-gradient-to-tr
                from-purple-500/20
                via-indigo-500/15
                to-blue-500/20
                blur-[20px]
              "
            />
            <div
              className="w-full h-full rounded-full overflow-hidden"
              style={{
                maskImage:
                  "radial-gradient(circle at center, black 65%, transparent 85%)",
                WebkitMaskImage:
                  "radial-gradient(circle at center, black 65%, transparent 85%)",
              }}
            >
              <img
                src="/me.jpeg"
                alt="Amogh"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text content */}
          <div className="max-w-2xl md:text-left text-center">
            <h2 className="text-5xl font-bold mb-4">
              Amogh Merudi
            </h2>

            <p className="text-white/70 text-xl leading-relaxed mb-4 max-w-2xl">
              Hey, I’m Amogh. This is my little corner of the internet where I build things, break them, and try to make them better. 
              I enjoy coding, but I’m just as interested in design, creativity, and how people interact with the stuff they use.
              <br/>
              <br/>
              When I’m not working on projects, I’m probably following Formula 1, taking photos, or listening to music. 
              I like the mix of engineering, strategy, and creativity, whether that’s in software or on a race weekend. 
              I’m always learning, always experimenting, and seeing where curiosity takes me next.
            </p>

            <p className="text-white/50 text-lg mt-2">
              Currently studying Computer Science at the University of Toronto.
            </p>
          </div>
        </div>

        {/* Technologies below */}
        <Technologies />

      </div>
    </motion.section>
  )
}