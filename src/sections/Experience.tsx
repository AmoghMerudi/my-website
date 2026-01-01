import { experiences } from "../data/experiences"

export default function Experience() {
  return (
    <section
      id="experience"
      className="min-h-screen px-6 py-24 flex justify-center"
    >
      <div className="w-full max-w-5xl relative">
        {/* Section title */}
        <h2 className="text-4xl font-semibold mb-16">
          Experience
        </h2>

        {/* Timeline container */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div
            className="
              absolute left-[11px] top-0
              h-full w-[2px]
              bg-gradient-to-b
              from-[#1e1b4b]
              to-purple-500
              opacity-70
            "
          />

          {/* Experience entries */}
          <div className="space-y-20">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="grid grid-cols-[24px_1fr] gap-5 relative"
              >
                {/* Dot column */}
                <div className="relative flex justify-center">
                  <div className="h-3 w-3 rounded-full bg-purple-500 mt-[6px]" />
                </div>

                {/* Content column */}
                <div>
                  <h3 className="text-xl font-medium">
                    {exp.role}
                  </h3>

                  <p className="text-white/60 text-sm mb-3">
                    {exp.org} · {exp.timeframe}
                  </p>

                  <ul className="text-white/60 space-y-1">
                    {exp.highlights.map((h) => (
                      <li key={h}>• {h}</li>
                    ))}
                  </ul>

                  <div className="mt-4 text-sm text-white/50 cursor-pointer hover:text-white transition">
                    View details →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}