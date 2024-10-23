import React from 'react';
import TableComponent from '@/components/table';
import Wooden from '../Assets/Wooden.webp';
import Sofa from '../Assets/Sofa.webp';
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
    { id: '01', product: 'Wooden Dining Table', date: 'Aug 30, 2024', status: 'Delivered', price: 20000, customer: 'Ankit Sharma', img: Wooden },
    { id: '02', product: 'Leather Sofa', date: 'Sept 10, 2024', status: 'Cancelled', price: 35000, customer: 'Pooja Verma', img: Sofa },
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
