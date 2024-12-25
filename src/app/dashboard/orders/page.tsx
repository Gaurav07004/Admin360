"use client";

import { useEffect } from "react";
import { toast } from "keep-react"
import { CgNotes } from "react-icons/cg";
import { LuCheckCircle } from "react-icons/lu";
import { RxTimer } from "react-icons/rx";
import { RxCrossCircled } from "react-icons/rx";
import BarChart from "@/components/OrderChart";
import OrderTable from '@/components/OrderTable'
import Order from '@/app/dashboard/orders/[id]/page'
import { useDispatch } from "react-redux";
import { setOrder, setOrderMonthlyData } from "@/redux/slices/orderSlice";

const statistics = [
    {
        id: 1,
        title: "Total Order",
        value: "10",
        bgColor: "bg-gradient-to-r from-blue-500 to-blue-300",
        icon: <CgNotes className="w-5 h-5 text-white" />,
    },
    {
        id: 2,
        title: "Completed Order",
        value: "05",
        bgColor: "bg-gradient-to-r from-green-500 to-green-400",
        icon: <LuCheckCircle className="w-5 h-5 text-white" />,
    },
    {
        id: 3,
        title: "Pending Order",
        value: "02",
        bgColor: "bg-gradient-to-br from-orange-500 to-orange-300",
        icon: <RxTimer className="w-5 h-5 text-white" />,
    },
    {
        id: 4,
        title: "Cancelled Order",
        value: "02",
        bgColor: "bg-gradient-to-r from-red-500 to-red-400",
        icon: <RxCrossCircled className="w-5 h-5 text-white" />,
    },
];

interface StatisticCardProps {
    title: string;
    value: string;
    bgColor: string;
    icon: React.ReactNode;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ title, value, bgColor, icon }) => (
    <div className="bg-white rounded-[1rem] px-6 py-11 flex gap-5 w-[14rem] h-auto">
        <div className={`${bgColor} rounded-md p-3 flex items-center justify-center`} aria-label={title}>
            {icon}
        </div>
        <div className="flex-col items-center justify-center">
            <div className="text-[#5e6574] font-bold text-2xl">{value}</div>
            <div className="text-gray-400 text-sm font-semibold">{title}</div>
        </div>
    </div>
);

const Page: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("authToken");

            if (!token) {
                toast.error("Token not received. Redirecting to login.", { position: "top-right" });
                setTimeout(() => {
                    window.location.href = "/";
                }, 2000);
                return;
            }

            try {
                const response = await fetch("http://localhost:3000/api/auth/order", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    dispatch(setOrder(data.orders));
                    dispatch(setOrderMonthlyData(data.MonthlyOrders));
                } else {
                    toast.error("Failed to fetch data.", { position: "top-right" });
                }
            } catch (error) {
                toast.error("Unable to connect. Please check your network.", { position: "top-right" });
            }
        };

        fetchData();
    }, [dispatch]);

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
            <Order />
        </section>
    );
};

export default Page;
