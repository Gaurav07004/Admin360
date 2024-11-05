"use client";

import { useState } from 'react';
import { Button, Divider } from 'keep-react';
import { FiUser, FiAtSign, FiUserCheck } from 'react-icons/fi';
import { VscLock } from "react-icons/vsc";
import { MdErrorOutline } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Upload from "@/components/Upload";
import ForgetPassword from "@/components/ForgetPassword"

function Profile() {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
    });
    const [emailStatus, setEmailStatus] = useState<'valid' | 'invalid' | null>(null);
    const [usernameStatus, setUsernameStatus] = useState<'valid' | 'invalid' | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "username") {
            if (value.trim() === '') {
                setUsernameStatus(null);
            } else if (value.length < 8 || value.length > 12) {
                setUsernameStatus('invalid');
            } else {
                setUsernameStatus('valid');
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

    return (
        <div className="rounded-[1rem] bg-white w-full py-5 px-7">
            <section className='flex items-center justify-between'>
                <section className="mt-0">
                    <h3 className="text-md font-semibold text-[#5e6574]">Role & Permissions</h3>
                    <div className="flex items-center gap-4 bg-gray-50 py-4 rounded-lg">
                        <div className="p-2 bg-[#ff660021] rounded-md text-[#FF6500] cursor-pointer">
                            <VscLock className="w-5 h-5 text-[#FF6500]" />
                        </div>
                        <div>
                            <p className="text-[#5e6574] text-sm">Role: <span className="font-semibold">Sales Manager</span></p>
                            <p className="text-xs text-gray-500">Full access to all admin functionalities.</p>
                        </div>
                    </div>
                </section>
                <div className='flex items-center justify-between gap-4'>
                    <Button className="py-3 px-6 rounded-[0.6rem] border bg-white border-[#FF6F20] text-[#FF6F20] hover:bg-[#FF6F20] hover:text-white transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#FF6F20] focus:ring-opacity-50">
                        Cancel
                    </Button>
                    <Button className="py-4 px-6 border border-[#FF6F20] bg-[#ff660021] text-[#FF6500] hover:bg-[#ff660021] transition duration-200 ease-in-out focus:outline-none">
                        Save
                    </Button>
                </div>
            </section>
            <section className='flex items-start justify-between'>
                <section className="mt-4 w-[60%] border border-gray-300 py-4 px-6 rounded-xl">
                    <form className='space-y-4'>
                        <p className="text-md font-semibold text-[#5e6574] mb-[0.15rem]">Admin Information</p>
                        <Divider className="border-t border-gray-300 mx-[-1.5rem] mt-3" />
                        <p className="text-sm font-semibold text-[#5e6574] mb-[0.3rem]">Full Name</p>
                        <div className="flex gap-3">
                            <div className="relative w-1/2">
                                <FiUser className="absolute left-3 top-[1rem] text-gray-400" />
                                <input
                                    type="text"
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    placeholder="Enter first name"
                                    autoComplete="off"
                                    className="w-full p-3 pl-10 border-2 border-gray-300 rounded-[0.5rem] text-gray-500 text-sm placeholder:text-sm focus:outline-none"
                                />
                            </div>
                            <div className="relative w-1/2">
                                <FiUser className="absolute left-3 top-[1rem] text-gray-400" />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    placeholder="Enter last name"
                                    autoComplete="off"
                                    className="w-full p-3 pl-10 border-2 border-gray-300 rounded-[0.5rem] text-gray-500 placeholder:text-sm text-sm focus:outline-none"
                                />
                            </div>
                        </div>
                        <p className="text-sm font-semibold text-[#5e6574] mb-[0.3rem]">Email Address</p>
                        <div className="relative">
                            <FiAtSign className="absolute left-3 top-[1rem] text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Email Address"
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
                        <p className="text-sm font-semibold text-[#5e6574] mb-[0.3rem]">Username</p>
                        <div className="relative">
                            <FiUserCheck className="absolute left-3 top-[1rem] text-gray-400" />
                            <input
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                placeholder="Username"
                                autoComplete="off"
                                className="w-full p-3 pl-10 border-2 border-gray-300 rounded-[0.5rem] text-gray-500 placeholder:text-sm text-sm focus:outline-none"
                            />
                            {usernameStatus === 'invalid' && (
                                <MdErrorOutline className="absolute right-3 top-[1rem] text-red-500 w-5 h-5" />
                            )}
                            {usernameStatus === 'valid' && (
                                <AiOutlineCheckCircle className="absolute right-3 top-[1rem] text-green-500 w-5 h-5" />
                            )}
                        </div>
                        <section className="mt-4">
                            <h3 className="text-sm font-semibold text-[#5e6574] mb-3">Account Status</h3>
                            <div className="flex items-center gap-4 bg-gray-50 py-1 rounded-lg">
                                <span className="text-green-600 py-1 px-4 bg-green-100 rounded-lg border border-[#86efac] text-sm">Active</span>
                                <p className="text-sm text-gray-500">Your account is currently active and in good standing.</p>
                            </div>
                        </section>
                    </form>
                    <ForgetPassword />
                </section>
                <section className="w-[30%] mt-4 border border-gray-300 py-4 px-6 rounded-xl">
                    <div>
                        <p className="text-md font-semibold text-[#5e6574] mb-[0.15rem]">Admin Information</p>
                        <Divider className="border-t border-gray-300 mx-[-1.5rem] mt-3 mb-3" />
                    </div>
                    <Upload />
                </section>
            </section>
        </div>
    );
}

export default Profile;
