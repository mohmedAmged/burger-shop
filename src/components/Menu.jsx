// import { allBurgers } from '../../constants/index.js'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { useProductStore } from '../store/products.store.js';
import InsideLoader from '../utils/InsideLoader.jsx';

import { Token } from '../functions/Token.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { scrollToTop } from '../functions/scrollToTop.js';
import { useCartStore } from '../store/cart.store.jsx';
// const categories = ["chicken", "beef", "meals", "drinks"];

const Menu = () => {
    const contentRef = useRef();
    const navigate = useNavigate();
    const imageContainerRef = useRef();
    const { products, getAllProducts, loading } = useProductStore();
    const [activeCategory, setActiveCategory] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const categories = useMemo(() => {
        return [
            ...new Set(
                products
                    .map(item => item?.category)
                    .filter(Boolean)
            )
        ];
    }, [products]);

    useEffect(() => {
        if (!activeCategory && categories.length > 0) {
            setActiveCategory(categories[0]);
            setCurrentIndex(0);
        }
    }, [categories, activeCategory]);

    const filteredItems = useMemo(() => {
        if (!activeCategory) return [];
        return products.filter(item => item?.category === activeCategory);
    }, [products, activeCategory]);

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

            const threshold = 40;

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

    useEffect(() => {
        getAllProducts();
    }, [getAllProducts])
    console.log(products);

    const { addToCart } = useCartStore();
    const [qty, setQty] = useState(1)

    const increment = () => setQty(q => q + 1)
    const decrement = () => setQty(q => Math.max(1, q - 1))

    const handleAdd = (prod) => {
        addToCart(prod, qty)
    }
    return (
        <section id="menu" aria-labelledby="menu-heading">
            <h2 id="menu-heading" className="sr-only">
                burger Menu
            </h2>
            {loading ?
                <div className='text-center flex-center '>
                    <InsideLoader />
                </div>
                :
                <>
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
                    <nav style={{ background: 'unset' }} className="burger-tabs nav_bg" aria-label="Cocktail Navigation">
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
                                <span>{prevItem?.name}</span>
                                <img src="/images/left.png" className='scale-x-[-1] w-10 md:w-20' alt="right-arrow" aria-hidden="true" onClick={() => goToSlide(currentIndex + 1)} />
                            </button>

                            <button className="text-left" onClick={() => goToSlide(currentIndex + 1)}>
                                <span>{nextItem?.name}</span>
                                <img src="/images/left.png" alt="left-arrow" className='w-10 md:w-20' aria-hidden="true" onClick={() => goToSlide(currentIndex + 1)} />
                            </button>
                        </div>

                        <div ref={imageContainerRef} className="itemImage">
                            <img src={currentItem?.image} alt={currentItem?.name} className="object-contain" />
                        </div>

                        <div className="recipe">
                            <div ref={contentRef} className="info">
                                <p>Recipe for:</p>
                                <p id="title">
                                    {currentItem?.name}<br /> - {currentItem?.currency} {currentItem?.price}
                                </p>
                            </div>

                            <div className="details">
                                <h2>{currentItem?.title}</h2>
                                <p>{currentItem?.description}</p>

                                <div className='flex justify-between gap-5 mt-10'>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={decrement}
                                            type="button"
                                            id="decrement-button" data-input-counter-decrement="counter-input"
                                            className="text-white"
                                        >
                                            ➖
                                        </button>
                                        <input
                                            value={qty}
                                            readOnly
                                            type="text"
                                            id="counter-input"
                                            data-input-counter className="" placeholder=""
                                            required
                                        />

                                        <button
                                            onClick={increment}
                                            type="button"
                                            id="increment-button" data-input-counter-increment="counter-input"
                                            className="">
                                            ➕
                                        </button>
                                    </div>
                                    <button onClick={
                                        () => {
                                            if (Token) {
                                                handleAdd(currentItem)
                                            } else {
                                                toast.error('you should login first', {
                                                    duration: 3000
                                                })
                                                scrollToTop();
                                                navigate('/sign-in');
                                            }

                                        }
                                    }
                                        className="bg-color-yellow addToCartBtn gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                        </svg>
                                        Add to cart
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            }
        </section>
    )
}
export default Menu