import gsap from 'gsap'
import './App.css'
import { ScrollTrigger, SplitText } from 'gsap/all'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BurgerItems from './components/BurgerItems'
import About from './components/About'

gsap.registerPlugin(ScrollTrigger, SplitText)

function App() {

  return (
    <main>
      <Navbar />
      <Hero />
      <BurgerItems />
      <About />
    </main>
  )
}

export default App
