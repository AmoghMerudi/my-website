export default function Technologies() {
  const tech = [
    // Core languages
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    // Frontend
    "HTML5",
    "CSS3",
    "React",
    "Next.js",
    "Tailwind",
    // Backend
    "Node.js",
    "FastAPI",
    // Databases
    "MongoDB",
    "SQL",
    // Tooling
    "Git",
    "GitHub",
    "VS Code",
  ]

  return (
    <section className="mt-32 flex justify-center px-6">
      <div
        className="
          w-full max-w-4xl
          rounded-3xl
          bg-white/5
          border border-white/10
          backdrop-blur-lg
          p-8 md:p-10
        "
      >
        <h3 className="text-3xl md:text-4xl font-semibold text-white text-center mb-12">
          My Technologies
        </h3>

        <div
          className="
            grid
            grid-cols-[repeat(auto-fit,190px)]
            justify-center
            gap-x-3 gap-y-3
            mx-auto
            max-w-[820px]
          "
        >
          {tech.map((label) => (
            <div
              key={label}
              className="
                h-14 w-[190px]
                flex items-center justify-center
                rounded-2xl
                bg-white/5
                border border-white/10
                text-white/80
                text-lg font-medium tracking-wide

                transition-all duration-200 ease-out
                hover:-translate-y-1
                hover:scale-[1.03]
                hover:bg-white/10
                hover:border-purple-900/40
                hover:shadow-[0_12px_40px_rgba(168,85,247,0.25)]

                active:scale-[0.98]
              "
            >
              {label}
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-white/40">
          + much more…
        </p>
      </div>
    </section>
  )
}