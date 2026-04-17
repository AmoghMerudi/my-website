export type Project = {
    id: string
    title: string
    subtitle: string
    description: string
    tech: string[]
    image: string
    backendFocused?: boolean
    
    architecture: string[]
    results: {
      label: string
      value:string
    }[]
}

export const projects: Project[] = [

{
  "id": "pitwall",
  "title": "Pitwall",
  "subtitle": "F1 pit strategy optimizer and race analytics dashboard",
  "description": "A full-stack app that models tyre degradation from FastF1 data, computes undercut/overcut windows and rival threats, and surfaces live and historical pit recommendations through a telemetry-styled Next.js dashboard with OpenF1 live timing.",
  "tech": [
    "Python",
    "FastAPI",
    "pandas",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Recharts"
  ],
  "image": "/projects/pitwall.png",
  "architecture": [
    "FastAPI backend owns all strategy math; frontend consumes typed REST only",
    "ingestion.py loads FastF1 sessions (cached) and OpenF1 live feeds",
    "degradation.py fits per-compound tyre delta curves with quality checks",
    "pit_window.py computes crossover laps with circuit pit-loss adjustment",
    "rival_model.py tracks competitor compounds and undercut threats",
    "strategy.py merges pit windows and rivals into human-readable recommendations",
    "Next.js App Router dashboard: charts, timing tower, live mode, head-to-head, what-if simulator"
  ],
  "results": [
    {
      "label": "Data",
      "value": "FastF1 historical sessions + OpenF1 live grid and stints"
    },
    {
      "label": "Strategy",
      "value": "Pit windows, crossover laps, and undercut threat scoring"
    },
    {
      "label": "UX",
      "value": "Dark/light theme, share link, export, browser notifications in live mode"
    },
    {
      "label": "Deploy",
      "value": "Backend on Railway, frontend on Vercel"
    }
  ]
},
{
    id: "eroute",
    title: "ERoute",
    subtitle: "AI-powered emergency hospital routing & congestion simulation",
    description:
      "Winner of the Google 'Build with AI' Track at Hack Canada 2026. ERoute is a spatial decision platform that routes emergency patients to optimal hospitals based on severity, congestion, and travel time, while allowing planners to simulate how new ER infrastructure redistributes patient demand across a city.",
    tech: [
      "Next.js",
      "TypeScript",
      "Mapbox GL",
      "React Three Fiber",
      "MongoDB",
      "Gemini API",
      "ElevenLabs",
    ],
    image: "/projects/eroute.png",
    architecture: [
      "User location is detected via GPS or postal code input",
      "AI triage system analyzes symptoms and classifies urgency levels",
      "Routing engine ranks hospitals based on severity, distance, congestion, and predicted wait times",
      "Mapbox GL renders an interactive city map with hospital congestion overlays",
      "Demand heatmaps visualize emergency pressure across the city",
      "React Three Fiber powers a 3D hospital infrastructure simulation environment",
      "Simulation engine models patient redistribution when new ER facilities are introduced",
    ],
    results: [
      { label: "Recognition", value: "Winner — Google 'Build with AI' Track, Hack Canada 2026" },
      { label: "Decision Support", value: "AI-assisted routing for smarter ER selection" },
      { label: "Infrastructure Insight", value: "3D simulation of hospital network congestion" },
      { label: "Visualization", value: "Live congestion heatmaps for city-wide emergency demand" },
    ],
  },
  {
    id: "repo-supervisor",
    title: "Repo Supervisor",
    subtitle: "AI-powered pull request intelligence & repo health tracking",
    description:
      "An AI-assisted code review system that analyzes pull requests for structural risk, semantic intent, and long-term repository health — surfacing insights that help humans review smarter, not harder.",
    tech: [
      "FastAPI",
      "Node.js",
      "GitHub Actions",
      "Gemini API",
      "MongoDB",
      "Next.js",
      "Tailwind CSS",
    ],
    image: "/projects/repo-supervisor.png",
    architecture: [
      "GitHub Action triggers on pull request open and update events",
      "PR metadata and diff are sent to a backend analysis service",
      "Structural heuristics assess size, scope, and sensitive code areas",
      "Gemini AI performs semantic analysis on code changes",
      "Signals are synthesized into human-readable risk explanations",
      "Repository health score is updated and stored over time",
      "Frontend dashboard visualizes repo health trends and PR insights",
    ],
    results: [
      { label: "Review Quality", value: "Context-aware risk explanations" },
      { label: "Developer Velocity", value: "Faster, focused code reviews" },
      { label: "Repo Health", value: "Long-term risk tracking across PRs" },
      { label: "Automation", value: "Always-on PR analysis via GitHub Actions" },
    ],
  },
  {
    id: "atari",
    title: "Atari",
    subtitle: "Interactive asteroid-style arcade game",
    description:
      "A browser-based arcade game featuring spaceship physics, asteroid spawning, collision detection, scoring, and progressive difficulty.",
    tech: ["JavaScript", "p5.js", "HTML", "CSS"],
    image: "/projects/atari.png",
    architecture: [
      "Game loop driven by p5.js draw cycle",
      "Player spaceship class handles rotation, thrust, and firing",
      "Asteroid system manages spawning, movement, and fragmentation",
      "Collision detection between ship, lasers, and asteroids",
      "State manager controls scoring, lives, and restarts",
    ],
    results: [
      { label: "Recognition", value: "Winner — Best Duo Hack, FraserHacks 2024" },
      { label: "Gameplay", value: "Smooth real-time physics" },
      { label: "Difficulty", value: "Progressive level scaling" },
      { label: "UX", value: "Instant restart and score tracking" },
    ],
  },
  {
    id: "oyss-website",
    title: "OYSS Website",
    subtitle: "Non-profit web platform",
    description:
      "The official website for Ontario Youth Sustainability Solutions, featuring blogs, podcasts, campaigns, and event pages with dynamic content.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    image: "/projects/oyss.png",
    architecture: [
      "Component-based React architecture",
      "Reusable modules for blogs, podcasts, and campaigns",
      "Dynamic content rendering via structured data",
      "Responsive layouts using Tailwind utility classes",
      "Accessibility-first design aligned with branding",
    ],
    results: [
      { label: "Performance", value: "Fast, responsive UI" },
      { label: "Maintainability", value: "Reusable component system" },
      { label: "Impact", value: "Public-facing nonprofit platform" },
      { label: "Reach", value: "Unified hub for campaigns, blogs, podcasts, and events" },
    ],
  },
  {
    id: "ai-price-scraper",
    title: "AI Price Scraper",
    subtitle: "Real-time pricing intelligence platform",
    description:
      "A backend system that scrapes and tracks market pricing data in near real time, exposing APIs for analysis and insights.",
    tech: ["Python", "FastAPI", "Web Automation"],
    image: "/projects/price-scraper.png",
    backendFocused: true,
    architecture: [
      "Automated scrapers collect pricing data from multiple sources",
      "Normalization layer cleans and standardizes raw prices",
      "FastAPI exposes structured REST endpoints",
      "Scheduler handles periodic scraping jobs",
      "Data stored for trend analysis and comparisons",
    ],
    results: [
      { label: "Latency", value: "Near real-time updates" },
      { label: "Scalability", value: "API-first backend design" },
      { label: "Use Case", value: "Market price intelligence" },
      { label: "Reliability", value: "Automated scheduled scraping with normalized data output" },
    ],
  },
]
