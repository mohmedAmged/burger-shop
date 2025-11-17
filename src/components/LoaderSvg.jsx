import { useGSAP } from "@gsap/react";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";


export default function LoaderSVG() {
    const wrapperRef = useRef(null);
    const partsRef = useRef({});
    const cheeseDripRef = useRef(null);
    const tlRef = useRef(null);

    const [simProgress, setSimProgress] = useState(0);

    // helper to register parts
    const setPart = (key) => (el) => {
        partsRef.current[key] = el;
    };

    useGSAP(() => {
        const loaderTextSplit = new SplitText(".title", {
			type: "chars, words",
		});
        gsap.from(loaderTextSplit.chars, {
			yPercent: 300,
			duration: .8,
            opacity:0,
			ease: "circ.inOut",
			stagger: 0.06,
		});
        // timeline for parts
        const t = gsap.timeline({ repeat: -1, repeatDelay: 0.35, defaults: { ease: "power3.out" } });

        // initial hide
        t.set(Object.values(partsRef.current), { y: -60, opacity: 0, scale: 0.92 });

        const order = ["bottombun", "lettuce", "tomato", "cheese", "patty", "bacon", "topbun"];

        order.forEach((key, i) => {
            t.to(partsRef.current[key], { y: 0, opacity: 1, scale: 1, duration: 0.45 }, i * 0.28);
        });

        t.to(partsRef.current.cheese, { y: -6, duration: 0.35, yoyo: true, repeat: 1, ease: "sine.inOut" }, "+=0.05");

        t.to(partsRef.current.patty, { y: -6, duration: 0.28, yoyo: true, repeat: 1, ease: "sine.inOut" }, "-=0.6");

        t.to(partsRef.current.topbun, { rotation: -2, duration: 0.25, yoyo: true, repeat: 1 }, "-=0.6");

        t.fromTo(
            cheeseDripRef.current,
            { y: -6, opacity: 0.95 },
            { y: 0, duration: 0.6, ease: "sine.inOut", repeat: 1, yoyo: true },
            "-=0.6"
        );

        tlRef.current = t;

        return () => t.kill();
    }, []);


    useEffect(() => {
        let current = 1;

        const interval = setInterval(() => {
            current += 1;
            setSimProgress(current);

            if (current >= 100) {
                clearInterval(interval);

                gsap.to(".loader", {
                    opacity: 0,
                    duration: 2.5,
                    ease: "power2.out",
                });
            }
        }, 30);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            ref={wrapperRef}
            className="fixed inset-0 z-9999 col-center bg-black loader"
            aria-live="polite"
            aria-busy="true"
        >
            {/* circular badge around svg */}
            <div
                className="relative flex-center rounded-full"
                style={{ width: 160, height: 160 }}
            >
                <div
                    className="absolute inset-0 rounded-full"
                    style={{ border: `4px solid #fff2d4`, boxShadow: "0 10px 30px rgba(247,172,92,0.18)" }}
                />

                {/* SVG (burger) */}
                <svg
                    width="140"
                    height="140"
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Burger loader"
                >
                    {/* subtle plate circle */}
                    <circle cx="100" cy="120" r="62" fill="#0a0a0a" />

                    {/* bottom bun */}
                    <g ref={setPart("bottombun")}>
                        <ellipse cx="100" cy="136" rx="66" ry="20" fill="#8b604a" />
                        <ellipse cx="100" cy="128" rx="66" ry="14" fill="#f7be73" opacity="0.95" />
                    </g>

                    {/* lettuce  */}
                    <g ref={setPart("lettuce")}>
                        <path d="M40 118 q20 -20 120 0 q-8 8 -120 0z" fill="#2f8f4b" opacity="0.95" />
                    </g>

                    {/* tomato */}
                    <g ref={setPart("tomato")}>
                        <ellipse cx="100" cy="110" rx="56" ry="10" fill="#d23a2d" />
                        {/* tomato seeds */}
                        <g fill="#ffbfb8" opacity="0.85">
                            <circle cx="86" cy="108" r="1.3" />
                            <circle cx="100" cy="106" r="1.3" />
                            <circle cx="114" cy="108" r="1.3" />
                        </g>
                    </g>

                    {/* cheese  */}
                    <g ref={setPart("cheese")}>
                        <rect x="48" y="98" width="104" height="12" rx="3" fill="#f7ac5c" />
                        {/* cheese drip */}
                        <path
                            ref={cheeseDripRef}
                            d="M70 110 q4 12 10 0 q6 12 10 0 q6 12 10 0 q6 12 10 0 v-10 h-40 z"
                            fill="#f7ac5c"
                            opacity="0.98"
                        />
                    </g>

                    {/* patty */}
                    <g ref={setPart("patty")}>
                        <rect x="46" y="86" width="108" height="18" rx="8" fill="#6b3f2b" />
                        <rect x="50" y="88" width="100" height="12" rx="6" fill="#4f2b1b" opacity="0.95" />
                    </g>

                    {/* bacon */}
                    <g ref={setPart("bacon")}>
                        <path d="M50 84 q30 -8 100 0 q-8 10 -100 0z" fill="#c94a3e" opacity="0.95" />
                    </g>

                    {/* top bun */}
                    <g ref={setPart("topbun")}>
                        <path d="M36 70 q28 -40 128 0 q-40 28 -128 0z" fill="#f7be73" />
                        {/* seeds */}
                        <g fill="#fff2d4" opacity="0.95">
                            <ellipse cx="70" cy="62" rx="3" ry="2" />
                            <ellipse cx="92" cy="56" rx="3" ry="2" />
                            <ellipse cx="114" cy="60" rx="3" ry="2" />
                            <ellipse cx="136" cy="64" rx="3" ry="2" />
                        </g>
                    </g>
                </svg>
            </div>

            {/* label + percent */}
            <div className="mt-6 text-center">
                <div className="text-white font-medium text-3xl font-modern-negra title">Cooking your experience…</div>
                <div className="text-yellow font-bold text-2xl mt-1 font-modern-negra">
                    {simProgress} %
                </div>
            </div>
        </div>
    );
}
