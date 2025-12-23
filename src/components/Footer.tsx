export default function Footer() {
  return (
    <footer className="px-6 py-10 {/**border-t border-white/10*}">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="text-center md:text-left">
          <p className="text-base font-medium">
            Amogh Merudi
          </p>
          <p className="text-sm text-white/50">
            Building thoughtful, interactive software
          </p>
        </div>

        <nav className="flex items-center gap-6 text-sm text-white/50">
          <a href="#projects" className="hover:text-white transition">
            Projects
          </a>
          <a href="#about" className="hover:text-white transition">
            About
          </a>
          <a href="#experience" className="hover:text-white transition">
            Experience
          </a>
          <a href="#contact" className="hover:text-white transition">
            Contact
          </a>
        </nav>
        
        <div className="text-xs text-white/30">
          © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  )
}