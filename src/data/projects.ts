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
      { label: "Gameplay", value: "Smooth real-time physics" },
      { label: "Difficulty", value: "Progressive level scaling" },
      { label: "UX", value: "Instant restart and score tracking" },
    ],
  },
  {
    id: "movie-constellations",
    title: "Movie Constellations",
    subtitle: "Data-driven genre visualization",
    description:
      "An interactive visualization that maps movie genres as constellations, where films are represented as stars sized by popularity.",
    tech: ["JavaScript", "p5.js", "HTML", "CSS"],
    image: "/projects/movie-constellations.png",
    architecture: [
      "Dataset parsed into genres and movie nodes",
      "Each genre rendered as a spatial constellation",
      "Star size scaled by popularity metrics",
      "Horizontal text rendering enforced for readability",
      "Hover tooltips and genre filters layered on canvas",
    ],
    results: [
      { label: "Clarity", value: "Readable horizontal labels" },
      { label: "Interactivity", value: "Hover + filter exploration" },
      { label: "Visualization", value: "Data-driven spatial mapping" },
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
    ],
  },
]
