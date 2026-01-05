import React, { useEffect, useState } from 'react'
import HeadrSteps from '../utils/HeaderSteps'
import { UserData } from '../functions/getUserData';
import { useOrderStore } from '../store/Order.store';
import { useCartStore } from '../store/cart.store';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
    const profileData = UserData ? JSON.parse(UserData).user : '';
    console.log(profileData);
    const { getCart, totalPrice, savings, totalPriceAfterCode, voucher: appliedVoucher } = useCartStore();
    console.log(totalPrice);
    const navigate = useNavigate()
    const { createOrder, loading } = useOrderStore();
    const [formData, setFormData] = useState({
        deliveryAddress: '',
        paymentMethod: "CASH",
    });
    useEffect(() => {
        getCart();
    }, [getCart])
    console.log(appliedVoucher);
    console.log(savings);
    console.log(totalPriceAfterCode);


    const handelChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    };
    const handleCheckout = async (e) => {
        e.preventDefault();
        await createOrder(formData);
        setFormData({
            deliveryAddress: '',
            paymentMethod: "CASH",
        })
        navigate('/all-orders')
    }

    return (
        <div className='min-h-screen py-28 2xl:px-0 px-5 container mx-auto'>
            <section className="radial-gradient py-8 antialiased md:py-16">
                <form onSubmit={handleCheckout} className="mx-auto max-w-screen-xl px-4 2xl:px-0">

                    {/* TITLE */}
                    <h2 className="text-3xl font-modern-negra text-white sm:text-4xl mb-8">
                        Checkout
                    </h2>
                    <HeadrSteps currentStep={'checkout'} />
                    <div className="lg:flex lg:items-start lg:gap-8 xl:gap-12">

                        {/* LEFT SIDE */}
                        <div className="flex-1 space-y-6">

                            {/* DELIVERY DETAILS */}
                            <div className="rounded-3xl border border-yellow/20 bg-black/50 p-6">
                                <h3 className="text-2xl font-modern-negra text-white mb-4">
                                    Delivery Details
                                </h3>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm text-white/70 mb-1">
                                            Your name
                                        </label>
                                        <input
                                            type="text"
                                            value={profileData?.name}
                                            className="w-full rounded-lg border border-yellow/20 bg-transparent p-2.5 text-white placeholder:text-white/40 focus:border-yellow focus:ring-yellow"
                                            placeholder="Your name"
                                            disabled
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-white/70 mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={profileData?.email}
                                            disabled
                                            className="w-full rounded-lg border border-yellow/20 bg-transparent p-2.5 text-white placeholder:text-white/40 focus:border-yellow focus:ring-yellow"
                                            placeholder="email@example.com"
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="block text-sm text-white/70 mb-1">
                                            Delivery Address
                                        </label>
                                        <textarea
                                            rows="3"
                                            name='deliveryAddress'
                                            value={formData?.deliveryAddress}
                                            onChange={handelChange}
                                            required
                                            className="w-full rounded-lg border border-yellow/20 bg-transparent p-2.5 text-white placeholder:text-white/40 focus:border-yellow focus:ring-yellow"
                                            placeholder="Street, building, floor..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* PAYMENT METHOD */}
                            <div className="rounded-3xl border border-yellow/20 bg-black/50 p-6">
                                <h3 className="text-2xl font-modern-negra text-white mb-4">
                                    Payment Method
                                </h3>

                                <div className="space-y-4">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            name="paymentMethod"
                                            value="CASH"
                                            type="radio"
                                            checked={formData.paymentMethod === "CASH"}
                                            onChange={handelChange}
                                            className='accent-yellow focus:ring-2 focus:ring-yellow'
                                        />
                                        <span className="text-white font-modern-negra">
                                            Cash on Delivery
                                        </span>
                                    </label>

                                    <label className="flex items-center gap-3 cursor-pointer opacity-50">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="ONLINE"
                                            disabled
                                            className='accent-yellow focus:ring-2 focus:ring-yellow' />
                                        <span className="text-white font-modern-negra">
                                            Credit Card (Coming soon)
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* VOUCHER */}
                            {appliedVoucher && (
                                <div className="relative overflow-hidden rounded-3xl border-2 border-dashed border-green-500/30 bg-green-500/5 p-6 transition-colors hover:bg-green-500/10">
                                    {/* Decorative Watermark */}
                                    <div className="absolute -right-6 -top-6 opacity-5 rotate-12">
                                        <svg className="w-32 h-32 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M11.178 19.569a.998.998 0 001.644 0l9-13A.999.999 0 0021 5H3a1.002 1.002 0 00-.822 1.569l9 13z" /></svg>
                                    </div>

                                    <div className="relative z-10">
                                        <label className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-green-400">
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                                            Promo Code Applied
                                        </label>

                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                            <div className="flex flex-1 items-center justify-between rounded-xl border border-green-500/20 bg-black/20 px-4 py-3">
                                                <span className="font-modern-negra text-xl tracking-wider text-white">
                                                    {appliedVoucher?.code}
                                                </span>
                                                <span className="rounded bg-green-500/20 px-2 py-1 text-xs font-bold text-green-400">
                                                    SAVED {savings.toFixed(2)} EGP
                                                </span>
                                            </div>
                                        </div>

                                        <p className="mt-3 flex items-center gap-2 text-sm font-medium text-green-400/80">
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            Code successfully verified for this order.
                                        </p>
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* RIGHT SIDE – ORDER SUMMARY */}
                        <div className="mt-6 lg:mt-0 w-full lg:max-w-md space-y-6">
                            <div className="rounded-3xl border border-yellow/20 bg-black/50 p-6">
                                <h3 className="text-2xl font-modern-negra text-white mb-4">
                                    Order Summary
                                </h3>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-white/70">
                                        <span>Subtotal</span>
                                        <span>{totalPrice.toFixed(2)} EGP</span>
                                    </div>

                                    <div className="flex justify-between text-white/70">
                                        <span>Shipping</span>
                                        <span>0 EGP</span>
                                    </div>

                                    <div className="flex justify-between text-white/70">
                                        <span>Savings</span>
                                        <span className='text-base font-medium text-green-500'>-{savings.toFixed(2) || 0} EGP</span>
                                    </div>

                                    <div className="flex justify-between text-white/70">
                                        <span>Tax</span>
                                        <span>0 EGP</span>
                                    </div>

                                    <div className="flex justify-between border-t border-yellow/20 pt-3 text-lg font-modern-negra text-yellow">
                                        <span>Total</span>
                                        <span>{appliedVoucher ? totalPriceAfterCode.toFixed(2) : totalPrice.toFixed(2)} EGP</span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="mt-6 w-full rounded-lg bg-color-yellow px-6 py-3 text-lg font-bold text-black hover:opacity-90 cursor-pointer"
                                >
                                    {loading ? "Placing Order..." : "Place Order"}
                                </button>
                            </div>

                            <div className="text-center">
                                <a
                                    href="/menu"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-yellow underline hover:no-underline"
                                >
                                    Continue Shopping
                                </a>
                            </div>
                        </div>

                    </div>
                </form>
            </section>
        </div>
    )
}
