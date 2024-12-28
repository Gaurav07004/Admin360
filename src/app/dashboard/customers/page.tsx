"use client";

import React from "react";
import { TbArrowBadgeUpFilled, TbArrowBadgeDownFilled } from "react-icons/tb";
import CustomerTable from '@/components/CustomerTable';
import { FiUsers, FiEye } from "react-icons/fi";
import { LuCheckCircle } from "react-icons/lu";
import Customer from '@/app/dashboard/customers/[id]/page';
import { useSelector } from "react-redux";
import { RootState } from '@/redux/store';

interface Statistic {
    id: number;
    iconType: "customers" | "orders" | "visits";
    title: string;
    value: number;
    currentCount: number;
    previousCount: number;
    bgColor: string;
}

const StatisticCard: React.FC<{
    stat: Statistic;
}> = ({ stat }) => {
    const { iconType, title, value, currentCount, previousCount, bgColor } = stat;

    const percentageChange = ((currentCount - previousCount) / previousCount * 100).toFixed(1);
    const isPositive = parseFloat(percentageChange) > 0;

    const icon1 = iconType === "customers" ? (
        <FiUsers className="w-[1.2rem] h-[1.2rem] text-white" />
    ) : iconType === "orders" ? (
        <LuCheckCircle className="w-[1.2rem] h-[1.2rem] text-white" />
    ) : (
        <FiEye className="w-[1.2rem] h-[1.2rem] text-white" />
    );

    const description = isPositive
        ? "Compared to the previous month, reflecting a steady rise in visits."
        : "Compared to last month, indicating steady growth.";

    function addLeadingZero(num: number): string {
        return num < 10 ? `0${num}` : `${num}`;
    }

    return (
        <section className="bg-white rounded-[1rem] py-5 px-6 w-full">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <div className={`${bgColor} rounded-md p-3 flex items-center justify-center`} aria-label={title}>
                        {icon1}
                    </div>
                    <div className="text-gray-600 font-semibold text-lg">{title}</div>
                </div>
                <div className="text-gray-600 font-bold text-2xl">{addLeadingZero(value)}</div>
            </div>
            <div className="flex gap-4 font-semibold">
                <span className={`text-xs flex items-center rounded-md px-2 cursor-pointer py-1 ${isPositive ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"}`}>
                    {isPositive ? <TbArrowBadgeUpFilled className="w-5 h-5 text-green-500" /> : <TbArrowBadgeDownFilled className="w-5 h-5 text-red-500" />}
                    {isPositive && "+"}
                    {percentageChange}%
                </span>
                <span className="text-gray-600 text-xs">{description}</span>
            </div>
        </section>
    );
};

const Page: React.FC = () => {

    const { customers } = useSelector((state: RootState) => state.customer);
    const totalOrders = customers.reduce((total, customer) => total + customer.order, 0);
    const statistics: Statistic[] = [
        {
            id: 1,
            iconType: "customers",
            title: "Total Customers",
            value: customers.length,
            currentCount: customers.length,
            previousCount: customers.length - 2,
            bgColor: "bg-gradient-to-l from-blue-300 to-blue-400",
        },
        {
            id: 2,
            iconType: "visits",
            title: "Total Visit",
            value: 90,
            currentCount: 88,
            previousCount: 90,
            bgColor: "bg-gradient-to-br from-orange-500 to-orange-300",
        },
        {
            id: 3,
            iconType: "orders",
            title: "Total Orders",
            value: totalOrders,
            currentCount: totalOrders,
            previousCount: totalOrders - 4,
            bgColor: "bg-gradient-to-l from-green-300 to-green-400",
        },
    ];


    return (
        <section className="gap-4 flex flex-col justify-between">
            <section className="flex justify-start items-center gap-4 w-full">
                {statistics.map((stat) => (
                    <StatisticCard key={stat.id} stat={stat} />
                ))}
            </section>
            <CustomerTable />
            <Customer />
        </section>
    );
};

export default Page;
