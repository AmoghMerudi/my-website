import { Analytics } from "@vercel/analytics/react"
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
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <Analytics />
    </div>
  )
}

export default App
