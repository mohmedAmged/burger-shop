import React from 'react'

export default function SignIn() {
    return (
        <div className='min-h-screen py-28 2xl:px-0 px-5 container mx-auto radial-gradient'>
            <div className=" flex items-center justify-center p-4">
                <div className="max-w-md w-full border border-yellow/20 bg-black/50 rounded-3xl shadow-lg p-8 ">
                    <h2 className="text-3xl font-modern-negra text-white mb-6 text-center sm:text-4xl">Sign In</h2>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium color-white mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 border border-yellow/30 rounded-lg bg-transparent text-sm font-medium text-white focus:outline-none focus:ring-0"
                                placeholder="your@email.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium color-white mb-1">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 border border-yellow/30 rounded-lg bg-transparent text-sm font-medium text-white focus:outline-none focus:ring-0 transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            <span className="ml-2 text-sm text-gray-600">Remember me</span>
                        </label>
                        <a href="#" className="text-sm color-yellow hover:text-indigo-500">Forgot password?</a>
                    </div> */}

                        <button className="flex w-full items-center justify-center rounded-lg bg-color-yellow px-6 py-3 text-lg font-bold text-black hover:opacity-90 cursor-pointer mt-4">
                            Sign In
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-white">
                        Don't have an account?
                        <a href="/sign-up" className="text-white hover:text-yellow font-bold">Sign up</a>
                    </div>
                </div>
            </div>
        </div>

    )
}
