import gsap from 'gsap'
import './App.css'
import { ScrollTrigger, SplitText } from 'gsap/all'
import Navbar from './components/Navbar'
import { useEffect, useState } from 'react'
import LoaderSVG from './components/LoaderSvg'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Cart from './pages/Cart'
import Contact from './components/Contact'
import OurStory from './pages/OurStory'
import AboutUs from './pages/AboutUs'
import MenuItems from './pages/MenuItems'
import MyNavbar from './components/MyNavbar'
import { Toaster } from 'react-hot-toast'
import Checkout from './pages/Checkout'
import AllOrders from './pages/AllOrders'
import OrderDetails from './pages/OrderDetails'

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
          <Toaster position="top-right" reverseOrder={false} />
          <MyNavbar />
          <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/story' element={<OurStory />} />
              <Route path='/about' element={<AboutUs />} />
              <Route path='/menu' element={<MenuItems />} />
              <Route path='/sign-in' element={<SignIn />} />
              <Route path='/sign-up' element={<SignUp />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/all-orders' element={<AllOrders />} />
              <Route path='/all-orders/:orderId' element={<OrderDetails />} />
            </Routes>
          </main>
          <Contact />
        </>
      )}
    </>
  )
}

export default App
