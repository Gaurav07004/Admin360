import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CustomerState {
    customerStatus: string;
}

const initialState: CustomerState = {
    customerStatus: 'Inactive',
};

const CustomerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        setStatus(state, action: PayloadAction<string>) {
            // const { id, status } = action.payload;
            state.customerStatus = action.payload;
        },
    },
});

export const { setStatus } = CustomerSlice.actions;
export default CustomerSlice.reducer;
