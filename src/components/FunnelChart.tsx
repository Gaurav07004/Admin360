"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const sampleData = [
    { stage: 'Visited', value: 200 },
    { stage: 'Added to Cart', value: 120 },
    { stage: 'Purchased', value: 90 },
];

const FunnelChart = () => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sampleData}>
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#FF6500" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default FunnelChart;
