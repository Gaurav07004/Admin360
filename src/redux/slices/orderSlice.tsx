/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import Product_1 from "@/Assets/Dell Inspiron 15 Laptop.png";
import Product_2 from "@/Assets/Targus Laptop Sleeve.webp";
import Product_3 from "@/Assets/Apple iPhone 15.webp";
import Product_4 from "@/Assets/Samsung Galaxy Watch 5.webp";

interface Order {
    id: number;
    orderID: string;
    orderDate: string;
    customerName: string;
    orderStatus: 'Delivered' | 'Pending' | 'Unreachable' | 'Cancelled' | 'Shipped';
    cost: number;
    paymentMethod: string;
    paymentStatus: string;
    deliveryAddress: string;
    trackingNumber: string | null;
    customerPhone: string;
    itemName: string;
    itemImage: any;
    courier: string;
    Recent_Orders?: {
        title: string;
        status: 'Completed' | 'Pending' | 'In Progress';
        date: string;
        time: string;
        description: string;
        courier?: string;
        warehouse?: string;
        estimatedDelivery?: string;
    }[];
}

interface OrderState {
    orders: Order[];
    sortedTable: string[];
    drawerStatus: boolean;
    selectedOrder: Order | null;
}

const initialState: OrderState = {
    orders: [
        {
            id: 1,
            orderID: 'OR001',
            orderDate: '2024-12-01',
            customerName: 'Amit Kumar',
            orderStatus: 'Delivered',
            cost: 60000,
            paymentMethod: 'Credit Card',
            paymentStatus: 'Paid',
            deliveryAddress: '123, MG Road, Delhi',
            trackingNumber: 'TK123456',
            customerPhone: '9876543210',
            itemName: 'Dell Inspiron 15 Laptop',
            itemImage: Product_1,
            courier: 'XYZ Logistics',
            Recent_Orders: [
                { title: 'Order Placed', status: 'Completed', date: '2024-12-01', time: '10:00', description: 'Your order has been placed.' },
                { title: 'Order Confirmed', status: 'Completed', date: '2024-12-02', time: '14:00', description: 'Your order was confirmed and processed.' },
                { title: 'Shipped', status: 'Completed', date: '2024-12-03', time: '09:00', description: 'Your order has been shipped.' },
                { title: 'Out for Delivery', status: 'Completed', date: '2024-12-04', time: '08:00', description: 'Your order is out for delivery.' },
                { title: 'Delivered', status: 'Completed', date: '2024-12-04', time: '17:00', description: 'Your order was delivered to the provided address.' },
            ],
        },
        {
            id: 2,
            orderID: 'OR002',
            orderDate: '2024-12-02',
            customerName: 'Neha Singh',
            orderStatus: 'Delivered',
            cost: 700,
            paymentMethod: 'Debit Card',
            paymentStatus: 'Paid',
            deliveryAddress: '456, Main Street, Bangalore',
            trackingNumber: 'TK987654',
            customerPhone: '9988776655',
            itemName: 'Targus Laptop Sleeve',
            itemImage: Product_2,
            courier: 'ABC Logistics',
            Recent_Orders: [
                { title: 'Order Placed', status: 'Completed', date: '2024-12-02', time: '11:00', description: 'Your order has been placed.' },
                { title: 'Order Confirmed', status: 'Completed', date: '2024-12-02', time: '16:00', description: 'Your order was confirmed and processed.' },
                { title: 'Shipped', status: 'Completed', date: '2024-12-03', time: '12:00', description: 'Your order has been shipped.' },
                { title: 'Out for Delivery', status: 'Pending', date: '2024-12-05', time: '09:00', description: 'Your order is out for delivery.' },
                { title: 'Delivered', status: 'Pending', date: '2024-12-05', time: '18:00', description: 'Your order will be delivered today.' },
            ],
        },
        {
            id: 3,
            orderID: 'OR003',
            orderDate: '2024-12-03',
            customerName: 'Rajesh Verma',
            orderStatus: 'Pending',
            cost: 90000,
            paymentMethod: 'UPI',
            paymentStatus: 'Pending',
            deliveryAddress: '789, Sector 12, Gurgaon',
            trackingNumber: null,
            customerPhone: '9876547890',
            itemName: 'Apple Iphone 15',
            itemImage: Product_3,
            courier: 'FastShip',
            Recent_Orders: [
                { title: 'Order Placed', status: 'Completed', date: '2024-12-03', time: '09:00', description: 'Your order has been placed.' },
                { title: 'Order Confirmed', status: 'Pending', date: '2024-12-04', time: '11:00', description: 'Your order is being processed.' },
                { title: 'Payment Pending', status: 'Pending', date: '2024-12-04', time: '14:00', description: 'Payment has not been received yet.' },
            ],
        },
        {
            id: 4,
            orderID: 'OR004',
            orderDate: '2024-12-04',
            customerName: 'Suman Gupta',
            orderStatus: 'Unreachable',
            cost: 700,
            paymentMethod: 'Credit Card',
            paymentStatus: 'Paid',
            deliveryAddress: '101, Park Avenue, Noida',
            trackingNumber: 'TK222333',
            customerPhone: '8765432109',
            itemName: 'Targus Laptop Sleeve',
            itemImage: Product_2,
            courier: 'LogiExpress',
            Recent_Orders: [
                { title: 'Order Placed', status: 'Completed', date: '2024-12-04', time: '10:30', description: 'Your order has been placed.' },
                { title: 'Order Confirmed', status: 'Completed', date: '2024-12-04', time: '15:00', description: 'Your order has been confirmed.' },
                { title: 'Shipped', status: 'Completed', date: '2024-12-05', time: '08:00', description: 'Your order is on the way.' },
                { title: 'Unreachable', status: 'Completed', date: '2024-12-06', time: '14:00', description: 'Delivery attempt failed, customer unreachable.' },
            ],
        },
        {
            id: 5,
            orderID: 'OR005',
            orderDate: '2024-12-05',
            customerName: 'Amit Patel',
            orderStatus: 'Cancelled',
            cost: 60000,
            paymentMethod: 'Debit Card',
            paymentStatus: 'Refunded',
            deliveryAddress: '202, South Avenue, Mumbai',
            trackingNumber: null,
            customerPhone: '9977554433',
            itemName: 'Dell Inspiron 15 Laptop',
            itemImage: Product_1,
            courier: 'QuickShip',
            Recent_Orders: [
                { title: 'Order Placed', status: 'Completed', date: '2024-12-05', time: '12:30', description: 'Your order has been placed.' },
                { title: 'Order Confirmed', status: 'Completed', date: '2024-12-06', time: '10:00', description: 'Your order has been confirmed.' },
                { title: 'Cancelled', status: 'Completed', date: '2024-12-07', time: '17:30', description: 'Your order has been cancelled at your request.' },
            ],
        },
        {
            id: 6,
            orderID: 'OR006',
            orderDate: '2024-12-06',
            customerName: 'Priya Yadav',
            orderStatus: 'Delivered',
            cost: 90000,
            paymentMethod: 'Credit Card',
            paymentStatus: 'Paid',
            deliveryAddress: '300, West Street, Jaipur',
            trackingNumber: 'TK456789',
            customerPhone: '9123456789',
            itemName: 'Apple Iphone 15',
            itemImage: Product_3,
            courier: 'Global Courier',
            Recent_Orders: [
                { title: 'Order Placed', status: 'Completed', date: '2024-12-06', time: '10:00', description: 'Your order has been placed.' },
                { title: 'Shipped', status: 'Completed', date: '2024-12-07', time: '11:00', description: 'Your order has been shipped.' },
                { title: 'Out for Delivery', status: 'Completed', date: '2024-12-08', time: '08:00', description: 'Your order is out for delivery.' },
                { title: 'Delivered', status: 'Completed', date: '2024-12-08', time: '18:00', description: 'Your order was delivered successfully.' },
            ],
        },
        {
            id: 7,
            orderID: 'OR007',
            orderDate: '2024-12-07',
            customerName: 'Raj Malhotra',
            orderStatus: 'Pending',
            cost: 60000,
            paymentMethod: 'Cash on Delivery',
            paymentStatus: 'Pending',
            deliveryAddress: '400, East Road, Chennai',
            trackingNumber: null,
            customerPhone: '9223344556',
            itemName: 'Dell Inspiron 15 Laptop',
            itemImage: Product_1,
            courier: 'Speedy Delivery',
            Recent_Orders: [
                { title: 'Order Placed', status: 'Completed', date: '2024-12-07', time: '13:00', description: 'Your order has been placed.' },
                { title: 'Order Confirmed', status: 'Pending', date: '2024-12-08', time: '16:00', description: 'Your order has been confirmed, awaiting payment.' },
            ],
        },
        {
            id: 8,
            orderID: 'OR008',
            orderDate: '2024-12-08',
            customerName: 'Simran Kaur',
            orderStatus: 'Delivered',
            cost: 700,
            paymentMethod: 'UPI',
            paymentStatus: 'Paid',
            deliveryAddress: '123, Juhu Beach Road, Mumbai',
            trackingNumber: 'TK667788',
            customerPhone: '8899776655',
            itemName: 'Targus Laptop Sleeve',
            itemImage: Product_2,
            courier: 'ParcelXpress',
            Recent_Orders: [
                { title: 'Order Placed', status: 'Completed', date: '2024-12-08', time: '09:00', description: 'Your order has been placed.' },
                { title: 'Order Confirmed', status: 'Completed', date: '2024-12-08', time: '12:00', description: 'Your order has been confirmed.' },
                { title: 'Shipped', status: 'Completed', date: '2024-12-09', time: '16:00', description: 'Your order has been shipped.' },
                { title: 'Out for Delivery', status: 'Completed', date: '2024-12-10', time: '08:30', description: 'Your order is out for delivery.' },
                { title: 'Delivered', status: 'Completed', date: '2024-12-10', time: '19:00', description: 'Your order has been delivered.' },
            ],
        },
        {
            id: 9,
            orderID: 'OR009',
            orderDate: '2024-12-10',
            customerName: 'Ravi Shankar',
            orderStatus: 'Delivered',
            cost: 60000,
            paymentMethod: 'Debit Card',
            paymentStatus: 'Paid',
            deliveryAddress: '500, DLF Cyber City, Gurgaon',
            trackingNumber: 'TK223344',
            customerPhone: '9988776655',
            itemName: 'Dell Inspiron 15 Laptop',
            itemImage: Product_1,
            courier: 'SwiftShip',
            Recent_Orders: [
                { title: 'Order Placed', status: 'Completed', date: '2024-12-10', time: '12:00', description: 'Your order has been placed.' },
                { title: 'Order Confirmed', status: 'Completed', date: '2024-12-10', time: '14:30', description: 'Your order was confirmed and processed.' },
                { title: 'Shipped', status: 'Completed', date: '2024-12-11', time: '10:00', description: 'Your order has been shipped.' },
                { title: 'Out for Delivery', status: 'Completed', date: '2024-12-12', time: '09:30', description: 'Your order is out for delivery.' },
                { title: 'Delivered', status: 'Completed', date: '2024-12-12', time: '18:30', description: 'Your order has been delivered successfully.' },
            ],
        },
        {
            id: 10,
            orderID: 'OR010',
            orderDate: '2024-12-12',
            customerName: 'Vikram Arora',
            orderStatus: 'Shipped',
            cost: 7000,
            paymentMethod: 'Credit Card',
            paymentStatus: 'Paid',
            deliveryAddress: '456, Indiranagar, Bangalore',
            trackingNumber: 'TK778899',
            customerPhone: '8777889990',
            itemName: 'Samsung Galaxy Watch 5',
            itemImage: Product_4,
            courier: 'LogiTrans',
            Recent_Orders: [
                { title: 'Order Placed', status: 'Completed', date: '2024-12-12', time: '11:00', description: 'Your order has been placed.' },
                { title: 'Order Confirmed', status: 'Completed', date: '2024-12-12', time: '14:00', description: 'Your order was confirmed and processed.' },
                { title: 'Shipped', status: 'Completed', date: '2024-12-14', time: '10:00', description: 'Your order has been shipped.' },
                { title: 'Out for Delivery', status: 'Pending', date: '2024-12-17', time: '09:00', description: 'Your order is out for delivery.' },
                { title: 'Delivered', status: 'Pending', date: '2024-12-17', time: '18:00', description: 'Your order will be delivered today.' },
            ],
        },
    ],
    sortedTable: [],
    drawerStatus: false,
    selectedOrder: null,
};

const OrderSlice = createSlice({
    name: 'Order',
    initialState,
    reducers: {
        updateOrderStatus: (state, action: PayloadAction<{ orderID: string; orderStatus: 'Delivered' | 'Pending' | 'Unreachable' | 'Cancelled' | 'Shipped' }>) => {
            const { orderID, orderStatus } = action.payload;
            const order = state.orders.find(order => order.orderID === orderID);
            if (order) {
                order.orderStatus = orderStatus;
            }
        },
        setSortedReviews: (state, action: PayloadAction<string[]>) => {
            state.sortedTable = action.payload;
        },
        setDrawerStatus: (state, action: PayloadAction<boolean>) => {
            state.drawerStatus = action.payload;
        },
        setSelectedOrder: (state, action: PayloadAction<Order>) => {
            state.selectedOrder = action.payload;
        },
    },
});

export const { updateOrderStatus, setSortedReviews, setDrawerStatus, setSelectedOrder } = OrderSlice.actions;

export const selectOrderState = (state: RootState) => state.order;

export default OrderSlice.reducer;
