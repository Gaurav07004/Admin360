"use client";

import { Timeline, TimelineContent, TimelineItem, TimelinePoint } from "keep-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const TimelineComponent = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector((state: RootState) => state.order);
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
                {orders.map((event, index) => {
                    const isTodayOrPast = new Date(`${event.date} ${event.time}`) < new Date(`${currentDate} ${currentTime}`);
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

export default TimelineComponent;
