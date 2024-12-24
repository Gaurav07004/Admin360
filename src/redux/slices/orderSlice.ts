/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
// import Product_1 from "@/Assets/Dell Inspiron 15 Laptop.png";
// import Product_2 from "@/Assets/Targus Laptop Sleeve.webp";
// import Product_3 from "@/Assets/Apple iPhone 15.webp";
// import Product_4 from "@/Assets/Samsung Galaxy Watch 5.webp";

interface OrderState {
    orders: any[];
    sortedTable: string[];
    drawerStatus: boolean;
    selectedOrder: string[] | null;
}

const initialState: OrderState = {
    orders: [],
    sortedTable: [],
    drawerStatus: false,
    selectedOrder: null,
};

const OrderSlice = createSlice({
    name: 'Order',
    initialState,
    reducers: {
        // updateOrderStatus: (state, action: PayloadAction<{ orderID: string; orderStatus: 'Delivered' | 'Pending' | 'Unreachable' | 'Cancelled' | 'Shipped' }>) => {
        //     const { orderID, orderStatus } = action.payload;
        //     const order = state.orders.find(order => order.orderID === orderID);
        //     if (order) {
        //         order.orderStatus = orderStatus;
        //     }
        // },
        setSortedReviews: (state, action: PayloadAction<string[]>) => {
            state.sortedTable = action.payload;
        },
        setOrder: (state, action: PayloadAction<string[]>) => {
            state.orders = action.payload;
        },
        setDrawerStatus: (state, action: PayloadAction<boolean>) => {
            state.drawerStatus = action.payload;
        },
        setSelectedOrder: (state, action: PayloadAction<string[]>) => {
            state.selectedOrder = action.payload;
        },
    },
});

export const { updateOrderStatus, setSortedReviews, setDrawerStatus, setSelectedOrder, setOrder } = OrderSlice.actions;

export const selectOrderState = (state: RootState) => state.order;

export default OrderSlice.reducer;
