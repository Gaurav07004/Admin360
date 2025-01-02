/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Pie, PieChart, Cell } from "recharts";
import { ChartTooltip, Badge } from "keep-react";
import json from "../../demo.json"
import { PiArrowUpRightBold, PiArrowDownRightBold, PiCircleFill } from "react-icons/pi";
import { TbArrowBadgeUpFilled, TbArrowBadgeDownFilled } from "react-icons/tb";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type DataPoint = {
    name: string,
    value: number,
};

const formatToKOrL = (value: number): string => {
    if (value >= 100000) {
        return `${(value / 100000).toFixed(2)}L`;
    } else if (value >= 1000) {
        return `${(value / 1000).toFixed(2)}K`;
    }
    return value.toString();
};

const PieChartTooltip: React.FC<{ payload?: any, active?: boolean }> = ({ payload, active }) => {
    if (active && payload && payload.length) {
        const { name, value } = payload[0];
        return (
            <div className="bg-[#FF9D3D] text-white p-2 rounded text-sm z-50">
                <p>{`${name}: ${formatToKOrL(value)}`}</p>
            </div>
        );
    }
    return null;
};

const AreaChartTooltip: React.FC<{ payload?: any, label?: string, active?: boolean }> = ({ payload, label, active }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#FF9D3D] text-white p-2 rounded text-sm shadow-lg border-[1.5px] border-[#FF6500]">
                <p>{label}</p>
                <p>{`Price: ₹${formatToKOrL(payload[0].value)}`}</p>
            </div>
        );
    }
    return null;
};

const ProductSold: React.FC<{ totalRevenue: number }> = ({ totalRevenue }) => {
    const { orders } = useSelector((state: RootState) => state.order);

    const getBadgeColor = (subcategory: string) => {
        switch (subcategory) {
            case 'Dell Inspiron 15':
                return "#8BC34A";
            case 'Apple IPhone 15':
                return "#FB8C00";
            case 'Targus Laptop Sleeve':
                return "#00BCD4";
            case 'Samsung Galaxy Watch 5':
                return "#9C27B0";
            default:
                return "#757575";
        }
    };

    const totalIncome = totalRevenue + 500000 + 500000;
    const lastYearIncome = totalRevenue + 200000;
    const percentageChange = ((totalIncome - lastYearIncome) / lastYearIncome) * 100;
    const isPositive = percentageChange >= 0;
    const icon = isPositive ? (
        <TbArrowBadgeUpFilled className="w-5 h-5 text-green-500 dark:text-green-400" />
    ) : (
        <TbArrowBadgeDownFilled className="w-5 h-5 text-red-500 dark:text-red-400" />
    );
    const badgeBackgroundColor = isPositive ? "bg-green-100 dark:bg-green-800" : "bg-red-100 dark:bg-red-800";
    const badgeTextColor = isPositive ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400";

    const currentOrders = orders && orders.length > 0 ? orders : json;
    const itemCountMap = currentOrders.reduce((acc, product) => {
        if (acc[product.itemName]) {
            acc[product.itemName]++;
        } else {
            acc[product.itemName] = 1;
        }

        return acc;
    }, {} as Record<string, number>);

    return (
        <section className="flex justify-start items-center gap-5 w-full">
            <section className="bg-white dark:bg-[#263445] rounded-[1rem] py-6 px-8 w-full h-auto min-h-[7.6rem]">
                <div className="flex flex-col justify-between w-[75%] relative h-auto min-h-[7.6rem]">
                    <p className="text-lg text-left font-semibold mb-[1.25rem] text-gray-600 dark:text-gray-300">Product Sold</p>
                    <div className="flex flex-wrap items-center gap-2 w-full">
                        {Object.entries(itemCountMap).map(([itemName]) => {
                            const badgeColor = getBadgeColor(itemName);

                            const getBadgeClasses = () => {
                                switch (badgeColor) {
                                    case '#8BC34A':
                                        return 'border-green-300 dark:border-green-600 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200';
                                    case '#FB8C00':
                                        return 'border-orange-300 dark:border-orange-600 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200';
                                    case '#00BCD4':
                                        return 'border-cyan-300 dark:border-cyan-600 bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-200';
                                    case '#9C27B0':
                                        return 'border-purple-300 dark:border-purple-600 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200';
                                    default:
                                        return 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200';
                                }
                            };

                            return (
                                <div
                                    key={itemName}
                                    className={`text-[0.73rem] py-[0.44rem] rounded-md flex w-[10.5rem] items-center gap-2 border font-medium px-2 ${getBadgeClasses()}`}
                                >
                                    <PiCircleFill
                                        className={`text-[0.4rem] ${badgeColor}`}
                                    />
                                    {itemName}
                                </div>
                            );
                        })}
                    </div>
                    <ResponsiveContainer width="100%" height="100%" className="absolute top-2 left-60 flex justify-center items-center">
                        <PieChart>
                            <Pie
                                cx="50%"
                                cy="50%"
                                outerRadius={60}
                                innerRadius={48}
                                paddingAngle={2}
                                data={Object.entries(itemCountMap).map(([itemName, count]) => ({
                                    name: itemName,
                                    value: count
                                }))}
                                dataKey="value"
                                nameKey="name"
                                cornerRadius={0}
                            >
                                {Object.entries(itemCountMap).map(([itemName], index) => {
                                    const badgeColor = getBadgeColor(itemName);

                                    return (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={badgeColor}
                                        />
                                    );
                                })}
                            </Pie>
                            <ChartTooltip content={<PieChartTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute z-0 text-center top-[4.2rem] left-[25.8rem] transform -translate-x-1/2 -translate-y-1/2">
                        <div className="font-medium text-[16px] text-gray-600 dark:text-gray-300">
                            {Object.values(itemCountMap).reduce((acc, count) => acc + count, 0)}
                        </div>
                        <div className="text-[14px] font-medium text-gray-600 dark:text-gray-300">
                            Product
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-white rounded-[1rem] py-6 px-6 w-[60%] dark:bg-[#263445]">
                <div className="text-left">
                    <div className="w-full mb-[1.25rem]">
                        <div className="flex justify-between">
                            <p className="text-[1.1rem] font-semibold text-gray-600 dark:text-gray-300">Total Income</p>
                            <span
                                className={`text-xs flex items-center rounded-md px-2 py-2 ${badgeBackgroundColor} ${badgeTextColor}`}>
                                {icon}
                            </span>
                        </div>
                        <p className="text-2xl text-gray-600 dark:text-gray-300">₹{formatToKOrL(parseFloat(totalIncome.toFixed(2)))}</p>
                    </div>
                    <div className="flex gap-4 font-semibold items-center mt-6">
                        <span
                            className={`text-xs flex items-center rounded-md px-2 py-1 ${badgeBackgroundColor} ${badgeTextColor}`}>
                            {icon} {isPositive ? "+" : "-"}{Math.abs(percentageChange).toFixed(2)}%
                        </span>
                        <span className="text-gray-600 dark:text-gray-300 text-xs">{isPositive ? "Increase compared to last year" : "Decrease compared to last year"}</span>
                    </div>
                </div>
            </section>
        </section >
    );
};


const AreaChartComponent: React.FC = () => {
    const { lineChartData } = useSelector((state: RootState) => state.menu);

    const currentMonthIndex = new Date().getMonth();
    const reorderedData = [
        ...lineChartData.slice(currentMonthIndex + 1),
        ...lineChartData.slice(0, currentMonthIndex + 1)
    ];

    const totalRevenue: number = reorderedData?.reduce((acc: number, item: DataPoint) => acc + item.value, 0) || 0;
    const gainedThisMonth: number = reorderedData?.length > 1 ? reorderedData[reorderedData.length - 1].value - reorderedData[reorderedData.length - 2].value : 0;

    const initialPrice = reorderedData?.[0]?.value || 0;
    const finalPrice = reorderedData?.[reorderedData.length - 1]?.value || 0;
    const percentageChange = ((finalPrice - initialPrice) / initialPrice) * 100 || 0;

    const isPositive = percentageChange >= 0;
    const badgeColor = isPositive ? "success" : "error";
    const icon = isPositive ? <PiArrowUpRightBold /> : <PiArrowDownRightBold />;
    const badgeBackgroundColor = isPositive ? "bg-green-100 dark:bg-green-800" : "bg-red-100 dark:bg-red-800";
    const badgeTextColor = isPositive ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400";

    return (
        <>
            <section className="bg-white rounded-[1rem] py-5 px-7 w-full dark:bg-[#263445]">
                <div className="mb-4 text-left text-gray-600 dark:text-gray-300">
                    <p className="text-[1.1rem] font-semibold mb-2 ">Total Revenue</p>
                    <div className="flex items-center gap-2">
                        <p className="text-3xl">₹{formatToKOrL(parseFloat(totalRevenue.toFixed(2)))}</p>
                        <Badge
                            variant="border"
                            color={badgeColor}
                            className={`text-xs flex items-center rounded-md px-2 py-1  ${badgeBackgroundColor} ${badgeTextColor}`}
                        >
                            {icon}
                            <span className="text-xs font-medium">
                                {percentageChange.toFixed(2)}%
                            </span>
                        </Badge>

                    </div>
                    <p className="text-xs">Gained ₹{formatToKOrL(parseFloat(gainedThisMonth.toFixed(2)))} this month</p>
                </div>
                <ResponsiveContainer width="99%" height={250}>
                    <AreaChart data={reorderedData}>
                        <defs>
                            <linearGradient id="price" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="10%" stopColor="#FF6500" stopOpacity={0.2} />
                                <stop offset="75%" stopColor="#FF6500" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Area type="natural" dataKey="value" stroke="#FF6500" fillOpacity={1} fill="url(#price)" strokeWidth={0.8} />
                        <XAxis className="text-xs font-medium" dataKey="name" strokeWidth={0.5} tickFormatter={(value) => value.slice(0, 3)} dy={12} />
                        <YAxis className="text-xs font-medium" dataKey="value" strokeWidth={0.5} dx={-10} tickFormatter={formatToKOrL} />
                        <ChartTooltip content={<AreaChartTooltip />} />
                    </AreaChart>
                </ResponsiveContainer>
            </section>
            <ProductSold totalRevenue={totalRevenue} />
        </>
    );
};

export default AreaChartComponent;