import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './slices/menuSlice';
import userReducer from './slices/userSlice';
import productsReducer from './slices/productsSlice';
import customerReducer from './slices/CustomerSlice';

const store = configureStore({
    reducer: {
        menu: menuReducer,
        user: userReducer,
        products: productsReducer,
        customer: customerReducer
    },
});

export default store; // Default export

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
