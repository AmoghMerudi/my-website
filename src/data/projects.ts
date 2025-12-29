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
    id: "repo-health",
    title: "Repo Health",
    subtitle: "AI-powered code review assistant",
    description:
      "A GitHub-integrated tool that analyzes repositories, flags technical debt, and posts actionable pull request feedback using AI.",
    tech: ["Python", "Flask", "OpenAI API", "GitHub Actions"],
    image: "/projects/repo-health.png",
    backendFocused: true,
    architecture: [
      "GitHub webhook triggers analysis on pull requests",
      "Flask API processes repository files and metadata",
      "Static code metrics and heuristics extracted per file",
      "LLM generates readability and performance feedback",
      "Structured feedback posted directly to PR as comments",
    ],
    results: [
      { label: "Automation", value: "Zero-touch PR reviews" },
      { label: "Feedback Quality", value: "Actionable AI suggestions" },
      { label: "Architecture", value: "Modular, model-agnostic design" },
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
