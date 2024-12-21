import { Schema, model, models, Document } from 'mongoose';

interface IProductMetrics extends Document {
    timeRange: string;
    productViewValue: number;
    addToCartValue: number;
    checkoutValue: number;
    purchaseValue: number;
}

const ProductMetricsSchema = new Schema<IProductMetrics>(
    {
        timeRange: { type: String, required: true },
        productViewValue: { type: Number, required: true },
        addToCartValue: { type: Number, required: true },
        checkoutValue: { type: Number, required: true },
        purchaseValue: { type: Number, required: true },
    },
    { timestamps: true }
);

const ProductMetrics = models.ProductMetrics || model<IProductMetrics>('ProductMetrics', ProductMetricsSchema);

export default ProductMetrics;
