import { Schema, model, models, Document } from 'mongoose';

interface IProductStat extends Document {
    month: string;
    sold: number;
    returned: number;
}

const ProductStatSchema = new Schema<IProductStat>(
    {
        month: { type: String, required: true },
        sold: { type: Number, required: true },
        returned: { type: Number, required: true },
    },
    { timestamps: true }
);

const ProductStat = models.ProductStat || model<IProductStat>('ProductStat', ProductStatSchema);

export default ProductStat;
