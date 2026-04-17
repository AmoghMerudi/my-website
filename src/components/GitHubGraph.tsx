import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

const GITHUB_USERNAME = "amoghmerudi"

interface ContributionDay {
  date: string
  contributionCount: number
  color: string
}

interface Week {
  contributionDays: ContributionDay[]
}

interface ContributionData {
  totalContributions: number
  weeks: Week[]
}

/* ─── colour helpers ─── */
const LIGHT_COLORS = [
  "rgba(249,115,22,0.06)", // 0 - empty
  "rgba(249,115,22,0.30)", // 1
  "rgba(249,115,22,0.52)", // 2
  "rgba(239,68,68,0.65)",  // 3
  "rgba(239,68,68,0.88)",  // 4
]

const DARK_COLORS = [
  "rgba(249,115,22,0.08)",
  "rgba(249,115,22,0.34)",
  "rgba(249,115,22,0.56)",
  "rgba(239,68,68,0.72)",
  "rgba(239,68,68,0.92)",
]

function getLevel(count: number): number {
  if (count === 0) return 0
  if (count <= 3) return 1
  if (count <= 6) return 2
  if (count <= 9) return 3
  return 4
}

/* ─── GraphQL fetch ─── */
async function fetchContributions(): Promise<ContributionData> {
  const token = import.meta.env.VITE_GITHUB_TOKEN
  if (!token) throw new Error("No GitHub token")

  const query = `
    query {
      user(login: "${GITHUB_USERNAME}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  })

  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)

  const json = await res.json()
  const cal =
    json.data.user.contributionsCollection.contributionCalendar
  return {
    totalContributions: cal.totalContributions,
    weeks: cal.weeks,
  }
}

/* ─── Month labels ─── */
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

function getMonthLabels(weeks: Week[]) {
  const labels: { text: string; col: number }[] = []
  let lastMonth = -1
  weeks.forEach((w, i) => {
    const d = new Date(w.contributionDays[0].date)
    const m = d.getMonth()
    if (m !== lastMonth) {
      labels.push({ text: MONTHS[m], col: i })
      lastMonth = m
    }
  })
  return labels
}

/* ─── Tooltip ─── */
function Tooltip({
  day,
  x,
  y,
  graphRef,
}: {
  day: ContributionDay
  x: number
  y: number
  graphRef: React.RefObject<HTMLDivElement | null>
}) {
  const d = new Date(day.date + "T00:00:00")
  const label = d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  })
  const count = day.contributionCount

  const graphRect = graphRef.current?.getBoundingClientRect()
  const adjustedX = x - (graphRect?.left ?? 0)
  const adjustedY = y - (graphRect?.top ?? 0)

  return (
    <div
      className="absolute z-50 pointer-events-none px-3 py-1.5 rounded-lg text-xs font-medium
        bg-slate-800 text-white dark:bg-white dark:text-slate-900
        shadow-lg whitespace-nowrap"
      style={{
        left: adjustedX,
        top: adjustedY - 40,
        transform: "translateX(-50%)",
      }}
    >
      <span className="font-bold">{count} commit{count !== 1 ? "s" : ""}</span>
      {" "}on {label}
    </div>
  )
}

/* ─── Skeleton ─── */
function Skeleton() {
  return (
    <div className="w-full animate-pulse space-y-2">
      <div className="h-4 w-48 rounded bg-slate-200 dark:bg-white/10" />
      <div className="h-[120px] rounded-lg bg-slate-200/60 dark:bg-white/5" />
    </div>
  )
}

/* ─── Main Component ─── */
export default function GitHubGraph() {
  const [data, setData] = useState<ContributionData | null>(null)
  const [error, setError] = useState(false)
  const [tooltip, setTooltip] = useState<{
    day: ContributionDay
    x: number
    y: number
  } | null>(null)
  const [isDark, setIsDark] = useState(false)
  const graphRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.classList.contains("dark"))
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    fetchContributions()
      .then(setData)
      .catch(() => setError(true))
  }, [])

  if (error) {
    return null // silently hide if no token / error
  }

  if (!data) {
    return (
      <div className="w-full mt-10">
        <Skeleton />
      </div>
    )
  }

  const colors = isDark ? DARK_COLORS : LIGHT_COLORS
  const cellSize = 13
  const cellGap = 3
  const step = cellSize + cellGap
  const monthLabelHeight = 18
  const dayLabelWidth = 28
  const cols = data.weeks.length
  const svgWidth = dayLabelWidth + cols * step
  const svgHeight = monthLabelHeight + 7 * step

  const monthLabels = getMonthLabels(data.weeks)
  const dayLabels = [
    { text: "Mon", row: 1 },
    { text: "Wed", row: 3 },
    { text: "Fri", row: 5 },
  ]

  const dateRange = (() => {
    const first = data.weeks[0].contributionDays[0].date
    const lastWeek = data.weeks[data.weeks.length - 1]
    const last = lastWeek.contributionDays[lastWeek.contributionDays.length - 1].date
    const fmt = (s: string) =>
      new Date(s + "T00:00:00").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    return `${fmt(first)} – ${fmt(last)}`
  })()

  return (
    <motion.div
      className="w-full mt-10"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
    >
      <div className="flex items-baseline justify-end mb-4 flex-wrap gap-2">
        <span className="text-xs sm:text-sm text-slate-500 dark:text-white/45">
          {data.totalContributions.toLocaleString()} contributions · {dateRange}
        </span>
      </div>

      <div
        ref={graphRef}
        className="relative rounded-xl p-4 sm:p-5 overflow-x-auto no-scrollbar
          bg-white/50 dark:bg-white/[0.03]
          border border-slate-200/60 dark:border-white/[0.06]"
      >
        <svg
          width={svgWidth}
          height={svgHeight}
          className="block"
          style={{ minWidth: svgWidth }}
        >
          {/* Month labels */}
          {monthLabels.map((m, i) => (
            <text
              key={i}
              x={dayLabelWidth + m.col * step}
              y={12}
              className="fill-slate-400 dark:fill-white/35"
              fontSize={10}
              fontFamily="inherit"
            >
              {m.text}
            </text>
          ))}

          {/* Day labels */}
          {dayLabels.map((d) => (
            <text
              key={d.text}
              x={0}
              y={monthLabelHeight + d.row * step + cellSize - 2}
              className="fill-slate-400 dark:fill-white/35"
              fontSize={10}
              fontFamily="inherit"
            >
              {d.text}
            </text>
          ))}

          {/* Cells */}
          {data.weeks.map((week, col) =>
            week.contributionDays.map((day, row) => (
              <rect
                key={day.date}
                x={dayLabelWidth + col * step}
                y={monthLabelHeight + row * step}
                width={cellSize}
                height={cellSize}
                rx={3}
                ry={3}
                fill={colors[getLevel(day.contributionCount)]}
                className="transition-all duration-150"
                style={{ cursor: "default" }}
                onMouseEnter={(e) =>
                  setTooltip({ day, x: e.clientX, y: e.clientY })
                }
                onMouseMove={(e) =>
                  setTooltip({ day, x: e.clientX, y: e.clientY })
                }
                onMouseLeave={() => setTooltip(null)}
              />
            ))
          )}
        </svg>

        {tooltip && (
          <Tooltip
            day={tooltip.day}
            x={tooltip.x}
            y={tooltip.y}
            graphRef={graphRef}
          />
        )}

        {/* Legend */}
        <div className="flex items-center justify-end gap-1.5 mt-3 text-[10px] text-slate-400 dark:text-white/35">
          <span>Less</span>
          {colors.map((c, i) => (
            <span
              key={i}
              className="inline-block w-[13px] h-[13px] rounded-[3px]"
              style={{ backgroundColor: c }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </motion.div>
  )
}
