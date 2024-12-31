import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface RecentOrder {
    title: string;
    status: 'Completed' | 'Pending';
    date: string;
    time: string;
    description: string;
    courier: string,
    warehouse: string,
    estimatedDelivery: string,
}

interface Order {
    id: number;
    orderID: string;
    orderDate: string;
    customerName: string;
    orderStatus: 'Delivered' | 'Pending' | 'Unreachable' | 'Cancelled' | 'Shipped';
    cost: number;
    paymentMethod: string;
    paymentStatus: 'Paid' | 'Unpaid';
    deliveryAddress: string;
    trackingNumber: string;
    customerPhone: string;
    itemName: string;
    itemImage: string;
    courier: string;
    Recent_Orders: RecentOrder[];
}

interface OrderState {
    orders: Order[];
    orderMonthlyData: string[];
    sortedTable: string[];
    drawerStatus: boolean;
    selectedOrder: Order | null;
}

const initialState: OrderState = {
    orders: [],
    orderMonthlyData: [],
    sortedTable: [],
    drawerStatus: false,
    selectedOrder: null,
};

const OrderSlice = createSlice({
    name: 'Order',
    initialState,
    reducers: {
        updateOrderStatus: (
            state,
            action: PayloadAction<{
                orderID: string;
                orderStatus: 'Delivered' | 'Pending' | 'Unreachable' | 'Cancelled' | 'Shipped';
            }>
        ) => {
            const { orderID, orderStatus } = action.payload;
            const order = state.orders.find((order) => order.orderID === orderID);
            if (order) {
                order.orderStatus = orderStatus;
            }
        },
        setSortedReviews: (state, action: PayloadAction<string[]>) => {
            state.sortedTable = action.payload;
        },
        setOrder: (state, action: PayloadAction<Order[]>) => {
            state.orders = action.payload;
        },
        setOrderMonthlyData: (state, action: PayloadAction<string[]>) => {
            state.orderMonthlyData = action.payload;
        },
        setDrawerStatus: (state, action: PayloadAction<boolean>) => {
            state.drawerStatus = action.payload;
        },
        setSelectedOrder: (state, action: PayloadAction<Order>) => {
            state.selectedOrder = action.payload;
        },
    },
});

export const {
    updateOrderStatus,
    setSortedReviews,
    setDrawerStatus,
    setSelectedOrder,
    setOrder,
    setOrderMonthlyData,
} = OrderSlice.actions;

export const selectOrderState = (state: RootState) => state.order;

export default OrderSlice.reducer;
