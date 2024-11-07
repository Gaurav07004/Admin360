"use client";
import React from 'react';

const sampleProducts = [
    { name: 'Product A', sales: 120 },
    { name: 'Product B', sales: 90 },
    { name: 'Product C', sales: 75 },
];

const TopProducts = () => {
    return (
        <ul>
            {sampleProducts.map((product, index) => (
                <li key={index} className="flex justify-between p-2 border-b">
                    <span>{product.name}</span>
                    <span className="font-bold">{product.sales} sold</span>
                </li>
            ))}
        </ul>
    );
};

export default TopProducts;
