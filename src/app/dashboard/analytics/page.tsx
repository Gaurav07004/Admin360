"use client";

import React from "react";
import { LuBarChart2 } from "react-icons/lu";
import { CgNotes } from "react-icons/cg";
import { FiUsers } from "react-icons/fi";
import { RxCube } from "react-icons/rx";
import { TbArrowBadgeUpFilled, TbArrowBadgeDownFilled } from "react-icons/tb";
import LineChart from "@/components/CustomerActivity";
import OrderStat from "@/components/OrderStatistics";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const calculatePercentageChange = (currentValue: number, previousValue: number): string => {
    if (previousValue === 0) return "0";
    const change = ((currentValue - previousValue) / previousValue) * 100;
    return change.toFixed(2);
};

interface StatisticCardProps {
    title: string;
    value: number;
    previousValue: number;
    bgColor: string;
    icon1: React.ReactNode;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ title, value, previousValue, bgColor, icon1 }) => {
    const percentageChange = calculatePercentageChange(value, previousValue);
    const isPositive = parseFloat(percentageChange) > 0;

    // Format value for display
    const formatToKOrL = (value: number): string => {
        if (value >= 100000) {
            return `${(value / 100000).toFixed(2)}L`;
        } else if (value >= 1000) {
            return `${(value / 1000).toFixed(2)}K`;
        }
        return value.toString();
    };

    return (
        <div className="bg-white dark:bg-[#263445] rounded-[1rem] px-6 py-6 flex flex-col gap-4 w-full shadow-xs">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className={`${bgColor} rounded-md p-3 flex items-center justify-center`} aria-label={title}>
                        {icon1}
                    </div>
                    <div className="text-gray-700 font-semibold text-lg dark:text-gray-300">{title}</div>
                </div>
                <div className="text-gray-800 font-bold text-xl dark:text-gray-400">{formatToKOrL(value)}</div>
            </div>
            <div className="text-gray-600 dark:text-gray-300 text-xs font-semibold mt-3 flex items-center gap-2">
                <span
                    className={`text-xs flex items-center rounded-md px-2 cursor-pointer py-1 
                    ${isPositive
                            ? "bg-green-100 text-green-500 dark:bg-green-900 dark:text-green-400"
                            : "bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-400"
                        }`}
                >
                    {isPositive ? (
                        <TbArrowBadgeUpFilled className="w-5 h-5 text-green-500 dark:text-green-400" />
                    ) : (
                        <TbArrowBadgeDownFilled className="w-5 h-5 text-red-500 dark:text-red-400" />
                    )}
                    {isPositive && "+"}
                    {percentageChange}%
                </span>
                Compared to last month
            </div>
        </div>
    );
};


const Page: React.FC = () => {
    const { orders } = useSelector((state: RootState) => state.order);
    const { products } = useSelector((state: RootState) => state.product);
    const { customers } = useSelector((state: RootState) => state.customer);

    const totalProducts = products.length;
    const totalCustomers = customers.length;
    const totalOrders = orders.length;
    const totalsales = orders.reduce((total, order) => total + order.cost, 0);

    const statistics = [
        {
            id: 1,
            title: "Total Sales",
            value: totalsales,
            previousValue: 250000,
            bgColor: "bg-gradient-to-br from-blue-500 to-blue-300",
            icon1: <LuBarChart2 className="w-[1.2rem] h-[1.2rem] text-white" />,
        },
        {
            id: 2,
            title: "Total Orders",
            value: totalOrders,
            previousValue: 16,
            bgColor: "bg-gradient-to-br from-green-500 to-green-300",
            icon1: <RxCube className="w-[1.2rem] h-[1.2rem] text-white" />,
        },
        {
            id: 3,
            title: "Total Products",
            value: totalProducts,
            previousValue: 8,
            bgColor: "bg-gradient-to-br from-orange-500 to-orange-300",
            icon1: <CgNotes className="w-[1.2rem] h-[1.2rem] text-white" />,
        },
        {
            id: 4,
            title: "New Customers",
            value: totalCustomers,
            previousValue: 9,
            bgColor: "bg-gradient-to-br from-red-500 to-red-300",
            icon1: <FiUsers className="w-[1.2rem] h-[1.2rem] text-white" />,
        },
    ];

    return (
        <section className="gap-5 flex flex-col">
            <section className="grid grid-cols-4 gap-5 w-full">
                {statistics.map((stat) => (
                    <StatisticCard key={stat.id} {...stat} />
                ))}
            </section>
            <section className="flex justify-between gap-5">
                <div className="w-[70%]">
                    <LineChart />
                </div>
                <div className="w-[30%]">
                    <OrderStat />
                </div>
            </section>
        </section>
    );
};


export default Page;
