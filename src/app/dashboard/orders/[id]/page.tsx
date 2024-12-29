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
import empty from "@/Assets/Product_Empty.jpg"


const CustomerDetailPage: React.FC = () => {
    const dispatch = useDispatch();
    const { drawerStatus, selectedOrder } = useSelector((state: RootState) => state.order);
    const drawerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const data = [
        { label: "Created at", value: selectedOrder?.orderDate },
        { label: "Delivery Services", value: selectedOrder?.courier },
        { label: "Payment method", value: selectedOrder?.paymentMethod },
        { label: "Order Status", value: selectedOrder?.orderStatus },
    ];

    const data_customer = [
        { label: "Customer Name", value: selectedOrder?.customerName },
        { label: "Email", value: selectedOrder?.courier },
        { label: "Phone Number", value: selectedOrder?.customerPhone },
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

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            weekday: "short", month: "short", day: "numeric", year: "numeric"
        });
    }

    const TimelineComponent = () => {
        const currentDateTime = new Date();
        const currentDate = currentDateTime.toISOString().split("T")[0];
        const currentTime = currentDateTime.toTimeString().split(" ")[0].slice(0, 5);

        return (
            <section className="p-4">
                <div className="text-[#FF6500] font-bold text-xs mb-4 uppercase">Order Timeline</div>
                <Timeline className="border-dashed border-l-[2px] m-4 border-orange-300 dark:border-orange-300">
                    {recentOrder.map((event, index) => {
                        const isTodayOrPast = new Date(`${event.date} ${event.time}`) < new Date(`${currentDate} ${currentTime}`);
                        const isToday = event.date <= currentDate;

                        return (
                            <TimelineItem key={index} className="mb-6 relative">
                                <TimelinePoint
                                    className={`border-2 
                                            ${isToday ? "border-green-500 dark:border-green-500  bg-green-200 dark:bg-green-200" : "border-orange-400 dark:border-orange-400 bg-orange-100 dark:bg-orange-100"}
                                            w-[1.05rem] h-[1.05rem] rounded-full shadow-lg flex items-center justify-center`}
                                />
                                {isToday && <PiCheckBold className="text-[0.6rem] text-green-600 absolute top-[0.2rem] -left-[0.3rem]" />}
                                <TimelineContent>
                                    <div className="text-[0.9rem] font-semibold text-gray-600 dark:text-gray-300 flex items-center gap-2">
                                        <span>{event.title}</span>
                                    </div>
                                    <p className="text-[0.65rem] font-normal text-gray-500 dark:text-gray-400 uppercase">
                                        {isTodayOrPast
                                            ? `${formatDate(event.date)} at ${event.time}`
                                            : "Expected on " +
                                            `${formatDate(event.date)} at ${event.time}`}
                                    </p>

                                    {isTodayOrPast && <p className="text-[0.8rem] font-normal text-gray-600  dark:text-gray-400">{event.description}</p>}

                                    {event.courier && isTodayOrPast && (
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            <strong>Courier:</strong> {event.courier}
                                        </p>
                                    )}
                                    {event.warehouse && isTodayOrPast && (
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
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

    const renderCustomerPreview = () => (
        <section className="flex items-center justify-between sticky top-0 z-10 bg-white dark:bg-[#263445] p-4 border-b-[0.5px] border-gray-200 dark:border-gray-500">
            <div className="flex flex-col justify-normal items-start">
                <div className="text-gray-600 dark:text-gray-300 text-[1.2rem] font-semibold uppercase tracking-wide">#{selectedOrder?.orderID}</div>
                <div className="text-[0.7rem] font-medium text-slate-600 dark:text-gray-300">Order details</div>
            </div>
            <div
                className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-500 hover:bg-orange-100 dark:hover:bg-gray-400 rounded-lg transition duration-300"
                onClick={() => { dispatch(setDrawerStatus(false)); }}
            >
                <HiArrowLongRight className="w-5 h-5 text-gray-500 dark:text-gray-900" />
            </div>
        </section>
    );

    const renderCustomerInfo = () => {
        return (
            <>
                <div className="p-4 bg-white dark:bg-[#263445] rounded-lg">
                    <div className="text-[#FF6500] font-bold text-xs mb-4 uppercase">Items</div>
                    <div className="flex justify-between w-full items-center">
                        <div className="space-x-3 flex items-center w-fit">
                            <Image
                                src={selectedOrder?.itemImage || empty}
                                alt="Profile Picture"
                                className="w-16 h-16 object-contain rounded-lg border-[2.5px] border-gray-200  p-1 bg-slate-100 dark:bg-slate-200"
                                width={0}
                                height={0}
                            />
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{selectedOrder?.itemName}</h3>
                                <p className="text-[0.8rem] font-medium text-slate-500 dark:text-gray-400">Fashion</p>
                            </div>
                        </div>
                        <p className="text-[0.8rem] font-medium text-slate-500 dark:text-gray-400 w-[3rem]">1 pcs</p>
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-300 w-[5rem]">₹{selectedOrder?.cost}</p>
                    </div>
                </div>
                <Divider className="border-t-[0.5px] border-gray-200 dark:border-gray-500 mt-2" />
                <div className="flex flex-col text-gray-500">
                    {data.map((item, index) => {
                        const statusClasses: Record<string, string> = {
                            Delivered:
                                "bg-green-100 dark:bg-green-900 text-green-500 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800 px-2 py-1 w-fit",
                            Pending:
                                "bg-yellow-100 dark:bg-yellow-900 text-yellow-500 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-800 px-2 py-1 w-fit",
                            Cancelled:
                                "bg-red-100 dark:bg-red-900 text-red-500 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 px-2 py-1 w-fit",
                            Unreachable:
                                "bg-red-100 dark:bg-red-900 text-red-500 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 px-2 py-1 w-fit",
                            Shipped:
                                "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 px-2 py-1 w-fit",
                        };

                        const statusClass = statusClasses[item.value || "Pending"];

                        return (
                            <div
                                key={index}
                                className="grid grid-cols-2 items-center w-full py-3 px-4 gap-4"
                            >
                                <span className="text-[0.9rem] font-medium text-slate-500 dark:text-gray-300">
                                    {item.label}
                                </span>
                                <span
                                    className={`text-[0.8rem] font-semibold text-gray-800 dark:text-gray-400 rounded-md ${statusClass}`}
                                >
                                    {item.value || "Pending"}
                                </span>
                            </div>
                        );
                    })}
                </div>
                <Divider className="border-t-[0.5px] border-gray-200 dark:border-gray-500 mt-2" />
                <div className="flex flex-col text-gray-500 dark:text-gray-300">
                    {data_customer.map((item, index) => (
                        <div
                            key={index}
                            className={`grid grid-cols-2 items-center w-full py-3 px-4 gap-4`}
                        >
                            <span className="w-1/2 text-[0.9rem] font-medium text-slate-500 dark:text-gray-300">{item.label}</span>
                            <span className="w-1/2 text-[0.8rem] font-semibold text-gray-800 dark:text-gray-400">{item.value}</span>
                        </div>
                    ))}
                </div>
            </>
        );
    };

    const renderPaymentInfo = () => {
        const shiping = 100.25;
        const subTotal = selectedOrder?.cost ? selectedOrder.cost - shiping : 0;

        return (
            <>
                <div className="p-4 bg-white dark:bg-[#263445] rounded-lg">
                    <div className="text-[#FF6500] font-bold text-xs mb-4 uppercase">Payment</div>
                    <div className="flex flex-col">
                        {[
                            { title: 'Sub Total', value: subTotal },
                            { title: 'Shipping Charge', value: shiping },
                            { title: 'Total', value: selectedOrder?.cost || 0 },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className={`flex items-center justify-between w-full py-2`}
                            >
                                <span className="w-1/2 text-[0.9rem] font-medium text-slate-500 dark:text-gray-300">
                                    {item.title}
                                </span>
                                <span className="w-1/2 text-[0.8rem] font-semibold text-gray-800 dark:text-gray-400">
                                    ₹{item.value.toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    };


    const renderPreview = () => (
        <section className="sticky bottom-0 z-10 bg-white dark:bg-[#263445] w-full h-7"></section>
    );

    useEffect(() => {
    }, [selectedOrder]);

    return (
        <>
            {drawerStatus && (
                <div
                    ref={overlayRef}
                    className="fixed inset-0 bg-black bg-opacity-20 z-10"
                />
            )}
            <div
                ref={drawerRef}
                className={`fixed top-3 bottom-3 right-3 w-full max-w-[30rem] rounded-xl bg-white dark:bg-[#263445] shadow-md text-black transform overflow-auto ${drawerStatus ? 'translate-x-0' : 'translate-x-full'
                    } transition-transform duration-500 ease-in-out z-20`}
            >
                {renderCustomerPreview()}
                <div className="overflow-auto ">
                    {renderCustomerInfo()}
                    <Divider className="border-t-[0.5px] border-gray-200 dark:border-gray-500 mt-2" />
                    {TimelineComponent()}
                    <Divider className="border-t-[0.5px] border-gray-200 dark:border-gray-500 mt-2" />
                    {renderPaymentInfo()}
                </div>
                {renderPreview()}
            </div>
        </>
    );
};

export default CustomerDetailPage;
