"use client";

import React from "react";
import { CgNotes } from "react-icons/cg";
import { LuCheckCircle } from "react-icons/lu";
import { RxTimer } from "react-icons/rx";
import { GrPowerCycle } from "react-icons/gr";
import BarChart from "@/components/OrderChart";
import OrderTable from '@/components/OrderTable'

const statistics = [
    {
        id: 1,
        title: "Total",
        value: "17,917",
        bgColor: "bg-gradient-to-r from-blue-500 to-blue-300",
        icon: <CgNotes className="w-5 h-5 text-white" />,
    },
    {
        id: 2,
        title: "Completed",
        value: "16,104",
        bgColor: "bg-gradient-to-r from-green-500 to-green-400",
        icon: <LuCheckCircle className="w-5 h-5 text-white" />,
    },
    {
        id: 3,
        title: "Pending",
        value: "88",
        bgColor: "bg-gradient-to-br from-orange-500 to-orange-300",
        icon: <RxTimer className="w-5 h-5 text-white" />,
    },
    {
        id: 4,
        title: "Processing",
        value: "207",
        bgColor: "bg-gradient-to-r from-red-500 to-red-400",
        icon: <GrPowerCycle className="w-5 h-5 text-white" />,
    },
];

// Define types for the statistic card props
interface StatisticCardProps {
    title: string;
    value: string;
    bgColor: string;
    icon: React.ReactNode;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ title, value, bgColor, icon }) => (
    <div className="bg-white rounded-[1rem] px-8 py-12 flex gap-5 w-[14rem] h-auto">
        <div className={`${bgColor} rounded-md p-4 flex items-center justify-center`} aria-label={title}>
            {icon}
        </div>
        <div className="flex-col items-center justify-center">
            <div className="text-[#5e6574] font-bold text-2xl">{value}</div>
            <div className="text-gray-400 text-sm font-semibold">{title}</div>
        </div>
    </div>
);

const Page: React.FC = () => {
    return (
        <section className="gap-5 flex flex-col justify-between">
            <div className="flex gap-6 w-full">
                <section className="grid grid-cols-2 gap-5 w-[37%]">
                    {statistics.map((stat) => (
                        <StatisticCard
                            key={stat.id}
                            title={stat.title}
                            value={stat.value}
                            bgColor={stat.bgColor}
                            icon={stat.icon}
                        />
                    ))}
                </section>
                <div className="bg-white rounded-[1rem] px-8 pt-6 pb-2 w-[63%]">
                    <BarChart />
                </div>
            </div>
            <OrderTable />
        </section>
    );
};

export default Page;
