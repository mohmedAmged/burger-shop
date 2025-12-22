import React, { useEffect, useState } from 'react'
import { useCartStore } from '../store/cart.store'
import InsideLoader from '../utils/InsideLoader';
export default function Cart() {
    const { getCart, updateCartItem, removeFromCart, items, totalPrice, loading } = useCartStore();
  
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

    const handleUpdate = (slug) =>{
        updateCartItem(slug, quantities[slug])
    }
    const handleRemove = (slug)=>{
        removeFromCart(slug)
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
                    <h2 className="text-3xl font-modern-negra text-white sm:text-4xl">Shopping Cart</h2>

                    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                            <div className="space-y-6">
                                {
                                    loading ?
                                        <div className='text-center flex-center '>
                                            <InsideLoader />
                                        </div>
                                        :
<>
    {
        
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
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
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
            )})
        
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
                                            <dd className="text-base font-medium text-green-500">-0 EGP </dd>
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
                                        <dd className="text-base font-bold text-yellow">{totalPrice} EGP</dd>
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
