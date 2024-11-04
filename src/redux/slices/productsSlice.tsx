// src/redux/productsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product { // Explicitly export Product
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    stock: number;
}

interface ProductsState {
    products: Product[];
}

const initialState: ProductsState = {
    products: [
        { id: 1, name: 'Laptop', price: 60000, description: 'A high-end laptop', imageUrl: '/images/laptop.jpg', stock: 20 },
        { id: 2, name: 'Smartphone', price: 20000, description: 'Latest smartphone model', imageUrl: '/images/phone.jpg', stock: 50 },
    ],
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
        },
        editProduct: (state, action: PayloadAction<Product>) => {
            const index = state.products.findIndex(p => p.id === action.payload.id);
            if (index !== -1) state.products[index] = action.payload;
        },
        deleteProduct: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter(product => product.id !== action.payload);
        },
    },
});

export const { addProduct, editProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
