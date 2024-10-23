import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface CustomerState {
    customerStatus: { [key: number]: string };
    filter: boolean;
    showReview: boolean;
    selectedLocation: string | null;
    sortedTable: string[];
    reviewContent: { title: string; description: string } | null;
}

const initialState: CustomerState = {
    customerStatus: {
        1: 'Active',
        2: 'Inactive',
        3: 'Active',
        4: 'Active',
        5: 'Inactive',
        6: 'Active',
        7: 'Active',
        8: 'Inactive',
        9: 'Active',
        10: 'Inactive',
    },
    filter: true,
    showReview: false,
    selectedLocation: null,
    sortedTable: [],
    reviewContent: null,
};

const CustomerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        setStatus(state, action: PayloadAction<{ id: number, status: 'Active' | 'Inactive' }>) {
            const { id, status } = action.payload;
            state.customerStatus[id] = status;
        },
        setFilter(state, action: PayloadAction<boolean>) {
            state.filter = action.payload;
        },
        setShowReview(state, action: PayloadAction<boolean>) {
            state.showReview = action.payload;
        },
        setSelectedLocation(state, action: PayloadAction<string>) {
            state.selectedLocation = action.payload;
        },
        setSortedReviews(state, action: PayloadAction<string[]>) {
            state.sortedTable = action.payload;
        },
        hideReviewModal(state) {
            state.showReview = false;
            state.reviewContent = null;
        },
    }
});

export const { setStatus, setFilter, setShowReview, setSelectedLocation, setSortedReviews, hideReviewModal } = CustomerSlice.actions;
export const selectCustomerState = (state: RootState) => state.customer;

export default CustomerSlice.reducer;
