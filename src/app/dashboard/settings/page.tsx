"use client";

import { useEffect } from 'react'
import { Button, Divider, toast } from 'keep-react';
import { FiUser, FiAtSign, FiUserCheck, FiSettings } from 'react-icons/fi';
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdErrorOutline } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Upload from "@/components/Upload";
import ForgetPassword from "@/components/ForgetPassword"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setForm, setEmailStatus, setModal, } from "@/redux/slices/commonSlice";
import { setAdminData } from '@/redux/slices/adminSlice';

function Profile() {
    const dispatch = useDispatch();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { usernameStatus, form, emailStatus, modal } = useSelector((state: RootState) => state.menu);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("authToken");
            if (!token) {
                toast.error("Token not received. Redirecting to login.", { position: "top-right" });
                setTimeout(() => (window.location.href = "/"), 2000);
                return;
            }

            try {
                const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
                const response = await fetch(`${baseURL}/api/auth/dashboard`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    const [firstName, lastName] = data.admin.name.split(" ");

                    const adminDetails = {
                        email: data.admin.email,
                        adminID: data.admin.adminID,
                        firstName,
                        lastName,
                        role: data.admin.role,
                    };

                    dispatch(setForm({ ...form, ...adminDetails }));
                    dispatch(setAdminData(adminDetails));
                } else {
                    toast.error("Failed to fetch data.", { position: "top-right" });
                }
            } catch (error) {
                console.error("Fetch error:", error);
                toast.error("Unable to connect. Please check your network.", { position: "top-right" });
            }
        };

        fetchData();
    }, [dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "email") {
            dispatch(setEmailStatus(value.trim() === "" ? null : emailRegex.test(value) ? "valid" : "invalid"));
        }
        dispatch(setForm({ ...form, [name]: value }));
    };

    const handleUpdate = async () => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            toast.error("Token not received. Redirecting to login.", { position: "top-right" });
            setTimeout(() => (window.location.href = "/"), 2000);
            return;
        }

        try {
            const fullName = `${form.firstName} ${form.lastName}`;
            const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
            const response = await fetch(`${baseURL}/api/auth/updateAccount`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name: fullName, email: form.email }),
            });

            if (response.ok) {
                // const data = await response.json();
                toast.success("Account updated successfully.", { position: "top-right" });
            } else {
                toast.error("Failed to update account.", { position: "top-right" });
            }
        } catch (error) {
            toast.error("Unable to connect. Please check your network.", { position: "top-right" });
        }
    };

    const toggleModal = () => {
        dispatch(setModal(!modal));
    };

    return (
        <div className="rounded-[1rem] bg-white w-full py-5 px-7">
            <section className='flex items-center justify-between'>
                <section className="mt-0">
                    <h3 className="text-md font-semibold text-[#5e6574]">Admin ID & Permissions</h3>
                    <div className="flex items-center gap-4 bg-gray-50 py-4 rounded-lg">
                        <div className="p-2 bg-[#ff660021] rounded-md text-[#FF6500] cursor-pointer">
                            <MdOutlineAdminPanelSettings className="w-5 h-5 text-[#FF6500]" />
                        </div>
                        <div>
                            <p className="text-[#5e6574] text-sm">Admin ID: <span className="font-semibold">{form.adminID}</span></p>
                            <p className="text-xs text-gray-500">Full access to all admin functionalities.</p>
                        </div>
                    </div>
                </section>
                <div className='flex items-center justify-between gap-4'>
                    {/* <Button className="py-3 px-6 rounded-[0.6rem] border bg-white border-[#FF6F20] text-[#FF6F20] hover:bg-[#FF6F20] hover:text-white transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#FF6F20] focus:ring-opacity-50">
                        Cancel
                    </Button> */}
                    <Button onClick={handleUpdate} className="py-4 px-6 bg-[#ff660021] text-[#FF6500] hover:bg-orange-300 transition duration-200 ease-in-out focus:outline-none">
                        Update
                    </Button>
                </div>
            </section>
            <section className='flex items-start justify-between'>
                <section className="mt-4 w-[60%] border border-gray-300 py-4 px-6 rounded-xl">
                    <form className='space-y-4'>
                        <p className="text-md font-semibold text-[#5e6574] mb-[0.15rem]">Admin Information</p>
                        <Divider className="border-t border-gray-300 mx-[-1.5rem] mt-3" />
                        <p className="text-sm font-semibold text-[#5e6574] mb-[0.3rem]">Admin Role</p>
                        <div className="relative">
                            <FiUserCheck className="absolute left-3 top-[1rem] text-gray-400" />
                            <input
                                type="text"
                                name="username"
                                value={form.role}
                                onChange={handleChange}
                                placeholder="Admin Role"
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
                        <section className="mt-4">
                            <h3 className="text-sm font-semibold text-[#5e6574] mb-3">Account Status</h3>
                            <div className="flex items-center gap-4 bg-gray-50 py-1 rounded-lg">
                                <span className="text-green-600 py-1 px-4 bg-green-100 rounded-lg border border-[#86efac] text-sm">Active</span>
                                <p className="text-sm text-gray-500">Your account is currently active and in good standing.</p>
                            </div>
                        </section>
                    </form>
                    <section className="mt-4">
                        <h3 className="text-sm font-semibold text-[#5e6574]">Admin Settings</h3>
                        <div className="relative flex items-center gap-3 bg-gray-50 py-4 rounded-lg" onClick={toggleModal}>
                            <FiSettings className="absolute left-3 top-[1.7rem] text-[#FF6500]" />
                            <Button className="py-2 pl-9 pr-4 bg-[#ff660021] text-[#FF6500] hover:bg-[#ff660021]">Forgot Password</Button>
                        </div>
                    </section>
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
