export type Project = {
    id: string
    title: string
    subtitle: string
    description: string
    tech: string[],
    image: string,
    backendFocused?: boolean,
}

export const projects: Project[] = [
  {
    id: "repo-health",
    title: "Repo Health",
    subtitle: "AI-powered code review assistant",
    description: "A GitHub-integrated tool that analyzes repositories, flags technical debt, and posts actionable pull request feedback using AI.",
    tech: ["Python", "GitHub Actions", "LLMs", "Flask"],
    image: "/projects/repo-health.png",
    backendFocused: true
  },
  {
    id: "atari",
    title: "Atari",
    subtitle: "Interactive asteroid-style arcade game",
    description: "A browser-based arcade game featuring spaceship physics, asteroid spawning, collision detection, scoring, and progressive difficulty.",
    tech: ["JavaScript", "p5.js", "HTML", "CSS"],
    image: "/projects/atari.png",
  },
  {
    id: "movie-constellations",
    title: "Movie Constellations",
    subtitle: "Data-driven genre visualization",
    description: "An interactive visualization that maps movie genres as constellations, where films are represented as stars sized by popularity.",
    tech: ["JavaScript", "p5.js", "HTML", "CSS"],
    image: "/projects/movie-constellations.png",
  },
  {
    id: "oyss-website",
    title: "OYSS Website",
    subtitle: "Non-profit web platform",
    description: "The official website for Ontario Youth Sustainability Solutions, featuring blogs, podcasts, campaigns, and event pages with dynamic content.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    image: "/projects/oyss.png",
  },
  {
    id: "ai-price-scraper",
    title: "AI Price Scraper",
    subtitle: "Real-time pricing intelligence platform",
    description: "A backend system that scrapes and tracks market pricing data in near real time, exposing APIs for analysis and insights.",
    tech: ["Python", "FastAPI", "Web Automation"],
    image: "/projects/price-scraper.png",
    backendFocused: true,
  },
]