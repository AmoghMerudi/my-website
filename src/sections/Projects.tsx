import { useState } from "react"
import { motion } from "framer-motion"

import { projects } from "../data/projects"
import type { Project } from "../data/projects"
import ProjectOverlay from "../components/ProjectOverlay"

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <>
      <section
        id="projects"
        className="min-h-screen px-4 sm:px-6 py-16 md:py-24 flex items-center justify-center"
      >
        <div className="w-full max-w-6xl">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="accent-text">Projects</span>
          </motion.h2>

          <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="
                  group
                  relative
                  rounded-2xl
                  overflow-hidden
                  bg-[color:var(--surface)]
                  glass
                  cursor-pointer
                "
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                whileHover={{ y: -6 }}
              >
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="
                      h-full w-full object-cover
                      transition-transform duration-500
                      group-hover:scale-105
                    "
                  />

                  {project.backendFocused && (
                    <div className="
                      absolute top-4 left-4
                      text-xs px-2.5 py-1
                      rounded-full
                      bg-[color:var(--surface-strong)]
                      glass-strong
                      text-slate-700 dark:text-white/80
                    ">
                      Backend-focused
                    </div>
                  )}
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-1 text-slate-900 dark:text-white">
                    {project.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-white/60 mb-4">
                    {project.subtitle}
                  </p>

                  <p className="text-slate-600 dark:text-white/60 mb-6">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="
                          text-xs
                          px-3 py-1
                          rounded-full
                          bg-[color:var(--surface-strong)]
                          text-slate-700 dark:text-white/72
                        "
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="text-sm text-slate-500 dark:text-white/50 flex items-center gap-2">
                    <span>View project</span>
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <ProjectOverlay
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  )
}