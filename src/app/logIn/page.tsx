import Image from 'next/image'
import React from 'react'
import login from '@/Assets/login.png'

const Login = () => {
    return (
        <div className="h-screen flex">
            {/* Left side image */}
            <div className="w-1/2 h-full bg-gray-200 flex items-center justify-center">
                <Image
                    src={login}
                    alt="Login Image"
                    width={500}
                    height={500}
                    objectFit="cover"
                />
            </div>

            {/* Right side form */}
            <div className="w-1/2 h-full flex justify-center items-center bg-white">
                <div className="w-4/5 max-w-sm p-8 space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Sign In</h2>
                    <form className="space-y-4">
                        {/* Username Field */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                required
                                className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your username"
                            />
                        </div>
                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password"
                            />
                        </div>
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Login
                        </button>
                    </form>
                    <div className="flex justify-between items-center">
                        <a href="#" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
                        <a href="#" className="text-sm text-blue-600 hover:underline">Create an account</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
