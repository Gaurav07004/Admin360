"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const sampleData = [
    { name: 'Jan', sales: 1200 },
    { name: 'Feb', sales: 1500 },
    { name: 'Mar', sales: 1000 },
    { name: 'Apr', sales: 1800 },
    { name: 'May', sales: 1400 },
];

const TrendChart: React.FC = () => {
    return (
        <ResponsiveContainer width="100%" height={300} >
            <LineChart data={sampleData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#FF6500" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default TrendChart;
