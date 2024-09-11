import React from 'react';
import { CalendarBlank, Crown, CurrencyInr, Spinner, Tag, Hash } from "phosphor-react";
import TableComponent from '@/components/table';
import Wooden from '../Assets/Wooden.webp';
import Sofa from '../Assets/Sofa.webp';
// import Image from 'next/image';

const columns = [
    { id: 'id', label: 'Sr. No', icon: <Hash className="size-4 fill-metal-900 dark:fill-white" /> },
    { id: 'product', label: 'Product', icon: <Tag className="size-4 fill-metal-900 dark:fill-white" /> },
    { id: 'date', label: 'Date', icon: <CalendarBlank className="size-4 fill-metal-900 dark:fill-white" /> },
    { id: 'status', label: 'Status', icon: <Spinner className="size-4 fill-metal-900 dark:fill-white" /> },
    { id: 'price', label: 'Price', icon: <CurrencyInr className="size-4 fill-metal-900 dark:fill-white" /> },
    { id: 'customer', label: 'Customer', icon: <Crown className="size-4 fill-metal-900 dark:fill-white" /> },
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
