import React from 'react';
import { Area, AreaChart, ResponsiveContainer } from 'keep-react';

const AreaChartComponent = ({ data }) => {
    const [chartData, chartColor] = data;

    return (
        <ResponsiveContainer width="92.5%" height={40}>
            <AreaChart data={chartData}>
                <defs>
                    <linearGradient id="price" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                    </linearGradient>
                </defs>
                <Area type="natural" dataKey="price" stroke={chartColor} fillOpacity={1} fill="url(#price)" />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default AreaChartComponent;
