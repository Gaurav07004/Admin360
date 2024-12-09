"use client";

import { Timeline, TimelineContent, TimelineItem, TimelinePoint } from "keep-react";

const TimelineComponent = () => {
    return (
        <Timeline className="border-l-[1px] m-5 border-orange-300">
            {/* Order Placed */}
            <TimelineItem>
                <TimelinePoint
                    className="bg-orange-300 border border-orange-500 w-[1.05rem] h-[1.05rem] rounded-full shadow-lg flex items-center justify-center "
                />
                <TimelineContent>
                    <div className="text-[0.9rem] font-semibold text-gray-600 dark:text-white">Order Placed</div>
                    <div className="text-xs text-metal-400">December 1, 2024</div>
                    <div className="text-[0.8rem] font-normal text-metal-600 dark:text-metal-300">
                        The customer placed an order for 3 items, including a pair of headphones and a gaming mouse.
                    </div>
                </TimelineContent>
            </TimelineItem>

            {/* Order Confirmed */}
            <TimelineItem>
                <TimelinePoint
                    className="bg-orange-300 border border-orange-500 w-[1.05rem] h-[1.05rem] rounded-full shadow-lg flex items-center justify-center "
                />
                <TimelineContent>
                    <div className="text-[0.9rem] font-semibold text-gray-600 dark:text-white">Order Confirmed</div>
                    <p className="text-xs text-metal-400">December 2, 2024</p>
                    <p className="text-[0.8rem] font-normal text-metal-600 dark:text-metal-300">
                        The order has been confirmed and is now being prepared for shipping.
                    </p>
                </TimelineContent>
            </TimelineItem>

            {/* Order Shipped */}
            <TimelineItem>
                <TimelinePoint
                    className="bg-orange-300 border border-orange-500 w-[1.05rem] h-[1.05rem] rounded-full shadow-lg flex items-center justify-center "
                />
                <TimelineContent>
                    <div className="text-[0.9rem] font-semibold text-gray-600 dark:text-white">Order Shipped</div>
                    <p className="text-xs text-metal-400">December 3, 2024</p>
                    <p className="text-[0.8rem] font-normal text-metal-600 dark:text-metal-300">
                        The order has been shipped via XYZ Logistics and is expected to arrive soon.
                    </p>
                </TimelineContent>
            </TimelineItem>

            {/* Out for Delivery */}
            <TimelineItem>
                <TimelinePoint
                    className="bg-orange-300 border border-orange-500 w-[1.05rem] h-[1.05rem] rounded-full shadow-lg flex items-center justify-center "
                />
                <TimelineContent>
                    <div className="text-[0.9rem] font-semibold text-gray-600 dark:text-white">Out for Delivery</div>
                    <p className="text-xs text-metal-400">December 4, 2024</p>
                    <p className="text-[0.8rem] font-normal text-metal-600 dark:text-metal-300">
                        The order is out for delivery and will arrive at the customers location today.
                    </p>
                </TimelineContent>
            </TimelineItem>

            {/* Delivered */}
            <TimelineItem>
                <TimelinePoint
                    className="bg-orange-300 border border-orange-500 w-[1.05rem] h-[1.05rem] rounded-full shadow-lg flex items-center justify-center "
                />
                <TimelineContent>
                    <div className="text-[0.9rem] font-semibold text-gray-600 dark:text-white">Order Delivered</div>
                    <p className="text-xs text-metal-400">December 4, 2024</p>
                    <p className="text-[0.8rem] font-normal text-metal-600 dark:text-metal-300">
                        The order has been successfully delivered to the customer.
                    </p>
                </TimelineContent>
            </TimelineItem>
        </Timeline>
    );
};

export default TimelineComponent;
