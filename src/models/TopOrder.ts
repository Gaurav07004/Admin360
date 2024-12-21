import { Schema, model, models, Document } from 'mongoose';

interface IProduct extends Document {
    name: string;
    value: string;
    sold: number;
    ProductImage: string;
}

const ProductSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true },
        value: { type: String, required: true },
        sold: { type: Number, required: true },
        ProductImage: { type: String, required: true },
    },
    { timestamps: true }
);

const Product = models.Product || model<IProduct>('Product', ProductSchema);

export default Product;
