import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaCircle } from "react-icons/fa";

type ChartConfig = {
    [key: string]: {
        label: string;
        color: string;
    };
};

const chartConfig: ChartConfig = {
    Sold: {
        label: 'Sold',
        color: '#384B70',
    },
    Returned: {
        label: 'Returned',
        color: '#D8A25E',
    },
};


const chartData = [
    { month: 'January', Sold: 150, Returned: 50 },
    { month: 'February', Sold: 180, Returned: 60 },
    { month: 'March', Sold: 130, Returned: 75 },
    { month: 'April', Sold: 200, Returned: 85 },
    { month: 'May', Sold: 170, Returned: 65 },
    { month: 'June', Sold: 210, Returned: 70 },
    { month: 'July', Sold: 190, Returned: 80 },
    { month: 'August', Sold: 220, Returned: 75 },
    { month: 'September', Sold: 160, Returned: 90 },
    { month: 'October', Sold: 200, Returned: 65 },
    { month: 'November', Sold: 210, Returned: 55 },
    { month: 'December', Sold: 230, Returned: 50 },
];

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#333] text-white p-2 rounded text-sm shadow-lg">
                <h4 className="font-bold">{payload[0].payload.month}</h4>
                <p>{`${chartConfig.Sold.label}: ${payload[0].payload.Sold}`}</p>
                <p>{`${chartConfig.Returned.label}: ${payload[1].payload.Returned}`}</p>
            </div>
        );
    }
    return null;
};

const BarChartComponent: React.FC = () => {
    return (
        <>
            <div className='flex items-center justify-between mb-8'>
                <div className="text-[#5e6574] font-bold text-2xl">Product Sales Overview</div>
                <div className="flex items-center gap-5">
                    <span className='text-sm text-[#384B70] flex items-center gap-2'><FaCircle /> Sold</span>
                    <span className='text-sm text-[#D8A25E] flex items-center gap-2'><FaCircle /> Returned</span>
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
                    <Tooltip content={<CustomTooltip active={undefined} payload={undefined} />} />
                    <Bar radius={[0, 0, 0, 0]} barSize={10} dataKey="Sold" stackId="a" fill={chartConfig.Sold.color} />
                    <Bar radius={[8, 8, 0, 0]} barSize={10} dataKey="Returned" stackId="a" fill={chartConfig.Returned.color} />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
};

export default BarChartComponent;
