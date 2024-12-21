import { Schema, model, models, Document } from 'mongoose';

interface IProductData extends Document {
    name: string;
    value: number;
}

const ProductDataSchema = new Schema<IProductData>(
    {
        name: { type: String, required: true },
        value: { type: Number, required: true },
    },
    { timestamps: true }
);

const ProductData = models.ProductData || model<IProductData>('ProductData', ProductDataSchema);

export default ProductData;
