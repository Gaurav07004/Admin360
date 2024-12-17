import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Product_1 from "@/Assets/Dell Inspiron 15 Laptop.png";
import Product_2 from "@/Assets/Targus Laptop Sleeve.webp";
import Product_3 from "@/Assets/Apple iPhone 15.webp";
import Product_4 from "@/Assets/Samsung Galaxy Watch 5.webp";

interface Product {
    id: number;
    productID: string;
    productName: string;
    category: string;
    price: number;
    stockStatus: 'Available' | 'Out of Stock' | 'Low Stock';
    stockQuantity: number;
}

interface ProductState {
    products: Product[];
    drawerStatus: boolean;
    selectedProduct: Product | null;
}

const initialState: ProductState = {
    products: [
        { id: 1, productID: 'P001', productName: 'Dell Inspiron 15 Laptop', category: 'Electronics', price: 50000, stockStatus: 'Available', stockQuantity: 20 },
        { id: 2, productID: 'P002', productName: 'Sony WH-1000XM4 Headphones', category: 'Accessories', price: 1500, stockStatus: 'Available', stockQuantity: 50 },
        { id: 3, productID: 'P003', productName: 'Apple iPhone 15', category: 'Electronics', price: 80000, stockStatus: 'Out of Stock', stockQuantity: 0 },
        { id: 4, productID: 'P004', productName: 'Samsung Galaxy Watch 5', category: 'Electronics', price: 8000, stockStatus: 'Available', stockQuantity: 30 },
        { id: 5, productID: 'P005', productName: 'JBL Flip 5 Bluetooth Speaker', category: 'Accessories', price: 2500, stockStatus: 'Low Stock', stockQuantity: 3 },
        { id: 6, productID: 'P006', productName: 'Logitech MX Master 3 Wireless Mouse', category: 'Accessories', price: 800, stockStatus: 'Out of Stock', stockQuantity: 0 },
        { id: 7, productID: 'P007', productName: 'PlayStation 5 Gaming Console', category: 'Electronics', price: 20000, stockStatus: 'Available', stockQuantity: 15 },
        { id: 8, productID: 'P008', productName: 'LG UltraGear 27" LED Monitor', category: 'Electronics', price: 12000, stockStatus: 'Low Stock', stockQuantity: 4 },
        { id: 9, productID: 'P009', productName: 'Anker PowerCore 10000 Power Bank', category: 'Accessories', price: 1200, stockStatus: 'Available', stockQuantity: 60 },
        { id: 10, productID: 'P010', productName: 'Targus Laptop Sleeve', category: 'Accessories', price: 700, stockStatus: 'Out of Stock', stockQuantity: 0 }
    ],
    drawerStatus: false,
    selectedProduct: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        updateProductStatus: (state, action: PayloadAction<{ productID: string; status: 'Available' | 'Out of Stock' | 'Low Stock' }>) => {
            const { productID, status } = action.payload;
            const product = state.products.find(p => p.productID === productID);
            if (product) {
                product.stockStatus = status;
            }
        },
        updateProductStock: (state, action: PayloadAction<{ id: number; stockQuantity: number }>) => {
            const { id, stockQuantity } = action.payload;
            const product = state.products.find(p => p.id === id);
            if (product) {
                product.stockQuantity = stockQuantity;
            }
        },
        setDrawerStatus: (state, action: PayloadAction<boolean>) => {
            state.drawerStatus = action.payload;
        },
        setSelectedProduct: (state, action: PayloadAction<Order>) => {
            state.selectedProduct = action.payload;
        },
    },
});

export const { updateProductStatus, updateProductStock, setDrawerStatus, setSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
