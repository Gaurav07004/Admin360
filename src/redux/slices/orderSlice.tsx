import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface OrderState {
    orderStatus: { [key: number]: string };
    // filter: boolean;
    // showReview: boolean;
    // selectedLocation: string | null;
    sortedTable: string[];
    // reviewContent: { title: string; description: string } | null;
}

const initialState: OrderState = {
    orderStatus: {
        1: 'Confirmed',
        2: 'Pending',
        3: 'Unreachable',
        4: 'Pending',
        5: 'Pending',
        6: 'Unreachable',
        7: 'Confirmed',
        8: 'Pending',
        9: 'Confirmed',
        10: 'Unreachable',
    },
    // filter: true,
    // showReview: false,
    // selectedLocation: null,
    sortedTable: [],
    // reviewContent: null,
};

const OrderSlice = createSlice({
    name: 'Order',
    initialState,
    reducers: {
        setStatus(state, action: PayloadAction<{ id: number, status: 'Active' | 'Inactive' }>) {
            const { id, status } = action.payload;
            state.orderStatus[id] = status;
        },
        // setFilter(state, action: PayloadAction<boolean>) {
        //     state.filter = action.payload;
        // },
        // setShowReview(state, action: PayloadAction<boolean>) {
        //     state.showReview = action.payload;
        // },
        // setSelectedLocation(state, action: PayloadAction<string>) {
        //     state.selectedLocation = action.payload;
        // },
        setSortedReviews(state, action: PayloadAction<string[]>) {
            state.sortedTable = action.payload;
        },
        // hideReviewModal(state) {
        //     state.showReview = false;
        //     state.reviewContent = null;
        // },
    }
});

export const { setStatus, setFilter, setShowReview, setSelectedLocation, setSortedReviews, hideReviewModal } = OrderSlice.actions;
export const selectCustomerState = (state: RootState) => state.customer;

export default OrderSlice.reducer;
