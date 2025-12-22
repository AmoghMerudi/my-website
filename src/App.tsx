import Navbar from "./components/Navbar"
import Hero from "./sections/Hero"
import About from "./sections/About"
import Contact from "./sections/Contact"
import Experience from "./sections/Experience"
import Projects from "./sections/Projects"

function App() {

  return (
    <>
    <Navbar />
    <main>
      <Hero/>
      <Projects/>
      <About/>
      <Experience/>
      <Contact/>
    </main>
    </>
  )
}

export default App
