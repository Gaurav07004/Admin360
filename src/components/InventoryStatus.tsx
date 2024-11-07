"use client";
import React from 'react';

const sampleInventory = [
    { product: 'Laptop', stock: 20 },
    { product: 'Phone', stock: 35 },
    { product: 'Headphones', stock: 50 },
];

const InventoryStatus = () => {
    return (
        <ul>
            {sampleInventory.map((item, index) => (
                <li key={index} className="flex justify-between p-2 border-b">
                    <span>{item.product}</span>
                    <span>{item.stock} in stock</span>
                </li>
            ))}
        </ul>
    );
};

export default InventoryStatus;
