/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { toast } from "keep-react";
import { useEffect, useState } from 'react';
import { CgNotes } from "react-icons/cg";
import { LuCheckCircle } from "react-icons/lu";
import { RxTimer } from "react-icons/rx";
import { RxCrossCircled } from "react-icons/rx";
import BarChart from "@/components/OrderChart";
import OrderTable from '@/components/OrderTable'
import Order from '@/app/dashboard/orders/[id]/page'
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '@/redux/store';
import { useRouter } from "next/navigation";
import { setOrder, setOrderMonthlyData } from "@/redux/slices/orderSlice";

interface Order {
    orderStatus: "Delivered" | "Pending" | "Unreachable" | "Cancelled" | "Shipped";
}

interface StatisticCardProps {
    title: string;
    value: number;
    bgColor: string;
    icon: React.ReactNode;
}


function addLeadingZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ title, value, bgColor, icon }) => (
    <div className="bg-white dark:bg-[#263445] rounded-[1rem] px-8 py-12 flex gap-5 w-[15rem] h-auto">
        <div className={`${bgColor} rounded-md p-[0.8rem] flex items-center justify-center`} aria-label={title}>
            {icon}
        </div>
        <div className="flex-col items-center justify-center">
            <div className="text-[#5e6574] dark:text-gray-300 font-bold text-2xl">{addLeadingZero(value)}</div>
            <div className="text-gray-400 dark:text-gray-400 text-sm font-semibold">{title}</div>
        </div>
    </div>
);

const Page: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
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

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("authToken");
            if (!token) {
                toast.error("Authentication is missing. Redirecting to login", { position: "top-right" });
                setTimeout(() => router.push("/"), 2000);
                return;
            }

            try {
                const response = await fetch(`/api/auth/order`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const errorMessage =
                        response.status === 401
                            ? "Session expired. Please log in again."
                            : `Failed to fetch data: ${response.statusText}`;

                    toast.error(errorMessage, { position: "top-right" });
                    setTimeout(() => router.push("/"), 2000);
                    throw new Error(errorMessage);
                }

                const orderdata = await response.json();
                dispatch(setOrder(orderdata.orders));
                dispatch(setOrderMonthlyData(orderdata.MonthlyOrders))
            } catch (error: any) {
                toast.error(error.message || "An unexpected error occurred. Redirecting to login.", { position: "top-right" });
                setTimeout(() => router.push("/"), 2000);
                console.error("Error fetching customer data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [dispatch, router]);

    return isLoading ? (
        <div className="fixed inset-0 flex justify-center items-center bg-white dark:bg-[#263445] z-50">
            <div className="w-12 h-12 rounded-full border-[0.2rem] border-gray-300 border-t-orange-500 animate-spin"></div>
        </div>
    ) : (
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
                <div className="bg-white dark:text-gray-300 dark:bg-[#263445] rounded-[1rem] px-8 pt-6 pb-2 w-[60%]">
                    <BarChart />
                </div>
            </div>
            <OrderTable />
            <Order />
        </section>
    );
};

export default Page;
