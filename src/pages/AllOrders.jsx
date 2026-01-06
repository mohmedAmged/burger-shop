import React, { useEffect } from "react"
import { useOrderStore } from "../store/Order.store";
import InsideLoader from "../utils/InsideLoader";
import { Link } from "react-router-dom";
import { scrollToTop } from "../functions/scrollToTop";
import HeadrSteps from "../utils/HeaderSteps";

export default function AllOrders() {
    const { getUserOrders, loading, orders } = useOrderStore();
    useEffect(() => {
        getUserOrders();
    }, [])
    console.log(orders);
    
    return (
        <div className='min-h-screen py-48 2xl:px-0 radial-gradient px-5 container mx-auto'>
            <section className=" py-8 antialiased md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <h2 className="text-3xl font-modern-negra text-white sm:text-4xl mb-8">
                        My Orders
                    </h2>
                    <HeadrSteps currentStep={'summary'}/>
                    <div className=" rounded-3xl border border-yellow/20 bg-black/50 p-6">

                        {/* Title */}
                        <h3 className="text-2xl font-modern-negra text-white mb-6">
                            Orders Details
                        </h3>

                        {/* Orders */}
                        <div className="divide-y divide-white/10 text-white">

                            {/* Order */}
                            {
                                loading ?
                                    <div className='text-center flex-center '>
                                        <InsideLoader title="Orders"/>
                                    </div>
                                    :
<>
    {
        orders?.length !== 0 ?
            orders?.map((ord) => {
                
                return (
                    <>
                        <div key={ord?._id} className="flex flex-wrap items-center flex-col md:flex-row gap-y-6 py-6">
                            <dl className="w-1/2 sm:w-1/4 lg:flex-1">
                                <dt className="text-sm text-white/50">Order ID</dt>
                                <dd className="mt-1 font-semibold">#{ord?._id?.slice(0, 10)}...</dd>
                            </dl>

                            <dl className="w-1/2 sm:w-1/4 md:flex-2 lg:flex-1">
                                <dt className="text-sm text-white/50">Date</dt>
                                <dd className="mt-1 font-semibold">{new Date(ord?.createdAt).toLocaleString()}</dd>
                            </dl>

                            <dl className="w-1/2 sm:w-1/4 md:flex-2 lg:flex-1">
                                <dt className="text-sm text-white/50">Total</dt>
                                <dd className="mt-1 font-semibold">{ord?.totalPriceAfterCode ? ord?.totalPriceAfterCode : ord?.totalPrice} EGP</dd>
                            </dl>

                            <dl className="w-1/2 sm:w-1/4 md:flex-2 lg:flex-1">
                                <dt className="text-sm text-white/50">Status</dt>
                                <dd className="mt-1 inline-flex rounded bg-yellow/10 px-3 py-1 text-xs font-medium text-yellow">
                                    {ord?.status}
                                </dd>
                            </dl>

                            <div className="w-full sm:w-auto flex justify-end">
                                <Link
                                to={`${ord?._id}`}
                                onClick={scrollToTop}
                                className="rounded-lg border border-yellow px-4 py-2 text-sm font-medium text-yellow hover:bg-yellow hover:text-black transition">
                                    View details
                                </Link>
                            </div>
                        </div>
                    </>
                )
            })
            :
            <>
                <a href="/menu" title="" className="inline-flex text-center items-center gap-2 text-sm font-medium text-yellow underline hover:no-underline">
                    No items here, Continue Shopping
                    <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                    </svg>
                </a>
            </>
    }

</>
                            }



                        </div>

                        {/* Pagination */}
                        {/* <div className="mt-8 flex justify-center">
                            <div className="flex gap-2">
                                <button className="h-9 w-9 rounded border border-white/20 text-white/40 hover:border-yellow hover:text-yellow transition">
                                    ‹
                                </button>
                                <button className="h-9 w-9 rounded border border-yellow bg-yellow text-black font-semibold">
                                    1
                                </button>
                                <button className="h-9 w-9 rounded border border-white/20 text-white/40 hover:border-yellow hover:text-yellow transition">
                                    2
                                </button>
                                <button className="h-9 w-9 rounded border border-white/20 text-white/40 hover:border-yellow hover:text-yellow transition">
                                    ›
                                </button>
                            </div>
                        </div> */}

                    </div>
                </div>
            </section>
        </div>
    )
}
