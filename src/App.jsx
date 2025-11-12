import gsap from 'gsap'
import './App.css'
import { ScrollTrigger, SplitText } from 'gsap/all'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BurgerItems from './components/BurgerItems'
import About from './components/About'
import ArtBurger from './components/ArtBurger'

gsap.registerPlugin(ScrollTrigger, SplitText)

function App() {

  return (
    <main>
      <Navbar />
      <Hero />
      <BurgerItems />
      <About />
      <ArtBurger />
    </main>
  )
}

export default App
