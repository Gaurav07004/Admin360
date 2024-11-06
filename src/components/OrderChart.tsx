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
    OrderRunning: {
        label: 'OrderRunning',
        color: '#006A67',
    },
    OnProcess: {
        label: 'OnProcess',
        color: '#D76C82',
    },
};

const chartData = [
    { month: 'January', OrderRunning: 100, OnProcess: 70 },
    { month: 'February', OrderRunning: 160, OnProcess: 120 },
    { month: 'March', OrderRunning: 130, OnProcess: 90 },
    { month: 'April', OrderRunning: 70, OnProcess: 190 },
    { month: 'May', OrderRunning: 110, OnProcess: 150 },
    { month: 'June', OrderRunning: 140, OnProcess: 100 },
    { month: 'July', OrderRunning: 170, OnProcess: 130 },
    { month: 'August', OrderRunning: 120, OnProcess: 160 },
    { month: 'September', OrderRunning: 160, OnProcess: 110 },
    { month: 'October', OrderRunning: 130, OnProcess: 180 },
    { month: 'November', OrderRunning: 110, OnProcess: 130 },
    { month: 'December', OrderRunning: 150, OnProcess: 110 },
];


// Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#006989] text-white p-2 rounded text-sm shadow-lg">
                <h4 className="font-bold">{payload[0].payload.month}</h4>
                <p className="text-white">{`${chartConfig.OrderRunning.label}: ${payload[0].payload.OrderRunning}`}</p>
                <p className="text-white">{`${chartConfig.OnProcess.label}: ${payload[1].payload.OnProcess}`}</p>
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
                    <Bar radius={[0, 0, 0, 0]} barSize={10} dataKey="OrderRunning" stackId="a" fill={chartConfig.OrderRunning.color} />
                    <Bar radius={[8, 8, 0, 0]} barSize={10} dataKey="OnProcess" stackId="a" fill={chartConfig.OnProcess.color} />
                </BarChart>
            </ResponsiveContainer>

        </>
    );
};

export default BarChartComponent;
