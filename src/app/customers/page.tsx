"use client";

import React from "react";
import { PiUsersLight, PiChartLineUpLight, PiChartLineDownLight, PiCheckLight, PiEyeLight } from "react-icons/pi";
import CustomerTable from '@/components/CustomerTable'

const statistics = [
    {
        id: 1,
        icon1: <PiUsersLight className="w-5 h-5 text-blue-600" />,
        icon2: <PiChartLineUpLight className="w-7 h-7 text-green-600" />,
        title: 'Total Customers',
        value: '10',
        percentage: '18%',
        description: 'Compared to the previous month, showing a significant increase.',
        bgColor: 'bg-blue-100',
        borderColor: 'border-blue-300',
        color: 'text-green-600'
    },
    {
        id: 2,
        icon1: <PiCheckLight className="w-5 h-5 text-green-600" />,
        icon2: <PiChartLineDownLight className="w-7 h-7 text-red-600" />,
        title: 'Total Orders',
        value: '515',
        percentage: '8%',
        description: 'Compared to last month, indicating steady growth.',
        bgColor: 'bg-green-100',
        borderColor: 'border-green-300',
        color: 'text-red-600'
    },
    {
        id: 3,
        icon1: <PiEyeLight className="w-5 h-5 text-purple-600" />,
        icon2: <PiChartLineUpLight className="w-7 h-7 text-green-600" />,
        title: 'Total Visit',
        value: '90',
        percentage: '7%',
        description: 'Compared to the previous month, reflecting a steady rise in visits.',
        bgColor: 'bg-purple-100',
        borderColor: 'border-purple-300',
        color: 'text-green-600'
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
    borderColor: string;
    color: string;
}> = ({ icon1, icon2, title, value, percentage, description, bgColor, borderColor, color }) => (
    <section
        className={`bg-white rounded-[1rem] py-5 px-6 w-full`}
    >
        <div className='flex justify-between items-center mb-6'>
            <div className='flex items-center gap-4'>
                <div className={`p-2 rounded-md border ${bgColor} ${borderColor} flex items-center justify-center`}>
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
            <span className={`${color} text-sm`}>
                {percentage} <span className="text-gray-600 text-xs">{description}</span>
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
                        borderColor={stat.borderColor}
                        color={stat.color}
                    />
                ))}
            </section>
            <CustomerTable />
        </section>
    );
};

export default Page;
