import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"

import { projects } from "../data/projects"
import type { Project } from "../data/projects"
import ProjectOverlay from "../components/ProjectOverlay"
import TiltCard from "../components/TiltCard"
import { useCursor } from "../context/CursorContext"

function ProjectCardDesktop({
  project,
  index,
  onSelect,
}: {
  project: Project
  index: number
  onSelect: (project: Project) => void
}) {
  const { setVariant } = useCursor()
  const num = String(index + 1).padStart(2, "0")

  return (
    <motion.article
      onClick={() => onSelect(project)}
      onMouseEnter={() => setVariant("card")}
      onMouseLeave={() => setVariant("default")}
      className="group relative flex-shrink-0 w-[580px] h-[340px] rounded-2xl overflow-hidden cursor-pointer"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Full-bleed image */}
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Base gradient — always visible */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

      {/* Hover gradient — expands darkness upward */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Backend-focused badge */}
      {project.backendFocused && (
        <div className="absolute top-4 left-4 text-[11px] px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white/80 tracking-wide">
          Backend-focused
        </div>
      )}

      {/* Project number — top right */}
      <div className="absolute top-5 right-5 text-white/20 text-xs font-mono tracking-widest">
        {num}
      </div>

      {/* Content overlay at bottom */}
      <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col gap-2">
        <h3 className="text-[1.4rem] font-bold text-white leading-snug">
          {project.title}
        </h3>

        {/* Description — reveals on hover */}
        <p className="text-sm text-white/65 leading-relaxed line-clamp-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
          {project.description}
        </p>

        {/* Tech chips */}
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

        {/* CTA — reveals on hover */}
        <div className="flex items-center gap-1.5 text-orange-400 text-xs pt-0.5 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
          <span>View project</span>
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </div>
      </div>
    </motion.article>
  )
}

const cardReveal = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

function ProjectCardMobile({
  project,
  index,
  onSelect,
}: {
  project: Project
  index: number
  onSelect: (project: Project) => void
}) {
  const num = String(index + 1).padStart(2, "0")

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.15 }}
      variants={cardReveal}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <TiltCard className="rounded-2xl">
        <article
          onClick={() => onSelect(project)}
          className="group relative rounded-2xl overflow-hidden cursor-pointer h-[220px]"
        >
          {/* Full-bleed image */}
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          {/* Badge */}
          {project.backendFocused && (
            <div className="absolute top-4 left-4 text-[11px] px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white/80 tracking-wide">
              Backend-focused
            </div>
          )}

          {/* Number */}
          <div className="absolute top-5 right-5 text-white/20 text-xs font-mono tracking-widest">
            {num}
          </div>

          {/* Content */}
          <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col gap-2">
            <h3 className="text-xl font-bold text-white leading-snug">{project.title}</h3>
            <p className="text-sm text-white/60 leading-relaxed line-clamp-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {project.tech.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-white/60"
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
            <div className="flex items-center gap-1.5 text-orange-400 text-xs pt-0.5">
              <span>View project</span>
              <span>→</span>
            </div>
          </div>
        </article>
      </TiltCard>
    </motion.div>
  )
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const rowRef = useRef<HTMLDivElement | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [maxTranslateX, setMaxTranslateX] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  useEffect(() => {
    const update = () => {
      if (!rowRef.current || !viewportRef.current) return
      const scrollWidth = rowRef.current.scrollWidth
      const visibleWidth = viewportRef.current.clientWidth
      setMaxTranslateX(Math.max(0, scrollWidth - visibleWidth))
    }

    update()
    const ro = new ResizeObserver(update)
    if (rowRef.current) ro.observe(rowRef.current)
    if (viewportRef.current) ro.observe(viewportRef.current)
    window.addEventListener("resize", update)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", update)
    }
  }, [])

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    mass: 0.4,
  })

  const x = useTransform(smoothProgress, [0, 1], [0, -maxTranslateX])

  const sectionHeight = projects.length * 34

  return (
    <>
      <section
        ref={sectionRef}
        id="projects"
        className="relative"
        style={{ minHeight: `${sectionHeight}vh` }}
      >
        {/* Desktop: sticky horizontal scroll */}
        <div className="hidden md:flex sticky top-0 h-screen overflow-hidden flex-col justify-center">
          <div className="w-full flex flex-col gap-8 px-10 xl:px-16">
            <h2 className="text-5xl font-extrabold tracking-tight">
              <span className="accent-text">Projects</span>
            </h2>

            <div ref={viewportRef} className="overflow-hidden">
              <motion.div
                ref={rowRef}
                className="flex gap-4"
                style={{ x, paddingRight: "10vw" }}
              >
                {projects.map((project, i) => (
                  <ProjectCardDesktop
                    key={project.id}
                    project={project}
                    index={i}
                    onSelect={setSelectedProject}
                  />
                ))}
              </motion.div>
            </div>

            {/* Progress bar */}
            <div className="flex items-center gap-3">
              <div className="w-36 h-px bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full origin-left"
                  style={{ scaleX: smoothProgress }}
                />
              </div>
              <span className="text-xs text-slate-400 dark:text-white/25 tracking-wide">
                scroll to explore
              </span>
            </div>
          </div>
        </div>

        {/* Mobile: vertical stack */}
        <div className="md:hidden py-16 px-5 space-y-4">
          <motion.h2
            className="text-3xl font-extrabold tracking-tight mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="accent-text">Projects</span>
          </motion.h2>

          {projects.map((project, i) => (
            <ProjectCardMobile
              key={project.id}
              project={project}
              index={i}
              onSelect={setSelectedProject}
            />
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
