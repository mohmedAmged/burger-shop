import gsap from 'gsap'
import './App.css'
import { ScrollTrigger, SplitText } from 'gsap/all'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BurgerItems from './components/BurgerItems'
import About from './components/About'
import ArtBurger from './components/ArtBurger'
import Menu from './components/Menu'
import Contact from './components/Contact'
import { useEffect, useState } from 'react'
import LoaderSVG from './components/LoaderSvg'

gsap.registerPlugin(ScrollTrigger, SplitText)

function App() {
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const timer = setTimeout(() => {
          gsap.to(".loader", { opacity: 0, duration: 0.8, onComplete: () => setIsLoading(false) })
        }, 3500)

        return () => clearTimeout(timer)
      }, [])

  return (
    <main>
    {isLoading &&
     <div className='loader'>
        <LoaderSVG />
     </div>
     }
      {!isLoading && (
        <>
          <Navbar />
          <Hero />
          <BurgerItems />
          <About />
          <ArtBurger />
          <Menu />
          <Contact />
        </>
      )}
    </main>
  )
}

export default App
