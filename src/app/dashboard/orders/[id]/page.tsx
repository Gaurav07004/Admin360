"use client";

import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDrawerStatus } from "@/redux/slices/orderSlice";
import { RootState } from "@/redux/store";
import { HiArrowLongRight } from "react-icons/hi2";
import { Divider } from 'keep-react';
import Image from "next/image";
import { Timeline, TimelineContent, TimelineItem, TimelinePoint } from "keep-react";
import { PiCheckBold } from "react-icons/pi";


const CustomerDetailPage: React.FC = () => {
    const dispatch = useDispatch();
    const { drawerStatus, selectedOrder } = useSelector((state: RootState) => state.order);
    const drawerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const data = [
        { label: "Order Item", value: selectedOrder?.itemName || 'Dell Inspiron 15 Laptop' },
        { label: "Courier", value: selectedOrder?.courier || 'ups.R.Gosling ' },
        { label: "Order Date", value: selectedOrder?.orderDate || '12 Dec 2024' },
        { label: "Address", value: selectedOrder?.deliveryAddress || '4517 Washington Ave. Manchester, Kentuc...' },
    ];

    const recentOrder = selectedOrder?.Recent_Orders?.map(order => ({
        title: order?.title,
        status: order?.status,
        date: order?.date,
        time: order?.time,
        description: order?.description,
        courier: order?.courier,
        warehouse: order?.warehouse,
        estimatedDelivery: order?.estimatedDelivery,
    })) || [];

    const TimelineComponent = () => {
        const currentDateTime = new Date();
        const currentDate = currentDateTime.toISOString().split("T")[0];
        const currentTime = currentDateTime.toTimeString().split(" ")[0].slice(0, 5);

        const formatDate = (date: string) => {
            return new Date(date).toLocaleDateString("en-US", {
                weekday: "short", month: "short", day: "numeric", year: "numeric"
            });
        }

        return (
            <section className="p-4">
                <div className="text-[#FF6500] font-semibold text-xs mb-4 uppercase">Recent Orders</div>
                <Timeline className="border-dashed border-l-[2px] m-4 border-orange-300">
                    {recentOrder.map((event, index) => {
                        const isTodayOrPast = new Date(`${event.date} ${event.time}`) < new Date(`${currentDate} ${currentTime}`);
                        const isToday = event.date <= currentDate;

                        return (
                            <TimelineItem key={index} className="mb-6 relative">
                                <TimelinePoint
                                    className={`border-2 
                                            ${isToday ? "border-green-500 bg-green-200" : "border-orange-400 bg-orange-100"}
                                            w-[1.05rem] h-[1.05rem] rounded-full shadow-lg flex items-center justify-center`}
                                />
                                {isToday && <PiCheckBold className="text-[0.6rem] text-green-600 absolute top-[0.2rem] -left-[0.3rem]" />}
                                <TimelineContent>
                                    <div className="text-[0.9rem] font-semibold text-gray-600 dark:text-white flex items-center gap-2">
                                        <span>{event.title}</span>
                                        {/* <span
                                            className={`text-[0.65rem] w-fit uppercase flex items-center justify-center rounded-md px-2 py-1 cursor-pointer transition-colors ${isTodayOrPast
                                                ? event.status === "Completed"
                                                    ? "bg-green-100 text-green-500 hover:bg-green-200"
                                                    : "bg-red-100 text-red-500 hover:bg-red-200"
                                                : "bg-red-100 text-red-500 hover:bg-red-200 cursor-not-allowed"
                                                }`}
                                        >
                                            {isTodayOrPast ? event.status : "Pending"}
                                        </span> */}
                                    </div>
                                    <p className="text-[0.65rem] font-normal text-gray-500 uppercase">
                                        {isTodayOrPast
                                            ? `${formatDate(event.date)} at ${event.time}`
                                            : "Expected on " +
                                            `${formatDate(event.date)} at ${event.time}`}
                                    </p>

                                    {isTodayOrPast && <p className="text-[0.8rem] font-normal text-gray-600 dark:text-gray-300">{event.description}</p>}

                                    {event.courier && isTodayOrPast && (
                                        <p className="text-xs text-gray-500">
                                            <strong>Courier:</strong> {event.courier}
                                        </p>
                                    )}
                                    {event.warehouse && isTodayOrPast && (
                                        <p className="text-xs text-gray-500">
                                            <strong>Warehouse:</strong> {event.warehouse}
                                        </p>
                                    )}
                                </TimelineContent>
                            </TimelineItem>
                        );
                    })}
                </Timeline>
            </section>
        );
    };

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
                        src={selectedOrder?.itemImage}
                        alt="Profile Picture"
                        className="w-[8rem] h-[6rem] object-contain rounded-md border-[3px] border-gray-200 p-2"
                    />
                    <div className="text-gray-600 text-[1rem] font-semibold">Order ID: {selectedOrder?.orderID}</div>
                </div>
                <div
                    className={`text-[0.7rem] w-fit h-fit uppercase rounded-md px-2 py-2 cursor-pointer transition-colors ${selectedOrder?.orderStatus === 'Delivered' || selectedOrder?.orderStatus === 'Shipped'
                        ? 'bg-green-100 text-green-500 hover:bg-green-200'
                        : 'bg-red-100 text-red-500 hover:bg-red-200'
                        }`}
                    onClick={() => handleStatusChange()}
                >
                    {selectedOrder?.orderStatus}
                </div>

            </div>
            <div className="grid grid-cols-2 text-gray-500">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className={`flex flex-col p-4 hover:bg-gray-100 transition ${item.label === "Order Item" || item.label === "Order Date" ? 'border-r-[0.5px] border-gray-300' : ""} ${item.label === "Order Item" || item.label === "Courier" ? 'border-b-[0.5px] border-gray-300' : ""}`}
                    >
                        <span className="text-xs font-semibold text-gray-400 uppercase">{item.label}</span>
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
    }, [selectedOrder]);

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
                    {TimelineComponent()}
                </div>
                {renderPreview()}
            </div>
        </>
    );
};

export default CustomerDetailPage;
