import Navbar from "./components/Navbar"
import Hero from "./sections/Hero"
import About from "./sections/About"
import Contact from "./sections/Contact"
import Experience from "./sections/Experience"
import Projects from "./sections/Projects"
import Footer from "./components/Footer"

function App() {

  return (
    <div className="relative text-white min-h-screen">
    
      {/* Global ambient background */}
      <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
        <div
          className="
            absolute top-[-20%] left-[-10%]
            w-[700px] h-[700px]
            bg-purple-800/20
            rounded-full
            blur-[140px]
          "
        />
        <div
          className="
            absolute top-[30%] right-[-15%]
            w-[600px] h-[600px]
            bg-indigo-800/20
            rounded-full
            blur-[140px]
          "
        />
        <div
          className="
            absolute bottom-[-20%] left-[20%]
            w-[600px] h-[600px]
            bg-blue-600/15
            rounded-full
            blur-[160px]
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
    </div>
  )
}

export default App
