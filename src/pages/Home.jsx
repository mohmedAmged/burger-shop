import React from 'react'
import Hero from '../components/Hero'
import BurgerItems from '../components/BurgerItems'
import About from '../components/About'
import ArtBurger from '../components/ArtBurger'
import Menu from '../components/Menu'
import Contact from '../components/Contact'

export default function Home() {
    return (
        <>
            <Hero />
            <BurgerItems />
            <About />
            <ArtBurger />
            <Menu />
        </>
    )
}
