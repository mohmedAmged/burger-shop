const steps = [
    { key: 'cart', label: 'Cart' },
    { key: 'checkout', label: 'Checkout' },
    { key: 'summary', label: 'Orders' },
]

export default function HeadrSteps({ currentStep }) {
    const currentIndex = steps.findIndex(s => s.key === currentStep)

    return (
        <ol className="flex w-full max-w-2xl items-center text-sm font-medium sm:text-base mb-10">
            {steps.map((step, index) => {
                const isActive = index === currentIndex
                const isCompleted = index < currentIndex

                return (
                    <li
                        key={step.key}
                        className={`
                            flex items-center md:w-full
                            ${index !== steps.length - 1 ? `
                            after:mx-2
                            after:content-['/']
                            sm:after:content-['']
                            sm:after:mx-6
                            sm:after:h-1
                            sm:after:w-full
                            sm:after:border-b
                            xl:after:mx-10
                            ` : ""}
                            ${isCompleted || isActive ? "after:text-yellow sm:after:border-yellow" : "after:text-white/40 sm:after:border-yellow/30"}
                        `}
                    >
                        <span
                            className={`flex items-center gap-2 font-modern-negra text-xl
                ${isCompleted || isActive ? "text-yellow" : "text-white/40"}
              `}
                        >
                            <svg
                                className="h-4 w-4 sm:h-5 sm:w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>

                            {step.label}
                        </span>
                    </li>
                )
            })}
        </ol>
    )
}
