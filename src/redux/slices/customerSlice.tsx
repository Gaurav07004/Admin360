import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface Customer {
    id: number;
    customerID: string;
    customerName: string;
    email: string;
    location: string;
    dateJoined: string;
    order: number;
    chartData: { name: string; price: number }[];
    color: string;
    customerStatus: 'Active' | 'Inactive';
}

interface CustomerState {
    customers: Customer[];
    sortedTable: string[];
}

const initialState: CustomerState = {
    customers: [
        {
            id: 1,
            customerID: 'C001',
            customerName: "Amit Kumar",
            email: "amit.kumar@gmail.com",
            location: "Delhi",
            dateJoined: "Jan 15, 2024",
            customerStatus: "Active",
            order: 12,
            chartData: [
                { name: "Jan", price: 123 },
                { name: "Feb", price: 987 },
                { name: "Mar", price: 432 },
                { name: "Apr", price: 234 },
                { name: "May", price: 876 },
                { name: "Jun", price: 543 },
                { name: "Jul", price: 678 },
                { name: "Aug", price: 345 },
            ],
            color: "#698474",
        },
        {
            id: 2,
            customerID: "C002",
            customerName: "Priya Sharma",
            email: "priya.sharma@gmail.com",
            location: "Mumbai",
            dateJoined: "Feb 20, 2024",
            customerStatus: 'Inactive',
            order: 80,
            chartData: [
                { name: "Jan", price: 301 },
                { name: "Feb", price: 654 },
                { name: "Mar", price: 209 },
                { name: "Apr", price: 872 },
                { name: "May", price: 113 },
                { name: "Jun", price: 978 },
                { name: "Jul", price: 432 },
                { name: "Aug", price: 564 },
            ],
            color: "#F05A7E",
        },
        {
            id: 3,
            customerID: "C003",
            customerName: "Rajesh Gupta",
            email: "rajesh.gupta@gmail.com",
            location: "Bangalore",
            dateJoined: "Mar 10, 2024",
            customerStatus: 'Active',
            order: 15,
            chartData: [
                { name: "Jan", price: 789 },
                { name: "Feb", price: 345 },
                { name: "Mar", price: 678 },
                { name: "Apr", price: 987 },
                { name: "May", price: 456 },
                { name: "Jun", price: 123 },
                { name: "Jul", price: 890 },
                { name: "Aug", price: 234 },
            ],
            color: "#219C90",
        },
        {
            id: 4,
            customerID: "C004",
            customerName: "Neha Patel",
            email: "neha.patel@gmail.com",
            location: "Ahmedabad",
            dateJoined: "Apr 5, 2024",
            customerStatus: 'Active',
            order: 10,
            chartData: [
                { name: "Jan", price: 564 },
                { name: "Feb", price: 210 },
                { name: "Mar", price: 789 },
                { name: "Apr", price: 345 },
                { name: "May", price: 678 },
                { name: "Jun", price: 234 },
                { name: "Jul", price: 567 },
                { name: "Aug", price: 890 },
            ],
            color: "#0D1282",
        },
        {
            id: 5,
            customerID: "C005",
            customerName: "Sanjay Reddy",
            email: "sanjay.reddy@gmail.com",
            location: "Hyderabad",
            dateJoined: "May 12, 2024",
            customerStatus: 'Inactive',
            order: 60,
            chartData: [
                { name: "Jan", price: 135 },
                { name: "Feb", price: 678 },
                { name: "Mar", price: 432 },
                { name: "Apr", price: 789 },
                { name: "May", price: 567 },
                { name: "Jun", price: 123 },
                { name: "Jul", price: 345 },
                { name: "Aug", price: 678 },
            ],
            color: "#B31312",
        },
        {
            id: 6,
            customerID: "C006",
            customerName: "Ravi Kumar",
            email: "ravi.kumar@gmail.com",
            location: "Chennai",
            dateJoined: "Jun 22, 2024",
            customerStatus: 'Active',
            order: 18,
            chartData: [
                { name: "Jan", price: 453 },
                { name: "Feb", price: 789 },
                { name: "Mar", price: 234 },
                { name: "Apr", price: 567 },
                { name: "May", price: 890 },
                { name: "Jun", price: 123 },
                { name: "Jul", price: 456 },
                { name: "Aug", price: 789 },
            ],
            color: "#B71375",
        },
        {
            id: 7,
            customerID: "C007",
            customerName: "Sonia Verma",
            email: "sonia.verma@gmail.com",
            location: "Pune",
            dateJoined: "Jul 30, 2024",
            customerStatus: 'Active',
            order: 100,
            chartData: [
                { name: "Jan", price: 289 },
                { name: "Feb", price: 450 },
                { name: "Mar", price: 123 },
                { name: "Apr", price: 678 },
                { name: "May", price: 345 },
                { name: "Jun", price: 890 },
                { name: "Jul", price: 234 },
                { name: "Aug", price: 567 },
            ],
            color: "#EA5455",
        },
        {
            id: 8,
            customerID: "C008",
            customerName: "Deepak Mehta",
            email: "deepak.mehta@gmail.com",
            location: "Jaipur",
            dateJoined: "Aug 18, 2024",
            customerStatus: 'Inactive',
            order: 90,
            chartData: [
                { name: "Jan", price: 321 },
                { name: "Feb", price: 543 },
                { name: "Mar", price: 654 },
                { name: "Apr", price: 789 },
                { name: "May", price: 321 },
                { name: "Jun", price: 654 },
                { name: "Jul", price: 789 },
                { name: "Aug", price: 432 },
            ],
            color: "#424242",
        },
        {
            id: 9,
            customerID: "C009",
            customerName: "Sunil Mehta",
            email: "sunil.mehta@gmail.com",
            location: "Delhi",
            dateJoined: "Jan 18, 2024",
            customerStatus: 'Active',
            order: 80,
            chartData: [
                { name: "Jan", price: 360 },
                { name: "Feb", price: 543 },
                { name: "Mar", price: 654 },
                { name: "Apr", price: 589 },
                { name: "May", price: 321 },
                { name: "Jun", price: 614 },
                { name: "Jul", price: 789 },
                { name: "Aug", price: 482 },
            ],
            color: "#009FBD",
        },
        {
            id: 10,
            customerID: "C010",
            customerName: "Vivek Sharma",
            email: "vivek.sharma@gmail.com",
            location: "Mumbai",
            dateJoined: "Mar 14, 2024",
            customerStatus: 'Inactive',
            order: 50,
            chartData: [
                { name: "Jan", price: 241 },
                { name: "Feb", price: 543 },
                { name: "Mar", price: 644 },
                { name: "Apr", price: 789 },
                { name: "May", price: 421 },
                { name: "Jun", price: 694 },
                { name: "Jul", price: 489 },
                { name: "Aug", price: 632 },
            ],
            color: "#131842",
        },
    ],
    sortedTable: [],
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
        setSortedReviews(state, action: PayloadAction<string[]>) {
            state.sortedTable = action.payload;
        },
    }
});

export const { updateCustomerStatus, setSortedReviews } = CustomerSlice.actions;
export const selectCustomerState = (state: RootState) => state.customer;

export default CustomerSlice.reducer;
