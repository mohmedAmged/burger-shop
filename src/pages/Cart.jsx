import React, { useEffect, useState } from 'react'
import { useCartStore } from '../store/cart.store'
import InsideLoader from '../utils/InsideLoader';
import HeadrSteps from '../utils/HeaderSteps';
export default function Cart() {
    const { getCart, updateCartItem, removeFromCart, items, totalPrice, loading, applyVoucher, removeVoucher, savings, totalPriceAfterCode, voucher: appliedVoucher } = useCartStore();
    const [voucher, setVoucher] = useState('');
    const [quantities, setQuantities] = useState({})

    useEffect(() => {
        if (items?.length) {
            const initial = {}
            items.forEach(item => {
                initial[item.product.slug] = item.quantity
            })
            setQuantities(initial)
        }
    }, [items])

    const increment = (slug) => {
        setQuantities(q => ({
            ...q,
            [slug]: q[slug] + 1
        }))
    }
    const decrement = (slug) => {
        setQuantities(q => ({
            ...q,
            [slug]: Math.max(1, q[slug] - 1)
        }))
    }

    const handleUpdate = (slug) => {
        updateCartItem(slug, quantities[slug])
    }
    const handleRemove = (slug) => {
        removeFromCart(slug)
    }

    const handleApplyVoucher = (e) => {
        e.preventDefault();
        if (!voucher) return;
        applyVoucher(voucher);
    }

    console.log(items);
    console.log(totalPrice);
    useEffect(() => {
        getCart();
    }, [getCart])
    return (
        <div className='min-h-screen py-28 2xl:px-0 px-5 container mx-auto'>
            <section className="radial-gradient py-8 antialiased md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <h2 className="text-3xl font-modern-negra text-white sm:text-4xl mb-8">Shopping Cart</h2>
                    <HeadrSteps currentStep={'cart'} />
                    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                            <div className="space-y-6">
                                {
                                    loading ?
                                        <div className='text-center flex-center '>
                                            <InsideLoader title="Cart" />
                                        </div>
                                        :
                                        <>
                                            {
                                                items?.length !== 0 ?
                                                    items?.map((item) => {
                                                        const slug = item?.product?.slug
                                                        const qty = quantities[slug] ?? item?.quantity
                                                        return (
                                                            <div
                                                                key={item?._id}
                                                                className="rounded-3xl border border-yellow/20 bg-black/50 p-6 md:p-6">
                                                                <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                                                    <a href="#" className="shrink-0 md:order-1">
                                                                        <img className="h-20 w-20 dark:block" src={item?.product?.image} alt={item?.product?._id} />
                                                                    </a>

                                                                    <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                                                                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                                        <div className="flex items-center flex-wrap gap-4">
                                                                            <button
                                                                                onClick={() => decrement(slug)}
                                                                                type="button"
                                                                                id="decrement-button" data-input-counter-decrement="counter-input"
                                                                                className="h-7 w-7">
                                                                                ➖
                                                                            </button>
                                                                            <input
                                                                                type="text"
                                                                                id="counter-input"
                                                                                data-input-counter className="" placeholder=""
                                                                                value={qty}
                                                                                readOnly
                                                                            />

                                                                            <button
                                                                                onClick={() => increment(slug)}
                                                                                type="button"
                                                                                id="increment-button" data-input-counter-increment="counter-input"
                                                                                className="h-7 w-7">
                                                                                ➕
                                                                            </button>

                                                                        </div>
                                                                        <div className="text-end md:order-4 md:w-36">
                                                                            <p className="text-2xl font-modern-negra text-yellow price-tag">
                                                                                {item?.itemTotal} {item?.product?.currency}
                                                                            </p>
                                                                            <p className="text-lg font-modern-negra text-white price-tag">
                                                                                ({item?.product?.price} {item?.product?.currency} * {qty})
                                                                            </p>
                                                                        </div>
                                                                    </div>

                                                                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                                                        <a href="#" className="text-xl font-modern-negra text-white hover:text-yellow">{item?.product?.name}<br /> {item?.product?.description}
                                                                        </a>

                                                                        <div className="flex items-center gap-4 mt-4">

                                                                            <button
                                                                                onClick={() => handleRemove(slug)}
                                                                                className="inline-flex items-center text-sm font-medium text-red-400 hover:text-red-300 cursor-pointer">
                                                                                <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                                                                </svg>
                                                                                Remove
                                                                            </button>
                                                                            <button
                                                                                onClick={() => handleUpdate(slug)}
                                                                                className="inline-flex items-center text-sm font-medium text-green-400 hover:text-green-300 cursor-pointer"
                                                                            >
                                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="me-1.5 h-5 w-5">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                                                </svg>
                                                                                Update
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                    :
                                                    <>
                                                        <div
                                                            className="rounded-3xl border border-yellow/20 bg-black/50 p-6 md:p-6">
                                                            <div className="space-y-4 md:flex md:items-center md:justify-center md:gap-6 md:space-y-0">
                                                                <a href="/menu" title="" className="inline-flex items-center gap-2 text-sm font-medium text-yellow underline hover:no-underline">
                                                                    No items here, Continue Shopping
                                                                    <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                                                    </svg>
                                                                </a>



                                                            </div>
                                                        </div>
                                                    </>
                                            }
                                        </>
                                }

                            </div>

                        </div>

                        <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                            <div className="space-y-4 rounded-3xl border border-yellow/20 bg-black/50 p-6">
                                <p className="text-2xl font-modern-negra text-white">Order summary</p>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-white/70">Original price</dt>
                                            <dd className="text-base font-medium text-white">{totalPrice} EGP</dd>
                                        </dl>

                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-white/70">Savings</dt>
                                            <dd className="text-base font-medium text-green-500">-{savings?.toFixed(2) || 0} EGP </dd>
                                        </dl>

                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-white/70">Store Shipping</dt>
                                            <dd className="text-base font-medium text-white">0 EGP</dd>
                                        </dl>

                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-white/70">Tax</dt>
                                            <dd className="text-base font-medium text-white">0 EGP</dd>
                                        </dl>
                                    </div>

                                    <dl className="flex items-center justify-between gap-4 border-t border-yellow/20 pt-2">
                                        <dt className="text-base font-bold text-white">Total</dt>
                                        <dd className="text-base font-bold text-yellow">{appliedVoucher ? totalPriceAfterCode.toFixed(2) : totalPrice.toFixed(2)} EGP</dd>
                                    </dl>
                                </div>

                                {items?.length !== 0 &&
                                    <a href="/checkout" className="flex w-full items-center justify-center rounded-lg bg-color-yellow px-6 py-3 text-lg font-bold text-black hover:opacity-90">Checkout</a>
                                }

                                <div className="flex items-center justify-center gap-2">
                                    {items?.length !== 0 &&
                                        <span className="text-sm font-normal text-white/70"> or </span>
                                    }
                                    <a href="/menu" title="" className="inline-flex items-center gap-2 text-sm font-medium text-yellow underline hover:no-underline">
                                        Continue Shopping
                                        <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            <div className={`rounded-3xl border border-yellow/20 p-6 relative overflow-hidden transition-all ${appliedVoucher ? 'bg-green-500/5 border-green-500/30 border-dashed' : 'bg-black/50'}`}>
                                {appliedVoucher ? (
                                    <div className="relative z-10">
                                        {/* Decorative Watermark */}
                                        <div className="absolute -right-6 -top-6 opacity-5 rotate-12 pointer-events-none">
                                            <svg className="w-32 h-32 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M11.178 19.569a.998.998 0 001.644 0l9-13A.999.999 0 0021 5H3a1.002 1.002 0 00-.822 1.569l9 13z" /></svg>
                                        </div>

                                        <label className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-green-400">
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                                            Promo Applied
                                        </label>

                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between rounded-xl border border-green-500/20 bg-black/20 px-4 py-3">
                                                <span className="font-modern-negra text-xl tracking-wider text-white">
                                                    {appliedVoucher.code}
                                                </span>
                                                <div className="flex flex-col items-end">
                                                    <span className="text-xs font-bold text-green-400">SAVED</span>
                                                    <span className="text-sm font-bold text-white">-{savings.toFixed(2)} EGP</span>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => {
                                                    removeVoucher();
                                                    setVoucher('');
                                                }}
                                                className="group flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 py-2.5 text-xs font-bold uppercase tracking-widest text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors"
                                            >
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                Remove Coupon
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <form className="space-y-4 relative z-10" onSubmit={handleApplyVoucher}>
                                        {/* Decorative Icon */}
                                        <div className="absolute -right-4 -top-4 opacity-5 rotate-12 pointer-events-none">
                                            <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M15,5H9V3H15V5M5,5V19H19V5H5M19,3H21V21H19V3M3,3H5V21H3V3Z" /></svg>
                                        </div>

                                        <div>
                                            <label htmlFor="voucher" className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/60">
                                                Have a promo code?
                                            </label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-white/30 group-focus-within:text-yellow transition-colors">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
                                                </div>
                                                <input
                                                    onChange={(e) => setVoucher(e.target.value)}
                                                    value={voucher}
                                                    name='code'
                                                    type="text"
                                                    id="voucher"
                                                    className="block w-full rounded-xl border border-white/10 bg-black/20 p-3 pl-10 text-sm text-white placeholder:text-white/20 focus:border-yellow focus:ring-0 transition-colors font-medium uppercase"
                                                    placeholder="ENTER CODE"
                                                    required />
                                            </div>
                                        </div>
                                        <button type="submit" className="flex w-full items-center justify-center rounded-xl bg-white/5 hover:bg-yellow px-5 py-3 text-sm font-bold text-white hover:text-black transition-all uppercase tracking-wider border border-white/10 hover:border-yellow">
                                            Apply Ticket
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>




                </div>
            </section>
        </div>

    )
}
