export type Experience = {
  id: string
  role: string
  org: string
  timeframe: string
  highlights: string[]
}

export const experiences: Experience[] = [
  {
    id: "treehouse-rnd",
    role: "Research & Development Intern",
    org: "Tree House Ventures",
    timeframe: "Oct 2025 – Present",
    highlights: [
      "Developed an AI price scraping platform using Python, FastAPI, and web automation",
      "Enabled near real-time market tracking and pricing intelligence",
      "Worked with U.S.-based clients including Artha Wallet and Ory",
    ],
  },
  {
    id: "oyss-director-tech",
    role: "Director of Technology",
    org: "Ontario Youth Sustainability Solutions (OYSS)",
    timeframe: "Mar 2024 – Sept 2025",
    highlights: [
      "Led development of the official OYSS website using React, TypeScript, and Tailwind CSS",
      "Built event pages, blogs, and a podcast hub with dynamic content",
      "Coordinated with cross-functional youth leadership teams",
    ],
  },
]