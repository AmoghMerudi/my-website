import Navbar from "./components/Navbar"
import Hero from "./sections/Hero"
import About from "./sections/About"
import Contact from "./sections/Contact"
import Experience from "./sections/Experience"
import Projects from "./sections/Projects"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"

function App() {

  return (
    <div className="relative min-h-screen text-slate-900 dark:text-white">
    
      {/* Global ambient background */}
      <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/[0.04] via-transparent to-transparent dark:from-white/[0.04]" />
        <div
          className="
            absolute top-[-25%] left-[-15%]
            w-[800px] h-[800px]
            bg-purple-300/35
            rounded-full
            blur-[140px]
            dark:bg-purple-600/25
          "
        />
        <div
          className="
            absolute top-[20%] right-[-10%]
            w-[700px] h-[700px]
            bg-indigo-300/30
            rounded-full
            blur-[140px]
            dark:bg-indigo-500/25
          "
        />
        <div
          className="
            absolute bottom-[-25%] left-[25%]
            w-[700px] h-[700px]
            bg-blue-300/25
            rounded-full
            blur-[160px]
            dark:bg-blue-500/20
          "
        />
      </div>

      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App
