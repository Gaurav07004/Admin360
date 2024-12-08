'use client';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderStatus } from "../redux/slices/orderSlice";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import TableComponent from "./table";
import { toast } from 'keep-react';
import { RootState } from '../redux/store';

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

const getBadgeColor = (status: string) => {
    switch (status) {
        case 'Delivered': return 'success';
        case 'Pending': return 'warning';
        case 'Unreachable': return 'error';
        case 'Cancelled': return 'error';
        case 'Shipped': return 'primary';
        case 'Confirmed': return 'success';
        case 'Failed': return 'error';
        case 'Paid': return 'success';
        default: return 'default';
    }
};

const OrderTable = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector((state: RootState) => state.order);

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleMenuClick = (orderID: string, orderStatus: string) => {
        try {
            const newStatus = (() => {
                switch (orderStatus) {
                    case 'Pending':
                        return 'Shipped';
                    case 'Shipped':
                        return 'Delivered';
                    case 'Delivered':
                        return orderStatus;
                    case 'Unreachable':
                        return orderStatus;
                    case 'Cancelled':
                        return orderStatus;
                    default:
                        return 'Pending';
                }
            })();

            if (newStatus !== orderStatus) {
                dispatch(updateOrderStatus({ orderID, orderStatus: newStatus }));
                toast.success(`Order ID ${orderID} status changed to ${newStatus}.`);
            } else {
                toast.info(`Order ID ${orderID} is already in the ${orderStatus} state.`);
            }
        } catch (error) {
            toast.error('Failed to update status.');
        }
    };

    const data = orders.map((order) => ({
        orderNumber: order.orderID,
        orderDate: order.orderDate,
        customerName: order.customerName,
        orderStatus: order.orderStatus,
        cost: order.cost,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        action: (
            <div>
                <PiDotsThreeOutlineLight
                    className="size-4 fill-metal-900 dark:fill-white m-auto rounded-full"
                    onClick={() => handleMenuClick(order.orderID, order.orderStatus)}
                />
            </div>
        ),
    }));


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
