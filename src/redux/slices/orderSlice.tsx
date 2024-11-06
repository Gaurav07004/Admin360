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

interface OrderState {
    orders: Order[];
    sortedTable: string[];
}

const formatDate = (dateString: string) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
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
    sortedTable: [],
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
    }
});

export const { updateOrderStatus, setSortedReviews } = OrderSlice.actions;
export const selectCustomerState = (state: RootState) => state.customer;

export default OrderSlice.reducer;
