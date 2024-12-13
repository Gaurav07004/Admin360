import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface Order {
    id: number;
    orderID: string;
    orderDate: string;
    customerName: string;
    orderStatus: 'Delivered' | 'Pending' | 'Unreachable' | 'Cancelled' | 'Shipped';
    cost: number;
    paymentMethod: string;
    paymentStatus: string;
}

interface Event {
    title: string;
    status: string;
    date: string;
    description: string;
    courier?: string;
    warehouse?: string;
    estimatedDelivery?: string;
}

interface OrderState {
    orders: Order[];
    events: Event[];
    sortedTable: string[];
    drawerStatus: boolean;
    selectedOrder: Order | null;
}

const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

const initialState: OrderState = {
    orders: [
        { id: 1, orderID: 'OR01', customerName: 'Amit Kumar', orderDate: formatDate('2024-01-15'), orderStatus: 'Delivered', cost: 1500, paymentMethod: 'Credit Card', paymentStatus: 'Paid' },
        { id: 2, orderID: 'OR02', customerName: 'Priya Sharma', orderDate: formatDate('2024-02-20'), orderStatus: 'Pending', cost: 2500, paymentMethod: 'PayPal', paymentStatus: 'Pending' },
        { id: 3, orderID: 'OR03', customerName: 'Ravi Verma', orderDate: formatDate('2024-03-05'), orderStatus: 'Unreachable', cost: 3200, paymentMethod: 'Debit Card', paymentStatus: 'Paid' },
        { id: 4, orderID: 'OR04', customerName: 'Sneha Patel', orderDate: formatDate('2024-03-20'), orderStatus: 'Delivered', cost: 1800, paymentMethod: 'Credit Card', paymentStatus: 'Paid' },
        { id: 5, orderID: 'OR05', customerName: 'Ayesha Khan', orderDate: formatDate('2024-04-15'), orderStatus: 'Pending', cost: 2100, paymentMethod: 'Net Banking', paymentStatus: 'Pending' },
        { id: 6, orderID: 'OR06', customerName: 'Vikram Singh', orderDate: formatDate('2024-05-01'), orderStatus: 'Unreachable', cost: 4500, paymentMethod: 'Cash on Delivery', paymentStatus: 'Pending' },
        { id: 7, orderID: 'OR07', customerName: 'Riya Mehta', orderDate: formatDate('2024-05-20'), orderStatus: 'Cancelled', cost: 3000, paymentMethod: 'Credit Card', paymentStatus: 'Failed' },
        { id: 8, orderID: 'OR08', customerName: 'Karan Singh', orderDate: formatDate('2024-06-10'), orderStatus: 'Delivered', cost: 1300, paymentMethod: 'PayPal', paymentStatus: 'Paid' },
        { id: 9, orderID: 'OR09', customerName: 'Nisha Rani', orderDate: formatDate('2024-06-25'), orderStatus: 'Shipped', cost: 2900, paymentMethod: 'Debit Card', paymentStatus: 'Pending' },
        { id: 10, orderID: 'OR10', customerName: 'Deepak Joshi', orderDate: formatDate('2024-07-15'), orderStatus: 'Cancelled', cost: 1600, paymentMethod: 'Cash on Delivery', paymentStatus: 'Failed' }
    ],
    events: [
        {
            title: "Order Placed",
            date: "2024-12-09",
            description: "Your order has been placed. The items were processed and are ready for shipment.",
            status: "Completed",
        },
        {
            title: "Order Confirmed",
            date: "2024-12-10",
            description: "Your order was confirmed and prepared for shipment.",
            status: "Completed",
        },
        {
            title: "Shipped",
            date: "2024-12-11",
            description: "Your order has been shipped. It left the warehouse and is on its way to you.",
            courier: "XYZ Logistics",
            warehouse: "Warehouse XYZ",
            status: "Completed",
        },
        {
            title: "Out for Delivery",
            date: "2024-12-12",
            description: "Your order was out for delivery and arrived on the scheduled date.",
            estimatedDelivery: "Thu, Dec 12, 2024, by 7 PM",
            status: "Completed",
        },
        {
            title: "Delivered",
            date: "2024-12-12",
            description: "Your package was successfully delivered to the provided address.",
            status: "Completed",
        },
        {
            title: "Delivered",
            date: "2024-09-08",
            description: "Your package was successfully delivered to the provided address.",
            status: "Completed",
        },
        {
            title: "Delivered",
            date: "2024-10-10",
            description: "Your package was successfully delivered to the provided address.",
            status: "Completed",
        },
        {
            title: "Delivered",
            date: "2024-11-23",
            description: "Your package was successfully delivered to the provided address.",
            status: "Completed",
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
            const order = state.orders.find(p => p.orderID === orderID);
            if (order) {
                order.orderStatus = orderStatus;
            }
        },
        setSortedReviews(state, action: PayloadAction<string[]>) {
            state.sortedTable = action.payload;
        },
        setDrawerStatus(state, action: PayloadAction<boolean>) {
            state.drawerStatus = action.payload;
        },
        setSelectedOrder(state, action: PayloadAction<Order>) {
            state.selectedOrder = action.payload;
        },
        addEvent(state, action: PayloadAction<Event>) {
            state.events.push(action.payload);
        }
    }
});

export const { updateOrderStatus, setSortedReviews, setDrawerStatus, setSelectedOrder, addEvent } = OrderSlice.actions;
export const selectOrderState = (state: RootState) => state.order;

export default OrderSlice.reducer;
