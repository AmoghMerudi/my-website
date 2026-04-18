import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"

import { projects } from "../data/projects"
import type { Project } from "../data/projects"
import ProjectOverlay from "../components/ProjectOverlay"
import TiltCard from "../components/TiltCard"
import { useCursor } from "../context/CursorContext"

function ProjectCardDesktop({
  project,
  onSelect,
}: {
  project: Project
  onSelect: (project: Project) => void
}) {
  const { setVariant } = useCursor()

  return (
    <motion.article
      onClick={() => onSelect(project)}
      onMouseEnter={() => setVariant("card")}
      onMouseLeave={() => setVariant("default")}
      className="
        group relative flex-shrink-0
        w-[520px]
        rounded-2xl overflow-hidden
        bg-[color:var(--surface)] glass
        cursor-pointer
      "
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {project.backendFocused && (
          <div className="absolute top-4 left-4 text-xs px-2.5 py-1 rounded-full bg-[color:var(--surface-strong)] glass-strong text-slate-700 dark:text-white/80">
            Backend-focused
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-1 text-slate-900 dark:text-white">
          {project.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-white/50 mb-3">
          {project.subtitle}
        </p>
        <p className="text-sm text-slate-600 dark:text-white/70 mb-5 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="
                inline-flex items-center text-xs px-2.5 py-0.5
                rounded-full
                border border-black/10 dark:border-white/15
                bg-black/5 dark:bg-white/8
                text-slate-600 dark:text-white/60
              "
            >
              {t}
            </span>
          ))}
        </div>

        <div className="text-xs text-slate-400 dark:text-white/30 flex items-center gap-1.5 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
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
  onSelect,
}: {
  project: Project
  onSelect: (project: Project) => void
}) {
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
          className="
            group relative rounded-2xl overflow-hidden
            bg-[color:var(--surface)] glass
            cursor-pointer
          "
        >
          <div className="relative h-44 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {project.backendFocused && (
              <div className="absolute top-4 left-4 text-xs px-2.5 py-1 rounded-full bg-[color:var(--surface-strong)] glass-strong text-slate-700 dark:text-white/80">
                Backend-focused
              </div>
            )}
          </div>

          <div className="p-5">
            <h3 className="text-lg font-semibold mb-1 text-slate-900 dark:text-white">
              {project.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-white/50 mb-3">
              {project.subtitle}
            </p>
            <p className="text-sm text-slate-600 dark:text-white/70 mb-4 leading-relaxed line-clamp-3">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="
                    inline-flex items-center text-xs px-2.5 py-0.5
                    rounded-full
                    border border-black/10 dark:border-white/15
                    bg-black/5 dark:bg-white/8
                    text-slate-600 dark:text-white/60
                  "
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="text-xs text-slate-400 dark:text-white/30 flex items-center gap-1.5">
              <span>View project</span>
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
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
                className="flex gap-5"
                style={{ x, paddingRight: "10vw" }}
              >
                {projects.map((project) => (
                  <ProjectCardDesktop
                    key={project.id}
                    project={project}
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
        <div className="md:hidden py-16 px-5 space-y-5">
          <motion.h2
            className="text-3xl font-extrabold tracking-tight mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="accent-text">Projects</span>
          </motion.h2>

          {projects.map((project) => (
            <ProjectCardMobile
              key={project.id}
              project={project}
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
