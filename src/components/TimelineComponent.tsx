"use client";

import { Timeline, TimelineContent, TimelineItem, TimelinePoint } from "keep-react";

// Define an array of events with their respective dates
const events = [
    {
        title: "Order Placed",
        date: "2024-12-09",
        description: "The customer placed an order for 3 items, including a pair of headphones and a gaming mouse."
    },
    {
        title: "Order Confirmed",
        date: "2024-12-10",
        description: "The order has been confirmed and is now being prepared for shipping."
    },
    {
        title: "Order Shipped",
        date: "2024-12-11",
        description: "The order has been shipped via XYZ Logistics and is expected to arrive soon."
    },
    {
        title: "Out for Delivery",
        date: "2024-12-12",
        description: "The order is out for delivery and will arrive at the customers location today."
    },
    {
        title: "Order Delivered",
        date: "2024-12-13",
        description: "The order has been successfully delivered to the customer."
    }
];

const TimelineComponent = () => {
    const currentDate = new Date().toISOString().split("T")[0];

    return (
        <Timeline className="border-l-[1px] m-5 border-orange-300">
            {events.map((event, index) => (
                <TimelineItem key={index}>
                    <TimelinePoint
                        className={`bg-orange-300 border border-orange-500 w-[1.05rem] h-[1.05rem] rounded-full shadow-lg flex items-center justify-center ring-2 ring-orange-400 ${event.date === currentDate ? "animate-pulse" : ""
                            }`}
                    />
                    <TimelineContent>
                        <div className="text-[0.9rem] font-semibold text-gray-600 dark:text-white">
                            {event.title}
                        </div>
                        <p className="text-xs text-metal-400">{new Date(event.date).toLocaleDateString()}</p>
                        <p className="text-[0.8rem] font-normal text-metal-600 dark:text-metal-300">
                            {event.description}
                        </p>
                    </TimelineContent>
                </TimelineItem>
            ))}
        </Timeline>
    );
};

export default TimelineComponent;
