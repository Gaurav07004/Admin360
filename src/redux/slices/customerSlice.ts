/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface Customer {
    id: number;
    customerID: string;
    customerName: string;
    profileImage: string;
    email: string;
    mobileNumber: number;
    location: string;
    dateJoined: string;
    order: number;
    delivered: number,
    cancelled: number,
    pending: number,
    visit: { name: string; price: number }[];
    Recent_Orders?: {
        title: string;
        status: string;
        date: string;
        time: string;
        description: string;
        courier?: string;
        warehouse?: string;
        estimatedDelivery?: string;
    }[],
    color: string;
    customerStatus: 'Active' | 'Inactive';
}

interface CustomerState {
    customers: Customer[];
    sortedTable: string[];
    drawerStatus: boolean;
    selectedCustomer: Customer | null;
}

const initialState: CustomerState = {
    customers: [],
    sortedTable: [],
    drawerStatus: false,
    selectedCustomer: null,
};

const CustomerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        updateCustomerStatus: (state, action: PayloadAction<{ customerID: string; customerStatus: 'Active' | 'Inactive' }>) => {
            const { customerID, customerStatus } = action.payload;
            const customer = state.customers.find(p => p.customerID === customerID);
            if (customer) {
                customer.customerStatus = customerStatus;
            }
        },
        setCustomer(state, action: PayloadAction<Customer[]>) {
            state.customers = action.payload;
        },
        setSortedReviews(state, action: PayloadAction<string[]>) {
            state.sortedTable = action.payload;
        },
        setDrawerStatus(state, action: PayloadAction<boolean>) {
            state.drawerStatus = action.payload;
        },
        setSelectedCustomer(state, action: PayloadAction<Customer>) {
            state.selectedCustomer = action.payload;
        },
    }
});

export const { updateCustomerStatus, setSortedReviews, setDrawerStatus, setSelectedCustomer, setCustomer } = CustomerSlice.actions;
export const selectCustomerState = (state: RootState) => state.customer;

export default CustomerSlice.reducer;
