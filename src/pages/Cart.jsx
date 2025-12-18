import React from 'react'
import burgerItemImg from '/images/menu/chicken/chicken2.png'
export default function Cart() {
    return (
        <div className='min-h-screen py-28 2xl:px-0 px-5 container mx-auto'>
            <section className="radial-gradient py-8 antialiased md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <h2 className="text-3xl font-modern-negra text-white sm:text-4xl">Shopping Cart</h2>

                    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                            <div className="space-y-6">
                                <div className="rounded-3xl border border-yellow/20 bg-black/50 p-6 md:p-6">
                                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                        <a href="#" className="shrink-0 md:order-1">
                                            <img className="hidden h-20 w-20 dark:block" src={burgerItemImg} alt="imac image" />
                                        </a>

                                        <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                                            <div className="flex items-center gap-3">
                                                <button type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-yellow/30 bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-yellow/30">
                                                    <svg className="h-3 w-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                                    </svg>
                                                </button>
                                                <input type="text" id="counter-input" data-input-counter className="w-12 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-white focus:outline-none focus:ring-0" placeholder="" value="2" required />
                                                <button type="button" id="increment-button" data-input-counter-increment="counter-input" className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-yellow/30 bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-yellow/30">
                                                    <svg className="h-3 w-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="text-end md:order-4 md:w-36">
                                                <p className="text-2xl font-modern-negra text-yellow price-tag">$1,499</p>
                                            </div>
                                        </div>

                                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                            <a href="#" className="text-xl font-modern-negra text-white hover:text-yellow">Crispy Deluxe<br/> Juicy fried chicken with cheddar, lettuce, tomato, and mayo on brioche bun.
                                            </a>

                                            <div className="flex items-center gap-4 mt-4">
                                                {/* <button type="button" className="inline-flex items-center text-sm font-medium text-white/80 hover:text-yellow">
                                                    <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                                    </svg>
                                                    Add to Favorites
                                                </button> */}

                                                <button type="button" className="inline-flex items-center text-sm font-medium text-red-400 hover:text-red-300">
                                                    <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                                    </svg>
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="hidden xl:mt-8 xl:block">
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">People also bought</h3>
                                <div className="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
                                    <div className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                        <a href="#" className="overflow-hidden rounded">
                                            <img className="mx-auto h-44 w-44 dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="imac image" />
                                            <img className="mx-auto hidden h-44 w-44 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="imac image" />
                                        </a>
                                        <div>
                                            <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">iMac 27”</a>
                                            <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">This generation has some improvements, including a longer continuous battery life.</p>
                                        </div>
                                        <div>
                                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                                                <span className="line-through"> $399,99 </span>
                                            </p>
                                            <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">$299</p>
                                        </div>
                                        <div className="mt-6 flex items-center gap-2.5">
                                            <button data-tooltip-target="favourites-tooltip-1" type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                                                <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"></path>
                                                </svg>
                                            </button>
                                            <div id="favourites-tooltip-1" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                                                Add to favourites
                                                <div className="tooltip-arrow" data-popper-arrow></div>
                                            </div>
                                            <button type="button" className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                                                </svg>
                                                Add to cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>

                        <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                            <div className="space-y-4 rounded-3xl border border-yellow/20 bg-black/50 p-6">
                                <p className="text-2xl font-modern-negra text-white">Order summary</p>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-white/70">Original price</dt>
                                            <dd className="text-base font-medium text-white">$7,592.00</dd>
                                        </dl>

                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-white/70">Savings</dt>
                                            <dd className="text-base font-medium text-green-500">-$299.00</dd>
                                        </dl>

                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-white/70">Store Pickup</dt>
                                            <dd className="text-base font-medium text-white">$99</dd>
                                        </dl>

                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-white/70">Tax</dt>
                                            <dd className="text-base font-medium text-white">$799</dd>
                                        </dl>
                                    </div>

                                    <dl className="flex items-center justify-between gap-4 border-t border-yellow/20 pt-2">
                                        <dt className="text-base font-bold text-white">Total</dt>
                                        <dd className="text-base font-bold text-yellow">$8,191.00</dd>
                                    </dl>
                                </div>

                                <a href="#" className="flex w-full items-center justify-center rounded-lg bg-color-yellow px-6 py-3 text-lg font-bold text-black hover:opacity-90">Checkout</a>

                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-sm font-normal text-white/70"> or </span>
                                    <a href="#" title="" className="inline-flex items-center gap-2 text-sm font-medium text-yellow underline hover:no-underline">
                                        Continue Shopping
                                        <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            <div className="space-y-4 rounded-3xl border border-yellow/20 bg-black/50 p-6">
                                <form className="space-y-4">
                                    <div>
                                        <label htmlFor="voucher" className="mb-2 block text-sm font-medium text-white"> Do you have a voucher or gift card? </label>
                                        <input type="text" id="voucher" className="block w-full rounded-lg border border-yellow/20 bg-transparent p-2.5 text-sm text-white placeholder:text-white/50 focus:border-yellow/30 focus:ring-yellow/30" placeholder="" required />
                                    </div>
                                    <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-color-yellow px-5 py-2.5 text-sm font-bold text-black hover:opacity-90">Apply Code</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}
