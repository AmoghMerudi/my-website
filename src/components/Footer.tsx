export default function Footer() {
  return (
    <footer className="px-4 sm:px-6 py-10 sm:py-12">
      <div className="max-w-4xl mx-auto rounded-2xl bg-[color:var(--surface)] glass px-6 py-5 sm:px-8 sm:py-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="text-center md:text-left">
          <p className="text-base font-semibold text-slate-900 dark:text-white">
            Amogh Merudi
          </p>
          <p className="text-sm text-slate-600 dark:text-white/55">
            Building thoughtful and reliable software.
          </p>
        </div>

        <div className="text-xs uppercase tracking-[0.15em] text-slate-500 dark:text-white/35">
          © {new Date().getFullYear()} All rights reserved
        </div>
      </div>
    </footer>
  )
}