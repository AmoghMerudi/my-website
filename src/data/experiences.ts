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
    timeframe: "Oct 2025 – Jan 2026",
    highlights: [
      "Built an AI-powered price intelligence platform using Python, FastAPI, and web automation, designed for scalable data ingestion",
      "Enabled near real-time market and competitor price tracking, supporting faster, data-driven pricing decisions",
      "Engineered backend workflows for scraping, normalization, and analysis across multiple e-commerce sources",
      "Collaborated with U.S.-based clients including Artha Wallet and Ory to tailor solutions to real-world business use cases",
    ],
  },
  {
    id: "growme-expansion",
    role: "Market Expansion & Admissions Research Associate",
    org: "GrowME.ai",
    timeframe: "April 2025 - Sept 2025",
    highlights: [
      "Supported Growme’s expansion from the US into the Canadian higher education market",
      "Researched and documented Canadian university admissions systems, including OUAC, program structures, and timelines",
      "Advised on key differences between US and Canadian application processes to localize student guidance",
      "Collaborated with a small team to translate admissions insights into actionable onboarding and advisory content"
    ]
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