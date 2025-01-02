/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDrawerStatus, updateCustomerStatus, setCustomer } from "@/redux/slices/customerSlice";
import { RootState } from "@/redux/store";
import { HiArrowLongRight } from "react-icons/hi2";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { Divider, toast } from 'keep-react';
import Image from "next/image";
import profilePic from "@/Assets/profile_empty.jpg";
import { PiCircleFill, PiPhoneCallLight } from "react-icons/pi";
import { IoMailOutline } from "react-icons/io5";
import { Timeline, TimelineContent, TimelineItem, TimelinePoint } from "keep-react";
import empty from '@/Assets/Empty.png';
import { PiCheckBold } from "react-icons/pi";
import { useRouter } from "next/navigation";


const CustomerDetailPage: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { drawerStatus, selectedCustomer } = useSelector((state: RootState) => state.customer);
    const { adminData } = useSelector((state: RootState) => state.user);
    const drawerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const data = [
        { label: "Total Order", value: selectedCustomer?.order },
        { label: "Order Delivered", value: selectedCustomer?.delivered },
        { label: "Order Cancelled", value: selectedCustomer?.cancelled },
        { label: "Order Pending", value: selectedCustomer?.pending },
    ];

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

    const recentOrder = selectedCustomer?.Recent_Orders?.map(order => ({
        title: order?.title,
        status: order?.status,
        date: order?.date,
        time: order?.time,
        description: order?.description,
        courier: order?.courier,
        warehouse: order?.warehouse,
        estimatedDelivery: order?.estimatedDelivery,
    })) || [];

    const handleToggle = () => {
        dispatch(setDrawerStatus(false));
    };

    const handleStatusChange = async (customerID: string, customerStatus: string) => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            toast.error("Authentication is missing. Redirecting to login.", { position: "top-right" });
            setTimeout(() => router.push("/"), 1000);
            return;
        }

        if (adminData.adminID === 'AD82914') {
            toast.error("You are not authorized to update this account.", { position: "top-right" });
            return;
        }

        const newStatus = customerStatus === "Active" ? "Inactive" : "Active";

        try {
            const response = await fetch(`/api/auth/updateCustomer`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ customerID, customerStatus: newStatus }),
            });

            if (!response.ok) {
                const errorMessage =
                    response.status === 401
                        ? "Session expired. Please log in again."
                        : `Failed to update status: ${response.statusText}`;
                toast.error(errorMessage, { position: "top-right" });
                setTimeout(() => router.push("/"), 1000);
                throw new Error(errorMessage);
            }

            dispatch(updateCustomerStatus({ customerID, customerStatus: newStatus }));
            toast.success(`Customer status updated to ${newStatus}.`, { position: "top-right" });

            const customerResponse = await fetch(`/api/auth/customer`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!customerResponse.ok) {
                const errorMessage =
                    customerResponse.status === 401
                        ? "Session expired. Please log in again."
                        : `Unable to connect. Please try again in a few moments`;

                toast.error(errorMessage, { position: "top-right" });
                setTimeout(() => router.push("/"), 1000);
                throw new Error(errorMessage);
            }

            const customerData = await customerResponse.json();
            dispatch(setCustomer(customerData));
            dispatch(setDrawerStatus(false));

        } catch (error: any) {
            toast.error("Unable to connect. Please check your network.", { position: "top-right" });
            setTimeout(() => router.push("/"), 1000);
            console.error("Error in handleStatusChange:", error);
        }
    };


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
                {selectedCustomer?.customerStatus !== 'Inactive' ?
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
                                    {isToday &&
                                        <PiCheckBold className="text-[0.6rem] text-green-600 absolute top-[0.2rem] -left-[0.3rem]" />
                                    }
                                    <TimelineContent>
                                        <div className="text-[0.9rem] font-semibold text-gray-600  dark:text-gray-300 flex items-center gap-2">
                                            <span>{event.title}</span>
                                            <span
                                                className={`text-[0.65rem] w-fit uppercase flex items-center justify-center rounded-md px-2 py-1 cursor-pointer transition-colors ${isTodayOrPast
                                                    ? event.status === "Completed"
                                                        ? "bg-green-100 text-green-500 hover:bg-green-200 over:bg-green-200 dark:bg-green-900 dark:text-green-400 dark:hover:bg-green-800"
                                                        : "bg-red-100 text-red-500 hover:bg-red-200 over:bg-red-200 dark:bg-red-900 dark:text-red-400 dark:hover:bg-red-800"
                                                    : "bg-red-100 text-red-500 hover:bg-red-200 cursor-not-allowed over:bg-red-200 dark:bg-red-900 dark:text-red-400 dark:hover:bg-red-800"
                                                    }`}
                                            >
                                                {isTodayOrPast ? event.status : "Pending"}
                                            </span>
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
                    :
                    <div className="flex flex-col items-center justify-center m-4">
                        <div className="mb-4">
                            <Image
                                src={empty}
                                height={200}
                                width={300}
                                alt="No Data"
                                className="opacity-75"
                            />
                        </div>
                        <h2 className="text-xl font-semibold mb-2 text-gray-700">No Data Available</h2>
                        <p className="text-gray-500 mb-6 text-xs text-center">
                            It looks like there are no orders available because this customer is currently inactive. Please check back later or contact support for further assistance.
                        </p>
                    </div>
                }
            </section>
        );
    };

    const renderCustomerPreview = () => (
        <section className="flex items-center justify-between sticky top-0 z-10 bg-white p-4 border-b-[0.5px] border-gray-200 dark:border-gray-500 dark:bg-[#263445]">
            <div className="flex items-center space-x-2">
                <div className="text-gray-600  dark:text-gray-300 text-[0.9rem] font-semibold tracking-wide uppercase">Customer Preview</div>
                <TfiLayoutLineSolid className="text-gray-600  dark:text-gray-300 text-[0.9rem] font-semibold tracking-wide rotate-90" />
                <div className="text-gray-600  dark:text-gray-300 text-[0.9rem] font-semibold tracking-wide">#{selectedCustomer?.customerID}</div>
            </div>
            <div
                className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-500 hover:bg-orange-100 dark:hover:bg-gray-400 rounded-lg transition duration-300"
                onClick={handleToggle}
            >
                <HiArrowLongRight className="w-5 h-5 text-gray-500 dark:text-gray-900" />
            </div>
        </section>
    );

    const renderCustomerInfo = () => (
        <div className="flex flex-col justify-between border border-gray-300 dark:border-gray-500 rounded-lg m-5">
            <div className="flex items-center p-4 border-b-[0.5px] border-gray-300 dark:border-gray-500">
                <Image
                    src={selectedCustomer?.profileImage || profilePic}
                    alt="Profile Picture"
                    className="w-16 h-16 object-cover rounded-full shadow-md"
                    width={64}
                    height={64}
                />
                <div className="ml-4">
                    <div className="flex items-center justify-between w-fit">
                        <div className="text-gray-600  dark:text-gray-300 text-base font-semibold">{selectedCustomer?.customerName}</div>
                        <div className="ml-4">
                            <span
                                className={`relative text-[0.6rem] w-fit uppercase flex items-center justify-center rounded-md px-2 py-1 cursor-pointer transition-colors 
                                ${selectedCustomer?.customerStatus === "Active"
                                        ? "bg-green-100 text-green-500 hover:bg-green-200 dark:bg-green-900 dark:text-green-400 dark:hover:bg-green-800"
                                        : "bg-red-100 text-red-500 hover:bg-red-200 dark:bg-red-900 dark:text-red-400 dark:hover:bg-red-800"
                                    }`}
                                onClick={() =>
                                    selectedCustomer?.customerID &&
                                    selectedCustomer?.customerStatus &&
                                    handleStatusChange(
                                        selectedCustomer.customerID,
                                        selectedCustomer.customerStatus
                                    )
                                }
                            >
                                {selectedCustomer?.customerStatus}
                            </span>

                        </div>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-300 mt-1 space-x-3">
                        <div className="flex items-center space-x-2">
                            <IoMailOutline className="w-5 h-5 text-gray-400" />
                            <span className="text-sm">{selectedCustomer?.email}</span>
                        </div>
                        <PiCircleFill className="w-1 h-1 text-gray-400 dark:text-gray-300" />
                        <div className="flex items-center space-x-2">
                            <PiPhoneCallLight className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                            <span className="text-sm">{selectedCustomer?.mobileNumber}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-4 text-gray-500 uppercase">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className={`flex flex-col p-3 ${index !== data.length - 1 ? "border-r-[0.5px] border-gray-300 dark:border-gray-500" : ""
                            } hover:bg-gray-100 dark:hover:bg-gray-600 transition`}
                    >
                        <span className="text-[0.65rem] font-semibold text-gray-600 dark:text-gray-300">{item.label}</span>
                        <span className="text-sm font-semibold mt-2 dark:text-gray-300">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderCustomerDetails = () => {
        return (
            <div className="m-5">
                <div className="text-[#FF6500] font-semibold text-xs mb-4 uppercase">Customer Details</div>
                <div className="grid grid-cols-2 gap-5 my-4">
                    {customerDetails.map((detail, index) => (
                        <div key={index}>
                            <div className="flex items-center justify-between">
                                <span className="w-1/2 text-[0.75rem] font-semibold text-gray-600  dark:text-gray-300">{detail.label}</span>
                                <div className={`text-xs font-semibold text-gray-600  dark:text-gray-300 ${detail.label === "Email" || detail.label === "Phone" ? 'text-orange-400' : ""}`}>
                                    <span>{detail.value || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderPreview = () => (
        <section className="sticky bottom-0 z-10 bg-white w-full h-7 dark:bg-[#263445]"></section>
    );

    useEffect(() => {
    }, [selectedCustomer]);

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
                className={`fixed top-3 bottom-3 right-3 w-full max-w-[32rem] rounded-xl bg-white dark:bg-[#263445] text-black transform overflow-auto ${drawerStatus ? 'translate-x-0' : 'translate-x-full'
                    } transition-transform duration-500 ease-in-out z-20`}
            >
                {renderCustomerPreview()}
                <div className="overflow-auto ">
                    {renderCustomerInfo()}
                    <Divider className="border-t-[0.5px] border-gray-200 dark:border-gray-500 mt-4" />
                    {renderCustomerDetails()}
                    <Divider className="border-t-[0.5px] border-gray-200 dark:border-gray-500 mt-4" />
                    {TimelineComponent()}
                </div>
                {renderPreview()}
            </div>
        </>
    );
};

export default CustomerDetailPage;
