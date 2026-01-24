export default function Footer() {
  return (
    <footer className="px-4 sm:px-6 py-8 sm:py-10 bg-transparent">
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">

        <div className="text-center md:text-right">
          <p className="text-base font-medium text-slate-900 dark:text-white">
            Amogh Merudi
          </p>
          <p className="text-sm text-slate-600 dark:text-white/50">
            Building thoughtful, interactive software
          </p>
        </div>

        {/* <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-slate-600 dark:text-white/50">
          <a href="#projects" className="hover:text-slate-900 dark:hover:text-white transition">
            Projects
          </a>
          <a href="#clients" className="hover:text-slate-900 dark:hover:text-white transition">
            For Clients
          </a>
          <a href="#about" className="hover:text-slate-900 dark:hover:text-white transition">
            About
          </a>
          <a href="#experience" className="hover:text-slate-900 dark:hover:text-white transition">
            Experience
          </a>
          <a href="#contact" className="hover:text-slate-900 dark:hover:text-white transition">
            Contact
          </a>
        </nav> */}
        
        <div className="text-xs text-slate-500 dark:text-white/30">
          © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  )
}