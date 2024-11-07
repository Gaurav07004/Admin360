import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const sampleData = [
    { name: 'Electronics', value: 3000 },
    { name: 'Clothing', value: 2000 },
    { name: 'Home & Kitchen', value: 1500 },
];

const COLORS = ['#FF6500', '#FFCC00', '#FF8C00'];

const RevenueBreakdown = () => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie data={sampleData} dataKey="value" nameKey="name" outerRadius={100}>
                    {sampleData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default RevenueBreakdown;
