"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const sampleData = [
    { month: 'Jan', retention: 85 },
    { month: 'Feb', retention: 80 },
    { month: 'Mar', retention: 75 },
    { month: 'Apr', retention: 78 },
];

const RetentionChart = () => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sampleData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="retention" stroke="#FF6500" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default RetentionChart;
