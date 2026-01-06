import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useOrderStore } from "../store/Order.store";
import InsideLoader from "../utils/InsideLoader";

const ORDER_STEPS = [
    "PENDING",
    "PREPARING",
    "SHIPPED",
    "DELIVERED",
]

export default function OrderDetails() {
    const { orderId } = useParams();
    const { getOrderDetails, loading, currentOrder } = useOrderStore();

    useEffect(() => {
        getOrderDetails(orderId);
    }, [])
    const currentStepIndex = ORDER_STEPS.indexOf(currentOrder?.status);

    console.log(orderId);
    console.log(currentOrder);


    return (
        <div className="min-h-screen py-28 radial-gradient container mx-auto px-5 2xl:px-0">
            <section className=" py-8 antialiased md:py-16">
                {
                    loading ?
                        <div className='text-center flex-center '>
                            <InsideLoader title={`Order ${orderId}`}/>
                        </div>
                        :
                        <>
                            <div className="max-w-5xl mx-auto rounded-3xl border border-yellow/20 bg-black/50 p-6">

                                {/* Header */}
                                <div className="mb-8">
                                    <h2 className="text-3xl font-modern-negra text-white">
                                        Order Details
                                    </h2>
                                    <p className="text-white/60 mt-3">
                                        Order ID: <span className="text-yellow">{currentOrder?._id}</span>
                                    </p>
                                    <p className="text-white/60 mt-2">
                                        Created AT: <span className="text-yellow">{new Date(currentOrder?.createdAt).toLocaleString()}</span>
                                    </p>
                                </div>

                                {/* Status Tracker */}
                                <ol className="flex flex-wrap md:flex-nowrap items-center w-full text-sm font-medium mb-10">
                                    {ORDER_STEPS.map((step, index) => {
                                        const isActive = index === currentStepIndex
                                        const isCompleted = index < currentStepIndex

                                        return (
                                            <li
                                                key={step}
                                                className={`flex items-center md:w-full
                                                ${index !== ORDER_STEPS.length - 1
                                                        ? "after:mx-2 after:content-['/'] sm:after:content-[''] sm:after:mx-6 sm:after:h-1 sm:after:w-full sm:after:border-b xl:after:mx-10 "
                                                        : ""}
                                                        ${isCompleted || isActive
                                                        ? "after:border-yellow sm:after:border-yellow after:text-yellow"
                                                        : "after:text-white/40 sm:after:border-yellow/30"}
                                                    `}
                                            >
                                                <span
                                                    className={`flex items-center gap-2 font-modern-negra text-lg
                                                    ${isCompleted || isActive ? "text-yellow" : "text-white/40"}
                                                `}
                                                >
                                                    <svg
                                                        className="h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                        />
                                                    </svg>
                                                    {step}
                                                </span>
                                            </li>
                                        )
                                    })}
                                </ol>

                                {/* User Info */}
                                <div className="grid md:grid-cols-2 gap-6 mb-10">
                                    <div className="rounded-2xl border border-yellow/20 bg-black/40 p-5">
                                        <h3 className="text-xl font-modern-negra text-white mb-4">
                                            Customer Info
                                        </h3>
                                        <p className="text-white/70">
                                            <span className="text-white">Name:</span> {currentOrder?.user?.name}
                                        </p>
                                        <p className="text-white/70">
                                            <span className="text-white">Email:</span> {currentOrder?.user?.email}
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-yellow/20 bg-black/40 p-5">
                                        <h3 className="text-xl font-modern-negra text-white mb-4">
                                            Delivery Details
                                        </h3>
                                        <p className="text-white/70">
                                            <span className="text-white">Address:</span>{" "}
                                            {currentOrder?.deliveryAddress}
                                        </p>
                                        <p className="text-white/70">
                                            <span className="text-white">Payment:</span>{" "}
                                            {currentOrder?.paymentMethod}
                                        </p>
                                    </div>
                                </div>

                                {/* Items */}
                                <div className="rounded-2xl border border-yellow/20 bg-black/40 p-5 mb-8">
                                    <h3 className="text-xl font-modern-negra text-white mb-6">
                                        Order Items
                                    </h3>

                                    <div className="divide-y divide-yellow/10">
                                        {currentOrder?.items?.map(item => (
                                            <div
                                                key={item?._id}
                                                className="flex items-center gap-4 py-4"
                                            >
                                                <img
                                                    src={item?.product?.image}
                                                    alt={item?.product?.name}
                                                    className="h-20 w-20 rounded-xl object-cover border border-yellow/20"
                                                />

                                                <div className="flex-1">
                                                    <h4 className="text-white font-medium">
                                                        {item?.product?.name}
                                                    </h4>
                                                    <p className="text-white/60 text-sm">
                                                        Qty: {item?.quantity}
                                                    </p>
                                                </div>

                                                <div className="text-yellow font-medium">
                                                    {item?.price * item?.quantity} EGP
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Pricing */}
                                <div className="rounded-2xl border border-yellow/20 bg-black/40 p-5">
                                    <h3 className="text-xl font-modern-negra text-white mb-4">
                                        Order Summary
                                    </h3>

                                    <div className="flex justify-between text-white/70 mb-2">
                                        <span>Total</span>
                                        <span>{currentOrder?.totalPrice} EGP</span>
                                    </div>
                                    <div className="flex justify-between text-white/70 mb-2">
                                        <span>Savings</span>
                                        <span className="text-base font-medium text-green-500">-{currentOrder?.savings || 0} EGP</span>
                                    </div>

                                    <div className="flex justify-between text-lg font-modern-negra text-yellow">
                                        <span>Grand Total</span>
                                        <span>{currentOrder?.totalPriceAfterCode ? currentOrder?.totalPriceAfterCode : currentOrder?.totalPrice} EGP</span>
                                    </div>
                                </div>

                            </div>
                        </>
                }

            </section>
        </div>
    )
}
