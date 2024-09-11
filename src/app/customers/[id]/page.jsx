// src/app/customers/[id]/page.js
"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const customers = [
    { id: 1, name: "John Doe", email: "john@example.com", details: "Customer details for John Doe" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", details: "Customer details for Jane Smith" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", details: "Customer details for Alice Johnson" },
];

const CustomerDetailPage = () => {
    const router = useRouter();
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Access the dynamic segment directly from the URL
        const path = window.location.pathname;
        const id = path.split('/').pop(); // Extract the ID from the URL
        console.log("ID from URL:", id);

        if (id) {
            const customerId = Number(id);
            const foundCustomer = customers.find(cust => cust.id === customerId);
            setCustomer(foundCustomer || null);
            setLoading(false);
        } else {
            console.error("No ID found in URL");
            setCustomer(null);
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!customer) {
        return <p>Customer not found.</p>;
    }

    return (
        <div className='text-blue-600'>
            <h1>{customer.name}</h1>
            <p>Email: {customer.email}</p>
            <p>Details: {customer.details}</p>
            <button onClick={() => router.back()}>Go back</button>
        </div>
    );
};

export default CustomerDetailPage;
