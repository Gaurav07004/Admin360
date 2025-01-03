import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

import menuReducer from './slices/commonSlice';
import userReducer from './slices/adminSlice';
import productsReducer from './slices/productsSlice';
import customerReducer from './slices/customerSlice';
import orderReducer from './slices/orderSlice';

const rootReducer = combineReducers({
    menu: menuReducer,
    user: userReducer,
    product: productsReducer,
    customer: customerReducer,
    order: orderReducer,
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;