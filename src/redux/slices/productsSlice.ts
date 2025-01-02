import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
        name: string;
        contact: string;
        email: string;
    };
    previousCount?: number;
    viewsCount?: number;
    purchaseCount?: number;
    wishlistCount?: number;
    lastUpdatedBy?: string;
    lastUpdatedAt?: string;
    rating?: number;
    productImage: string;
    tags: string[];
    description: string;
}

interface FormData {
    productID: string;
    productName: string;
    category: string;
    subcategory: string;
    price: number;
    stockQuantity: number;
    stockStatus: "Available" | "Out of Stock" | "Low Stock";
    supplier: {
        name: string;
        contact: string;
        email: string;
    };
    previousCount?: number;
    viewsCount?: number;
    purchaseCount?: number;
    wishlistCount?: number;
    rating?: number;
    lastUpdatedBy?: string;
    lastUpdatedAt?: string;
    productImage: string;
    tags: string[];
    description: string;
}

type productData = {
    month: string,
    sold: number,
    returned: number
};

interface ProductState {
    products: Product[];
    drawerStatus: boolean;
    productDrawerStatus: boolean;
    selectedProduct: Product | null;
    productMonthlyData: productData[];
    formData: FormData;
    files: { name: string, dataUrl: string }[];
    imageUrl: string | null;
}

const updateStockStatus = (products: Product[]): Product[] => {
    return products.map(product => {
        let stockStatus: "Available" | "Low Stock" | "Out of Stock";

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
    products: updateStockStatus([]),
    drawerStatus: false,
    productDrawerStatus: false,
    selectedProduct: null,
    productMonthlyData: [],
    imageUrl: null,
    formData: {
        productID: "",
        productName: "",
        category: "",
        subcategory: "",
        price: 0,
        stockQuantity: 0,
        stockStatus: "Available",
        supplier: {
            name: "",
            contact: "",
            email: "",
        },
        previousCount: 0,
        viewsCount: 0,
        purchaseCount: 0,
        wishlistCount: 0,
        rating: 0,
        productImage: "",
        lastUpdatedBy: "Admin",
        tags: [],
        description: "",
    },
    files: [],
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
        setFiles: (state, action: PayloadAction<{ name: string, dataUrl: string }[]>) => {
            state.files = action.payload;
        },
        setImageUrl: (state, action: PayloadAction<string | null>) => {
            const newImageUrl = action.payload;
            state.imageUrl = newImageUrl;
            if (newImageUrl) {
                state.formData.productImage = newImageUrl;
            } else {
                state.formData.productImage = "";
            }
        },
        deleteFile: (state) => {
            state.files = [];
            state.imageUrl = null;
            state.formData.productImage = "";
        },
        setFormData: (state, action: PayloadAction<FormData>) => {
            state.formData = action.payload;
        },
        updateFormData: <T extends keyof FormData>(state: ProductState, action: PayloadAction<{ field: T, value: FormData[T] }>) => {
            const { field, value } = action.payload;
            state.formData[field] = value;
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
        setProduct: (state, action: PayloadAction<Product[]>) => {
            const products = action.payload;

            const updatedProducts = updateStockStatus(products);

            state.products = updatedProducts.sort((a, b) => {
                if (a.productID < b.productID) return -1;
                if (a.productID > b.productID) return 1;
                return 0;
            });
        },
        setProductMonthlyData: (state, action: PayloadAction<productData[]>) => {
            const sortedData = action.payload.sort((a, b) => {
                const monthOrder = [
                    "January", "February", "March", "April", "May", "June", "July",
                    "August", "September", "October", "November", "December"
                ];

                return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
            });
            state.productMonthlyData = sortedData;
        },
        clearProducts: (state) => {
            state.formData = initialState.formData;
        },
    },
});

export const { updateProductStatus, clearProducts, updateProductStock, setFormData, updateFormData, setFiles, setImageUrl, deleteFile, setDrawerStatus, setSelectedProduct, setProductDrawerStatus, setProduct, setProductMonthlyData } = productSlice.actions;
export default productSlice.reducer;
