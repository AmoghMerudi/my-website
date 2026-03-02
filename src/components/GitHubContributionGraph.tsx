import { useEffect, useState } from "react"

const GITHUB_GRAPHQL = "https://api.github.com/graphql"

type Day = {
  date: string
  contributionCount: number
  color: string
}

type Week = {
  contributionDays: Day[]
}

type Calendar = {
  totalContributions: number
  weeks: Week[]
}

const CONTRIBUTION_QUERY = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
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

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function ordinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) return "th"
  switch (day % 10) {
    case 1: return "st"
    case 2: return "nd"
    case 3: return "rd"
    default: return "th"
  }
}

type TooltipData = {
  count: number
  label: string
}

function formatTooltip(dateStr: string, count: number): TooltipData {
  const date = new Date(dateStr + "T12:00:00Z")
  const month = date.toLocaleDateString("en-US", { month: "long" })
  const dayNum = date.getUTCDate()
  const label = `${month} ${dayNum}${ordinalSuffix(dayNum)}.`
  return { count, label }
}

function getMonthLabel(weekIndex: number, weeks: Week[]): string | null {
  const week = weeks[weekIndex]
  if (!week?.contributionDays?.length) return null
  for (const d of week.contributionDays) {
    const date = new Date(d.date + "T12:00:00Z")
    if (date.getDate() === 1) return MONTH_LABELS[date.getMonth()]
  }
  return null
}

const LEVEL_COLORS_DARK = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"]
const LEVEL_COLORS_LIGHT = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"]

function levelToColor(level: number, isDark: boolean): string {
  const colors = isDark ? LEVEL_COLORS_DARK : LEVEL_COLORS_LIGHT
  return colors[Math.min(level, 4)]
}

type PublicContribution = {
  date: string
  count: number
  level: number
}

function publicDataToCalendar(
  contributions: PublicContribution[],
  totals: Record<string, number>,
): Calendar {
  const totalContributions = Object.values(totals).reduce((a, b) => a + b, 0)
  const isDark = document.documentElement.classList.contains("dark") ||
    window.matchMedia("(prefers-color-scheme: dark)").matches

  const sorted = [...contributions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  )

  const weeks: Week[] = []
  let currentWeek: Day[] = []

  for (const c of sorted) {
    const dayOfWeek = new Date(c.date + "T12:00:00Z").getUTCDay()
    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push({ contributionDays: currentWeek })
      currentWeek = []
    }
    currentWeek.push({
      date: c.date,
      contributionCount: c.count,
      color: levelToColor(c.level, isDark),
    })
  }
  if (currentWeek.length > 0) {
    weeks.push({ contributionDays: currentWeek })
  }

  return { totalContributions, weeks }
}

type Props = {
  username: string
}

const SQUARE_SIZE = 14
const GAP = 3

export default function GitHubContributionGraph({ username }: Props) {
  const [calendar, setCalendar] = useState<Calendar | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [tooltip, setTooltip] = useState<{ data: TooltipData; x: number; y: number } | null>(null)

  useEffect(() => {
    const to = new Date()
    const from = new Date(to)
    from.setFullYear(from.getFullYear() - 1)

    const token = import.meta.env.VITE_GITHUB_TOKEN as string | undefined

    const fetchGraphQL = (): Promise<Calendar | null> => {
      if (!token) return Promise.resolve(null)
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
      return fetch(GITHUB_GRAPHQL, {
        method: "POST",
        headers,
        body: JSON.stringify({
          query: CONTRIBUTION_QUERY,
          variables: {
            username,
            from: from.toISOString(),
            to: to.toISOString(),
          },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.errors) return null
          return data.data?.user?.contributionsCollection?.contributionCalendar ?? null
        })
        .catch(() => null)
    }

    const fetchPublic = (): Promise<Calendar | null> =>
      fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.contributions?.length) return null
          return publicDataToCalendar(data.contributions, data.total)
        })
        .catch(() => null)

    fetchGraphQL()
      .then((cal) => {
        if (cal) {
          setCalendar(cal)
          setLoading(false)
          return
        }
        return fetchPublic().then((cal2) => {
          if (cal2) setCalendar(cal2)
          else setError(true)
          setLoading(false)
        })
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [username])

  if (loading) {
    return (
      <div className="w-full min-h-[140px] flex items-center justify-center rounded-xl bg-[color:var(--surface)] glass p-4 sm:p-6">
        <p className="text-slate-500 dark:text-white/60 text-sm">Loading activity…</p>
      </div>
    )
  }

  if (error || !calendar) {
    return (
      <div className="w-full overflow-x-auto no-scrollbar rounded-xl bg-[color:var(--surface)] glass p-4 sm:p-6">
        <img
          src={`https://ghchart.rshah.org/f97316/${username}`}
          alt="GitHub contribution graph"
          className="w-full min-w-[680px] dark:brightness-[0.85] dark:contrast-[1.15]"
        />
      </div>
    )
  }

  const weeks = calendar.weeks

  const handleMouseEnter = (e: React.MouseEvent, data: TooltipData) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    setTooltip({ data, x: rect.left + rect.width / 2, y: rect.top })
  }

  const handleMouseLeave = () => setTooltip(null)

  // GitHub layout: row of week columns; each column has 7 rows (Sun–Sat)
  return (
    <div className="w-full overflow-x-auto no-scrollbar flex justify-center">
      <div className="inline-flex flex-col gap-4 min-w-[880px]">
        <p className="text-base text-slate-900 dark:text-white mb-2">
          <span className="font-semibold">
            {calendar.totalContributions.toLocaleString()}
          </span>{" "}
          contributions in the last year
        </p>
        <div className="inline-flex flex-col gap-2">
          {/* Month labels (like GitHub) */}
          <div
            className="flex gap-[3px]"
            style={{
              // align with weekday label column (w-7 => 28px) plus the 2px gap
              marginLeft: 28 + GAP,
            }}
          >
            {weeks.map((_, colIndex) => {
              const label = getMonthLabel(colIndex, weeks)
              return (
                <div
                  key={colIndex}
                  className="text-sm text-slate-500 dark:text-slate-400 flex-shrink-0 text-center"
                  style={{ width: SQUARE_SIZE }}
                >
                  {label ?? ""}
                </div>
              )
            })}
          </div>

        <div className="flex gap-[3px]">
          {/* Day labels (Mon, Wed, Fri like GitHub) — 7 rows to align with grid */}
          <div
            className="flex flex-col gap-[3px] text-sm text-slate-500 dark:text-slate-400 w-7 flex-shrink-0"
            style={{ height: 7 * SQUARE_SIZE + 6 * GAP }}
          >
            {[0, 1, 2, 3, 4, 5, 6].map((rowIndex) => (
              <div
                key={rowIndex}
                className="flex items-center"
                style={{ height: SQUARE_SIZE }}
              >
                {rowIndex === 1 || rowIndex === 3 || rowIndex === 5
                  ? DAY_LABELS[rowIndex]
                  : ""}
              </div>
            ))}
          </div>

          {/* Squares: columns = weeks, each column = 7 rows */}
          <div className="flex gap-[3px]">
            {weeks.map((week, colIndex) => (
              <div
                key={colIndex}
                className="flex flex-col gap-[3px]"
              >
                {[0, 1, 2, 3, 4, 5, 6].map((rowIndex) => {
                  const day = week.contributionDays[rowIndex] ?? null
                  const count = day?.contributionCount ?? 0
                  const dateStr = day?.date ?? ""
                  const data = dateStr ? formatTooltip(dateStr, count) : null

                  return (
                    <div
                      key={`${colIndex}-${rowIndex}`}
                      className={`rounded-[2px] transition-colors ${
                        !day ? "bg-[#ebedf0] dark:bg-[#21262d]" : ""
                      }`}
                      style={{
                        width: SQUARE_SIZE,
                        height: SQUARE_SIZE,
                        ...(day ? { backgroundColor: day.color } : {}),
                      }}
                      onMouseEnter={(e) => data && handleMouseEnter(e, data)}
                      onMouseLeave={handleMouseLeave}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>
        </div>

        <div className="mt-3 flex items-center justify-end text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1">
            <span>Less</span>
            <div className="flex items-center gap-[2px]">
              <span className="w-3 h-3 rounded-sm bg-[#161b22]" />
              <span className="w-3 h-3 rounded-sm bg-[#0e4429]" />
              <span className="w-3 h-3 rounded-sm bg-[#006d32]" />
              <span className="w-3 h-3 rounded-sm bg-[#26a641]" />
              <span className="w-3 h-3 rounded-sm bg-[#39d353]" />
            </div>
            <span>More</span>
          </div>
        </div>
      </div>

      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none -translate-x-1/2 -translate-y-full flex flex-col items-center"
          style={{
            left: tooltip.x,
            top: tooltip.y - 4,
          }}
        >
          <div className="px-3 py-1.5 rounded-md bg-[#24292f] text-white text-xs leading-tight shadow-lg whitespace-nowrap">
            <strong>
              {tooltip.data.count === 0
                ? "No contributions"
                : `${tooltip.data.count} contribution${tooltip.data.count !== 1 ? "s" : ""}`}
            </strong>{" "}
            on {tooltip.data.label}
          </div>
          <div
            className="w-0 h-0"
            style={{
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid #24292f",
            }}
          />
        </div>
      )}
    </div>
  )
}
