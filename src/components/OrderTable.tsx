'use client';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderStatus, setSelectedOrder, setDrawerStatus } from "../redux/slices/orderSlice";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import TableComponent from "./table";
import { toast } from 'keep-react';
import { RootState } from '../redux/store';
import { setOrder } from "@/redux/slices/orderSlice";

const columns = [
    { id: 'orderID', label: 'Order ID' },
    { id: 'customerName', label: 'Customer Name' },
    { id: 'orderDate', label: 'Order Date' },
    { id: 'itemName', label: 'Order Item' },
    { id: 'cost', label: 'Cost' },
    { id: 'orderStatus', label: 'Order Status' },
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
        case 'Refunded': return 'primary';
        case 'Paid': return 'success';
        default: return 'primary';
    }
};

const OrderTable = () => {
    const dispatch = useDispatch();
    const { orders, drawerStatus } = useSelector((state: RootState) => state.order);
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

    const handleOrder = (orderID: string) => {
        const selectedOrder = orders.find((order) => order.orderID === orderID);
        if (selectedOrder) {
            dispatch(setSelectedOrder(selectedOrder));
            dispatch(setDrawerStatus(!drawerStatus));
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("authToken");

            if (!token) {
                toast.error("Token not received. Redirecting to login.", { position: "top-right" });
                setTimeout(() => {
                    window.location.href = "/";
                }, 2000);
                return;
            }

            try {
                const response = await fetch("http://localhost:3000/api/auth/order", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    dispatch(setOrder(data.orders));
                } else {
                    toast.error("Failed to fetch data.", { position: "top-right" });
                }
            } catch (error) {
                toast.error("Unable to connect. Please check your network.", { position: "top-right" });
            }
        };

        fetchData();
    }, [dispatch]);

    const data = orders.map((order) => ({
        orderID: order.orderID,
        customerName: order.customerName,
        itemName: order.itemName,
        orderDate: order.orderDate,
        orderStatus: order.orderStatus,
        cost: order.cost,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        action: (
            <PiDotsThreeOutlineLight
                className="size-4 fill-metal-900 dark:fill-white m-auto rounded-full"
                onClick={() => handleOrder(order.orderID)}
            />
        ),
    }));


    if (!mounted) return null;

    return (
        <TableComponent
            data={data}
            columns={columns}
            caption="Order Information"
            getBadgeColor={getBadgeColor}
        />
    );
};

export default OrderTable;
