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
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Cart from './pages/Cart'

gsap.registerPlugin(ScrollTrigger, SplitText)

function App() {
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const timer = setTimeout(() => {
          gsap.to(".loader", { opacity: 0, duration: 0.8, onComplete: () => setIsLoading(false) })
        }, 3800)

        return () => clearTimeout(timer)
      }, [])

  return (
    <>
    {isLoading &&
     <div className='loader'>
        <LoaderSVG />
     </div>
     }
      {!isLoading && (
        <>
          <Navbar />
          <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/sign-in' element={<SignIn />} />
              <Route path='/sign-up' element={<SignUp />} />
              <Route path='/cart' element={<Cart />} />
            </Routes>
          </main>
        </>
      )}
    </>
  )
}

export default App
