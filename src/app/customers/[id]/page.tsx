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
import Timeline from "@/components/TimelineComponent"

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
    const data = [
        { label: "Total Order", value: "12" },
        { label: "Total Delivered", value: "08" },
        { label: "Total Cancelled", value: "02" },
        { label: "Total Pending", value: "02" },
    ];

    const customerDetails = [
        { label: "Customer ID", value: "C001" },
        { label: "Customer Name", value: "Amit Kumar" },
        { label: "Email", value: "amit.kumar@gmail.com", link: "amit.kumar@gmail.com" },
        { label: "Contact Number", value: "9768741433", link: "9768741433" },
    ];

    const details = [
        { label: "Order", value: "12" },
        { label: "Location", value: "Delhi, India" },
        { label: "Date Joined", value: "Jan 15, 2024" },
        { label: "Customer Status", value: "Active" }
    ];

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
                className={`fixed top-3 bottom-3 right-3 w-full max-w-[36rem] p-5 rounded-xl bg-white shadow-lg text-black transform overflow-auto ${drawerStatus ? 'translate-x-0' : 'translate-x-full'
                    } transition-transform duration-500 ease-in-out z-20`}
            >
                <section className="flex items-center justify-between ">
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

                {/* Main scrollable content */}
                <div className="flex flex-col my-6 justify-between border border-gray-200 rounded-lg shadow-sm"> {/* Add overflow-auto here */}
                    <div className="flex items-center p-4 border-b-[0.5px] border-gray-200">
                        <Image
                            src={profilePic}
                            alt="Profile Picture"
                            className="w-16 h-16 object-cover rounded-full shadow-md"
                            width={64}
                            height={64}
                        />
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
                        {data.map((item, index) => (
                            <div
                                key={index}
                                className={`flex flex-col p-4 ${index !== data.length - 1 ? "border-r-[0.5px] border-gray-200" : ""
                                    } hover:bg-gray-50 transition`}
                            >
                                <span className="text-[0.65rem] font-semibold text-gray-400">{item.label}</span>
                                <span className="text-[0.8rem] font-semibold mt-2">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <Divider className="border-t-[0.5px] border-gray-200 mt-4 -mx-[1.1rem]" />
                <div className="my-4">
                    <div className="text-gray-500 font-semibold text-sm">Customer Details</div>
                    <div className="grid grid-cols-2 gap-8 my-4 text-xs">
                        <div className="space-y-4">
                            {customerDetails.map((item, index) => (
                                <div key={index}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold text-gray-400">{item.label}</span>
                                        <div className="space-y-1">
                                            {item.link ? (
                                                <a href={item.link} className="text-blue-500 hover:underline">
                                                    {item.value}
                                                </a>
                                            ) : (
                                                <span>{item.value}</span>
                                            )}
                                        </div>
                                    </div>
                                    {index !== customerDetails.length - 1 ? (
                                        <Divider className="border-t-[0.5px] border-gray-200" />
                                    ) : null}
                                </div>
                            ))}
                        </div>
                        <div className="space-y-4">
                            {details.map((item, index) => (
                                <div key={index}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold text-gray-400">{item.label}</span>
                                        <div className="space-y-1">
                                            <span>{item.value}</span>
                                        </div>
                                    </div>
                                    {index !== customerDetails.length - 1 ? (
                                        <Divider className="border-t-[0.5px] border-gray-200" />
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Divider className="border-t-[0.5px] border-gray-200 mt-4 -mx-[1.1rem]" />
                <Timeline />
            </div>

        </>
    );
};

export default CustomerDetailPage;
