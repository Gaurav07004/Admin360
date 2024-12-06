import React from 'react';
import TableComponent from '@/components/table';
// import Image from 'next/image';

const columns = [
    { id: 'id', label: 'Sr. No' },
    { id: 'product', label: 'Product' },
    { id: 'date', label: 'Date' },
    { id: 'status', label: 'Status' },
    { id: 'price', label: 'Price' },
    { id: 'customer', label: 'Customer' },
];

const data = [
    { id: '01', product: 'Dell Inspiron 15 Laptop', date: 'Aug 30, 2024', status: 'Delivered', price: 20000, customer: 'Ankit Sharma' },
    { id: '02', product: 'Sony Headphones', date: 'Sept 10, 2024', status: 'Cancelled', price: 35000, customer: 'Pooja Verma' },
];

const getBadgeColor = (status) => {
    switch (status) {
        case 'Delivered': return 'success';
        case 'Cancelled': return 'error';
        default: return 'warning';
    }
};

const FurnitureTable = () => {
    return (
        <TableComponent
            data={data}
            columns={columns}
            caption="Furniture Orders"
            getBadgeColor={getBadgeColor}
        />
    );
};

export default FurnitureTable;
