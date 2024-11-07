"use client";

import React from "react";
import { PiChartLineUpLight, PiChartLineDownLight } from "react-icons/pi";
import { TbArrowBadgeUpFilled, TbArrowBadgeDownFilled } from "react-icons/tb";
import CustomerTable from '@/components/CustomerTable'
import { FiUsers, FiEye } from "react-icons/fi";
import { LuCheckCircle } from "react-icons/lu";

const statistics = [
    {
        id: 1,
        icon1: <FiUsers className="w-[1.2rem] h-[1.2rem] text-white" />,
        icon2: <TbArrowBadgeUpFilled className="w-7 h-7 text-green-500" />,
        title: 'Total Customers',
        value: '10',
        percentage: '18%',
        description: 'Compared to the previous month, showing a significant increase.',
        bgColor: 'bg-gradient-to-l from-blue-300 to-blue-400',
    },
    {
        id: 2,
        icon1: <LuCheckCircle className="w-[1.2rem] h-[1.2rem] text-white" />,
        icon2: <TbArrowBadgeDownFilled className="w-7 h-7 text-red-500" />,
        title: 'Total Orders',
        value: '50',
        percentage: '8%',
        description: 'Compared to last month, indicating steady growth.',
        bgColor: 'bg-gradient-to-l from-green-300 to-green-400',
    },
    {
        id: 3,
        icon1: <FiEye className="w-[1.2rem] h-[1.2rem] text-white" />,
        icon2: <TbArrowBadgeUpFilled className="w-7 h-7 text-green-500" />,
        title: 'Total Visit',
        value: '90',
        percentage: '7%',
        description: 'Compared to the previous month, reflecting a steady rise in visits.',
        bgColor: "bg-gradient-to-br from-orange-500 to-orange-300",
    },
];

const StatisticCard: React.FC<{
    icon1: React.ReactNode;
    icon2: React.ReactNode;
    title: string;
    value: string;
    percentage: string;
    description: string;
    bgColor: string;
}> = ({ icon1, icon2, title, value, percentage, description, bgColor }) => (
    <section
        className={`bg-white rounded-[1rem] py-5 px-6 w-full`}
    >
        <div className='flex justify-between items-center mb-6'>
            <div className='flex items-center gap-4'>
                <div className={`${bgColor} rounded-md p-3 flex items-center justify-center`} aria-label={title}>
                    {icon1}
                </div>
                <div className="text-gray-700 font-semibold text-lg">{title}</div>
            </div>
            <div className="text-gray-800 font-bold text-3xl">{value}</div>
        </div>
        <div className='flex gap-4 font-semibold'>
            <div>
                {icon2}
            </div>
            <span className={`text-gray-600 text-sm`}>
                {percentage} <span className="text-xs">{description}</span>
            </span>
        </div>
    </section>
);

const Page: React.FC = () => {
    return (
        <section className="gap-5 flex flex-col justify-between items-center">
            <section className="flex justify-start items-center gap-5 w-full">
                {statistics.map((stat) => (
                    <StatisticCard
                        key={stat.id}
                        icon1={stat.icon1}
                        icon2={stat.icon2}
                        title={stat.title}
                        value={stat.value}
                        percentage={stat.percentage}
                        description={stat.description}
                        bgColor={stat.bgColor}
                    />
                ))}
            </section>
            <CustomerTable />
        </section>
    );
};

export default Page;
