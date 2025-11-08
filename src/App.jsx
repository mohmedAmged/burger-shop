import gsap from 'gsap'
import './App.css'
import { ScrollTrigger, SplitText } from 'gsap/all'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BurgerItems from './components/BurgerItems'

gsap.registerPlugin(ScrollTrigger, SplitText)

function App() {

  return (
    <main>
      <Navbar />
      <Hero />
      <BurgerItems />
    </main>
  )
}

export default App
