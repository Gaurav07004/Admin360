"use client";

import React from 'react';

const sampleActivities = [
    { customer: 'Raj', action: 'Purchased Product A' },
    { customer: 'Priya', action: 'Added Product B to cart' },
    { customer: 'Vikas', action: 'Reviewed Product C' },
];

const CustomerActivity = () => {
    return (
        <ul>
            {sampleActivities.map((activity, index) => (
                <li key={index} className="p-2 border-b">
                    <span className="font-semibold">{activity.customer}</span> - {activity.action}
                </li>
            ))}
        </ul>
    );
};

export default CustomerActivity;
