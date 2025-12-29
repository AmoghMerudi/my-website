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
        className="min-h-screen px-6 py-24 flex items-center justify-center"
      >
        <div className="w-full max-w-6xl">
          <h2 className="text-4xl font-semibold mb-12">
            Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="
                  group
                  relative
                  rounded-2xl
                  overflow-hidden
                  border border-white/10
                  bg-white/5
                  cursor-pointer
                "
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ y: -6 }}
              >
                {/* IMAGE */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="
                      h-full w-full object-cover
                      transition-transform duration-500
                      group-hover:scale-105
                    "
                  />

                  <div className="absolute inset-0 bg-black/20" />

                  {project.backendFocused && (
                    <div className="
                      absolute top-4 left-4
                      text-xs px-3 py-1
                      rounded-full
                      bg-black/60
                      border border-white/20
                      text-white/80
                      backdrop-blur
                    ">
                      Backend-focused
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <h3 className="text-2xl font-medium mb-1">
                    {project.title}
                  </h3>

                  <p className="text-sm text-white/60 mb-4">
                    {project.subtitle}
                  </p>

                  <p className="text-white/60 mb-6">
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
                          border border-white/10
                          text-white/70
                        "
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="text-sm text-white/50 flex items-center gap-2">
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