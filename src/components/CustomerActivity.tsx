"use client";

import { useState } from "react";
import { ResponsiveContainer, XAxis, YAxis, Tooltip as ChartTooltip, CartesianGrid, Area, AreaChart } from "recharts";
import { FiShoppingCart, FiCheckCircle, FiEye } from "react-icons/fi";
import { CgNotes } from "react-icons/cg";

interface ChartData {
    timeRange: string;
    price: number;
}

const chartDataSets: Record<string, ChartData[]> = {
    productView: [
        { timeRange: "06:00 AM", price: 50000 },
        { timeRange: "07:00 AM", price: 50000 },
        { timeRange: "08:00 AM", price: 50000 },
        { timeRange: "09:00 AM", price: 70000 },
        { timeRange: "10:00 AM", price: 65000 },
        { timeRange: "11:00 AM", price: 90000 },
        { timeRange: "12:00 PM", price: 60000 },
        { timeRange: "01:00 PM", price: 55000 },
        { timeRange: "02:00 PM", price: 30000 },
        { timeRange: "03:00 PM", price: 65000 },
        { timeRange: "04:00 PM", price: 75000 },
        { timeRange: "05:00 PM", price: 95000 },
        { timeRange: "06:00 PM", price: 90000 },
        { timeRange: "07:00 PM", price: 85000 },
        { timeRange: "08:00 PM", price: 55000 },
        { timeRange: "09:00 PM", price: 50000 },
        { timeRange: "10:00 PM", price: 70000 },
        { timeRange: "11:00 PM", price: 70000 },
        { timeRange: "12:00 AM", price: 79000 },
        { timeRange: "01:00 AM", price: 70000 },
        { timeRange: "02:00 AM", price: 77000 },
        { timeRange: "03:00 AM", price: 85000 },
        { timeRange: "04:00 AM", price: 90000 },
        { timeRange: "05:00 AM", price: 82000 },
    ],
    addToCart: [
        { timeRange: "06:00 AM", price: 49000 },
        { timeRange: "07:00 AM", price: 49500 },
        { timeRange: "08:00 AM", price: 50500 },
        { timeRange: "09:00 AM", price: 71000 },
        { timeRange: "10:00 AM", price: 66000 },
        { timeRange: "11:00 AM", price: 91000 },
        { timeRange: "12:00 PM", price: 61500 },
        { timeRange: "01:00 PM", price: 56500 },
        { timeRange: "02:00 PM", price: 31000 },
        { timeRange: "03:00 PM", price: 66000 },
        { timeRange: "04:00 PM", price: 76000 },
        { timeRange: "05:00 PM", price: 96500 },
        { timeRange: "06:00 PM", price: 92000 },
        { timeRange: "07:00 PM", price: 86000 },
        { timeRange: "08:00 PM", price: 56000 },
        { timeRange: "09:00 PM", price: 51500 },
        { timeRange: "10:00 PM", price: 71000 },
        { timeRange: "11:00 PM", price: 71000 },
        { timeRange: "12:00 AM", price: 80000 },
        { timeRange: "01:00 AM", price: 70500 },
        { timeRange: "02:00 AM", price: 78000 },
        { timeRange: "03:00 AM", price: 85500 },
        { timeRange: "04:00 AM", price: 91000 },
        { timeRange: "05:00 AM", price: 82500 },
    ],
    checkout: [
        { timeRange: "06:00 AM", price: 48000 },
        { timeRange: "07:00 AM", price: 49000 },
        { timeRange: "08:00 AM", price: 49500 },
        { timeRange: "09:00 AM", price: 70500 },
        { timeRange: "10:00 AM", price: 64000 },
        { timeRange: "11:00 AM", price: 89500 },
        { timeRange: "12:00 PM", price: 59500 },
        { timeRange: "01:00 PM", price: 54000 },
        { timeRange: "02:00 PM", price: 29500 },
        { timeRange: "03:00 PM", price: 64000 },
        { timeRange: "04:00 PM", price: 74000 },
        { timeRange: "05:00 PM", price: 93500 },
        { timeRange: "06:00 PM", price: 88000 },
        { timeRange: "07:00 PM", price: 84000 },
        { timeRange: "08:00 PM", price: 53000 },
        { timeRange: "09:00 PM", price: 48500 },
        { timeRange: "10:00 PM", price: 69000 },
        { timeRange: "11:00 PM", price: 69000 },
        { timeRange: "12:00 AM", price: 78000 },
        { timeRange: "01:00 AM", price: 69500 },
        { timeRange: "02:00 AM", price: 76000 },
        { timeRange: "03:00 AM", price: 84000 },
        { timeRange: "04:00 AM", price: 89000 },
        { timeRange: "05:00 AM", price: 81000 },
    ],
    purchase: [
        { timeRange: "06:00 AM", price: 47000 },
        { timeRange: "07:00 AM", price: 48000 },
        { timeRange: "08:00 AM", price: 49000 },
        { timeRange: "09:00 AM", price: 70000 },
        { timeRange: "10:00 AM", price: 63000 },
        { timeRange: "11:00 AM", price: 88000 },
        { timeRange: "12:00 PM", price: 58000 },
        { timeRange: "01:00 PM", price: 52000 },
        { timeRange: "02:00 PM", price: 28500 },
        { timeRange: "03:00 PM", price: 62000 },
        { timeRange: "04:00 PM", price: 72000 },
        { timeRange: "05:00 PM", price: 91000 },
        { timeRange: "06:00 PM", price: 86000 },
        { timeRange: "07:00 PM", price: 82000 },
        { timeRange: "08:00 PM", price: 51000 },
        { timeRange: "09:00 PM", price: 47500 },
        { timeRange: "10:00 PM", price: 67000 },
        { timeRange: "11:00 PM", price: 67000 },
        { timeRange: "12:00 AM", price: 76000 },
        { timeRange: "01:00 AM", price: 67500 },
        { timeRange: "02:00 AM", price: 74000 },
        { timeRange: "03:00 AM", price: 82000 },
        { timeRange: "04:00 AM", price: 87000 },
        { timeRange: "05:00 AM", price: 79500 },
    ],
};

interface ButtonConfig {
    label: string;
    icon: React.ComponentType;
    dataKey: string;
}

const buttonConfig: ButtonConfig[] = [
    { label: "Product View", icon: FiEye, dataKey: "productView" },
    { label: "Add to Cart", icon: FiShoppingCart, dataKey: "addToCart" },
    { label: "Checkout", icon: CgNotes, dataKey: "checkout" },
    { label: "Purchase", icon: FiCheckCircle, dataKey: "purchase" },
];

const CustomTooltip = ({ active, payload }: { active: boolean, payload: any[] }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#ff6600a9] text-white p-2 rounded text-xs shadow-lg">
                <p>{`${formatNumberWithK(payload[0].payload.price)}`}</p>
            </div>
        );
    }
    return null;
};

const formatNumberWithK = (number: number) => {
    return number >= 1000 ? (number / 1000).toFixed(1) + "K" : number.toString();
};

const LineChartComponent = () => {
    const [selectedChartData, setSelectedChartData] = useState(chartDataSets.productView);
    const [activeButton, setActiveButton] = useState<string>("productView");

    const handleButtonClick = (dataKey: string) => {
        setSelectedChartData(chartDataSets[dataKey]);
        setActiveButton(dataKey);
    };

    return (
        <section className="bg-white rounded-[1rem] py-5 px-7 w-full">
            <div className="mb-4 text-left text-gray-600">
                <p className="text-lg font-semibold mb-2">Sales Funnel</p>
            </div>
            <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={selectedChartData} className="!p-0">
                    <defs>
                        <linearGradient id="price" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="10%" stopColor="#FF6500" stopOpacity={0.2} />
                            <stop offset="80%" stopColor="#FF6500" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="#E1E5EA" strokeWidth={0.8} />
                    <XAxis className="text-xs font-medium text-metal-400" dataKey="timeRange" stroke="#8897ae" strokeWidth={0.5} ticks={["10:00 AM", "04:00 PM", "10:00 PM", "04:00 AM"]} dy={12} />
                    <YAxis className="text-xs font-medium text-metal-600" dataKey="price" stroke="#8897ae" strokeWidth={0.5} dx={-10} tick={{ fontSize: 12, fill: "#8897ae" }} tickFormatter={formatNumberWithK} />
                    <ChartTooltip content={<CustomTooltip />} />
                    <Area dataKey="price" type="natural" stroke="#FF6500" strokeWidth={0.8} dot={false} fillOpacity={0.5} fill="url(#price)" />
                </AreaChart>
            </ResponsiveContainer>

            <section className="flex flex-wrap items-center justify-between mt-[3rem] gap-4">
                {buttonConfig.map((data, index) => (
                    <div key={index} className={`relative flex items-center gap-3 rounded-lg transition-all ${activeButton === data.dataKey ? "bg-[#FF660021] text-[#FF6500]" : "bg-gray-100 text-orange-400"}`}>
                        <data.icon className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-base transition-all ${activeButton === data.dataKey ? "text-[#FF6500]" : "text-orange-400"}`} />
                        <button
                            onClick={() => handleButtonClick(data.dataKey)}
                            className={`py-3 pl-10 pr-6 rounded-lg w-full text-xs font-medium text-left transition-all ${activeButton === data.dataKey ? "text-[#FF6500]" : "text-orange-400"
                                }`}
                            aria-pressed={activeButton === data.dataKey}
                        >
                            {data.label}
                        </button>
                    </div>
                ))}
            </section>
        </section>
    );
};

export default LineChartComponent;
