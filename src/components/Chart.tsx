/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, ChartTooltip, Badge, Pie, PieChart, Cell } from "keep-react";
import { PiArrowUpRightBold, PiArrowDownRightBold, PiCircleFill } from "react-icons/pi";
import { TbArrowBadgeUpFilled, TbArrowBadgeDownFilled } from "react-icons/tb";

type DataPoint = {
    name: string,
    price: number,
};

type PieDataPoint = {
    value: number,
    name: string,
};

const formatNumberWithCommas = (number: number): string => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const formatNumberWithL = (number: number): string => {
    return number >= 100000
        ? (number / 100000).toFixed(1) + "L"
        : number.toLocaleString();
};

const data: DataPoint[] = [
    { name: `Jan'24`, price: 500000 },
    { name: `Feb'24`, price: 500000 },
    { name: `Mar'24`, price: 500000 },
    { name: `Apr'24`, price: 700000 },
    { name: `May'24`, price: 650000 },
    { name: `Jun'24`, price: 900000 },
    { name: `Jul'24`, price: 600000 },
    { name: `Aug'24`, price: 550000 },
    { name: `Sep'24`, price: 300000 },
    { name: `Oct'24`, price: 600000 },
    { name: `Nov'24`, price: 650000 },
    { name: `Dec'24`, price: 750000 },
];

const PieChartTooltip: React.FC<{ payload?: any, active?: boolean }> = ({ payload, active }) => {
    if (active && payload && payload.length) {
        const { name, value } = payload[0];
        return (
            <div className="bg-[#FF9D3D] text-white p-2 rounded text-sm">
                <p>{`${name}: ${formatNumberWithCommas(value)}`}</p>
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
                <p>{`Price: ₹${formatNumberWithCommas(payload[0].value)}`}</p>
            </div>
        );
    }
    return null;
};

const ProductSold: React.FC<{ totalRevenue: number }> = ({ totalRevenue }) => {
    const data: PieDataPoint[] = [
        { value: 2500, name: "Laptops" },
        { value: 1200, name: "Smartphones" },
        { value: 1350, name: "Tablets" },
        { value: 1500, name: "Headphones" },
    ];

    const COLORS = ["#00BCD4", "#FF9800", "#9C27B0", "#8BC34A"];
    const totalValue = data.reduce((acc, item) => acc + item.value, 0);
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

    return (
        <section className="flex justify-start items-center gap-5 w-full">
            <section className="bg-white rounded-[1rem] py-6 px-8 w-full">
                <div className="flex flex-col justify-between w-1/2 relative">
                    <p className="text-lg text-left font-semibold mb-[1.25rem] text-gray-600">Product Sold</p>
                    <div className="grid grid-cols-2 items-center gap-2">
                        <Badge className="bg-[#E0F7FA] py-[0.95rem] px-[0.3rem] w-fit rounded-lg gap-2 border-[0.0001rem] border-[#00BCD4]">
                            <PiCircleFill className="text-[#00BCD4]" /> <span className="text-slate-600 text-[0.9rem]">Laptops</span>
                        </Badge>
                        <Badge className="bg-[#FFF3E0] py-[0.95rem] px-[0.3rem] w-fit rounded-lg gap-2 border-[0.0001rem] border-[#FF9800]">
                            <PiCircleFill className="text-[#FF9800]" /> <span className="text-slate-600 text-[0.9rem]">Smartphones</span>
                        </Badge>
                        <Badge className="bg-[#F3E5F5] py-[0.95rem] px-[0.3rem] w-fit rounded-lg gap-2 border-[0.0001rem] border-[#9C27B0]">
                            <PiCircleFill className="text-[#9C27B0]" /> <span className="text-slate-600 text-[0.9rem]">Tablets</span>
                        </Badge>
                        <Badge className="bg-[#F1F8E9] py-[0.95rem] px-[0.3rem] w-fit rounded-lg gap-2 border-[0.0001rem] border-[#8BC34A]">
                            <PiCircleFill className="text-[#8BC34A]" /> <span className="text-slate-600 text-[0.9rem]">Headphones</span>
                        </Badge>
                    </div>
                    <ResponsiveContainer width="100%" height={130} className="absolute top-[0rem] left-[13rem]">
                        <PieChart>
                            <Pie cx="50%" cy="50%" outerRadius={60} innerRadius={48} paddingAngle={2} data={data} dataKey="value" nameKey="name" cornerRadius={0}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <text x="50%" y="50%" dy={0} textAnchor="middle" fill="#503C3C" fontSize="16" className="font-medium">
                                {totalValue}
                                <tspan x="50%" dy="1.2em" fill="#475569" fontSize="14">
                                    Product
                                </tspan>
                            </text>
                            <ChartTooltip content={<PieChartTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </section>
            <section className="bg-white rounded-[1rem] py-6 px-8 w-full">
                <div className="text-left text-gray-700">
                    <div className="w-full mb-[1.25rem]">
                        <div className="flex items-center justify-between">
                            <p className="text-lg font-semibold text-gray-600">Total Income</p>
                            <span
                                className={`text-xs flex items-center rounded-md px-2 py-2 ${badgeBackgroundColor} ${badgeTextColor}`}>
                                {icon}
                            </span>
                        </div>
                        <p className="text-2xl text-gray-600">₹{formatNumberWithCommas(parseFloat(totalRevenue.toFixed(2)))}</p>
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
    const totalRevenue: number = data.reduce((acc: number, item: DataPoint) => acc + item.price, 0);
    const gainedThisMonth: number = data[data.length - 1].price - data[data.length - 2].price;

    const initialPrice = data[0].price;
    const finalPrice = data[data.length - 1].price;
    const percentageChange = ((finalPrice - initialPrice) / initialPrice) * 100;

    const isPositive = percentageChange >= 0;
    const badgeColor = isPositive ? "success" : "error";
    const icon = isPositive ? <PiArrowUpRightBold /> : <PiArrowDownRightBold />;
    const badgeBackgroundColor = isPositive ? "text-green-500" : "text-red-400";
    const badgeTextColor = isPositive ? "text-green-600" : "text-red-500";

    return (
        <>
            <section className="bg-white rounded-[1rem] py-5 px-7 w-full">
                <div className="mb-4 text-left text-gray-600">
                    <p className="text-lg font-semibold mb-2">Total Revenue</p>
                    <div className="flex items-center gap-2">
                        <p className="text-3xl">₹{formatNumberWithCommas(parseFloat(totalRevenue.toFixed(2)))}</p>
                        <Badge
                            variant="border"
                            color={badgeColor}
                            className={`!py-3 !px-2 flex items-center gap-2 text-sm ${badgeBackgroundColor} ${badgeTextColor}`}
                        >
                            {icon} <span>{percentageChange.toFixed(2)}%</span>
                        </Badge>
                    </div>
                    <p className="text-xs">Gained ₹{formatNumberWithCommas(parseFloat(gainedThisMonth.toFixed(2)))} this month</p>
                </div>
                <ResponsiveContainer width="99%" height={250}>
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="price" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="10%" stopColor="#FF6500" stopOpacity={0.2} />
                                <stop offset="75%" stopColor="#FF6500" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Area type="natural" dataKey="price" stroke="#FF6500" fillOpacity={1} fill="url(#price)" strokeWidth={0.8} />
                        <XAxis className="text-xs font-medium text-metal-600" dataKey="name" stroke="#4b5563" strokeWidth={0.5} dy={12} />
                        <YAxis className="text-xs font-medium text-metal-600" dataKey="price" stroke="#4b5563" strokeWidth={0.5} dx={-10} tickFormatter={formatNumberWithL} />
                        <ChartTooltip content={<AreaChartTooltip />} />
                    </AreaChart>
                </ResponsiveContainer>
            </section>
            <ProductSold totalRevenue={totalRevenue} />
        </>
    );
};

export default AreaChartComponent;
