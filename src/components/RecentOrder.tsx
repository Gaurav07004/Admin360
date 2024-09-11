"use client";

import { Badge, Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "keep-react";
import { CalendarBlank, Crown, CurrencyInr, Spinner, Tag, Hash } from "phosphor-react";
import { VscSettings } from "react-icons/vsc";
import Image, { StaticImageData } from 'next/image';
import Wooden from '../Assets/Wooden.webp';
import Sofa from '../Assets/Sofa.webp';

interface DataItem {
    id: string;
    product: string;
    date: string;
    status: string;
    price: number;
    customer: string;
    img: StaticImageData;
}

interface Column {
    id: string;
    label: string;
    icon: JSX.Element;
}

const data2: DataItem[] = [
    { id: `01`, product: 'Wooden Dining Table', date: 'Aug 30, 2024', status: 'Delivered', price: 20000, customer: 'Ankit Sharma', img: Wooden },
    { id: `02`, product: 'Leather Sofa', date: 'Sept 10, 2024', status: 'Cancelled', price: 35000, customer: 'Pooja Verma', img: Sofa },
    // { id: `03`, product: 'Queen Size Bed', date: 'Sept 12, 2024', status: 'Delivered', price: 40000, customer: 'Rajesh Mehta' },
];

const columns: Column[] = [
    { id: 'srNo', label: 'Sr. No', icon: <Hash className="size-4 fill-metal-900 dark:fill-white" /> },
    { id: 'product', label: 'Product', icon: <Tag className="size-4 fill-metal-900 dark:fill-white" /> },
    { id: 'date', label: 'Date', icon: <CalendarBlank className="size-4 fill-metal-900 dark:fill-white" /> },
    { id: 'status', label: 'Status', icon: <Spinner className="size-4 fill-metal-900 dark:fill-white" /> },
    { id: 'price', label: 'Price', icon: <CurrencyInr className="size-4 fill-metal-900 dark:fill-white" /> },
    { id: 'customer', label: 'Customer', icon: <Crown className="size-4 fill-metal-900 dark:fill-white" /> },
];

const getBadgeColor = (status: string): 'success' | 'error' | 'warning' => {
    switch (status) {
        case 'Delivered': return 'success';
        case 'Cancelled': return 'error';
        default: return 'warning';
    }
};

const TableComponent: React.FC = () => {
    return (
        <Table className="!bg-white w-full">
            <TableCaption className="!bg-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <p className="text-lg font-semibold text-gray-600">Recent Order</p>
                    </div>
                    <button className="flex items-center py-2 px-5 text-sm text-gray-500 bg-gray-200 rounded-lg hover:bg-gray-100 border border-gray-300">
                        <VscSettings className="text-base mr-2" />
                        Filter
                    </button>
                </div>
            </TableCaption>
            <TableHeader>
                <TableRow>
                    {columns.map((col) => (
                        <TableHead key={col.id}>
                            <p className="flex items-center w-fit gap-1 mb-0 m-auto text-stone-500">{col.icon}{col.label}</p>
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data2.map((item) => (
                    <TableRow key={item.id} className="text-center">
                        <TableCell>{item.id}</TableCell>
                        <TableCell className="flex items-center gap-4">
                            <Image
                                src={item.img}
                                alt={item.product}
                                className="w-8 h-8 object-cover rounded-md"
                            />
                            {item.product}
                        </TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>
                            <Badge variant="border" color={getBadgeColor(item.status)}>
                                {item.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-center">{item.price.toLocaleString()}</TableCell>
                        <TableCell>{item.customer}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default TableComponent;
