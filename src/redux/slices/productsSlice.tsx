/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Product_1 from "@/Assets/Dell Inspiron 15 Laptop.png";
import Product_2 from "@/Assets/Targus Laptop Sleeve.webp";
import Product_3 from "@/Assets/Apple iPhone 15.webp";
import Product_4 from "@/Assets/Samsung Galaxy Watch 5.webp";
import Product_5 from "@/Assets/Power_Bank.png";
import Product_6 from "@/Assets/LG Monitor.png";
import Product_7 from "@/Assets/PlayStation.png";
import Product_8 from "@/Assets/Mouse.png";
import Product_9 from "@/Assets/JBL.png";
import Product_10 from "@/Assets/Sony.png";

interface Product {
    id: number;
    productID: string;
    productName: string;
    category: string;
    subcategory: string;
    price: number;
    stockStatus: "Available" | "Out of Stock" | "Low Stock";
    stockQuantity: number;
    supplier: {
        name: string,
        contact: string,
        email: string,
    };
    restockDate?: string;
    viewsCount: number;
    purchaseCount: number;
    wishlistCount: number;
    rating: number;
    publishStatus: boolean;
    lastUpdatedBy?: string;
    lastUpdatedAt?: string;
    productImage: any;
    tags: string[];
    seo: {
        title: string,
        description: string,
    };
}

interface ProductState {
    products: Product[];
    drawerStatus: boolean;
    productDrawerStatus: boolean;
    selectedProduct: Product | null;
}

const updateStockStatus = (products: Product[]): Product[] => {
    return products.map(product => {
        let stockStatus = "";
        if (product.stockQuantity > 50) {
            stockStatus = "Available";
        } else if (product.stockQuantity > 0 && product.stockQuantity <= 50) {
            stockStatus = "Low Stock";
        } else {
            stockStatus = "Out of Stock";
        }
        return { ...product, stockStatus };
    });
};

const initialState: ProductState = {
    products: updateStockStatus([
        {
            id: 1,
            productID: "PD82901",
            productName: "Dell Inspiron 15",
            category: "Electronics",
            subcategory: "Gaming Laptops",
            price: 74999,
            stockQuantity: 200,
            stockStatus: 'Available',
            supplier: {
                name: "Dell Electronics",
                contact: "9876543210",
                email: "support@dellelectronics.com",
            },
            restockDate: "2024-12-30",
            viewsCount: 1200,
            purchaseCount: 300,
            wishlistCount: 150,
            rating: 4.5,
            publishStatus: true,
            lastUpdatedBy: "Admin1",
            lastUpdatedAt: "2024-12-15",
            productImage: Product_1,
            tags: ["Laptop", "Gaming", "Lightweight"],
            seo: {
                title: "Dell Inspiron 15 | Affordable Gaming Laptop",
                description: "Dell Inspiron 15 Laptop featuring Intel Core i5, 8GB RAM, and 512GB SSD. Perfect for gaming and everyday use.",
            },
        },
        {
            id: 2,
            productID: "PD82902",
            productName: "Sony WH-1000XM4",
            category: "Accessories",
            subcategory: "Headphones",
            price: 24999,
            stockQuantity: 150,
            stockStatus: "Available",
            supplier: {
                name: "Sony Distributors",
                contact: "9823456789",
                email: "contact@sonydistributors.com",
            },
            restockDate: "2024-12-25",
            viewsCount: 800,
            purchaseCount: 200,
            wishlistCount: 120,
            rating: 4.2,
            publishStatus: true,
            lastUpdatedBy: "Admin2",
            lastUpdatedAt: "2024-12-10",
            productImage: Product_10,
            tags: ["Headphones", "Noise Cancelling", "Wireless"],
            seo: {
                title: "Sony WH-1000XM4 | Industry-Leading Noise Cancelling Headphones",
                description: "Discover Sony WH-1000XM4 headphones offering premium noise cancellation and superior sound quality.",
            },
        },
        {
            id: 3,
            productID: "PD82903",
            productName: "Apple iPhone 15",
            category: "Electronics",
            subcategory: "Smartphones",
            price: 89999,
            stockQuantity: 0,
            stockStatus: "Out of Stock",
            supplier: {
                name: "Apple Store",
                contact: "9876543211",
                email: "support@applestore.com",
            },
            restockDate: "2025-01-05",
            viewsCount: 5000,
            purchaseCount: 800,
            wishlistCount: 400,
            rating: 4.0,
            publishStatus: true,
            lastUpdatedBy: "Admin3",
            lastUpdatedAt: "2024-12-16",
            productImage: Product_3,
            tags: ["Smartphone", "Premium", "5G"],
            seo: {
                title: "Apple iPhone 15 | Revolutionary Smartphone",
                description: "Experience the future of smartphones with the Apple iPhone 15, featuring the A16 Bionic chip and cutting-edge features.",
            },
        },
        {
            id: 4,
            productID: "PD82904",
            productName: "Samsung Galaxy Watch 5",
            category: "Accessories",
            subcategory: "Smartwatch",
            price: 16999,
            stockQuantity: 30,
            stockStatus: "Available",
            supplier: {
                name: "Samsung Store",
                contact: "9876543212",
                email: "support@samsungstore.com",
            },
            restockDate: "2024-12-20",
            viewsCount: 900,
            purchaseCount: 100,
            wishlistCount: 80,
            rating: 4.8,
            publishStatus: true,
            lastUpdatedBy: "Admin4",
            lastUpdatedAt: "2024-12-12",
            productImage: Product_4,
            tags: ["Smartwatch", "Fitness", "Waterproof"],
            seo: {
                title: "Samsung Galaxy Watch 5 | Advanced Fitness Tracker",
                description: "Stay connected and track your health with the Samsung Galaxy Watch 5, perfect for fitness enthusiasts.",
            },
        },
        {
            id: 5,
            productID: "PD82905",
            productName: "JBL Flip 5",
            category: "Accessories",
            subcategory: "Bluetooth Speakers",
            price: 5999,
            stockQuantity: 200,
            stockStatus: "Low Stock",
            supplier: {
                name: "JBL Distributors",
                contact: "9845678910",
                email: "support@jbldistributors.com",
            },
            restockDate: "2024-12-28",
            viewsCount: 500,
            purchaseCount: 500,
            wishlistCount: 30,
            rating: 4.1,
            publishStatus: true,
            lastUpdatedBy: "Admin5",
            lastUpdatedAt: "2024-12-14",
            productImage: Product_9,
            tags: ["Portable", "Bluetooth", "Waterproof"],
            seo: {
                title: "JBL Flip 5 | Portable Bluetooth Speaker with Rich Bass",
                description: "JBL Flip 5 Bluetooth Speaker offers premium sound, deep bass, and waterproof design for any adventure.",
            },
        },
        {
            id: 6,
            productID: "PD82906",
            productName: "Logitech MX Master 3",
            category: "Accessories",
            subcategory: "Wireless Mouse",
            price: 5999,
            stockQuantity: 0,
            stockStatus: "Out of Stock",
            supplier: {
                name: "Logitech Solutions",
                contact: "9123456789",
                email: "support@logitechsolutions.com",
            },
            restockDate: "2025-01-10",
            viewsCount: 600,
            purchaseCount: 120,
            wishlistCount: 50,
            rating: 5.0,
            publishStatus: true,
            lastUpdatedBy: "Admin6",
            lastUpdatedAt: "2024-12-16",
            productImage: Product_8,
            tags: ["Wireless", "Ergonomic", "High Precision"],
            seo: {
                title: "Logitech MX Master 3 | Ergonomic Wireless Mouse",
                description: "Logitech MX Master 3 is an ergonomic wireless mouse designed for comfort and precision, perfect for professionals and gamers alike.",
            },
        },
        {
            id: 7,
            productID: "PD82907",
            productName: "PlayStation 5",
            category: "Electronics",
            subcategory: "Gaming",
            price: 50000,
            stockQuantity: 15,
            stockStatus: "Available",
            supplier: {
                name: "Sony Distributors",
                contact: "9998765432",
                email: "sales@sonydistributors.com",
            },
            restockDate: "2024-12-22",
            viewsCount: 1500,
            purchaseCount: 500,
            wishlistCount: 300,
            rating: 4.0,
            publishStatus: true,
            lastUpdatedBy: "Admin7",
            lastUpdatedAt: "2024-12-10",
            productImage: Product_7,
            tags: ["Gaming", "4K", "High Performance"],
            seo: {
                title: "PlayStation 5",
                description: "Experience immersive gaming with PlayStation 5 featuring 4K visuals and fast loading times.",
            },
        },
        {
            id: 8,
            productID: "PD82908",
            productName: 'LG UltraGear 27"LED',
            category: "Electronics",
            subcategory: "Monitors",
            price: 12000,
            stockQuantity: 4,
            stockStatus: "Low Stock",
            supplier: {
                name: "LG Retail",
                contact: "9874561230",
                email: "support@lgretail.com",
            },
            restockDate: "2025-01-15",
            viewsCount: 800,
            purchaseCount: 130,
            wishlistCount: 40,
            rating: 4.9,
            publishStatus: true,
            lastUpdatedBy: "Admin8",
            lastUpdatedAt: "2024-12-14",
            productImage: Product_6,
            tags: ["Monitor", "4K", "Gaming"],
            seo: {
                title: 'LG UltraGear 27" | Gaming LED Monitor',
                description: 'Enjoy ultra-smooth gameplay with the LG UltraGear 27" LED monitor, ideal for gaming and productivity.',
            },
        },
        {
            id: 9,
            productID: "PD82909",
            productName: "BoAt 10000 mAh",
            category: "Accessories",
            subcategory: "Power Banks",
            price: 1500,
            stockQuantity: 60,
            stockStatus: "Available",
            supplier: {
                name: "Boat Supplies",
                contact: "9456781230",
                email: "info@boatsupplies.com",
            },
            restockDate: "2024-12-25",
            viewsCount: 300,
            purchaseCount: 80,
            wishlistCount: 20,
            rating: 4.0,
            publishStatus: true,
            lastUpdatedBy: "Admin9",
            lastUpdatedAt: "2024-12-12",
            productImage: Product_5,
            tags: ["Quick Charge 3.0", "Portable", "Steel Blue"],
            seo: {
                title: "boAt 10000 mAh 22.5 W Power Bank | Quick Charge 3.0",
                description: "Get fast and efficient charging with boAt 10000 mAh Power Bank, featuring Quick Charge 3.0 and a compact steel blue design.",
            },
        },
        {
            id: 10,
            productID: "PD82910",
            productName: "Targus Laptop Sleeve",
            category: "Accessories",
            subcategory: "Laptop Accessories",
            price: 700,
            stockQuantity: 0,
            stockStatus: "Out of Stock",
            supplier: {
                name: "Targus Store",
                contact: "9786543120",
                email: "sales@targusstore.com",
            },
            restockDate: "2025-01-05",
            viewsCount: 150,
            purchaseCount: 200,
            wishlistCount: 25,
            rating: 4.0,
            publishStatus: true,
            lastUpdatedBy: "Admin10",
            lastUpdatedAt: "2024-12-10",
            productImage: Product_2,
            tags: ["Protective", "Durable", "Lightweight"],
            seo: {
                title: "Targus Laptop Sleeve | Protective Cover",
                description: "Protect your laptop with the Targus Laptop Sleeve, crafted for durability and style.",
            },
        },
    ]),
    drawerStatus: false,
    selectedProduct: null,
};


const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        updateProductStatus: (state, action: PayloadAction<{ productID: string, status: "Available" | "Out of Stock" | "Low Stock" }>) => {
            const { productID, status } = action.payload;
            const product = state.products.find((p) => p.productID === productID);
            if (product) {
                product.stockStatus = status;
            }
        },
        updateProductStock: (state, action: PayloadAction<{ id: number, stockQuantity: number }>) => {
            const { id, stockQuantity } = action.payload;
            const product = state.products.find((p) => p.id === id);
            if (product) {
                product.stockQuantity = stockQuantity;
            }
        },
        setDrawerStatus: (state, action: PayloadAction<boolean>) => {
            state.drawerStatus = action.payload;
        },
        setProductDrawerStatus: (state, action: PayloadAction<boolean>) => {
            state.productDrawerStatus = action.payload;
        },
        setSelectedProduct: (state, action: PayloadAction<Product>) => {
            state.selectedProduct = action.payload;
        },
    },
});

export const { updateProductStatus, updateProductStock, setDrawerStatus, setSelectedProduct, setProductDrawerStatus } = productSlice.actions;
export default productSlice.reducer;
