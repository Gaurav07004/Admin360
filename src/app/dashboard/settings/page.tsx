/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button, Divider, toast } from "keep-react";
import { FiUser, FiAtSign, FiUserCheck } from "react-icons/fi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdErrorOutline } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Upload from "@/components/Upload";
import ForgetPassword from "@/components/ForgetPassword";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setEmailStatus, setModal } from "@/redux/slices/commonSlice";
import { setAdminData, setAccountData, deleteFile } from "@/redux/slices/adminSlice";
import { useRouter } from "next/navigation";

function Profile() {
    const dispatch = useDispatch();
    const router = useRouter();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{3,}$/;
    const { usernameStatus, emailStatus, modal } = useSelector((state: RootState) => state.menu);
    const { adminData, imageUrl } = useSelector((state: RootState) => state.user);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "email") {
            dispatch(setEmailStatus(value.trim() === "" ? null : emailRegex.test(value) ? "valid" : "invalid"));
        }
        dispatch(setAdminData({ ...adminData, [name]: value }));
    };

    const handleUpdate = async () => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            toast.error("Authentication is missing. Redirecting to login", { position: "top-right" });
            setTimeout(() => router.push("/"), 2000);
            return;
        }

        if (!emailRegex.test(adminData.email || "")) {
            toast.error("Please enter a valid email address.", { position: "top-right" });
            return;
        }

        const adminDetails = {
            email: adminData.email,
            adminID: adminData.adminID,
            firstName: adminData.firstName,
            lastName: adminData.lastName,
            role: adminData.role,
            profileImage: imageUrl,
        };

        try {
            const updateResponse = await fetch(`/api/auth/updateAccount`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(adminDetails),
            });

            if (!updateResponse.ok) {
                const errorMessage =
                    updateResponse.status === 401
                        ? "Session expired. Please log in again."
                        : `"Unable to connect. Please try again in a few moments"`;
                toast.error(errorMessage, { position: "top-right" });
                setTimeout(() => router.push("/"), 1000);
                return;
            }

            toast.success("Account updated successfully.", { position: "top-right" });
            dispatch(deleteFile());

            const fetchResponse = await fetch(`/api/auth/dashboard`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!fetchResponse.ok) {
                const fetchErrorMessage =
                    fetchResponse.status === 401
                        ? "Session expired. Please log in again."
                        : "Unable to connect. Please try again in a few moments";
                toast.error(fetchErrorMessage, { position: "top-right" });
                setTimeout(() => router.push("/"), 1000);
                return;
            }

            const updatedData = await fetchResponse.json();
            dispatch(setAccountData(updatedData.admin));
        } catch (error: any) {
            toast.error("Unable to connect. Please check your network", { position: "top-right" });
            setTimeout(() => router.push("/"), 1000);
            console.error("Error fetching customer data:", error);
        }
    };


    // const handleUpdate = async () => {
    //     const token = localStorage.getItem("authToken");

    //     if (!token) {
    //         toast.error("Token not received. Redirecting to login.", { position: "top-right" });
    //         setTimeout(() => router.push("/"), 2000);
    //         return;
    //     }

    //     const adminDetails = {
    //         productID: "PD82910",
    //         productImage: imageUrl,
    //     };

    //     try {
    //         const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

    //         const updateResponse = await fetch(`${baseURL}/api/auth/update`, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${token}`,
    //             },
    //             body: JSON.stringify(adminDetails),
    //         });

    //         if (updateResponse.ok) {
    //             toast.success("Account updated successfully.", { position: "top-right" });
    //             dispatch(deleteFile());

    //             // const fetchResponse = await fetch(`${baseURL}/api/auth/dashboard`, {
    //             //     method: "GET",
    //             //     headers: {
    //             //         Authorization: `Bearer ${token}`,
    //             //     },
    //             // });

    //             // if (fetchResponse.ok) {
    //             //     const updatedData = await fetchResponse.json();
    //             //     // dispatch(setAccountData(updatedData.admin));
    //             //     dispatch(setTopProduct(updatedData.topProductData));
    //             // } else {
    //             //     const fetchError = await fetchResponse.json();
    //             //     toast.error(`Failed to fetch updated data: ${fetchError.message || "Unknown error"}`, { position: "top-right" });
    //             // }


    //         } else {
    //             const errorData = await updateResponse.json();
    //             toast.error(`Failed to update account: ${errorData.message || "Unknown error"}`, { position: "top-right" });
    //         }
    //     } catch (error) {
    //         toast.error("Unable to connect. Please check your network.", { position: "top-right" });
    //     }
    // };

    const toggleModal = () => {
        dispatch(setModal(!modal));
    };


    return (
        <div className="rounded-[1rem] bg-white dark:bg-[#263445] w-full py-5 px-7">
            <section className="flex items-center justify-between">
                <section className="mt-0">
                    <h3 className="text-md font-semibold text-[#5e6574] dark:text-gray-300">Admin ID & Permissions</h3>
                    <div className="flex items-center gap-4  py-4 rounded-lg">
                        <div className="p-2 bg-[#ff660021] rounded-md text-[#FF6500] cursor-pointer">
                            <MdOutlineAdminPanelSettings className="w-5 h-5 text-[#FF6500]" />
                        </div>
                        <div>
                            <p className="text-[#5e6574] dark:text-gray-300 text-sm">
                                Admin ID: <span className="font-semibold">{adminData.adminID}</span>
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-300">Full access to all admin functionalities.</p>
                        </div>
                    </div>
                </section>
                <div className="flex items-center justify-between gap-4">
                    <Button className="w-fit py-4 px-6 bg-[#ff660021] text-[#FF6500] hover:bg-orange-300 dark:hover:bg-[#ff660021] transition duration-200 ease-in-out focus:outline-none" onClick={toggleModal}>
                        Change Password
                    </Button>
                    <Button onClick={handleUpdate} className="py-4 px-6 bg-[#ff660021] dark:hover:bg-[#ff660021] text-[#FF6500] hover:bg-orange-300 transition duration-200 ease-in-out focus:outline-none">
                        Update
                    </Button>
                </div>
            </section>
            <section className="flex items-start justify-between">
                <section className="mt-4 w-[60%] border border-gray-300 dark:border-gray-500 py-4 px-6 rounded-xl">
                    <form className="space-y-4">
                        <p className="text-md font-semibold text-[#5e6574] dark:text-gray-300 mb-[0.15rem]">Admin Information</p>
                        <Divider className="border-t border-gray-300 dark:border-gray-500 mx-[-1.5rem] mt-3" />

                        <p className="text-sm font-semibold text-[#5e6574] dark:text-gray-300 mb-[0.3rem]">Admin Role</p>
                        <div className="relative">
                            <FiUserCheck className="absolute left-3 top-[1rem] text-gray-400 dark:text-gray-300" />
                            <input
                                type="text"
                                name="username"
                                value={adminData.role}
                                onChange={handleChange}
                                placeholder="Admin Role"
                                autoComplete="off"
                                className="w-full p-3 pl-10 border-2 dark:border border-gray-300 dark:border-gray-500 dark:bg-gray-700 rounded-[0.5rem] text-gray-500 dark:text-gray-300 placeholder:text-sm text-sm focus:outline-none"
                            />
                            {usernameStatus === "invalid" && <MdErrorOutline className="absolute right-3 top-[1rem] text-red-500 w-5 h-5" />}
                            {usernameStatus === "valid" && <AiOutlineCheckCircle className="absolute right-3 top-[1rem] text-green-500 w-5 h-5" />}
                        </div>

                        <p className="text-sm font-semibold text-[#5e6574] dark:text-gray-300 mb-[0.3rem]">Full Name</p>
                        <div className="flex gap-3">
                            <div className="relative w-1/2">
                                <FiUser className="absolute left-3 top-[1rem] text-gray-400 dark:text-gray-300" />
                                <input
                                    type="text"
                                    name="firstName"
                                    value={adminData.firstName}
                                    onChange={handleChange}
                                    placeholder="Enter first name"
                                    autoComplete="off"
                                    className="w-full p-3 pl-10 border-2 dark:border border-gray-300 dark:border-gray-500 dark:bg-gray-700 rounded-[0.5rem] text-gray-500 dark:text-gray-300 text-sm placeholder:text-sm focus:outline-none"
                                />
                            </div>
                            <div className="relative w-1/2">
                                <FiUser className="absolute left-3 top-[1rem] text-gray-400 dark:text-gray-300" />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={adminData.lastName}
                                    onChange={handleChange}
                                    placeholder="Enter last name"
                                    autoComplete="off"
                                    className="w-full p-3 pl-10 border-2 dark:border border-gray-300 dark:border-gray-500 dark:bg-gray-700 rounded-[0.5rem] text-gray-500 dark:text-gray-300 placeholder:text-sm text-sm focus:outline-none"
                                />
                            </div>
                        </div>

                        <p className="text-sm font-semibold text-[#5e6574] dark:text-gray-300 mb-[0.3rem]">Email Address</p>
                        <div className="relative">
                            <FiAtSign className="absolute left-3 top-[1rem] text-gray-400 dark:text-gray-300" />
                            <input
                                type="email"
                                name="email"
                                value={adminData.email}
                                onChange={handleChange}
                                placeholder="Email Address"
                                autoComplete="off"
                                className="w-full p-3 pl-10 border-2 dark:border border-gray-300 dark:border-gray-500 dark:bg-gray-700 rounded-[0.5rem] text-gray-500 dark:text-gray-300 placeholder:text-sm text-sm focus:outline-none"
                            />
                            {emailStatus === "invalid" && <MdErrorOutline className="absolute right-3 top-[1rem] text-red-500 w-5 h-5" />}
                            {emailStatus === "valid" && <AiOutlineCheckCircle className="absolute right-3 top-[1rem] text-green-500 w-5 h-5" />}
                        </div>

                        <section className="mt-4">
                            <h3 className="text-sm font-semibold text-[#5e6574] dark:text-gray-300 mb-3">Account Status</h3>
                            <div className="flex items-center gap-4 py-1">
                                <span
                                    className={`py-1 px-4 rounded-md text-sm border transition-colors ${adminData.isActive
                                        ? "text-green-600 bg-green-100 border-green-300 dark:text-green-400 dark:bg-green-900 dark:border-green-800"
                                        : "text-red-500 bg-red-100 border-red-200 dark:text-red-400 dark:bg-red-900 dark:border-red-800"
                                        }`}
                                >
                                    {adminData.isActive ? "Active" : "Inactive"}
                                </span>
                                <p className="text-sm text-gray-500 dark:text-gray-300">{adminData.isActive ? "Your account is currently active and in good standing." : "Your account is inactive. Please contact support."}</p>
                            </div>
                        </section>
                    </form>
                </section>
                <ForgetPassword />
                <section className="w-[30%] mt-4 border border-gray-300 dark:border-gray-500 py-4 px-6 rounded-xl">
                    <div>
                        <p className="text-md font-semibold text-[#5e6574] mb-[0.15rem] dark:text-gray-300">Admin Information</p>
                        <Divider className="border-t border-gray-300 dark:border-gray-500 mx-[-1.5rem] mt-3 mb-3" />
                    </div>
                    <Upload />
                </section>
            </section>
        </div>
    );
}

export default Profile;
