import React, { useState, useEffect } from 'react';
import { FiSearch, FiPlus } from 'react-icons/fi';
import Image from 'next/image';
import AreaChartComponent from '@/components/SmallCharts';
import empty from '@/Assets/Empty.png';
import { Badge, Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, Button } from 'keep-react';

const renderCellContent = (item, col, getBadgeColor) => {
    const value = item[col.id];

    if (typeof value === 'string' || typeof value === 'number') {
        if ((col.id === 'customerStatus' || col.id === 'status' || col.id === 'paymentStatus' || col.id === 'stockStatus' || col.id === 'orderStatus' || col.id === 'paymentStatus') && getBadgeColor) {
            return (
                <Badge
                    variant="base"
                    color={getBadgeColor(value)}
                    className={`text-sm rounded-md border ${getBadgeColor(value) === 'success' ? 'border-green-300' :
                        getBadgeColor(value) === 'warning' ? 'border-yellow-300' :
                            getBadgeColor(value) === 'error' ? 'border-red-300' :
                                getBadgeColor(value) === 'info' ? 'border-blue-300' :
                                    'border-gray-300'
                        }`}
                >
                    {value}
                </Badge>
            );
        }
        return <span>{value}</span>;
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
            <div className="relative bg-gray-100 px-3 py-2 rounded-md border border-gray-300"

            >
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
    const [filteredData, setFilteredData] = useState(data);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
        const newFilteredData = data.filter((item) =>
            columns.some((col) => {
                const value = item[col.id];
                return value && value.toString().toLowerCase().includes(query.toLowerCase());
            })
        );
        setFilteredData(newFilteredData);
    };

    useEffect(() => {
        handleSearch(searchQuery);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, searchQuery]);

    return (
        <section className='p-4 bg-white rounded-[1rem]'>
            <Table className="!bg-white w-full overflow-auto">
                <TableCaption className="border border-gray-300 !px-3">
                    <section className="flex items-center justify-between">
                        <p className="text-lg font-semibold text-gray-600">{caption}</p>
                        <div className="flex items-center justify-between gap-8">
                            <div className="relative flex items-center rounded-md">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    placeholder="Search"
                                    className="outline-none p-2 text-gray-400 border border-gray-300 rounded-md placeholder:text-[0.9rem] w-[15rem] shadow-sm"
                                />
                                <div className="absolute right-1 p-[0.4rem] bg-orange-400 rounded-md text-white">
                                    <FiSearch className="w-5 h-5" />
                                </div>
                            </div>
                            {caption === 'Product Information' && (<div className="relative flex items-center gap-3 bg-gray-50 rounded-lg">
                                <FiPlus className="absolute left-3 top-[0.6rem] text-[#FF6500] w-[1.1rem] h-[1.1rem]" />
                                <Button className="py-2 pl-9 pr-4 bg-[#ff660021] text-[#FF6500] hover:bg-orange-200">New Product</Button>
                            </div>)}
                        </div>
                    </section>
                </TableCaption>
                <TableHeader className="border border-gray-300 bg-[#f0f0f0]">
                    <TableRow>
                        {columns.map((col) => (
                            <TableHead key={col.id} className="border border-gray-300">
                                <p className="flex items-center w-fit gap-1 mb-0 m-auto text-stone-400 font-semibold">
                                    {col.label}
                                </p>
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody className="border border-gray-300">
                    {filteredData.length > 0 ? (
                        filteredData.map((item, index) => (
                            <TableRow
                                key={index}
                                className={`text-center border border-gray-300 hover:bg-[#FFF2F2] transition-colors duration-300 `}
                            >
                                {columns.map((col) => (
                                    <TableCell key={col.id} className="text-gray-500 font-semibold border border-gray-300">
                                        {renderCellContent(item, col, getBadgeColor)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="text-center text-gray-500">
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
                                        It looks like there nothing here yet. Try adjusting your filters or search terms, or refresh the page to see if new data has become available.
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
