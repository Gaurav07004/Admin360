"use client";

import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDrawerStatus } from "@/redux/slices/orderSlice";
import { RootState } from "@/redux/store";
import { HiArrowLongRight } from "react-icons/hi2";
import { Divider } from 'keep-react';
import Image from "next/image";
import profilePic from "@/Assets/Dell Inspiron 15 Laptop.png";
import Timeline from "@/components/TimelineComponent";

const CustomerDetailPage: React.FC = () => {
    const dispatch = useDispatch();
    const { drawerStatus, selectedCustomer } = useSelector((state: RootState) => state.order);
    const drawerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const data = [
        { label: "Order Item", value: selectedCustomer?.order || 'Dell Inspiron 15 Laptop' },
        { label: "Courier", value: selectedCustomer?.delivered || 'ups.R.Gosling ' },
        { label: "Order Date", value: selectedCustomer?.cancelled || '12 Dec 2024' },
        { label: "Address", value: selectedCustomer?.pending || '4517 Washington Ave. Manchester, Kentuc...' },
    ];

    const handleStatusChange = () => {
        dispatch(setDrawerStatus(false));
    };

    const renderCustomerPreview = () => (
        <section className="flex items-center justify-between sticky top-0 z-10 bg-white p-4 border-b-[0.5px] border-gray-200">
            <div className="flex items-center space-x-2">
                <div className="text-[#FF6500] font-semibold text-sm uppercase">Order Preview</div>
            </div>
            <div
                className="flex items-center justify-center w-8 h-8 bg-gray-100 hover:bg-orange-100 rounded-lg transition duration-300"
                onClick={() => { dispatch(setDrawerStatus(false)); }}
            >
                <HiArrowLongRight className="w-5 h-5 text-[#FF6500]" />
            </div>
        </section>
    );

    const renderCustomerInfo = () => (
        <div className="flex flex-col justify-between border border-gray-300 rounded-lg m-5">
            <div className="flex justify-between p-4 border-b-[0.5px] border-gray-300">
                <div className="flex flex-col items-center gap-2">
                    <Image
                        src={profilePic}
                        alt="Profile Picture"
                        className="w-[8rem] h-[6rem] object-contain rounded-md border-[3px] border-gray-200 p-2"
                    />
                    <div className="text-gray-800 text-lg font-semibold">Order #5913</div>
                </div>
                <div
                    className={`text-[0.7rem] w-fit h-fit uppercase rounded-md px-2 py-2 cursor-pointer transition-colors ${selectedCustomer?.customerStatus === 'Active' ? "bg-green-100 text-green-500 hover:bg-green-200" : "bg-red-100 text-red-500 hover:bg-red-200"}`}
                    onClick={() => handleStatusChange()}
                >
                    Pending
                </div>
            </div>
            <div className="grid grid-cols-2 text-gray-500 uppercase">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className={`flex flex-col p-4 hover:bg-gray-100 transition ${item.label === "Order Item" || item.label === "Order Date" ? 'border-r-[0.5px] border-gray-300' : ""} ${item.label === "Order Item" || item.label === "Courier" ? 'border-b-[0.5px] border-gray-300' : ""}`}
                    >
                        <span className="text-xs font-semibold text-gray-400">{item.label}</span>
                        <span className="text-[0.7rem] font-semibold mt-2">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );

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
                    <Timeline />
                </div>
                {renderPreview()}
            </div>
        </>
    );
};

export default CustomerDetailPage;
