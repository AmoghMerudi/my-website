import { useEffect, useRef, useState } from "react"
import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion"

import { projects } from "../data/projects"
import type { Project } from "../data/projects"
import ProjectOverlay from "../components/ProjectOverlay"
import TiltCard from "../components/TiltCard"
import { useCursor } from "../context/CursorContext"

type ProjectCardDesktopProps = {
  project: Project
  index: number
  total: number
  progress: MotionValue<number>
  onSelect: (project: Project) => void
}

function ProjectCardDesktop({
  project,
  index,
  total,
  progress,
  onSelect,
}: ProjectCardDesktopProps) {
  const segment = 0.85 / total
  const start = 0.08 + index * segment
  const revealEnd = start + segment * 0.8
  const revealProgress = useTransform(progress, (value) => {
    const raw = (value - start) / (revealEnd - start)
    const clamped = Math.min(1, Math.max(0, raw))
    return clamped * clamped * (3 - 2 * clamped)
  })

  const y = useTransform(revealProgress, [0, 1], [28, 0])
  const scale = useTransform(revealProgress, [0, 1], [0.96, 1])
  const opacity = useTransform(revealProgress, [0, 1], [0, 1])
  const contentOpacity = useTransform(revealProgress, [0, 1], [0, 1])
  const contentY = useTransform(revealProgress, [0, 1], [12, 0])
  const imageScale = useTransform(revealProgress, [0, 1], [1.08, 1])
  const imageBlur = useTransform(revealProgress, [0, 1], [8, 0])
  const imageRevealInset = useTransform(revealProgress, [0, 1], [100, 0])
  const imageClipPath = useMotionTemplate`inset(0% ${imageRevealInset}% 0% 0% round 0.75rem)`
  const imageFilter = useMotionTemplate`blur(${imageBlur}px)`
  const { setVariant } = useCursor()

  return (
    <motion.article
      onClick={() => onSelect(project)}
      onMouseEnter={() => setVariant("card")}
      onMouseLeave={() => setVariant("default")}
      className="
        group
        relative
        flex-shrink-0
        w-[88vw] md:w-[640px]
        rounded-2xl
        overflow-hidden
        bg-[color:var(--surface)]
        glass
        cursor-pointer
      "
      style={{ y, scale, opacity }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.div
        className="relative h-56 sm:h-64 overflow-hidden"
        style={{ clipPath: imageClipPath, WebkitClipPath: imageClipPath }}
      >
        <motion.img
          src={project.image}
          alt={project.title}
          className="
            h-full w-full object-cover
            transition-transform duration-500
            group-hover:scale-105
          "
          style={{ scale: imageScale, filter: imageFilter }}
        />

        {project.backendFocused && (
          <div
            className="
              absolute top-4 left-4
              text-xs px-2.5 py-1
              rounded-full
              bg-[color:var(--surface-strong)]
              glass-strong
              text-slate-700 dark:text-white/80
            "
          >
            Backend-focused
          </div>
        )}
      </motion.div>

      <motion.div className="p-6 sm:p-7" style={{ opacity: contentOpacity, y: contentY }}>
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
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </div>
      </motion.div>
    </motion.article>
  )
}

const cardReveal = {
  hidden: { opacity: 0, y: 24 },
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
      viewport={{ once: false, amount: 0.2 }}
      variants={cardReveal}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <TiltCard className="rounded-2xl">
        <article
          onClick={() => onSelect(project)}
          className="
            group
            relative
            rounded-2xl
            overflow-hidden
            bg-[color:var(--surface)]
            glass
            cursor-pointer
          "
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
              <div
                className="
                  absolute top-4 left-4
                  text-xs px-2.5 py-1
                  rounded-full
                  bg-[color:var(--surface-strong)]
                  glass-strong
                  text-slate-700 dark:text-white/80
                "
              >
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
              <span className="transition-transform group-hover:translate-x-1">→</span>
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
  const [startOffset, setStartOffset] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  useEffect(() => {
    const updateMaxTranslate = () => {
      if (!rowRef.current || !viewportRef.current) return
      const row = rowRef.current
      const viewport = viewportRef.current
      const scrollWidth = row.scrollWidth
      const visibleWidth = viewport.clientWidth
      const cardWidth = 640
      const centerOffset = (visibleWidth - cardWidth) / 2
      setStartOffset(Math.max(0, (visibleWidth - 560) / 2))
      setMaxTranslateX(Math.max(0, scrollWidth - visibleWidth + centerOffset))
    }

    updateMaxTranslate()
    const observer = new ResizeObserver(updateMaxTranslate)
    if (rowRef.current) observer.observe(rowRef.current)
    if (viewportRef.current) observer.observe(viewportRef.current)
    window.addEventListener("resize", updateMaxTranslate)

    return () => {
      observer.disconnect()
      window.removeEventListener("resize", updateMaxTranslate)
    }
  }, [])

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 68,
    damping: 22,
    mass: 0.55,
  })

  const x = useTransform(smoothProgress, [0, 1], [0, -maxTranslateX])

  const sectionHeight = projects.length * 36

  return (
    <>
      <section
        ref={sectionRef}
        id="projects"
        className="relative"
        style={{ minHeight: `${sectionHeight}vh` }}
      >
        {/* Desktop: sticky horizontal scroll */}
        <div className="hidden md:flex sticky top-20 h-[calc(100vh-5rem)] overflow-hidden items-center">
          <div className="w-full h-full flex flex-col pt-10 px-4 sm:px-6">
            <motion.h2
              className="w-full max-w-6xl mx-auto text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white font-extrabold tracking-tight mb-20 md:mb-28"
            >
              <span className="accent-text">Projects</span>
            </motion.h2>

            <div ref={viewportRef} className="flex-1 min-h-0 overflow-hidden flex items-start">
              <motion.div
                ref={rowRef}
                className="flex gap-8"
                style={{ x, paddingLeft: `${startOffset}px`, paddingRight: "5vw" }}
              >
                {projects.map((project, index) => (
                  <ProjectCardDesktop
                    key={project.id}
                    project={project}
                    index={index}
                    total={projects.length}
                    progress={smoothProgress}
                    onSelect={setSelectedProject}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile: vertical stack */}
        <div className="md:hidden py-16 px-4 sm:px-6 space-y-8">
          <motion.h2
            className="text-3xl sm:text-4xl text-slate-900 dark:text-white font-extrabold tracking-tight mb-14 md:mb-20"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, ease: "easeOut" }}
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
