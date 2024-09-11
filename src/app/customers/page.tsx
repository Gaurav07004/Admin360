"use client";

import React from "react";
import { PiUsersLight, PiChartLineUpLight, PiChartLineDownLight, PiCheckLight, PiEyeLight } from "react-icons/pi";
import { Badge, Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "keep-react";
import { CalendarBlank, Crown, CurrencyInr, Spinner, Tag, Hash } from "phosphor-react";
import { VscSettings } from "react-icons/vsc";
import Image, { StaticImageData } from 'next/image';
import Wooden from '@/Assets/Wooden.webp';
import Sofa from '@/Assets/Sofa.webp';

const statistics = [
    {
        id: 1,
        icon1: <PiUsersLight className="w-5 h-5 text-blue-600" />,
        icon2: <PiChartLineUpLight className="w-7 h-7 text-green-600" />,
        title: 'Total Customers',
        value: '21,877',
        percentage: '18%',
        description: 'Compared to the previous month, showing a significant increase.',
        bgColor: 'bg-blue-100',
        borderColor: 'border-blue-300',
        color: 'text-green-600'
    },
    {
        id: 2,
        icon1: <PiCheckLight className="w-5 h-5 text-green-600" />,
        icon2: <PiChartLineDownLight className="w-7 h-7 text-red-600" />,
        title: 'Total Orders',
        value: '959',
        percentage: '8%',
        description: 'Compared to last month, indicating steady growth.',
        bgColor: 'bg-green-100',
        borderColor: 'border-green-300',
        color: 'text-red-600'
    },
    {
        id: 3,
        icon1: <PiEyeLight className="w-5 h-5 text-purple-600" />,
        icon2: <PiChartLineUpLight className="w-7 h-7 text-green-600" />,
        title: 'Total Visit',
        value: '180',
        percentage: '7%',
        description: 'Compared to the previous month, reflecting a steady rise in visits.',
        bgColor: 'bg-purple-100',
        borderColor: 'border-purple-300',
        color: 'text-green-600'
    },
];

const StatisticCard: React.FC<{
    icon1: React.ReactNode;
    icon2: React.ReactNode;
    title: string;
    value: string;
    percentage: string;
    description: string;
    bgColor: string;
    borderColor: string;
    color: string;
}> = ({ icon1, icon2, title, value, percentage, description, bgColor, borderColor, color }) => (
    <section
        className={`bg-white rounded-[1rem] shadow-sm p-6 w-full`}
    >
        <div className='flex justify-between items-center mb-6'>
            <div className='flex items-center gap-4'>
                <div className={`p-2 rounded-md border ${bgColor} ${borderColor} flex items-center justify-center`}>
                    {icon1}
                </div>
                <div className="text-gray-700 font-semibold text-lg">{title}</div>
            </div>
            <div className="text-gray-800 font-bold text-3xl">{value}</div>
        </div>
        <div className='flex gap-4 font-semibold'>
            <div>
                {icon2}
            </div>
            <span className={`${color} text-sm`}>
                {percentage} <span className="text-gray-600 text-xs">{description}</span>
            </span>
        </div>
    </section>
);

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
];

const columns: Column[] = [
    { id: 'srNo', label: 'Sr. No', icon: <Hash className="w-5 h-5 fill-metal-900 dark:fill-white" /> },
    { id: 'product', label: 'Product', icon: <Tag className="w-5 h-5 fill-metal-900 dark:fill-white" /> },
    { id: 'date', label: 'Date', icon: <CalendarBlank className="w-5 h-5 fill-metal-900 dark:fill-white" /> },
    { id: 'status', label: 'Status', icon: <Spinner className="w-5 h-5 fill-metal-900 dark:fill-white" /> },
    { id: 'price', label: 'Price', icon: <CurrencyInr className="w-5 h-5 fill-metal-900 dark:fill-white" /> },
    { id: 'customer', label: 'Customer', icon: <Crown className="w-5 h-5 fill-metal-900 dark:fill-white" /> },
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
                        <p className="text-lg font-semibold text-gray-600">Recent Orders</p>
                    </div>
                    <button className="flex items-center py-2 px-4 text-sm text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-100 border border-gray-300">
                        <VscSettings className="text-base mr-2" />
                        Filter
                    </button>
                </div>
            </TableCaption>
            <TableHeader>
                <TableRow>
                    {columns.map((col) => (
                        <TableHead key={col.id}>
                            <p className="flex items-center gap-2 text-gray-600">{col.icon}{col.label}</p>
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
                                className="w-10 h-10 object-cover rounded-md"
                            />
                            {item.product}
                        </TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>
                            <Badge variant="border" color={getBadgeColor(item.status)}>
                                {item.status}
                            </Badge>
                        </TableCell>
                        <TableCell>{item.price.toLocaleString()}</TableCell>
                        <TableCell>{item.customer}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

const Page: React.FC = () => {
    return (
        <section className="gap-5 flex flex-col justify-between items-center">
            <section className="flex justify-start items-center gap-5 w-full">
                {statistics.map((stat) => (
                    <StatisticCard
                        key={stat.id}
                        icon1={stat.icon1}
                        icon2={stat.icon2}
                        title={stat.title}
                        value={stat.value}
                        percentage={stat.percentage}
                        description={stat.description}
                        bgColor={stat.bgColor}
                        borderColor={stat.borderColor}
                        color={stat.color}
                    />
                ))}
            </section>
            <TableComponent />
        </section>
    );
};

export default Page;
