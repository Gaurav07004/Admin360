import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaCircle } from "react-icons/fa";
import { RootState } from '../redux/store';
import { useSelector } from "react-redux";

type ChartConfig = {
    [key: string]: {
        label: string;
        color: string;
    };
};

const chartConfig: ChartConfig = {
    sold: {
        label: 'Sold',
        color: '#384B70',
    },
    returned: {
        label: 'Returned',
        color: '#D8A25E',
    },
};

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#333] text-white dark:text-gray-300 p-2 rounded text-sm shadow-lg">
                <h4 className="font-bold">{payload[0].payload.month}</h4>
                <p>{`${chartConfig.sold.label}: ${payload[0].payload.sold}`}</p>
                <p>{`${chartConfig.returned.label}: ${payload[1].payload.returned}`}</p>
            </div>
        );
    }
    return null;
};
const BarChartComponent: React.FC = () => {
    const { productMonthlyData } = useSelector((state: RootState) => state.product);

    const currentMonthIndex = new Date().getMonth();
    const reorderedData = [
        ...productMonthlyData.slice(currentMonthIndex + 1),
        ...productMonthlyData.slice(0, currentMonthIndex + 1)
    ];

    return (
        <>
            <div className='flex items-center justify-between mb-8'>
                <div className="text-[#5e6574] dark:text-gray-300 font-bold text-2xl">Product Sales Overview</div>
                <div className="flex items-center gap-5">
                    <span className='text-sm text-[#384B70] flex items-center gap-2'><FaCircle /> Sold</span>
                    <span className='text-sm text-[#D8A25E] flex items-center gap-2'><FaCircle /> Returned</span>
                </div>
                <button className="flex items-center py-2 px-5 text-sm text-gray-500 dark:bg-[#263445] dark:text-gray-300 bg-gray-100 rounded-lg hover:bg-gray-100 dark:hover:bg-[#263445] border border-gray-500">Monthly</button>
            </div>
            <ResponsiveContainer className="mx-auto w-[600px]" height={200}>
                <BarChart data={reorderedData}>
                    <CartesianGrid vertical={false} stroke="#E1E5EA" strokeWidth={0.5} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <YAxis tickLine={false} tickMargin={24} axisLine={false} />
                    <Tooltip content={<CustomTooltip active={undefined} payload={undefined} />} />
                    <Bar radius={[0, 0, 0, 0]} barSize={10} dataKey="sold" stackId="a" fill={chartConfig.sold.color} />
                    <Bar radius={[8, 8, 0, 0]} barSize={10} dataKey="returned" stackId="a" fill={chartConfig.returned.color} />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
};

export default BarChartComponent;
