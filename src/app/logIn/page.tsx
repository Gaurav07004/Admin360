'use client'
import { useState } from 'react'; // Import useState
import Image from 'next/image'
import login from '@/Assets/login_1.png'
import { FiAtSign, FiUserCheck } from 'react-icons/fi'; // Import icons for email and Password
import { MdErrorOutline } from 'react-icons/md'; // Import error icon
import { AiOutlineCheckCircle } from 'react-icons/ai'; // Import success icon

const Login = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        Password: '',
    });
    const [emailStatus, setEmailStatus] = useState<'valid' | 'invalid' | null>(null);
    const [PasswordStatus, setPasswordStatus] = useState<'valid' | 'invalid' | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "Password") {
            if (value.trim() === '') {
                setPasswordStatus(null);
            } else if (value.length < 8 || value.length > 12) {
                setPasswordStatus('invalid');
            } else {
                setPasswordStatus('valid');
            }
        }

        if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value.trim() === '') {
                setEmailStatus(null);
            } else {
                setEmailStatus(emailRegex.test(value) ? 'valid' : 'invalid');
            }
        }

        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to backend
        console.log('Form Submitted:', form);
    };

    return (
        <div className="flex justify-between items-center w-full bg-gradient-to-l from-sky-600 to-teal-700">
            <div className="w-[60%] h-screen flex items-center justify-center relative">
                <Image
                    src={login}
                    alt="Login Image"
                    width={500}
                    height={500}
                    objectFit="cover"
                    className="z-0"
                />
            </div>
            <div className="w-[40%] h-[42.7rem] flex justify-center items-center bg-white mr-3 rounded-[1rem]">
                <div className="w-4/5 p-4 space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Sign In</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <p className="text-sm font-semibold text-[#5e6574] mb-[0.3rem]">Username</p>
                        <div className="relative">
                            <FiAtSign className="absolute left-3 top-[1rem] text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Username"
                                autoComplete="off"
                                className="w-full p-3 pl-10 border-2 border-gray-300 rounded-[0.5rem] text-gray-500 placeholder:text-sm text-sm focus:outline-none"
                            />
                            {emailStatus === 'invalid' && (
                                <MdErrorOutline className="absolute right-3 top-[1rem] text-red-500 w-5 h-5" />
                            )}
                            {emailStatus === 'valid' && (
                                <AiOutlineCheckCircle className="absolute right-3 top-[1rem] text-green-500 w-5 h-5" />
                            )}
                        </div>
                        <p className="text-sm font-semibold text-[#5e6574] mb-[0.3rem]">Password</p>
                        <div className="relative">
                            <FiUserCheck className="absolute left-3 top-[1rem] text-gray-400" />
                            <input
                                type="text"
                                name="Password"
                                value={form.Password}
                                onChange={handleChange}
                                placeholder="Password"
                                autoComplete="off"
                                className="w-full p-3 pl-10 border-2 border-gray-300 rounded-[0.5rem] text-gray-500 placeholder:text-sm text-sm focus:outline-none"
                            />
                            {PasswordStatus === 'invalid' && (
                                <MdErrorOutline className="absolute right-3 top-[1rem] text-red-500 w-5 h-5" />
                            )}
                            {PasswordStatus === 'valid' && (
                                <AiOutlineCheckCircle className="absolute right-3 top-[1rem] text-green-500 w-5 h-5" />
                            )}
                        </div>
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

export default Login;
