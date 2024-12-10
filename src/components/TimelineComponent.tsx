"use client";

import { Timeline, TimelineContent, TimelineItem, TimelinePoint } from "keep-react";

const events = [
    {
        title: "Order Placed",
        date: "2024-12-09",
        description: "Your order has been placed. The items were processed and are ready for shipment.",
        status: "Completed",
    },
    {
        title: "Order Confirmed",
        date: "2024-12-10",
        description: "Your order was confirmed and prepared for shipment.",
        status: "Completed",
    },
    {
        title: "Shipped",
        date: "2024-12-11",
        description: "Your order has been shipped. It left the warehouse and is on its way to you.",
        courier: "XYZ Logistics",
        warehouse: "Warehouse XYZ",
        status: "Completed",
    },
    {
        title: "Out for Delivery",
        date: "2024-12-12",
        description: "Your order was out for delivery and arrived on the scheduled date.",
        estimatedDelivery: "Thu, Dec 12, 2024, by 7 PM",
        status: "Completed",
    },
    {
        title: "Delivered",
        date: "2024-12-13",
        description: "Your package was successfully delivered to the provided address.",
        status: "Completed",
    },
    {
        title: "Delivered",
        date: "2024-09-08",
        description: "Your package was successfully delivered to the provided address.",
        status: "Completed",
    },
    {
        title: "Delivered",
        date: "2024-10-10",
        description: "Your package was successfully delivered to the provided address.",
        status: "Completed",
    },
    {
        title: "Delivered",
        date: "2024-11-23",
        description: "Your package was successfully delivered to the provided address.",
        status: "Completed",
    },

];

const TimelineComponent = () => {
    const currentDate = new Date().toISOString().split("T")[0];

    const recentOrders = events.filter(
        (event) =>
            new Date(event.date) >= new Date(currentDate) ||
            (new Date(event.date) < new Date(currentDate) && event.title !== "Delivered")
    );

    const previousOrders = events.filter(
        (event) => new Date(event.date) < new Date(currentDate) && event.title === "Delivered"
    );

    return (
        <section className="p-4">
            <div className="text-[#FF6500] font-semibold text-xs mb-4 uppercase">Recent Order</div>
            <Timeline className="border-l-[1px] m-4 border-orange-300">
                {recentOrders.map((event, index) => {
                    const isTodayOrPast = new Date(event.date) <= new Date(currentDate);
                    const isToday = event.date === currentDate;

                    return (
                        <TimelineItem key={index} className="mb-6 relative">
                            <TimelinePoint
                                className={`border-2 
                                ${isToday ? "border-green-500 bg-green-200" : "border-orange-400 bg-orange-100"}
                                        w-[1.05rem] h-[1.05rem] rounded-full shadow-lg flex items-center justify-center`}
                            />
                            {isToday && <div className="ring-4 ring-green-500 w-[1.05rem] h-[1.05rem] rounded-full absolute -left-[0.55rem] animate-pulse"></div>}
                            <TimelineContent>
                                <div className="text-[0.9rem] font-semibold text-gray-600 dark:text-white flex items-center gap-2">
                                    <span>{event.title}</span>
                                    <span
                                        className={`text-[0.65rem] w-fit uppercase flex items-center justify-center rounded-md px-2 py-1 cursor-pointer transition-colors ${isTodayOrPast
                                            ? event.status === "Completed"
                                                ? "bg-green-100 text-green-500 hover:bg-green-200"
                                                : "bg-red-100 text-red-500 hover:bg-red-200"
                                            : "bg-red-100 text-red-500 hover:bg-red-200 cursor-not-allowed"
                                            }`}
                                    >
                                        {isTodayOrPast ? event.status : "Pending"}
                                    </span>
                                </div>
                                <p className="text-[0.65rem] font-normal text-gray-500 uppercase">
                                    {isTodayOrPast
                                        ? new Date(event.date).toLocaleDateString("en-US", {
                                            weekday: "short",
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })
                                        : "Expected on " +
                                        new Date(event.date).toLocaleDateString("en-US", {
                                            weekday: "short",
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
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

            {/* Display Previous Orders */}
            <div className="mt-8">
                <div className="text-[#FF6500] font-semibold text-xs mb-4 uppercase">Previous Orders</div>
                <Timeline className="border-l-[1px] m-4 border-orange-300">
                    {previousOrders.map((event, index) => (
                        <TimelineItem key={index} className="mb-6 relative">
                            <TimelinePoint
                                className={`border-2 border-orange-400 bg-orange-100 w-[1.05rem] h-[1.05rem] rounded-full shadow-lg flex items-center justify-center`}
                            />
                            <TimelineContent>
                                <div className="text-[0.9rem] font-semibold text-gray-600 dark:text-white flex items-center gap-2">
                                    <span>{event.title}</span>
                                    <span
                                        className={`text-[0.65rem] w-fit uppercase flex items-center justify-center rounded-md px-2 py-1 cursor-pointer transition-colors ${event.status === "Completed"
                                            ? "bg-green-100 text-green-500 hover:bg-green-200"
                                            : "bg-red-100 text-red-500 hover:bg-red-200"
                                            }`}
                                    >
                                        {event.status}
                                    </span>
                                </div>
                                <p className="text-[0.65rem] font-normal text-gray-500 uppercase">
                                    {new Date(event.date).toLocaleDateString("en-US", {
                                        weekday: "short",
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </p>
                                <p className="text-[0.8rem] font-normal text-gray-600 dark:text-gray-300">{event.description}</p>
                            </TimelineContent>
                        </TimelineItem>
                    ))}
                </Timeline>
            </div>
        </section>
    );
};

export default TimelineComponent;
