type Variant = "hero" | "about" | "contact"

const heroBlocks = [
  { className: "w-[38%] h-[36%] top-[2%] left-[1%] bg-[#1a1816] dark:bg-[#161514]", anim: "animate-geo-drift-1" },
  { className: "w-[48%] h-[28%] top-[0%] right-[0%] bg-[#d6cfc4] dark:bg-[#4a4744]", anim: "animate-geo-drift-2" },
  { className: "w-[3px] h-[65%] top-[8%] right-[38%] bg-[#2a2722] dark:bg-[#555250]", anim: "" },
  { className: "w-[22%] h-[30%] top-[32%] right-[2%] bg-[#c8c0b4] dark:bg-[#3e3b38]", anim: "animate-geo-drift-3" },
  { className: "w-[14%] h-[18%] top-[6%] left-[42%] bg-[#e0d9ce] dark:bg-[#5a5754]", anim: "animate-geo-drift-4" },
  { className: "w-[55%] h-[3px] top-[38%] right-[0%] bg-[#2a2722] dark:bg-[#555250]", anim: "" },
  { className: "w-[26%] h-[24%] top-[40%] left-[40%] bg-[#bfb8ac] dark:bg-[#333130]", anim: "animate-geo-drift-5" },
  { className: "w-[30%] h-[22%] bottom-[8%] right-[4%] bg-[#d2cbc0] dark:bg-[#474442]", anim: "animate-geo-drift-1" },
  { className: "w-[3px] h-[45%] bottom-[20%] left-[36%] bg-[#2a2722] dark:bg-[#555250]", anim: "" },
  { className: "w-[10%] h-[12%] top-[14%] right-[12%] bg-[#ccc5b8] dark:bg-[#656260]", anim: "animate-geo-drift-2" },
]

// About: minimal frame — fewer, smaller blocks so the center feels open
const aboutBlocks = [
  { className: "w-[22%] h-[40%] top-[8%] left-[0%] bg-[#1a1816] dark:bg-[#161514]", anim: "animate-geo-drift-1" },
  { className: "w-[28%] h-[20%] top-[0%] right-[0%] bg-[#d6cfc4] dark:bg-[#4a4744]", anim: "animate-geo-drift-2" },
  { className: "w-[18%] h-[22%] bottom-[10%] right-[4%] bg-[#e0d9ce] dark:bg-[#5a5754]", anim: "animate-geo-drift-4" },
]

// Contact: right-heavy + bottom-left block — different from hero’s right-heavy
const contactBlocks = [
  { className: "w-[40%] h-[32%] top-[2%] right-[0%] bg-[#1a1816] dark:bg-[#161514]", anim: "animate-geo-drift-1" },
  { className: "w-[3px] h-[60%] top-[5%] right-[42%] bg-[#2a2722] dark:bg-[#555250]", anim: "" },
  { className: "w-[25%] h-[35%] top-[35%] right-[0%] bg-[#c8c0b4] dark:bg-[#3e3b38]", anim: "animate-geo-drift-3" },
  { className: "w-[30%] h-[3px] top-[32%] left-[0%] bg-[#2a2722] dark:bg-[#555250]", anim: "" },
  { className: "w-[22%] h-[25%] bottom-[5%] left-[0%] bg-[#d2cbc0] dark:bg-[#474442]", anim: "animate-geo-drift-2" },
  { className: "w-[3px] h-[50%] bottom-[0%] left-[24%] bg-[#2a2722] dark:bg-[#555250]", anim: "" },
  { className: "w-[15%] h-[20%] top-[8%] left-[20%] bg-[#e0d9ce] dark:bg-[#5a5754]", anim: "animate-geo-drift-4" },
  { className: "w-[20%] h-[18%] top-[40%] left-[30%] bg-[#bfb8ac] dark:bg-[#333130]", anim: "animate-geo-drift-5" },
  { className: "w-[10%] h-[12%] bottom-[25%] right-[35%] bg-[#ccc5b8] dark:bg-[#656260]", anim: "animate-geo-drift-1" },
]

const variantBlocks: Record<Variant, typeof heroBlocks> = {
  hero: heroBlocks,
  about: aboutBlocks,
  contact: contactBlocks,
}

const heroDots = [
  { className: "w-3 h-3 rounded-full top-[18%] right-[30%] bg-orange-500 animate-geo-drift-4" },
  { className: "w-2 h-2 rounded-full top-[52%] right-[36%] bg-orange-500/60 animate-geo-drift-3" },
]
const aboutDots = [
  { className: "w-3 h-3 rounded-full top-[12%] right-[18%] bg-orange-500 animate-geo-drift-4" },
  { className: "w-2 h-2 rounded-full bottom-[35%] left-[22%] bg-orange-500/60 animate-geo-drift-2" },
]
const contactDots = [
  { className: "w-3 h-3 rounded-full top-[22%] right-[28%] bg-orange-500 animate-geo-drift-4" },
  { className: "w-2 h-2 rounded-full bottom-[18%] left-[15%] bg-orange-500/60 animate-geo-drift-3" },
]

const variantDots: Record<Variant, typeof heroDots> = {
  hero: heroDots,
  about: aboutDots,
  contact: contactDots,
}

type MarbleBackgroundProps = {
  variant?: Variant
}

export default function MarbleBackground({ variant = "hero" }: MarbleBackgroundProps) {
  const blocks = variantBlocks[variant]
  const dots = variantDots[variant]

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {blocks.map((block, i) => (
        <div
          key={i}
          className={`geo-block absolute ${block.className} ${block.anim}`}
        />
      ))}
      {dots.map((dot, i) => (
        <div key={`dot-${i}`} className={`geo-block absolute ${dot.className}`} />
      ))}
    </div>
  )
}
