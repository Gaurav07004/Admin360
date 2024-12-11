"use client";

import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDrawerStatus, updateCustomerStatus } from "@/redux/slices/customerSlice";
import { RootState } from "@/redux/store";
import { HiArrowLongRight } from "react-icons/hi2";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { Divider, toast } from 'keep-react';
import Image from "next/image";
import profilePic from "@/Assets/Profile.jpg";
import { PiCircleFill, PiPhoneCallLight } from "react-icons/pi";
import { IoMailOutline } from "react-icons/io5";
import Timeline from "@/components/TimelineComponent";

const CustomerDetailPage: React.FC = () => {
    const dispatch = useDispatch();
    const { drawerStatus, selectedCustomer } = useSelector((state: RootState) => state.customer);
    const drawerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const data = [
        { label: "Total Order", value: selectedCustomer?.order },
        { label: "Total Delivered", value: selectedCustomer?.delivered },
        { label: "Total Cancelled", value: selectedCustomer?.cancelled },
        { label: "Total Pending", value: selectedCustomer?.pending },
    ];

    const handleToggle = () => {
        dispatch(setDrawerStatus(false));
    };

    const handleStatusChange = (customerID: string, customerStatus: string) => {
        const newStatus = customerStatus === 'Active' ? 'Inactive' : 'Active';
        dispatch(updateCustomerStatus({ customerID, customerStatus: newStatus }));
        toast.success(`Customer status updated to ${newStatus}.`);
        dispatch(setDrawerStatus(false));
    };

    const renderCustomerPreview = () => (
        <section className="flex items-center justify-between sticky top-0 z-10 bg-white p-4 border-b-[0.5px] border-gray-200">
            <div className="flex items-center space-x-2">
                <div className="text-[#FF6500] font-semibold text-sm uppercase">Customer Preview</div>
                <TfiLayoutLineSolid className="text-xl text-[#FF6500] rotate-90" />
                <div className="text-[#FF6500] text-sm">1 of 10</div>
            </div>
            <div
                className="flex items-center justify-center w-8 h-8 bg-gray-100 hover:bg-orange-100 rounded-lg transition duration-300"
                onClick={handleToggle}
            >
                <HiArrowLongRight className="w-5 h-5 text-[#FF6500]" />
            </div>
        </section>
    );

    const renderCustomerInfo = () => (
        <div className="flex flex-col justify-between border border-gray-300 rounded-lg m-5">
            <div className="flex items-center p-4 border-b-[0.5px] border-gray-300">
                <Image
                    src={profilePic}
                    alt="Profile Picture"
                    className="w-16 h-16 object-cover rounded-full shadow-md"
                    width={64}
                    height={64}
                />
                <div className="ml-4">
                    <div className="flex items-center justify-between w-fit">
                        <div className="text-gray-800 text-base font-semibold">{selectedCustomer?.customerName}</div>
                        <div className="ml-4">
                            <span
                                className={`text-[0.6rem] w-fit uppercase flex items-center justify-center rounded-md px-2 py-1 cursor-pointer transition-colors ${selectedCustomer?.customerStatus === 'Active' ? "bg-green-100 text-green-500 hover:bg-green-200" : "bg-red-100 text-red-500 hover:bg-red-200"}`}
                                onClick={() => handleStatusChange(selectedCustomer?.customerID, selectedCustomer?.customerStatus)}
                            >
                                {selectedCustomer?.customerStatus}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center text-gray-500 mt-1 space-x-3">
                        <div className="flex items-center space-x-2">
                            <IoMailOutline className="w-5 h-5 text-gray-400" />
                            <span className="text-sm">{selectedCustomer?.email}</span>
                        </div>
                        <PiCircleFill className="w-1 h-1 text-gray-400" />
                        <div className="flex items-center space-x-2">
                            <PiPhoneCallLight className="w-5 h-5 text-gray-400" />
                            <span className="text-sm">{selectedCustomer?.mobileNumber}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-4 text-gray-500 uppercase">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className={`flex flex-col p-4 ${index !== data.length - 1 ? "border-r-[0.5px] border-gray-300" : ""
                            } hover:bg-gray-100 transition`}
                    >
                        <span className="text-[0.65rem] font-semibold text-gray-400">{item.label}</span>
                        <span className="text-sm font-semibold mt-2">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    const customerDetails = [
        { label: 'Customer ID', value: selectedCustomer?.customerID },
        { label: 'Name', value: selectedCustomer?.customerName },
        { label: 'Email', value: selectedCustomer?.email },
        { label: 'Phone', value: selectedCustomer?.mobileNumber },
        { label: 'Location', value: selectedCustomer?.location },
        { label: 'Joined On', value: selectedCustomer?.dateJoined },
        { label: 'Order', value: selectedCustomer?.order },
        { label: 'Status', value: selectedCustomer?.customerStatus },
    ];
    const renderCustomerDetails = () => {
        return (
            <div className="m-5">
                <div className="text-[#FF6500] font-semibold text-xs mb-4 uppercase">Customer Details</div>
                <div className="grid grid-cols-2 gap-5 my-4">
                    {customerDetails.map((detail, index) => (
                        <div key={index}>
                            <div>
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold text-gray-400 uppercase text-[0.65rem]">{detail.label}</span>
                                    <div className={`text-xs ${detail.label === "Email" || detail.label === "Phone" ? 'text-orange-400' : ""}`}>
                                        <span>{detail.value || 'N/A'}</span>
                                    </div>
                                </div>
                                {index < customerDetails.length - 1 && (
                                    <Divider className="border-t-[0.5px] border-gray-300" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderPreview = () => (
        <section className="sticky bottom-0 z-10 bg-white w-full h-7"></section>
    );

    useEffect(() => {
    }, [selectedCustomer]);

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
                className={`fixed top-3 bottom-3 right-3 w-full max-w-[36rem] rounded-xl bg-white shadow-lg text-black transform overflow-auto ${drawerStatus ? 'translate-x-0' : 'translate-x-full'
                    } transition-transform duration-500 ease-in-out z-20`}
            >
                {renderCustomerPreview()}
                <div className="overflow-auto ">
                    {renderCustomerInfo()}
                    <Divider className="border-t-[0.5px] border-gray-200 mt-4" />
                    {renderCustomerDetails()}
                    <Divider className="border-t-[0.5px] border-gray-200 mt-4" />
                    <Timeline />
                </div>
                {renderPreview()}
            </div>
        </>
    );
};

export default CustomerDetailPage;
