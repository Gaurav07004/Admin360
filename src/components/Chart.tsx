/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
    Area,
    AreaChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    ChartTooltip,
    Badge,
    Pie,
    PieChart,
    Cell,
} from "keep-react";
import { PiArrowUpRightBold, PiCircleFill } from "react-icons/pi";

type DataPoint = {
    name: string;
    price: number;
};

type PieDataPoint = {
    value: number;
    name: string;
};

const AreaChartComponent: React.FC = () => {
    const data: DataPoint[] = [
        { name: `Jan '24`, price: 4000 },
        { name: `Feb '24`, price: 4589 },
        { name: `Mar '24`, price: 7000 },
        { name: `Apr '24`, price: 5400 },
        { name: `May '24`, price: 9000 },
        { name: `Jun '24`, price: 6501 },
        { name: `Jul '24`, price: 6000 },
        { name: `Aug '24`, price: 3000 },
        { name: `Sep '24`, price: 4080 },
    ];

    const formatNumberWithCommas = (number: number): string => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const totalRevenue: number = data.reduce((acc: number, item: DataPoint) => acc + item.price, 0);
    const gainedThisMonth: number = data[data.length - 1].price - data[data.length - 2].price;
    const initialPrice = data[0].price;
    const finalPrice = data[data.length - 1].price;
    const percentageChange = ((finalPrice - initialPrice) / initialPrice) * 100;

    const PieChartTooltip: React.FC<{ payload?: any; active?: boolean }> = ({ payload, active }) => {
        if (active && payload && payload.length) {
            const { name, value } = payload[0];
            return (
                <div className="bg-[#698474] text-white p-2 rounded text-sm">
                    <p>{`${name}: ${formatNumberWithCommas(value)}`}</p>
                </div>
            );
        }
        return null;
    };

    const AreaChartTooltip: React.FC<{ payload?: any; label?: string; active?: boolean }> = ({
        payload,
        label,
        active,
    }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#698474] text-white p-2 rounded text-sm shadow-lg">
                    <p>{label}</p>
                    <p>{`Price: ₹${formatNumberWithCommas(payload[0].value)}`}</p>
                </div>
            );
        }
        return null;
    };

    const ProductSold: React.FC = () => {
        const data: PieDataPoint[] = [
            { value: 2500, name: "Stools" },
            { value: 1200, name: "Sofas" },
            { value: 1350, name: "Chairs" },
            { value: 1500, name: "Tables" },
        ];

        const COLORS = ["#FFB300", "#8E24AA", "#E91E63", "#FB8C00"];
        const totalValue = data.reduce((acc, item) => acc + item.value, 0);

        return (
            <section className="flex justify-start items-center gap-5 w-full">
                <section className="bg-white rounded-[1rem] py-4 px-6 w-full">
                    <div className="flex flex-col justify-between w-1/2 relative">
                        <p className="text-lg text-left font-semibold mb-[2.25rem] text-gray-600">Product Sold</p>
                        <div className="grid grid-cols-2 items-center gap-2">
                            <Badge className="bg-[#FDFFD2] py-[0.95rem] px-[0.3rem] rounded-lg gap-2 border-[0.0001rem] border-[#FFAF61]">
                                <PiCircleFill className="text-[#FFD700]" />{" "}
                                <span className="text-slate-600 text-[0.9rem]">Stools</span>
                            </Badge>
                            <Badge className="bg-[#FFE5D5] py-[0.95rem] px-[0.3rem] rounded-lg gap-2 border-[0.0001rem] border-[#FF8C00]">
                                <PiCircleFill className="text-[#FF8C00]" />{" "}
                                <span className="text-slate-600 text-[0.9rem]">Sofas</span>
                            </Badge>
                            <Badge className="bg-[#FDE2E7] py-[0.95rem] px-[0.3rem] rounded-lg gap-2 border-[0.0001rem] border-[#FF69B4]">
                                <PiCircleFill className="text-[#FF69B4]" />{" "}
                                <span className="text-slate-600 text-[0.9rem]">Chairs</span>
                            </Badge>
                            <Badge className="bg-[#E6E0FF] py-[0.95rem] px-[0.3rem] rounded-lg gap-2 border-[0.0001rem] border-[#9370DB]">
                                <PiCircleFill className="text-[#9370DB]" />{" "}
                                <span className="text-slate-600 text-[0.9rem]">Tables</span>
                            </Badge>
                        </div>
                        <ResponsiveContainer width="100%" height={150} className="absolute top-[0rem] left-[13rem]">
                            <PieChart>
                                <Pie
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={62}
                                    innerRadius={48}
                                    paddingAngle={2}
                                    data={data}
                                    dataKey="value"
                                    nameKey="name"
                                    cornerRadius={50}
                                >
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
                <section className="bg-white rounded-[1rem] py-4 px-6 w-full">
                    <div className="text-left text-gray-600">
                        <div className="flex items-center justify-between w-full mb-2">
                            <p className="text-lg font-semibold">Total Income</p>
                            <Badge
                                variant="border"
                                color="success"
                                className="!py-[0.8rem] !px-2 flex items-center gap-2 text-sm rounded-md border border-green-500"
                            >
                                <PiArrowUpRightBold />
                            </Badge>
                        </div>
                        <p className="text-3xl">₹590,570.00</p>
                        <p className="text-xs mt-[3rem] mb-0">24% increase compared to last Year</p>
                    </div>
                </section>
            </section>
        );
    };

    return (
        <>
            <section className="bg-white rounded-[1rem] py-4 px-6 w-full">
                <div className="mb-4 text-left text-gray-600">
                    <p className="text-lg font-semibold mb-2">Total Revenue</p>
                    <div className="flex items-center gap-2">
                        <p className="text-3xl">₹{formatNumberWithCommas(parseFloat(totalRevenue.toFixed(2)))}</p>

                        <Badge variant="border" color="success" className="!py-3 !px-2 flex items-center gap-2 text-sm">
                            <PiArrowUpRightBold /> <span>{percentageChange.toFixed(2)}%</span>
                        </Badge>
                    </div>
                    <p className="text-xs">Gained ₹{formatNumberWithCommas(parseFloat(gainedThisMonth.toFixed(2)))} this month</p>
                </div>
                <ResponsiveContainer width="99%" height={250}>
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="price" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="10%" stopColor="#698474" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#698474" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Area type="natural" dataKey="price" stroke="#698474" fillOpacity={1} fill="url(#price)" />
                        <XAxis className="text-body-4 font-medium text-metal-600" dataKey="name" stroke="#698474" strokeWidth={0.5} dy={12} />
                        <YAxis
                            className="text-body-4 font-medium text-metal-600"
                            dataKey="price"
                            stroke="#698474"
                            strokeWidth={0.5}
                            dx={-10}
                            tickFormatter={(value: number) => `₹${formatNumberWithCommas(value)}`}
                        />
                        <ChartTooltip content={<AreaChartTooltip />} />
                    </AreaChart>
                </ResponsiveContainer>
            </section>
            <ProductSold />
        </>
    );
};

export default AreaChartComponent;
