import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './slices/commonSlice';
import userReducer from './slices/userSlice';
import productsReducer from './slices/productsSlice';
import customerReducer from './slices/customerSlice';
import orderReducer from './slices/orderSlice';

const store = configureStore({
    reducer: {
        menu: menuReducer,
        user: userReducer,
        product: productsReducer,
        customer: customerReducer,
        order: orderReducer
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
