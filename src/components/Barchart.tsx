import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaCircle } from "react-icons/fa";


type ChartConfig = {
    [key: string]: {
        label: string;
        color: string;
    };
};

const chartConfig: ChartConfig = {
    desktop: {
        label: 'Desktop',
        color: '#006A67',
    },
    mobile: {
        label: 'Mobile',
        color: '#D76C82',
    },
};

const chartData = [
    { month: 'January', desktop: 100, mobile: 70 },
    { month: 'February', desktop: 160, mobile: 120 },
    { month: 'March', desktop: 130, mobile: 90 },
    { month: 'April', desktop: 70, mobile: 190 },
    { month: 'May', desktop: 110, mobile: 150 },
    { month: 'June', desktop: 140, mobile: 100 },
    { month: 'July', desktop: 170, mobile: 130 },
    { month: 'August', desktop: 120, mobile: 160 },
    { month: 'September', desktop: 160, mobile: 110 },
    { month: 'October', desktop: 130, mobile: 180 },
    { month: 'November', desktop: 110, mobile: 130 },
    { month: 'December', desktop: 150, mobile: 110 },
];


// Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#006989] text-white p-2 rounded text-sm shadow-lg">
                <h4 className="font-bold">{payload[0].payload.month}</h4>
                <p className="text-white">{`${chartConfig.desktop.label}: ${payload[0].payload.desktop}`}</p>
                <p className="text-white">{`${chartConfig.mobile.label}: ${payload[1].payload.mobile}`}</p>
            </div>
        );
    }
    return null;
};

const BarChartComponent: React.FC = () => {
    return (
        <>
            <div className='flex items-center justify-between mb-[2rem]'>
                <div className="text-[#5e6574] font-bold text-2xl">Orders</div>
                <div className="flex items-center justify-between gap-5">
                    <span className='text-sm text-[#006A67] flex items-center justify-between gap-2' ><FaCircle />Order Running</span>
                    <span className='text-sm text-[#D76C82] flex items-center justify-between gap-2' ><FaCircle />On Process</span>
                </div>
                <button className="flex items-center py-2 px-5 text-sm text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-100 border border-gray-300">Monthly</button>
            </div>
            <ResponsiveContainer className="mx-auto w-[600px]" height={200}>
                <BarChart data={chartData}>
                    <CartesianGrid vertical={false} stroke="#E1E5EA" />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <YAxis tickLine={false} tickMargin={24} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar radius={[0, 0, 0, 0]} barSize={10} dataKey="desktop" stackId="a" fill={chartConfig.desktop.color} />
                    <Bar radius={[8, 8, 0, 0]} barSize={10} dataKey="mobile" stackId="a" fill={chartConfig.mobile.color} />
                </BarChart>
            </ResponsiveContainer>

        </>
    );
};

export default BarChartComponent;
