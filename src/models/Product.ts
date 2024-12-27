import mongoose, { Schema, Document, Model, model } from 'mongoose';

interface ISupplier {
    name: string;
    contact: string;
    email: string;
}

export interface IProduct extends Document {
    productID: string;
    productName: string;
    category: string;
    subcategory: string;
    price: number;
    stockQuantity: number;
    stockStatus: string;
    supplier: ISupplier;
    previousCount?: number;
    viewsCount?: number;
    purchaseCount?: number;
    wishlistCount?: number;
    rating?: number;
    lastUpdatedBy: string;
    lastUpdatedAt: Date;
    productImage: string;
    tags: string[];
    description: string;
}

const supplierSchema = new Schema<ISupplier>({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true },
});

const productSchema = new Schema<IProduct>({
    productID: { type: String, required: true, unique: true },
    productName: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, required: true },
    stockStatus: { type: String, required: true },
    supplier: { type: supplierSchema, required: true },
    previousCount: { type: Number, required: true },
    viewsCount: { type: Number, required: true },
    purchaseCount: { type: Number, required: true },
    wishlistCount: { type: Number, required: true },
    rating: { type: Number, required: true },
    lastUpdatedBy: { type: String, required: true },
    lastUpdatedAt: { type: Date, default: Date.now },
    productImage: { type: String, required: true },
    tags: { type: [String], required: true },
    description: { type: String, required: true },
});

const ProductModel: Model<IProduct> = mongoose.models.Product || model<IProduct>("Product", productSchema);

export default ProductModel;
