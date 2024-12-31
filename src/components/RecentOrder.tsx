import React from 'react';
import { useSelector } from "react-redux";
import { RootState } from '../redux/store';
import TableComponent from '@/components/table';

const columns = [
    { id: 'orderID', label: 'Order ID' },
    { id: 'customerName', label: 'Customer Name' },
    { id: 'orderDate', label: 'Order Date' },
    { id: 'itemName', label: 'Order Item' },
    { id: 'cost', label: 'Cost' },
    { id: 'orderStatus', label: 'Order Status' },
];

const getBadgeColor = (status: string) => {
    switch (status) {
        case 'Delivered': return 'success';
        case 'Pending': return 'warning';
        case 'Unreachable': return 'error';
        case 'Cancelled': return 'error';
        case 'Shipped': return 'primary';
        case 'Confirmed': return 'success';
        case 'Refunded': return 'primary';
        case 'Paid': return 'success';
        default: return 'primary';
    }
};

const RecentOrder = () => {
    const { orders } = useSelector((state: RootState) => state.order);

    const data = orders.slice(0, 2).map((order) => ({
        orderID: order.orderID,
        customerName: order.customerName,
        itemName: order.itemName,
        orderDate: order.orderDate,
        orderStatus: order.orderStatus,
        cost: order.cost,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
    }));

    return (
        <TableComponent
            data={data}
            columns={columns}
            caption="Recent Orders"
            getBadgeColor={getBadgeColor}
        />
    );
};

export default RecentOrder;
