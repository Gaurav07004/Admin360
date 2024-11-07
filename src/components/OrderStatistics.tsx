"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const sampleData = [
    { status: 'Completed', count: 120 },
    { status: 'Pending', count: 60 },
    { status: 'Canceled', count: 20 },
];

const OrderStatistics = () => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sampleData}>
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#FF6500" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default OrderStatistics;
