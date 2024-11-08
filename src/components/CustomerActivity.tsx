"use client";

import { useState } from "react";
import { ResponsiveContainer, XAxis, YAxis, Tooltip as ChartTooltip, CartesianGrid, Area, AreaChart } from "recharts";
import { FiShoppingCart, FiCreditCard, FiCheckCircle, FiEye } from "react-icons/fi";
import { Button } from "keep-react";
import { CgNotes } from "react-icons/cg";

// Define chart data sets for each button
interface ChartData {
    timeRange: string;
    price: number;
}

// Define chart data sets for each button
const chartDataSets: Record<string, ChartData[]> = {
    productView: [
        { timeRange: "08:00 AM", price: 77000 },
        { timeRange: "10:00 AM", price: 45000 },
        { timeRange: "12:00 PM", price: 70000 },
        { timeRange: "02:00 PM", price: 67000 },
        { timeRange: "04:00 PM", price: 35000 },
        { timeRange: "06:00 PM", price: 52000 },
        { timeRange: "08:00 PM", price: 40000 },
        { timeRange: "10:00 PM", price: 68000 },
        { timeRange: "12:00 AM", price: 70000 },
        { timeRange: "02:00 AM", price: 78000 },
        { timeRange: "04:00 AM", price: 70000 },
        { timeRange: "06:00 AM", price: 72000 },
    ],
    addToCart: [
        { timeRange: "08:00 AM", price: 70000 },
        { timeRange: "10:00 AM", price: 40000 },
        { timeRange: "12:00 PM", price: 70000 },
        { timeRange: "02:00 PM", price: 60000 },
        { timeRange: "04:00 PM", price: 30000 },
        { timeRange: "06:00 PM", price: 50000 },
        { timeRange: "08:00 PM", price: 40000 },
        { timeRange: "10:00 PM", price: 60000 },
        { timeRange: "12:00 AM", price: 70000 },
        { timeRange: "02:00 AM", price: 70000 },
        { timeRange: "04:00 AM", price: 70000 },
        { timeRange: "06:00 AM", price: 70000 },
    ],
    checkout: [
        { timeRange: "08:00 AM", price: 72000 },
        { timeRange: "10:00 AM", price: 42000 },
        { timeRange: "12:00 PM", price: 72000 },
        { timeRange: "02:00 PM", price: 62000 },
        { timeRange: "04:00 PM", price: 32000 },
        { timeRange: "06:00 PM", price: 52000 },
        { timeRange: "08:00 PM", price: 42000 },
        { timeRange: "10:00 PM", price: 62000 },
        { timeRange: "12:00 AM", price: 72000 },
        { timeRange: "02:00 AM", price: 72000 },
        { timeRange: "04:00 AM", price: 72000 },
        { timeRange: "06:00 AM", price: 70000 },
    ],
    purchase: [
        { timeRange: "08:00 AM", price: 70000 },
        { timeRange: "10:00 AM", price: 40000 },
        { timeRange: "12:00 PM", price: 70000 },
        { timeRange: "02:00 PM", price: 60000 },
        { timeRange: "04:00 PM", price: 30000 },
        { timeRange: "06:00 PM", price: 50000 },
        { timeRange: "08:00 PM", price: 40000 },
        { timeRange: "10:00 PM", price: 60000 },
        { timeRange: "12:00 AM", price: 70000 },
        { timeRange: "02:00 AM", price: 70000 },
        { timeRange: "04:00 AM", price: 70000 },
        { timeRange: "06:00 AM", price: 70000 },
    ],
};

// Type for the button config
interface ButtonConfig {
    label: string;
    icon: React.ComponentType;
    dataKey: string;
}

// Define button configurations with labels and icons
const buttonConfig: ButtonConfig[] = [
    { label: "Product View", icon: FiEye, dataKey: "productView" },
    { label: "Add to Cart", icon: FiShoppingCart, dataKey: "addToCart" },
    { label: "Checkout", icon: CgNotes, dataKey: "checkout" },
    { label: "Purchase", icon: FiCheckCircle, dataKey: "purchase" },
];

// Custom Tooltip component for formatting tooltip content
const CustomTooltip = ({ active, payload }: { active: boolean; payload: any[] }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#ff6600a9] text-white p-2 rounded text-xs shadow-lg">
                <p>{`${formatNumberWithK(payload[0].payload.price)}`}</p>
            </div>
        );
    }
    return null;
};

// Utility function for formatting large numbers
const formatNumberWithK = (number: number) => {
    return number >= 1000 ? (number / 1000).toFixed(1) + "K" : number.toString();
};

// Main component
const LineChartComponent = () => {
    // State to manage the selected chart data and active button
    const [selectedChartData, setSelectedChartData] = useState(chartDataSets.productView);
    const [activeButton, setActiveButton] = useState<string>("productView");

    // Handler to change chart data based on the button clicked
    const handleButtonClick = (dataKey: string) => {
        setSelectedChartData(chartDataSets[dataKey]);
        setActiveButton(dataKey); // Set active button when clicked
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
                            <stop offset="10%" stopColor="#FF6500" stopOpacity={0.15} />
                            <stop offset="60%" stopColor="#FF6500" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="#E1E5EA" strokeWidth={0.8} />
                    <XAxis
                        className="text-xs font-medium text-metal-400"
                        dataKey="timeRange"
                        stroke="#8897ae"
                        strokeWidth={0.5}
                        ticks={["10:00 AM", "04:00 PM", "10:00 PM", "04:00 AM"]}
                        dy={12}
                    />
                    <YAxis
                        className="text-xs font-medium text-metal-600"
                        dataKey="price"
                        stroke="#8897ae"
                        strokeWidth={0.5}
                        dx={-10}
                        tick={{ fontSize: 12, fill: "#8897ae" }}
                        tickFormatter={formatNumberWithK}
                    />
                    <ChartTooltip content={<CustomTooltip />} />
                    <Area
                        dataKey="price"
                        type="linear"
                        stroke="#FF6500"
                        strokeWidth={0.8}
                        dot={false}
                        fillOpacity={0.5}
                        fill="url(#price)"
                    />
                </AreaChart>
            </ResponsiveContainer>

            {/* Map through button configurations to render buttons with different icons */}
            <section className="flex items-center justify-between mt-4">
                {buttonConfig.map((button, index) => (
                    <div key={index} className="relative flex items-center gap-3 bg-gray-50 rounded-lg mt-2">
                        <button.icon className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-xs ${activeButton === button.dataKey ? "text-[#FF6500]  transition-all" : "text-orange-400"}`} />
                        <div
                            onClick={() => handleButtonClick(button.dataKey)}
                            className={`py-3 pl-9 pr-4 rounded-lg w-full text-xs ${activeButton === button.dataKey ? "bg-[#ff660021] text-[#FF6500]  transition-all" : "bg-[#F9F9F9] text-orange-400"
                                }`}
                        >
                            {button.label}
                        </div>
                    </div>
                ))}
            </section>
        </section>
    );
};

export default LineChartComponent;

