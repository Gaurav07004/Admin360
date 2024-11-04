'use client';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../redux/slices/orderSlice"; // Assuming you have an OrderSlice for managing order states
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import TableComponent from "./table";
import { toast } from 'keep-react';

const columns = [
    { id: 'orderNumber', label: 'Order Number' },
    { id: 'orderDate', label: 'Order Date' },
    { id: 'customerName', label: 'Customer Name' },
    { id: 'orderStatus', label: 'Order Status' },
    { id: 'cost', label: 'Cost' },
    { id: 'paymentMethod', label: 'Payment Method' },
    { id: 'paymentStatus', label: 'Payment Status' },
    { id: 'action', label: 'Action' },
];

const getBadgeColor = (status) => {
    switch (status) {
        case 'Confirmed': return 'success';
        case 'Pending': return 'warning';
        case 'Unreachable': return 'error';
        case 'Failed': return 'error';
        case 'Paid': return 'success';
        default: return 'default';
    }
};

const OrderTable = () => {
    const dispatch = useDispatch();
    const { orderStatus } = useSelector((state) => state.order);

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleMenuClick = (id, orderStatus) => {
        try {
            const newStatus = orderStatus === 'Confirmed' ? 'Pending' :
                orderStatus === 'Pending' ? 'Unreachable' :
                    orderStatus === 'Unreachable' ? 'Confirmed' : 'Confirmed'; // Toggle status for demonstration
            dispatch(setStatus({ id, status: newStatus }));
            toast.success(`Order ID ${id} status changed to ${newStatus}.`);
        } catch (error) {
            toast.error('Failed to update status.');
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const data = [
        {
            orderNumber: 1,
            customerName: 'Amit Kumar',
            orderDate: formatDate('2024-01-15'),
            orderStatus: orderStatus?.[1] || 'Pending',
            cost: 1500,
            paymentMethod: 'Credit Card',
            paymentStatus: 'Paid',
            action: (
                <PiDotsThreeOutlineLight
                    className="size-4 fill-metal-900 dark:fill-white m-auto rounded-full"
                    onClick={() => handleMenuClick(1, orderStatus?.[1] || 'Pending')}
                />
            ),
        },
        {
            orderNumber: 2,
            customerName: 'Priya Sharma',
            orderDate: formatDate('2024-02-20'),
            orderStatus: orderStatus?.[2] || 'Pending',
            cost: 2500,
            paymentMethod: 'PayPal',
            paymentStatus: 'Pending',
            action: (
                <PiDotsThreeOutlineLight
                    className="size-4 fill-metal-900 dark:fill-white m-auto rounded-full"
                    onClick={() => handleMenuClick(2, orderStatus?.[2] || 'Pending')}
                />
            ),
        },
        {
            orderNumber: 3,
            customerName: 'Ravi Verma',
            orderDate: formatDate('2024-03-05'),
            orderStatus: orderStatus?.[3] || 'Shipped',
            cost: 3200,
            paymentMethod: 'Debit Card',
            paymentStatus: 'Paid',
            action: (
                <PiDotsThreeOutlineLight
                    className="size-4 fill-metal-900 dark:fill-white m-auto rounded-full"
                    onClick={() => handleMenuClick(3, orderStatus?.[3] || 'Shipped')}
                />
            ),
        },
        {
            orderNumber: 4,
            customerName: 'Sneha Patel',
            orderDate: formatDate('2024-03-20'),
            orderStatus: orderStatus?.[4] || 'Delivered',
            cost: 1800,
            paymentMethod: 'Credit Card',
            paymentStatus: 'Paid',
            action: (
                <PiDotsThreeOutlineLight
                    className="size-4 fill-metal-900 dark:fill-white m-auto rounded-full"
                    onClick={() => handleMenuClick(4, orderStatus?.[4] || 'Delivered')}
                />
            ),
        },
        {
            orderNumber: 5,
            customerName: 'Ayesha Khan',
            orderDate: formatDate('2024-04-15'),
            orderStatus: orderStatus?.[5] || 'Pending',
            cost: 2100,
            paymentMethod: 'Net Banking',
            paymentStatus: 'Pending',
            action: (
                <PiDotsThreeOutlineLight
                    className="size-4 fill-metal-900 dark:fill-white m-auto rounded-full"
                    onClick={() => handleMenuClick(5, orderStatus?.[5] || 'Pending')}
                />
            ),
        },
        {
            orderNumber: 6,
            customerName: 'Vikram Singh',
            orderDate: formatDate('2024-05-01'),
            orderStatus: orderStatus?.[6] || 'Pending',
            cost: 4500,
            paymentMethod: 'Cash on Delivery',
            paymentStatus: 'Pending',
            action: (
                <PiDotsThreeOutlineLight
                    className="size-4 fill-metal-900 dark:fill-white m-auto rounded-full"
                    onClick={() => handleMenuClick(6, orderStatus?.[6] || 'Pending')}
                />
            ),
        },
        {
            orderNumber: 7,
            customerName: 'Riya Mehta',
            orderDate: formatDate('2024-05-20'),
            orderStatus: orderStatus?.[7] || 'Cancelled',
            cost: 3000,
            paymentMethod: 'Credit Card',
            paymentStatus: 'Failed',
            action: (
                <PiDotsThreeOutlineLight
                    className="size-4 fill-metal-900 dark:fill-white m-auto rounded-full"
                    onClick={() => handleMenuClick(7, orderStatus?.[7] || 'Cancelled')}
                />
            ),
        },
        {
            orderNumber: 8,
            customerName: 'Karan Singh',
            orderDate: formatDate('2024-06-10'),
            orderStatus: orderStatus?.[8] || 'Pending',
            cost: 1300,
            paymentMethod: 'PayPal',
            paymentStatus: 'Paid',
            action: (
                <PiDotsThreeOutlineLight
                    className="size-4 fill-metal-900 dark:fill-white m-auto rounded-full"
                    onClick={() => handleMenuClick(8, orderStatus?.[8] || 'Pending')}
                />
            ),
        },
        {
            orderNumber: 9,
            customerName: 'Nisha Rani',
            orderDate: formatDate('2024-06-25'),
            orderStatus: orderStatus?.[9] || 'Shipped',
            cost: 2900,
            paymentMethod: 'Debit Card',
            paymentStatus: 'Failed',
            action: (
                <PiDotsThreeOutlineLight
                    className="size-4 fill-metal-900 dark:fill-white m-auto rounded-full"
                    onClick={() => handleMenuClick(9, orderStatus?.[9] || 'Shipped')}
                />
            ),
        },
        {
            orderNumber: 10,
            customerName: 'Deepak Joshi',
            orderDate: formatDate('2024-07-15'),
            orderStatus: orderStatus?.[10] || 'Delivered',
            cost: 1600,
            paymentMethod: 'Cash on Delivery',
            paymentStatus: 'Paid',
            action: (
                <PiDotsThreeOutlineLight
                    className="size-4 fill-metal-900 dark:fill-white m-auto rounded-full"
                    onClick={() => handleMenuClick(10, orderStatus?.[10] || 'Delivered')}
                />
            ),
        },
    ];

    if (!mounted) return null;

    return (
        <TableComponent
            data={data}
            columns={columns}
            caption="Order Information"
            getBadgeColor={getBadgeColor}
            Applyfilter={true}
        />
    );
};

export default OrderTable;
