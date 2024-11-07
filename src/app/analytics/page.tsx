"use client";

import React from "react";
import { LuCheckCircle } from "react-icons/lu";
import { RxCube } from "react-icons/rx";
import { TbArrowBadgeUpFilled, TbArrowBadgeDownFilled } from "react-icons/tb";
import { PiWarning, PiCloudArrowDown } from "react-icons/pi";

const statistics = [
    {
        id: 1,
        title: "Total Sales",
        value: "25.3K",
        previousValue: "17.9K",
        bgColor: "bg-gradient-to-br from-blue-500 to-blue-300",
        icon1: <RxCube className="w-[1.2rem] h-[1.2rem] text-white" />,
    },
    {
        id: 2,
        title: "Total Orders",
        value: "15.8K",
        previousValue: "16.1K",
        bgColor: "bg-gradient-to-br from-green-500 to-green-300",
        icon1: <LuCheckCircle className="w-[1.2rem] h-[1.2rem] text-white" />,
    },
    {
        id: 3,
        title: "Total Products",
        value: "224",
        previousValue: "207",
        bgColor: "bg-gradient-to-br from-orange-500 to-orange-300",
        icon1: <PiCloudArrowDown className="w-[1.2rem] h-[1.2rem] text-white" />,
    },
    {
        id: 4,
        title: "New Customers",
        value: "88",
        previousValue: "112",
        bgColor: "bg-gradient-to-br from-red-500 to-red-300",
        icon1: <PiWarning className="w-[1.2rem] h-[1.2rem] text-white" />,
    },
];

interface StatisticCardProps {
    title: string;
    value: string;
    previousValue: string;
    bgColor: string;
    icon1: React.ReactNode;
}

const calculatePercentageChange = (currentValue: string, previousValue: string): string => {
    const current = parseFloat(currentValue.replace("K", "").trim()) * 1000;
    const previous = parseFloat(previousValue.replace("K", "").trim()) * 1000;

    const change = ((current - previous) / previous) * 100;
    return change.toFixed(2);
};

const StatisticCard: React.FC<StatisticCardProps> = ({ title, value, previousValue, bgColor, icon1 }) => {
    const percentageChange = calculatePercentageChange(value, previousValue);
    const isPositive = parseFloat(percentageChange) > 0;

    return (
        <div className="bg-white rounded-lg px-6 py-6 flex flex-col gap-4 w-full">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className={`${bgColor} rounded-md p-3 flex items-center justify-center`} aria-label={title}>
                        {icon1}
                    </div>
                    <div className="text-gray-700 font-semibold text-lg">{title}</div>
                </div>
                <div className="text-gray-800 font-bold text-2xl">{value}</div>
            </div>
            <div
                className={`text-gray-600 text-xs font-semibold mt-3 flex items-center gap-2`}
            >
                <span className={`text-xs`}>
                    {isPositive ? (
                        <TbArrowBadgeUpFilled className="w-7 h-7 text-green-500" />
                    ) : (
                        <TbArrowBadgeDownFilled className="w-7 h-7 text-red-500" />
                    )}
                </span>
                {isPositive && "+"}
                {percentageChange}% {isPositive ? "Growth from last month" : "Down from last month"}
            </div>
        </div>
    );
};

const Page: React.FC = () => {
    return (
        <section className="gap-5 flex flex-col justify-between items-center">
            <div className="flex gap-6 w-full">
                <section className="grid grid-cols-4 gap-5 w-full">
                    {statistics.map((stat) => (
                        <StatisticCard
                            key={stat.id}
                            title={stat.title}
                            value={stat.value}
                            previousValue={stat.previousValue}
                            bgColor={stat.bgColor}
                            icon1={stat.icon1}
                        />
                    ))}
                </section>
            </div>
        </section>
    );
};

export default Page;
