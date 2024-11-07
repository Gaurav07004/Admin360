"use client";

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const sampleData = [
    { name: 'Male', value: 60 },
    { name: 'Female', value: 30 },
    { name: 'Other', value: 10 },
];

const COLORS = ['#FF6500', '#FFCC00', '#FF8C00'];

const DemographicsChart = () => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie data={sampleData} dataKey="value" nameKey="name" outerRadius={100} fill="#FF6500">
                    {sampleData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default DemographicsChart;
