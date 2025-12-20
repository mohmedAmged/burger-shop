import gsap from 'gsap';
import { useGSAP } from '@gsap/react'

import { navLinks } from '../../constants/index.js'

const Navbar = () => {
    useGSAP(() => {
        const navTween = gsap.timeline({
            scrollTrigger: {
                trigger: 'nav',
                start: 'bottom top'
            }
        });

        navTween.fromTo('nav', { backgroundColor: 'transparent' }, {
            backgroundColor: '#00000050',
            backgroundFilter: 'blur(10px)',
            duration: 1,
            ease: 'power1.inOut'
        });
    })

    return (
        <nav>
            <div>
                <a href="/" className="flex items-center gap-2">
                    <img src="/images/logo2.png" className='w-[40px] h-[40px]' alt="logo" />
                    <p>Burgro</p>
                </a>

                <ul className='me-5'>
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <a href={`/${link.id}`}>{link.title}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}
export default Navbar
