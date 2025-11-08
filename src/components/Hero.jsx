import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
const Hero = () => {
	const videoRef = useRef();

	const isMobile = useMediaQuery({ maxWidth: 767 });

	useGSAP(() => {
		const heroSplit = new SplitText(".title", {
			type: "chars, words",
		});

		const paragraphSplit = new SplitText(".subtitle", {
			type: "lines",
		});

		// Apply text-gradient class once before animating
		heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

		gsap.from(heroSplit.chars, {
			yPercent: 100,
			duration: 1.8,
			ease: "expo.out",
			stagger: 0.06,
		});

		gsap.from(paragraphSplit.lines, {
			opacity: 0,
			yPercent: 100,
			duration: 1.8,
			ease: "expo.out",
			stagger: 0.06,
			delay: 1,
		});

		gsap
			.timeline({
				scrollTrigger: {
					trigger: "#hero",
					start: "top top",
					end: "bottom top",
					scrub: true,
				},
			})
			.to(".right-katchep", { y: 200 }, 0)
			.to(".left-katchep", { y: -200 }, 0)
			.to(".arrow", { y: 100 }, 0);

		const startValue = isMobile ? "top 50%" : "center 60%";
		const endValue = isMobile ? "120% top" : "bottom top";

		let tl = gsap.timeline({
		 scrollTrigger: {
			trigger: "video",
			start: startValue,
			end: endValue,
			scrub: true,
			pin: true,
		 },
		});


		videoRef.current.onloadedmetadata = () => {
		 tl.to(videoRef.current, {
			currentTime: videoRef.current.duration,
			duration: 3,
			ease: "none",
		 });
		};
	}, []);

	return (
		<>
			<section id="hero" className="noisy">
				<h1 className="title">Burgro</h1>

				<img
					src="/images/katchep2.png"
					alt="left-katchep"
					className="left-katchep katcheb_img_left lg:block opacity-[.8] w-50 md:w-80"
				/>
				<img
					src="/images/katchep2.png"
					alt="right-katchep"
					className="right-katchep katcheb_img_right w-50 md:w-80 lg:block opacity-[.8]"
				/>

				<div className="body">
					<img src="/images/arrow.png" alt="arrow" className="arrow" />

					<div className="content">
						<div className="space-y-5 hidden md:block">
							<p>Bold. Juicy. Legendary.</p>
							<p className="subtitle">
								Taste the Flame<br /> Love the Crunch
							</p>
						</div>

						<div className="view-burgers">
							<p className="subtitle">
								Every burger we craft is packed with fire-grilled flavor,
								layered with melty cheese, crisp veggies,
								and sauces born to blow your mind.
							</p>
							<a href="#burgers">View Burgers</a>
						</div>
					</div>
				</div>
			</section>

			<div className="video absolute inset-0">
				<video
					ref={videoRef}
					muted
					playsInline
					preload="auto"
                    disablePictureInPicture
                    webkit-playsinline="true"
                    x5-playsinline="true"
					src="/videos/output7.mp4"
				/>
				{/* <div className="overlay absolute inset-0 bg-black/50" /> */}
			</div>
		</>
	);
};

export default Hero;