import { useState } from "react"
import { motion } from "framer-motion"

import { projects } from "../data/projects"
import type { Project } from "../data/projects"
import ProjectOverlay from "../components/ProjectOverlay"
import TiltCard from "../components/TiltCard"


function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project
  index: number
  onSelect: (p: Project) => void
}) {
  const num = String(index + 1).padStart(2, "0")

  return (
    <TiltCard className="rounded-2xl h-full">
      <article
        onClick={() => onSelect(project)}
        className="group relative h-full rounded-2xl overflow-hidden cursor-pointer"
      >
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {project.backendFocused && (
          <div className="absolute top-4 left-4 text-[11px] px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white/80 tracking-wide">
            Backend-focused
          </div>
        )}

        <div className="absolute top-5 right-5 text-white/20 text-xs font-mono tracking-widest">
          {num}
        </div>

        <div className="absolute bottom-0 inset-x-0 p-5 md:p-6 flex flex-col gap-2">
          <h3 className="text-xl md:text-[1.3rem] font-bold text-white leading-snug">
            {project.title}
          </h3>

          <p className="text-sm text-white/65 leading-relaxed line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white/60"
              >
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-[11px] px-2 py-0.5 text-white/35">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-orange-400 text-xs pt-0.5 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
            <span>View project</span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </div>
        </div>
      </article>
    </TiltCard>
  )
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <>
      <section id="projects" className="py-24 md:py-32 px-5 md:px-10 xl:px-16">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-12 md:mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="accent-text">Projects</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className="aspect-video"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, transition: { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] } }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <ProjectCard
                project={project}
                index={i}
                onSelect={setSelectedProject}
              />
            </motion.div>
          ))}
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
