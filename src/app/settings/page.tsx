"use client";

import { useState } from 'react';
import { Button, Divider } from 'keep-react';
import { FiUser, FiAtSign, FiUserCheck, FiSettings } from 'react-icons/fi';
import { VscLock } from "react-icons/vsc";

function Profile() {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="rounded-[1rem] bg-white w-full py-4 px-6">
            <section className='flex items-center justify-between'>
                <section className="mt-0">
                    <h3 className="text-md font-semibold text-[#5e6574]">Role & Permissions</h3>
                    <div className="flex items-center gap-4 bg-gray-50 py-4 rounded-lg">
                        <div className="p-2 bg-[#ff660021] rounded-md text-[#FF6500] border border-[#FF6500] cursor-pointer">
                            <VscLock className="w-5 h-5 text-[#FF6500]" />
                        </div>
                        <div>
                            <p className="text-[#5e6574] text-sm">Role: <span className="font-semibold">Sales Manager</span></p>
                            <p className="text-xs text-gray-500">Full access to all admin functionalities.</p>
                        </div>
                    </div>
                </section>
                <div className='flex items-center justify-between gap-4'>
                    <Button className="py-3 px-6 rounded-[0.5rem] border bg-white border-[#FF6F20] text-[#FF6F20] hover:bg-[#FF6F20] hover:text-white transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#FF6F20] focus:ring-opacity-50">
                        Cancel
                    </Button>
                    <Button className="py-3 px-6 rounded-[0.5rem] bg-[#FF6F20] text-white hover:bg-[#FF6F20CC] transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#FF6F20] focus:ring-opacity-50">
                        Save
                    </Button>
                </div>
            </section>
            <section className='flex items-center justify-between'>
                <form className="space-y-4 mt-4 w-[50%] border border-gray-200 py-4 px-6 rounded-xl">
                    <div className='relative'>
                        <p className="text-md font-semibold text-[#5e6574] mb-[0.15rem]">Admin Information</p>
                        <Divider className='absolute left-3 top-[1rem]' />
                    </div>
                    <div>
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
                    </div>
                    <div>
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
                        </div>
                    </div>
                    <div>
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
                        </div>
                    </div>
                    <section className="mt-4">
                        <h3 className="text-sm font-semibold text-[#5e6574] mb-3">Account Status</h3>
                        <div className="flex items-center gap-4 bg-gray-50 py-1 rounded-lg">
                            <span className="text-green-600 font-semibold">Active</span>
                            <p className="text-sm text-gray-500">Your account is currently active and in good standing.</p>
                        </div>
                    </section>
                    <section className="mt-4">
                        <h3 className="text-sm font-semibold text-[#5e6574]">Admin Settings</h3>
                        <div className="relative flex items-center gap-3 bg-gray-50 py-4 rounded-lg">
                            <FiSettings className="absolute left-3 top-[1.7rem] text-gray-500" />
                            <Button className="py-3 pl-10 pr-4 bg-gray-100 border border-gray-300 rounded-lg text-[#5e6574] hover:bg-gray-200 transition">
                                Manage Settings
                            </Button>
                        </div>
                    </section>
                </form>

            </section>

        </div>
    );
}

export default Profile;
