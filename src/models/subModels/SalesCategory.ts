import { Schema, model, models, Document } from 'mongoose';

interface IAnalytics extends Document {
    timeRange: string;
    productViewValue: number;
    addToCartValue: number;
    checkoutValue: number;
    purchaseValue: number;
}

const AnalyticsSchema = new Schema<IAnalytics>(
    {
        timeRange: { type: String, required: true },
        productViewValue: { type: Number, required: true },
        addToCartValue: { type: Number, required: true },
        checkoutValue: { type: Number, required: true },
        purchaseValue: { type: Number, required: true },
    },
    { timestamps: true }
);

const Analytics = models.Analytics || model<IAnalytics>('Analytics', AnalyticsSchema);

export default Analytics;
