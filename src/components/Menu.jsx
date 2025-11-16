import { allBurgers } from '../../constants/index.js'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
const categories = ["chicken", "beef", "meals", "drinks"];

const Menu = () => {
    const contentRef = useRef();
    const imageContainerRef = useRef();

    const [activeCategory, setActiveCategory] = useState("chicken");
    const [currentIndex, setCurrentIndex] = useState(0);

    const filteredItems = useMemo(
        () => allBurgers.filter((item) => item.category === activeCategory),
        [activeCategory]
    );
    const totalItems = filteredItems.length;

    useGSAP(() => {
        gsap.fromTo('#title', { opacity: 0 }, { opacity: 1, duration: 1 });
        gsap.fromTo('.itemImage img', { opacity: 0, xPercent: -100 }, {
            xPercent: 0, opacity: 1, duration: 1, ease: 'power1.inOut'
        })
        gsap.fromTo('.details h2', { yPercent: 100, opacity: 0 }, {
            yPercent: 0, opacity: 100, ease: 'power1.inOut'
        })
        gsap.fromTo('.details p', { yPercent: 100, opacity: 0 }, {
            yPercent: 0, opacity: 100, ease: 'power1.inOut'
        })
    }, [currentIndex]);


    const goToSlide = (index) => {
        const newIndex = (index + totalItems) % totalItems;

        setCurrentIndex(newIndex);
    }

    const getItemsAt = (indexOffset) => {
        return filteredItems[(currentIndex + indexOffset + totalItems) % totalItems]
    }

    const currentItem = getItemsAt(0);
    const prevItem = getItemsAt(-1);
    const nextItem = getItemsAt(1);

    useEffect(() => {
        const el = imageContainerRef.current;
        if (!el) return;

        let startX = 0;
        let isDragging = false;

        const onStart = (e) => {
            isDragging = true;
            startX = e.touches ? e.touches[0].clientX : e.clientX;
        };

        // eslint-disable-next-line no-unused-vars
        const onMove = (e) => {
            if (!isDragging) return;
        };

        const onEnd = (e) => {
            if (!isDragging) return;
            const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
            const diff = endX - startX;

            const threshold = 10; 

            if (diff > threshold) {
                goToSlide(currentIndex - 1); // swipe RIGHT → previous
            } else if (diff < -threshold) {
                goToSlide(currentIndex + 1); // swipe LEFT → next
            }

            isDragging = false;
        };

        // Desktop
        el.addEventListener("mousedown", onStart);
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseup", onEnd);
        el.addEventListener("mouseleave", onEnd);

        // Mobile Touch
        el.addEventListener("touchstart", onStart);
        el.addEventListener("touchmove", onMove);
        el.addEventListener("touchend", onEnd);

        return () => {
            el.removeEventListener("mousedown", onStart);
            el.removeEventListener("mousemove", onMove);
            el.removeEventListener("mouseup", onEnd);
            el.removeEventListener("mouseleave", onEnd);

            el.removeEventListener("touchstart", onStart);
            el.removeEventListener("touchmove", onMove);
            el.removeEventListener("touchend", onEnd);
        };
    }, [currentIndex, totalItems]);
    return (
        <section id="menu" aria-labelledby="menu-heading">
            <h2 id="menu-heading" className="sr-only">
                burger Menu
            </h2>
            {/* Category Tabs */}
            <div className="category-tabs" aria-label="Category Filter">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => {
                            setActiveCategory(cat);
                            setCurrentIndex(0);
                        }}
                        className={`uppercase tracking-wider font-modern-negra transition-all duration-300 border-b-2 md:text-2xl text-lg px-4 pb-2 ${activeCategory === cat
                                ? "text-yellow border-yellow"
                                : "text-white/60 border-transparent hover:text-yellow hover:border-yellow/60"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            <nav style={{background: 'unset'}} className="burger-tabs nav_bg" aria-label="Cocktail Navigation">
                {filteredItems.map((item, index) => {
                    const isActive = index === currentIndex;

                    return (
                        <button key={item.id} className={`
				${isActive
                                ? 'text-white border-white'
                                : 'text-white/50 border-white/50'}
			 `} onClick={() => goToSlide(index)}
                        >
                            {item.name}
                        </button>
                    )
                })}
            </nav>

            <div className="content">
                <div className="arrows">
                    <button className="text-left" onClick={() => goToSlide(currentIndex - 1)}>
                        <span>{prevItem.name}</span>
                        <img src="/images/left.png" className='scale-x-[-1] w-10 md:w-20' alt="right-arrow" aria-hidden="true" onClick={() => goToSlide(currentIndex + 1)}/>
                    </button>

                    <button className="text-left" onClick={() => goToSlide(currentIndex + 1)}>
                        <span>{nextItem.name}</span>
                        <img src="/images/left.png" alt="left-arrow" className='w-10 md:w-20' aria-hidden="true" onClick={() => goToSlide(currentIndex + 1)}/>
                    </button>
                </div>

                <div ref={imageContainerRef} className="itemImage">
                    <img src={currentItem.image} alt={currentItem.name} className="object-contain" />
                </div>

                <div className="recipe">
                    <div ref={contentRef} className="info">
                        <p>Recipe for:</p>
                        <p id="title">
                            {currentItem.name} - {currentItem.price}
                        </p>

                       
                    </div>

                    <div className="details">
                        <h2>{currentItem.title}</h2>
                        <p>{currentItem.description}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Menu