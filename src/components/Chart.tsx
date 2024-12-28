/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, ChartTooltip, Badge, Pie, PieChart, Cell } from "keep-react";
import { PiArrowUpRightBold, PiArrowDownRightBold, PiCircleFill } from "react-icons/pi";
import { TbArrowBadgeUpFilled, TbArrowBadgeDownFilled } from "react-icons/tb";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Laptop } from "phosphor-react";

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
            <div className="bg-[#FF9D3D] text-white p-2 rounded text-sm">
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
    const { pieChartData } = useSelector((state: RootState) => state.menu);
    const { orders } = useSelector((state: RootState) => state.order);
    const { products } = useSelector((state: RootState) => state.product);

    const COLORS = ["#00BCD4", "#FF9800", "#9C27B0", "#8BC34A"];
    type Category = "Smartwatch" | "Laptop Sleeve" | "Smartphones" | "Gaming Laptops";

    const categoryStyles: Record<Category, { bgColor: string; textColor: string, border: string }> = {
        Smartwatch: { bgColor: '#F1F8E9', textColor: '#8BC34A', border: '#8BC34A' },
        "Laptop Sleeve": { bgColor: '#F3E5F5', textColor: '#9C27B0', border: '#9C27B0' },
        Smartphones: { bgColor: '#FFF3E0', textColor: '#FB8C00', border: '#FF9800' },
        "Gaming Laptops": { bgColor: '#E0F7FA', textColor: '#00BCD4', border: '#00BCD4' },
    };

    const defaultStyles = { bgColor: '#F0F0F0', textColor: '#757575' };
    // const totalValue = pieChartData?.reduce((acc, item) => acc + item.value, 0);
    const totalIncome = totalRevenue + 50000 + 50000;
    const lastYearIncome = totalRevenue + 200000;
    const percentageChange = ((totalIncome - lastYearIncome) / lastYearIncome) * 100;
    const isPositive = percentageChange >= 0;
    const icon = isPositive ? (
        <TbArrowBadgeUpFilled className="w-5 h-5 text-green-500" />
    ) : (
        <TbArrowBadgeDownFilled className="w-5 h-5 text-red-500" />
    );
    const badgeBackgroundColor = isPositive ? "bg-green-100" : "bg-red-100";
    const badgeTextColor = isPositive ? "text-green-600" : "text-red-500";

    const productSubCategoryMap = products.reduce((acc, product) => {
        acc[product.productName] = product.subcategory;
        return acc;
    }, {} as Record<string, string>);

    const orderCounts = orders.reduce((acc, order) => {
        const productName = order.itemName;
        const subcategory = productSubCategoryMap[productName] || 'Unknown';
        if (!acc[productName]) {
            acc[productName] = { count: 1, subcategory };
        } else {
            acc[productName].count += 1;
        }

        return acc;
    }, {} as Record<string, { count: number; subcategory: string }>);

    return (
        <section className="flex justify-start items-center gap-5 w-full">
            <section className="bg-white rounded-[1rem] py-6 px-8 w-full">
                <div className="flex flex-col justify-between w-[60%] relative">
                    <p className="text-lg text-left font-semibold mb-[1.25rem] text-gray-600">Product Sold</p>
                    <div className="grid grid-cols-2 items-center gap-2 w-full">
                        {Object.entries(orderCounts).map(([productName, { subcategory }]) => {
                            const { bgColor, textColor, border } = categoryStyles[subcategory as Category] || defaultStyles;

                            return (
                                <Badge
                                    key={productName}
                                    className={`py-[0.95rem] px-[0.3rem] w-full rounded-md flex items-center gap-2 border border-[${border}]`}
                                    style={{
                                        backgroundColor: bgColor,
                                    }}
                                >
                                    <PiCircleFill
                                        className="w-[10%]"
                                        style={{ color: textColor }}
                                    />
                                    <span
                                        className="text-[0.8rem] w-[90%]"
                                        style={{ color: textColor }}
                                    >
                                        {subcategory}
                                    </span>
                                </Badge>
                            );
                        })}
                    </div>
                    <ResponsiveContainer width="100%" height={130} className="absolute top-[0rem] left-[15rem]">
                        <PieChart>
                            <Pie
                                cx="50%"
                                cy="50%"
                                outerRadius={60}
                                innerRadius={48}
                                paddingAngle={2}
                                data={Object.entries(orderCounts).map(([productName, { subcategory, count }]) => ({
                                    name: subcategory,
                                    value: count
                                }))}
                                dataKey="value"
                                nameKey="name"
                                cornerRadius={0}
                            >
                                {Object.entries(orderCounts).map(([productName, { subcategory, count }], index) => {
                                    const { textColor } = categoryStyles[subcategory as Category] || defaultStyles;

                                    return (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={textColor}
                                        />
                                    );
                                })}
                            </Pie>
                            <text x="50%" y="50%" dy={0} textAnchor="middle" fill="#503C3C" fontSize="16" className="font-medium">
                                {Object.values(orderCounts).reduce((acc, { count }) => acc + count, 0)}
                                <tspan x="50%" dy="1.2em" fill="#475569" fontSize="14">
                                    Product
                                </tspan>
                            </text>
                            <ChartTooltip content={<PieChartTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>

                </div>
            </section>
            <section className="bg-white rounded-[1rem] py-6 px-8 w-[70%]">
                <div className="text-left text-gray-700">
                    <div className="w-full mb-[1.25rem]">
                        <div className="flex items-center justify-between">
                            <p className="text-lg font-semibold text-gray-600">Total Income</p>
                            <span
                                className={`text-xs flex items-center rounded-md px-2 py-2 ${badgeBackgroundColor} ${badgeTextColor}`}>
                                {icon}
                            </span>
                        </div>
                        <p className="text-2xl text-gray-600">₹{formatToKOrL(parseFloat(totalRevenue.toFixed(2)))}</p>
                    </div>
                    <div className="flex gap-4 font-semibold items-center mt-6">
                        <span
                            className={`text-xs flex items-center rounded-md px-2 py-1 ${badgeBackgroundColor} ${badgeTextColor}`}>
                            {icon} {isPositive ? "+" : "-"}{Math.abs(percentageChange).toFixed(2)}%
                        </span>
                        <span className="text-gray-600 text-xs">{isPositive ? "Increase compared to last year" : "Decrease compared to last year"}</span>
                    </div>
                </div>
            </section>

        </section>
    );
};


const AreaChartComponent: React.FC = () => {
    const { lineChartData } = useSelector((state: RootState) => state.menu);

    const totalRevenue: number = lineChartData?.reduce((acc: number, item: DataPoint) => acc + item.value, 0) || 0;
    const gainedThisMonth: number = lineChartData?.length > 1 ? lineChartData[lineChartData.length - 1].value - lineChartData[lineChartData.length - 2].value : 0;

    const initialPrice = lineChartData?.[0]?.value || 0;
    const finalPrice = lineChartData?.[lineChartData.length - 1]?.value || 0;
    const percentageChange = ((finalPrice - initialPrice) / initialPrice) * 100 || 0;

    const isPositive = percentageChange >= 0;
    const badgeColor = isPositive ? "success" : "error";
    const icon = isPositive ? <PiArrowUpRightBold /> : <PiArrowDownRightBold />;
    const badgeBackgroundColor = isPositive ? "text-green-500" : "text-red-400";
    const badgeTextColor = isPositive ? "text-green-600" : "text-red-500";

    const currentMonthIndex = new Date().getMonth();
    const reorderedData = [
        ...lineChartData.slice(currentMonthIndex + 1),
        ...lineChartData.slice(0, currentMonthIndex + 1)
    ];

    return (
        <>
            <section className="bg-white rounded-[1rem] py-5 px-7 w-full ">
                <div className="mb-4 text-left text-gray-600">
                    <p className="text-lg font-semibold mb-2">Total Revenue</p>
                    <div className="flex items-center gap-2">
                        <p className="text-3xl">₹{formatToKOrL(parseFloat(totalRevenue.toFixed(2)))}</p>
                        <Badge
                            variant="border"
                            color={badgeColor}
                            className={`!py-3 !px-2 flex items-center gap-2 text-sm ${badgeBackgroundColor} ${badgeTextColor}`}
                        >
                            {icon} <span>{percentageChange.toFixed(2)}%</span>
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
                        <XAxis className="text-xs font-medium text-metal-600" dataKey="name" stroke="#4b5563" strokeWidth={0.5} dy={12} />
                        <YAxis className="text-xs font-medium text-metal-600" dataKey="value" stroke="#4b5563" strokeWidth={0.5} dx={-10} tickFormatter={formatToKOrL} />
                        <ChartTooltip content={<AreaChartTooltip />} />
                    </AreaChart>
                </ResponsiveContainer>
            </section>
            <ProductSold totalRevenue={totalRevenue} />
        </>
    );
};

export default AreaChartComponent;