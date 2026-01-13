import {useEffect, useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const links = [
    {label: "Projects", href: "#projects"},
    {label: "About", href: "#about"},
    {label: "Experience", href: "#experience"},
    {label: "Contact", href: "#contact"},
]

export default function Navbar(){
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    // Close mobile menu when clicking outside or on a link
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest("nav")) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener("click", handleClickOutside)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  return(
    <nav
        className = {`
                fixed top-6 left-1/2 -translate-x-1/2 z-50
                rounded-3xl
                bg-[#111e39]/80 backdrop-blur-sm
                transition-all duration-300
                ${scrolled ? "shadow-lg": ""}
            `}
    >
        <div className = "flex items-center gap-2 px-4 py-3">
            {/**Logo*/}
            <div className = "font-semibold tracking-light px-2">
                <a
						href="#hero"
						onClick={() => setMobileMenuOpen(false)}
						className="
							px-3 py-2
							rounded-full
							hover:bg-white/10
							transition
							flex items-center justify-center
						"
						>
						<div className="h-8 w-13 flex items-center justify-center">
							<img
								src="/logo.png"
								alt="Amogh logo"
								className="h-full w-auto object-contain"
							/>
						</div>
					</a>
            </div>

            {/**Divider - hidden on mobile*/}
            <div className = "h-7 w-px bg-white/20 mx-2 hidden md:block"/>

            {/**Desktop Links*/}
            <div className="hidden md:flex items-center gap-1">
                {links.map((link) => (
                    <a
                        key = {link.href}
                        href = {link.href}
                        className ="px-4 py-2.5
                                    rounded-full
                                    text-[15px] font-medium
                                    text-white/80
                                    border border-white/10
                                    bg-black/30
                                    hover:bg-white/10
                                    hover:border-white/20
                                    hover:text-white
                                    transition-all duration-200"
                    >
                        {link.label}
                    </a>
                ))}
            </div>

            {/**Mobile Menu Button*/}
            <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="
                    md:hidden
                    ml-auto
                    p-2.5 rounded-full
                    text-white/80
                    border border-white/10
                    bg-black/30
                    hover:bg-white/10
                    transition-all duration-200
                "
                aria-label="Toggle menu"
            >
                {mobileMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
            </button>
        </div>

        {/**Mobile Menu*/}
        <AnimatePresence>
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="
                        md:hidden
                        overflow-hidden
                        border-t border-white/10
                        mt-2
                    "
                >
                    <div className="flex flex-col gap-2 p-4">
                        {links.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="
                                    px-4 py-3
                                    rounded-xl
                                    text-[15px] font-medium
                                    text-white/80
                                    border border-white/10
                                    bg-black/30
                                    hover:bg-white/10
                                    hover:border-white/20
                                    transition-all duration-200
                                "
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </nav>
  )
}