import { allBurgers } from '../../constants/index.js'
import { useMemo, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
const categories = ["chicken", "beef", "meals", "drinks"];

const Menu = () => {
    const contentRef = useRef();
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

    //  const totalItems = allBurgers.length;

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
            <nav className="burger-tabs" aria-label="Cocktail Navigation">
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
                        <img src="/images/right-arrow.png" alt="right-arrow" aria-hidden="true" />
                    </button>

                    <button className="text-left" onClick={() => goToSlide(currentIndex + 1)}>
                        <span>{nextItem.name}</span>
                        <img src="/images/left-arrow.png" alt="left-arrow" aria-hidden="true" />
                    </button>
                </div>

                <div className="itemImage">
                    <img src={currentItem.image} alt={currentItem.name} className="object-contain" />
                </div>

                <div className="recipe">
                    <div ref={contentRef} className="info">
                        <p>Recipe for:</p>
                        <p id="title">{currentItem.name}</p>
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