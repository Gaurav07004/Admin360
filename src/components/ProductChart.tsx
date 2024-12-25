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


// const chartData = [
//     { month: 'January', sold: 150, returned: 50 },
//     { month: 'February', sold: 180, returned: 60 },
//     { month: 'March', sold: 130, returned: 75 },
//     { month: 'April', sold: 200, returned: 85 },
//     { month: 'May', sold: 170, returned: 65 },
//     { month: 'June', sold: 210, returned: 70 },
//     { month: 'July', sold: 190, returned: 80 },
//     { month: 'August', sold: 220, returned: 75 },
//     { month: 'September', sold: 160, returned: 90 },
//     { month: 'October', sold: 200, returned: 65 },
//     { month: 'November', sold: 210, returned: 55 },
//     { month: 'December', sold: 230, returned: 50 },
// ];

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#333] text-white p-2 rounded text-sm shadow-lg">
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

    console.log("productMonthlyData", productMonthlyData)

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
                <BarChart data={productMonthlyData}>
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
                    <Bar radius={[0, 0, 0, 0]} barSize={10} dataKey="sold" stackId="a" fill={chartConfig.sold.color} />
                    <Bar radius={[8, 8, 0, 0]} barSize={10} dataKey="returned" stackId="a" fill={chartConfig.returned.color} />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
};

export default BarChartComponent;
