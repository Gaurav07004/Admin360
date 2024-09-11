"use client";
import React from 'react'
import { Badge, Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "keep-react";
import { VscSettings } from "react-icons/vsc";
import Image from 'next/image';
import AreaChartComponent from '@/components/SmallCharts'

const renderCellContent = (item, col, getBadgeColor) => {
    const value = item[col.id];

    if (typeof value === 'string' || typeof value === 'number') {
        if (col.id === 'status' && getBadgeColor) {
            return (
                <Badge variant="border" color={getBadgeColor(value)}>
                    {value}
                </Badge>
            );
        }
        return <span className={col.id === 'Email' ? 'lowercase' : ''}>{value}</span>
    }
    if (value && typeof value === 'object' && 'src' in value && typeof value.src === 'string') {
        return (
            <Image
                src={value.src}
                alt={item['product'] || 'Image'}
                className="w-8 h-8 object-cover rounded-md"
            />
        );
    }

    if (col.id === 'Action') {
        return (
            <div className="relative bg-gray-100 px-3 py-2 rounded-md border border-gray-300">
                {value}
            </div>
        );
    }

    if (col.id === 'Visit') {
        return <AreaChartComponent data={[item.chartData, item.color]} />;
    }

    if (React.isValidElement(value)) {
        return value;
    }

    return null;
};

const TableComponent = ({ data, columns, caption, getBadgeColor }) => {
    return (
        <Table className="!bg-white w-full ">
            <TableCaption className='border border-gray-300'>
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-gray-600">{caption}</p>
                    <button className="flex items-center py-2 px-5 text-sm text-gray-500 bg-gray-200 rounded-lg hover:bg-gray-100 border border-gray-300">
                        <VscSettings className="text-base mr-2" />
                        Filter
                    </button>
                </div>
            </TableCaption>
            <TableHeader className='border border-gray-300'>
                <TableRow>
                    {columns.map((col) => (
                        <TableHead key={col.id} className='border border-gray-300'>
                            <p className="flex items-center w-fit gap-1 mb-0 m-auto text-stone-400 font-semibold ">
                                {col.icon}{col.label}
                            </p>
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody className='border border-gray-300'>
                {data.map((item, index) => (
                    <TableRow key={index} className="text-center border border-gray-300">
                        {columns.map((col) => (
                            <TableCell key={col.id} className='text-gray-500 font-semibold border border-gray-300'>
                                {renderCellContent(item, col, getBadgeColor)}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default TableComponent;
