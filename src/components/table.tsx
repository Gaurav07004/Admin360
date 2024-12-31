import React, { useState, useEffect, useCallback } from 'react';
import { FiSearch, FiPlus } from 'react-icons/fi';
import Image from 'next/image';
import AreaChartComponent from '@/components/SmallCharts';
import empty from '@/Assets/Empty.png';
import { useDispatch, useSelector } from "react-redux";
import { setProductDrawerStatus } from "@/redux/slices/productsSlice";
import { RootState } from "@/redux/store";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, Button } from 'keep-react';

interface TableColumn {
    id: string;
    label: string;
}

interface TableRowData {
    [key: string]: string | number | object | React.ReactNode;
}

interface TableComponentProps {
    data: TableRowData[];
    columns: TableColumn[];
    caption: string;
    getBadgeColor?: (status: string) => 'success' | 'warning' | 'error' | 'primary';
}

const renderCellContent = (item: TableRowData, col: TableColumn, getBadgeColor?: (status: string) => 'success' | 'warning' | 'error' | 'primary') => {
    const value = item[col.id];

    if (typeof value === 'string' || typeof value === 'number') {
        if ((col.id === 'customerStatus' || col.id === 'status' || col.id === 'paymentStatus' || col.id === 'stockStatus' || col.id === 'orderStatus') && getBadgeColor) {
            return (
                <div
                    color={getBadgeColor(value.toString())}
                    className={`text-[0.85rem] rounded-md border font-medium px-2
    ${getBadgeColor(value.toString()) === 'success' ? 'border-green-300 dark:border-green-600' :
                            getBadgeColor(value.toString()) === 'warning' ? 'border-yellow-300 dark:border-yellow-600' :
                                getBadgeColor(value.toString()) === 'error' ? 'border-red-300 dark:border-red-600' :
                                    getBadgeColor(value.toString()) === 'primary' ? 'border-blue-300 dark:border-blue-600' :
                                        'border-gray-300 dark:border-gray-600'
                        } 
    ${getBadgeColor(value.toString()) === 'success' ? 'bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-200' :
                            getBadgeColor(value.toString()) === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200' :
                                getBadgeColor(value.toString()) === 'error' ? 'bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-200' :
                                    getBadgeColor(value.toString()) === 'primary' ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200' :
                                        'bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200'
                        }`}
                >
                    {value}
                </div>
            );
        }
        return <span>{value}</span>;
    }

    if (value && typeof value === 'object' && 'src' in value && typeof value.src === 'string') {
        return (
            <Image
                src={value.src as string}
                alt="Product"
                className="object-cover mx-auto"
                width={40}
                height={40}
            />
        );
    }

    if (col.id === "Action") {
        return (
            <div className="relative bg-gray-100 px-3 py-2 rounded-md border border-gray-300">
                {value === null || value === undefined
                    ? "N/A"
                    : typeof value === "object"
                        ? JSON.stringify(value)
                        : typeof value === "boolean"
                            ? value ? "True" : "False"
                            : String(value)}
            </div>
        );
    }


    if (col.id === 'visit') {
        return <AreaChartComponent data={[item.visit as number[], item.color as string]} />;
    }


    if (React.isValidElement(value)) {
        return value;
    }

    return null;
};

const TableComponent: React.FC<TableComponentProps> = ({ data, columns, caption, getBadgeColor }) => {
    const [filteredData, setFilteredData] = useState<TableRowData[]>(data);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const dispatch = useDispatch();
    const { productDrawerStatus } = useSelector((state: RootState) => state.product);

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query);
        const newFilteredData = data.filter((item) =>
            columns.some((col) => {
                const value = item[col.id];
                return value && value.toString().toLowerCase().includes(query.toLowerCase());
            })
        );
        setFilteredData(newFilteredData);
    }, [data, columns]);

    useEffect(() => {
        handleSearch(searchQuery);
    }, [data, searchQuery, handleSearch]);

    return (
        <section className="p-4 bg-white rounded-[1rem] dark:bg-[#263445]">
            <Table className="!bg-white w-full overflow-auto dark:text-gray-300">
                <TableCaption className="border border-gray-300 dark:border-gray-500 !px-3 dark:bg-[#263445]">
                    <section className="flex items-center justify-between">
                        <p className="text-[1.1rem] font-semibold text-gray-600 dark:text-gray-300 ">{caption}</p>
                        <div className="flex items-center justify-between gap-8">
                            <div className="relative flex items-center rounded-md">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    placeholder="Search"
                                    className="outline-none p-2 dark:bg-[#263445] text-gray-400 border border-gray-300 dark:border-gray-500 rounded-md placeholder:text-[0.9rem] w-[15rem] shadow-sm"
                                />
                                <div className="absolute right-1 p-[0.4rem] bg-orange-400 rounded-md text-white">
                                    <FiSearch className="w-5 h-5" />
                                </div>
                            </div>
                            {caption === 'Product Information' && (
                                <div
                                    className="relative flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                                    onClick={() => { dispatch(setProductDrawerStatus(!productDrawerStatus)) }}
                                >
                                    <FiPlus
                                        className="absolute left-3 top-[0.72rem] text-[#FF6500] w-[1.1rem] h-[1.1rem]"
                                    />
                                    <Button
                                        className="py-2 pl-9 pr-4 bg-orange-200 text-[#FF6500] hover:bg-orange-200 dark:text-[#FF6500] dark:bg-opacity-20 dark:hover:bg-opacity-20" // Button styles for both light and dark modes
                                    >
                                        New Product
                                    </Button>
                                </div>
                            )}


                        </div>
                    </section>
                </TableCaption>
                <TableHeader className="border border-gray-300 dark:border-gray-500 bg-[#f0f0f0]">
                    <TableRow>
                        {columns.map((col) => (
                            <TableHead key={col.id} className="border border-gray-300 dark:border-gray-500 dark:bg-[#263445]">
                                <p className="text-center text-stone-400 font-semibold dark:text-gray-300 ">
                                    {col.label}
                                </p>
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody className="border border-gray-300 dark:border-gray-500">
                    {filteredData.length > 0 ? (
                        filteredData.map((item, index) => (
                            <TableRow
                                key={index}
                                className={`text-center border border-gray-300 dark:border-gray-500 hover:bg-[#FFF2F2] transition-colors duration-300`}
                            >
                                {columns.map((col) => (
                                    <TableCell key={col.id} className="text-gray-500 font-semibold border border-gray-300 dark:border-gray-500 dark:text-gray-300 dark:bg-[#263445]">
                                        {renderCellContent(item, col, getBadgeColor)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="text-center text-gray-500 dark:bg-[#263445]">
                                <div className="flex flex-col items-center justify-center py-10">
                                    <div className="mb-4">
                                        <Image
                                            src={empty}
                                            height={200}
                                            width={300}
                                            alt="No Data"
                                            className="opacity-75"
                                        />
                                    </div>
                                    <h2 className="text-xl font-semibold mb-2 text-gray-700">No Data Available</h2>
                                    <p className="text-gray-500 mb-6">
                                        It looks like there is nothing here yet. Try adjusting your filters or search terms, or refresh the page to see if new data has become available.
                                    </p>
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="px-4 py-2 bg-[#698474] text-white rounded-md shadow-sm hover:bg-[#698474b6] transition duration-300"
                                    >
                                        Refresh Page
                                    </button>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </section>
    );
};

export default TableComponent;
