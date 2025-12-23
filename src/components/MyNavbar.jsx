import { useState, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { navLinks } from '../../constants'
import { Token } from '../functions/Token'
import { UserData } from '../functions/getUserData'
import { useAuthStore } from '../store/Auth.store'

gsap.registerPlugin(ScrollTrigger)

const MyNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { signOut } = useAuthStore();
  const navRef = useRef(null)
  const profileData = UserData ? JSON.parse(UserData).user : '';
  console.log(profileData);
  const handleLogout = async () => {
    await signOut();
    window.location.reload();
  }
  useGSAP(() => {
    gsap.fromTo(
      navRef.current,
      { backgroundColor: 'transparent' },
      {
        backgroundColor: '#00000080',
        backdropFilter: 'blur(12px)',
        duration: 0.8,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: document.body,
          start: 'top -80',
        },
      }
    )
  }, [])

  return (
    <nav ref={navRef} className='fixed z-50 w-full'>
      <div className='flex flex-row justify-between items-center gap-5 py-5  px-5 container mx-auto'>
        {/* Logo */}
        <a href="/" className="flex md:items-center items-start gap-2 cursor-pointer text-nowrap md:text-base text-sm">
          <img
            src="/images/logo2.png"
            alt="logo"
            className="w-10 h-10"
          />
          <p className='font-modern-negra text-3xl -mb-2'>Burgro</p>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex-center lg:gap-12 gap-7">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`/${link.id}`}
                className="hover:text-yellow transition"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Profile */}
          <div className="relative">
            { Token ?
              <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-9 h-9 rounded-full overflow-hidden border border-white/30 hover:border-yellow transition cursor-pointer"
            >
              <img
                src="/images/user.png"
                alt="user"
                className="w-10 h-10"
              />
            </button>
            :
            <a href="/sign-up" className="flex w-full items-center justify-center rounded-lg bg-color-yellow px-4 py-1 text-lg text-black hover:opacity-90">Sign up</a>
            }

            {/* Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 mt-3 w-44 rounded-xl bg-black/90 backdrop-blur-lg border border-white/10 shadow-lg">
                <div class="px-4 py-3 text-sm border-b border-default">
                  <span class="block text-heading font-medium">{profileData?.name}</span>
                  <span class="block text-body truncate">{profileData?.email}</span>
                </div>
                <a
                  href="/profile"
                  className="flex gap-2 px-4 py-3 text-sm hover:bg-white/10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                  Profile
                </a>
                <a
                  href="/cart"
                  className="flex gap-2 px-4 py-3 text-sm hover:bg-white/10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                  Cart
                </a>
                <a
                  href="/all-orders"
                  className="flex gap-2 px-4 py-3 text-sm hover:bg-white/10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                  Orders
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full flex gap-2 text-left px-4 py-3 text-sm hover:bg-white/10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                  </svg>

                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-3xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-white/10">
          <ul className="flex flex-col gap-5 py-6 px-5">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`/${link.id}`}
                  className="block text-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}

export default MyNavbar;