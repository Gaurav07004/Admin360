/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast } from "keep-react";
import { useEffect, useState } from 'react';
import { LuCheckCircle } from "react-icons/lu";
import { RxCube } from "react-icons/rx";
import { PiWarning, PiCloudArrowDown } from "react-icons/pi";
import BarChart from "@/components/ProductChart";
import ProductTable from '@/components/ProductTable'
import Product from '@/app/dashboard/products/[id]/page'
import NewProduct from '@/components/newProduct'
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '@/redux/store';
import { useRouter } from "next/navigation";
import { setProduct, setProductMonthlyData } from "@/redux/slices/productsSlice";

interface Product {
    stockStatus: "Available" | "Out of Stock" | "Low Stock";
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
        <div className={`${bgColor} rounded-md p-4 flex items-center justify-center`} aria-label={title}>
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
    const { products } = useSelector((state: RootState) => state.product);

    const totalProducts = products.length;
    const productAvailable = products.filter((product: Product) => product.stockStatus === "Available").length;
    const productOutofStock = products.filter((product: Product) => product.stockStatus === "Out of Stock").length;
    const productLowStock = products.filter((product: Product) => product.stockStatus === "Low Stock").length;

    const statistics = [
        {
            id: 1,
            title: "Total Products",
            value: totalProducts,
            bgColor: "bg-gradient-to-br from-blue-500 to-blue-300",
            icon: <RxCube className="w-[1.4rem] h-[1.4rem] text-white" />,
        },
        {
            id: 2,
            title: "In Stock",
            value: productAvailable,
            bgColor: "bg-gradient-to-br from-green-500 to-green-300",
            icon: <LuCheckCircle className="w-[1.4rem] h-[1.4rem] text-white" />,
        },
        {
            id: 3,
            title: "Out of Stock",
            value: productOutofStock,
            bgColor: "bg-gradient-to-br from-red-500 to-red-300",
            icon: <PiWarning className="w-[1.4rem] h-[1.4rem] text-white" />,
        },
        {
            id: 4,
            title: "Low Stock",
            value: productLowStock,
            bgColor: "bg-gradient-to-br from-orange-500 to-orange-300",
            icon: <PiCloudArrowDown className="w-[1.4rem] h-[1.4rem] text-white" />,
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
                const response = await fetch(`/api/auth/product`, {
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

                const productData = await response.json();
                dispatch(setProduct(productData.products));
                dispatch(setProductMonthlyData(productData.ProductStats))
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
                <div className="bg-white dark:bg-[#263445] rounded-[1rem] px-8 pt-6 pb-2 w-[60%]">
                    <BarChart />
                </div>
            </div>
            <ProductTable />
            <Product />
            <NewProduct />
        </section>
    );
};

export default Page;

