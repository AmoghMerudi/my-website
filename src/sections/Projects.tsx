import { useState } from "react"
import { motion } from "framer-motion"

import { projects } from "../data/projects"
import type { Project } from "../data/projects"
import ProjectOverlay from "../components/ProjectOverlay"

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <>
      {/* Projects Section */}
      <section
        id="projects"
        className="min-h-screen px-4 sm:px-6 py-16 md:py-24 flex items-center justify-center"
      >
        <div className="w-full max-w-6xl">
			<motion.h2 
				className = "text-4xl sm:text-5xl md:text-6xl text-indigo-600 dark:text-indigo-500 text-left font-bold tracking-tighter mb-10 md:mb-12"
				initial = {{opacity: 0, y:16 }}
				whileInView = {{opacity: 1, y: 0}}
				viewport = {{once: false}}
				transition = {{duration: 0.5, ease: "easeOut"}}
			>
				Projects
			</motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="
                  group
                  relative
                  rounded-2xl
                  overflow-hidden
                  border border-black/10 dark:border-white/10
                  bg-[color:var(--surface)]
                  glass
                  cursor-pointer
                "
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                whileHover={{ y: -6 }}
              >
                {/* IMAGE */}
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

                  <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />

                  {project.backendFocused && (
                    <div className="
                      absolute top-4 left-4
                      text-xs px-3 py-1
                      rounded-full
                      bg-[color:var(--surface-strong)]
                      glass-strong
                      border border-black/10 dark:border-white/20
                      text-slate-700 dark:text-white/80
                      backdrop-blur
                    ">
                      Backend-focused
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-2xl font-medium mb-1">
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
                          border border-black/10 dark:border-white/10
                          text-slate-700 dark:text-white/70
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

      {/* Overlay lives OUTSIDE the section */}
      {selectedProject && (
        <ProjectOverlay
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  )
}