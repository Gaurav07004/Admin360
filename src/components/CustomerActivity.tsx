/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { ResponsiveContainer, XAxis, YAxis, Tooltip as ChartTooltip, CartesianGrid, Area, AreaChart } from "recharts";
import { FiShoppingCart, FiCheckCircle, FiEye } from "react-icons/fi";
import { CgNotes } from "react-icons/cg";
import { toast } from "keep-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setAddToCart } from "@/redux/slices/commonSlice";
import { Skeleton, SkeletonLine } from 'keep-react'

type ChartDataKey = 'productView' | 'addToCart' | 'checkout' | 'purchase';

interface ChartData {
    timeRange: string;
    price?: number;
    productView?: number;
    addToCart?: number;
    checkout?: number;
    purchase?: number;
}

interface ButtonConfig {
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    dataKey: ChartDataKey;
}

const buttonConfig: ButtonConfig[] = [
    { label: "Product View", icon: FiEye, dataKey: "productView" },
    { label: "Add to Cart", icon: FiShoppingCart, dataKey: "addToCart" },
    { label: "Checkout", icon: CgNotes, dataKey: "checkout" },
    { label: "Purchase", icon: FiCheckCircle, dataKey: "purchase" },
];

const formatNumberWithK = (number: number) => {
    return number >= 1000 ? (number / 1000).toFixed(1) + "K" : number.toString();
};

const SalesFunnelChart = () => {
    const dispatch = useDispatch();
    const { addToCart } = useSelector((state: RootState) => state.menu);
    const [selectedChartData, setSelectedChartData] = useState<ChartData[]>([]);
    const [activeButton, setActiveButton] = useState<ChartDataKey>("productView");
    const [isLoading, setIsLoading] = useState(true);

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
                const response = await fetch("http://localhost:3000/api/auth/analysis", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    dispatch(setAddToCart(data));
                } else {
                    toast.error("Failed to fetch data.", { position: "top-right" });
                }
            } catch (error) {
                toast.error("Unable to connect. Please check your network.", { position: "top-right" });
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [dispatch]);

    useEffect(() => {
        if (!isLoading && addToCart.length > 0) {
            const chartDataSets: Record<ChartDataKey, ChartData[]> = {
                productView: addToCart.map((item) => ({ timeRange: item.timeRange, price: item.productView })),
                addToCart: addToCart.map((item) => ({ timeRange: item.timeRange, price: item.addToCart })),
                checkout: addToCart.map((item) => ({ timeRange: item.timeRange, price: item.checkout })),
                purchase: addToCart.map((item) => ({ timeRange: item.timeRange, price: item.purchase })),
            };
            setSelectedChartData(chartDataSets.productView);
        }
    }, [addToCart, isLoading]);

    const handleButtonClick = (dataKey: ChartDataKey) => {
        const chartDataSets: Record<ChartDataKey, ChartData[]> = {
            productView: addToCart.map((item) => ({ timeRange: item.timeRange, price: item.productView })),
            addToCart: addToCart.map((item) => ({ timeRange: item.timeRange, price: item.addToCart })),
            checkout: addToCart.map((item) => ({ timeRange: item.timeRange, price: item.checkout })),
            purchase: addToCart.map((item) => ({ timeRange: item.timeRange, price: item.purchase })),
        };
        setSelectedChartData(chartDataSets[dataKey]);
        setActiveButton(dataKey);
    };

    const getColor = (dataKey: ChartDataKey) => {
        const colors = {
            productView: {
                stroke: "#FF9800",
                stopColor: "#FF9800",
            },
            addToCart: {
                stroke: "#00BFAE",
                stopColor: "#00BFAE",
            },
            checkout: {
                stroke: "#3D5AFE",
                stopColor: "#3D5AFE",
            },
            purchase: {
                stroke: "#FF4081",
                stopColor: "#FF4081",
            },
        };

        return colors[dataKey] || {
            stroke: "#757575",
            stopColor: "#757575",
        };
    };

    const CustomTooltip = ({ active, payload }: { active: boolean, payload: any[] }) => {
        if (active && payload && payload.length) {
            return (
                <div className={`bg-[#ff6600a9] text-white p-2 rounded text-xs shadow-lg`}>
                    <p>{`${formatNumberWithK(payload[0].payload.price)}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <section className="bg-white dark:bg-[#263445] rounded-[1rem] py-5 px-7 w-full">
            <div className="mb-4 text-left text-gray-600 dark:text-gray-300">
                <p className="text-lg font-semibold mb-2">Sales Funnel</p>
            </div>
            {isLoading || selectedChartData.length === 0 ? (
                <Skeleton className="max-w-xl space-y-2.5">
                    <SkeletonLine className="h-4 w-full" />
                    <SkeletonLine className="h-4 w-full" />
                    <SkeletonLine className="h-4 w-3/5" />
                    <SkeletonLine className="h-4 w-4/5" />
                    <SkeletonLine className="h-10 w-2/5" />
                </Skeleton>
            ) : (
                <>
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={selectedChartData} className="!p-0" key={activeButton}>
                            <defs>
                                <linearGradient id="price" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="10%" stopColor={getColor(activeButton).stopColor} stopOpacity={0.2} />
                                    <stop offset="80%" stopColor={getColor(activeButton).stopColor} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} stroke="#E1E5EA" strokeWidth={0} />
                            <XAxis className="text-xs font-medium text-metal-400" dataKey="timeRange" stroke="#8897ae" strokeWidth={0.5} ticks={["08:00 AM", "12:00 PM", "04:00 PM", "08:00 PM", "12:00 AM", "04:00 AM"]} dy={12} />
                            <YAxis className="text-xs font-medium text-metal-600" dataKey="price" stroke="#8897ae" strokeWidth={0.5} dx={-10} tick={{ fontSize: 12, fill: "#8897ae" }} tickFormatter={formatNumberWithK} />
                            <ChartTooltip content={<CustomTooltip active={false} payload={[]} />} />
                            <Area dataKey="price" type="natural" stroke={getColor(activeButton).stroke} strokeWidth={0.8} dot={false} fillOpacity={0.5} fill="url(#price)" isAnimationActive={true} />
                            <Area dataKey="price" type="natural" stroke={getColor(activeButton).stroke} strokeWidth={0.8} dot={false} fillOpacity={0.5} fill="url(#price)" isAnimationActive={true} />
                        </AreaChart>
                    </ResponsiveContainer>
                    <section className="flex flex-wrap items-center justify-between mt-[3rem] gap-4">
                        {buttonConfig.map((data, index) => (
                            <div key={index} className={`relative flex items-center gap-3 rounded-lg transition-all ${activeButton === data.dataKey ? "bg-[#FF660021] text-[#FF6500]" : "bg-gray-100 dark:bg-slate-700 text-orange-400"}`}>
                                <data.icon className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-base transition-all ${activeButton === data.dataKey ? "text-[#FF6500]" : "text-orange-400"}`} />
                                <button
                                    onClick={() => handleButtonClick(data.dataKey)}
                                    className={`py-3 pl-10 pr-6 rounded-lg w-full text-xs font-medium text-left transition-all ${activeButton === data.dataKey ? "text-[#FF6500]" : "text-orange-400"}`}
                                    aria-pressed={activeButton === data.dataKey}
                                >
                                    {data.label}
                                </button>
                            </div>
                        ))}
                    </section>
                </>
            )}
        </section>
    );
};

export default SalesFunnelChart;
