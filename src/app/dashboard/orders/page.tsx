"use client";

import { CgNotes } from "react-icons/cg";
import { LuCheckCircle } from "react-icons/lu";
import { RxTimer } from "react-icons/rx";
import { RxCrossCircled } from "react-icons/rx";
import BarChart from "@/components/OrderChart";
import OrderTable from '@/components/OrderTable'
import Order from '@/app/dashboard/orders/[id]/page'
import { useSelector } from "react-redux";
import { RootState } from '@/redux/store';

interface Order {
    orderStatus: "Delivered" | "Pending" | "Unreachable" | "Cancelled" | "Shipped";
}

interface StatisticCardProps {
    title: string;
    value: string | number;
    bgColor: string;
    icon: React.ReactNode;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ title, value, bgColor, icon }) => (
    <div className="bg-white rounded-[1rem] px-8 py-12 flex gap-5 w-[15rem] h-auto">
        <div className={`${bgColor} rounded-md p-[0.8rem] flex items-center justify-center`} aria-label={title}>
            {icon}
        </div>
        <div className="flex-col items-center justify-center">
            <div className="text-[#5e6574] font-bold text-2xl">{value}</div>
            <div className="text-gray-400 text-sm font-semibold">{title}</div>
        </div>
    </div>
);

const Page: React.FC = () => {
    const { orders } = useSelector((state: RootState) => state.order);

    const totalOrders = orders.length;
    const completedOrders = orders.filter((order: Order) => order.orderStatus === "Delivered").length;
    const pendingOrders = orders.filter((order: Order) => order.orderStatus === "Pending").length;
    const cancelledOrders = orders.filter((order: Order) => order.orderStatus === "Cancelled" || order.orderStatus === "Unreachable").length;

    const statistics = [
        {
            id: 1,
            title: "Total Order",
            value: totalOrders,
            bgColor: "bg-gradient-to-r from-blue-500 to-blue-300",
            icon: <CgNotes className="w-[1.4rem] h-[1.4rem] text-white" />,
        },
        {
            id: 2,
            title: "Delivered Order",
            value: completedOrders,
            bgColor: "bg-gradient-to-r from-green-500 to-green-400",
            icon: <LuCheckCircle className="w-[1.4rem] h-[1.4rem] text-white" />,
        },
        {
            id: 3,
            title: "Pending Order",
            value: pendingOrders,
            bgColor: "bg-gradient-to-br from-orange-500 to-orange-300",
            icon: <RxTimer className="w-[1.4rem] h-[1.4rem] text-white" />,
        },
        {
            id: 4,
            title: "Cancelled Order",
            value: cancelledOrders,
            bgColor: "bg-gradient-to-r from-red-500 to-red-400",
            icon: <RxCrossCircled className="w-[1.4rem] h-[1.4rem] text-white" />,
        },
    ];

    return (
        <section className="gap-5 flex flex-col justify-between">
            <div className="flex gap-6 w-full">
                <section className="grid grid-cols-2 gap-5 w-[40%]">
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
                <div className="bg-white rounded-[1rem] px-8 pt-6 pb-2 w-[60%]">
                    <BarChart />
                </div>
            </div>
            <OrderTable />
            <Order />
        </section>
    );
};

export default Page;
