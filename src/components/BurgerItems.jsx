import React from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { burgerPopular, burgerSpecials} from '../../constants/index.js'
export default function BurgerItems() {
	useGSAP(() => {
		const parallaxTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: '#burgers',
				start: 'top 30%',
				end: 'bottom 80%',
				scrub: true,
			}
		})

		parallaxTimeline
			.from('#b-left-tomato', {
				x: -100, y: 100
			})
			.from('#b-right-tomato', {
				x: 100, y: 100
			})
	})
	return (
		<section id="burgers" className="noisy">
			<img
				src="/images/freshHero.png"
				className='w-80 hidden scale-x-[-1] lg:block opacity-[.8]'
				alt="l-tomato"
				id="b-left-tomato" />
			<img
				src="/images/freshHero.png"
				className='w-80 hidden lg:block opacity-[.8]'
				alt="r-tomato"
				id="b-right-tomato" />

			<div className="list">
				<div className="popular">
					<h2>Most Popular Burgers:</h2>

					<ul>
						{burgerPopular.map(({ name, category, detail, price }) => (
							<li key={name}>
								<div className="md:me-10">
									<h3>{name}</h3>
									<p>{category} | {detail}</p>
								</div>
								<span>- {price}</span>
							</li>
						))}
					</ul>
				</div>

				<div className="loved">
					<h2>Most Loved Specials:</h2>

					<ul>
						{burgerSpecials.map(({ name, category, detail, price }) => (
							<li key={name}>
								<div className="me-10">
									<h3>{name}</h3>
									<p>{category} | {detail}</p>
								</div>
								<span>- {price}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	)
}
