/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDrawerStatus } from "@/redux/slices/customerSlice";
import { RootState } from "@/redux/store";
import { HiArrowLongRight } from "react-icons/hi2";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { Divider, Badge } from 'keep-react'
import Image from "next/image";
import profilePic from "@/Assets/Profile.jpg";
import { PiCircleFill, PiPhoneCallLight } from "react-icons/pi";
import { IoMailOutline } from "react-icons/io5";

interface Customer {
    id: number;
    name: string;
    email: string;
    details: string;
}

const customers: Customer[] = [
    { id: 1, name: "John Doe", email: "john@example.com", details: "Customer details for John Doe" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", details: "Customer details for Jane Smith" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", details: "Customer details for Alice Johnson" },
];

const CustomerDetailPage: React.FC = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    //const router = useRouter();
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { drawerStatus } = useSelector((state: RootState) => state.customer);

    const drawerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (id) {
            const customerId = Number(id);
            const foundCustomer = customers.find((cust) => cust.id === customerId);
            setCustomer(foundCustomer || null);
        } else {
            setCustomer(null);
        }
        setLoading(false);
    }, [id]);

    const handleToggle = () => {
        dispatch(setDrawerStatus(false));
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    // if (!customer) {
    //     return (
    //         <div className="w-[40%] mx-auto p-4 bg-gray-100 rounded shadow">
    //             <p className="text-red-500">Customer not found.</p>
    //             <button
    //                 className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
    //                 onClick={() => router.push("/customers")}
    //             >
    //                 Back to Customers
    //             </button>
    //         </div>
    //     );
    // }

    return (
        <>
            {drawerStatus && (
                <div
                    ref={overlayRef}
                    className="fixed inset-0 bg-black bg-opacity-50 z-10"
                />
            )}
            <div
                ref={drawerRef}
                className={`fixed top-3 bottom-3 right-3 w-full max-w-[36rem] p-5 rounded-xl bg-white shadow-lg text-black transform ${drawerStatus ? 'translate-x-0' : 'translate-x-full'
                    } transition-transform duration-500 ease-in-out z-20`}
            >
                {/* Header Section */}
                <section className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="text-gray-800 font-semibold text-lg">Customer Preview</div>
                        <TfiLayoutLineSolid className="text-xl text-gray-400 rotate-90" />
                        <div className="text-gray-500 text-sm">1 of 10</div>
                    </div>
                    <div
                        className="flex items-center justify-center w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg transition duration-300"
                        onClick={handleToggle}
                    >
                        <HiArrowLongRight className="w-5 h-5 text-gray-600" />
                    </div>
                </section>
                <Divider className="border-t-[0.5px] border-gray-200 mt-4 -mx-[1.1rem]" />
                {/* <section className="flex flex-col mt-6 space-y-4"> */}
                <div className="flex flex-col mt-6 justify-between border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-center p-4 border-b-[0.5px] border-gray-200">
                        <Image
                            src={profilePic}
                            alt="Profile Picture"
                            className="w-16 h-16 object-cover rounded-full shadow-md"
                            width={64}
                            height={64}
                        />
                        {/* Details */}
                        <div className="ml-4">
                            <div className="flex items-center justify-between w-fit">
                                <div className="text-gray-800 text-base font-semibold">Amit Kumar</div>
                                <div className="ml-4">
                                    <Badge
                                        variant="base"
                                        color="success"
                                        className="text-xs rounded-md mb-[0.15rem] border border-green-300"
                                    >
                                        Active
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex items-center text-gray-500 mt-1 space-x-3">
                                <div className="flex items-center space-x-2">
                                    <IoMailOutline className="w-5 h-5 text-gray-400" />
                                    <span className="text-sm">amit.kumar@gmail.com</span>
                                </div>
                                <PiCircleFill className="w-1 h-1 text-gray-400" />
                                <div className="flex items-center space-x-2">
                                    <PiPhoneCallLight className="w-5 h-5 text-gray-400" />
                                    <span className="text-sm">9768741433</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 text-gray-500 uppercase">
                        <div className="flex flex-col border-r-[0.5px] p-4 border-gray-200">
                            <span className="text-[0.65rem] font-semibold text-gray-400">Total Order</span>
                            <span className="text-[0.8rem] font-semibold mt-2">12</span>
                        </div>
                        <div className="flex flex-col border-r-[0.5px] p-4 border-gray-200">
                            <span className="text-[0.65rem] font-semibold text-gray-400">Total Delivered</span>
                            <span className="text-[0.8rem] font-semibold mt-2">08</span>
                        </div>
                        <div className="flex flex-col border-r-[0.5px] p-4 border-gray-200">
                            <span className="text-[0.65rem] font-semibold text-gray-400">Total Cancelled</span>
                            <span className="text-[0.8rem] font-semibold mt-2">02</span>
                        </div>
                        <div className="flex flex-col p-4">
                            <span className="text-[0.65rem] font-semibold text-gray-400">Total Pending</span>
                            <span className="text-[0.8rem] font-semibold mt-2">02</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomerDetailPage;
