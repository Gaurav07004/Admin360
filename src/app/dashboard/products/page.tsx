"use client";

import { LuCheckCircle } from "react-icons/lu";
import { RxCube } from "react-icons/rx";
import { PiWarning, PiCloudArrowDown } from "react-icons/pi";
import BarChart from "@/components/ProductChart";
import ProductTable from '@/components/ProductTable'
import Product from '@/app/dashboard/products/[id]/page'
import NewProduct from '@/components/newProduct'
import { useSelector } from "react-redux";
import { RootState } from '@/redux/store';

interface Product {
    stockStatus: "Available" | "Out of Stock" | "Low Stock";
}

interface StatisticCardProps {
    title: string;
    value: string | number;
    bgColor: string;
    icon: React.ReactNode;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ title, value, bgColor, icon }) => (
    <div className="bg-white rounded-[1rem] px-8 py-12 flex gap-5 w-[15rem] h-auto">
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
            <ProductTable />
            <Product />
            <NewProduct />
        </section>
    );
};

export default Page;

