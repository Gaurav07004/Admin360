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
    OrderRunning: {
        label: 'OrderRunning',
        color: '#006A67',
    },
    OnProcess: {
        label: 'OnProcess',
        color: '#D76C82',
    },
};

const CustomTooltip = ({
    active,
    payload,
}: {
    active?: boolean;
    payload?: { payload: { month: string; OrderRunning: number; OnProcess: number } }[];
}) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#006989] text-white p-2 rounded text-sm shadow-lg">
                <h4 className="font-bold">{payload[0].payload.month}</h4>
                <p className="text-white">{`Order Running: ${payload[0].payload.OrderRunning}`}</p>
                <p className="text-white">{`On Process: ${payload[1].payload.OnProcess}`}</p>
            </div>
        );
    }
    return null;
};

const BarChartComponent: React.FC = () => {
    const { orderMonthlyData } = useSelector((state: RootState) => state.order);
    const currentMonthIndex = new Date().getMonth();
    const reorderedData = [
        ...orderMonthlyData.slice(currentMonthIndex + 1),
        ...orderMonthlyData.slice(0, currentMonthIndex + 1)
    ];

    return (
        <>
            <div className='flex items-center justify-between mb-[2rem] dark:bg-[#263445]'>
                <div className="text-[#5e6574] dark:text-gray-300 font-bold text-2xl">Orders</div>
                <div className="flex items-center justify-between gap-5">
                    <span className='text-sm text-[#006A67] flex items-center justify-between gap-2' ><FaCircle />Order Running</span>
                    <span className='text-sm text-[#D76C82] flex items-center justify-between gap-2' ><FaCircle />On Process</span>
                </div>
                <button className="flex items-center py-2 px-5 text-sm text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-[#263445] rounded-lg hover:bg-gray-100 hover:dark:bg-[#263445] border border-gray-500">Monthly</button>
            </div>
            <ResponsiveContainer className="mx-auto w-[600px] dark:bg-[#263445] dark:text-gray-300" height={200}>
                <BarChart data={reorderedData} className='dark:text-gray-300'>
                    <CartesianGrid vertical={false} stroke="#E1E5EA" strokeWidth={0.5} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                        className='dark:text-gray-300'
                    />
                    <YAxis tickLine={false} tickMargin={24} axisLine={false} className='dark:text-gray-300' />
                    <Tooltip content={<CustomTooltip active={undefined} payload={undefined} />} />
                    <Bar radius={[0, 0, 0, 0]} barSize={10} dataKey="OrderRunning" stackId="a" fill={chartConfig.OrderRunning.color} />
                    <Bar radius={[8, 8, 0, 0]} barSize={10} dataKey="OnProcess" stackId="a" fill={chartConfig.OnProcess.color} />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
};

export default BarChartComponent;
