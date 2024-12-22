import mongoose, { Schema, model, Model, Document } from 'mongoose';

interface ITopProduct extends Document {
    name: string;
    value: string;
    sold: number;
    TopProductImage: string;
}

const TopProductSchema = new Schema<ITopProduct>(
    {
        name: { type: String, required: true },
        value: { type: String, required: true },
        sold: { type: Number, required: true },
        TopProductImage: { type: String, required: true },
    },
    { timestamps: true }
);

const TopProduct: Model<ITopProduct> = mongoose.models.TopOrder || model<ITopProduct>('TopOrder', TopProductSchema);

export default TopProduct;
