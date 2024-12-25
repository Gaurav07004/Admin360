import { Schema, model, models, Document } from 'mongoose';

interface IAnalytics extends Document {
    timeRange: string;
    productView: number;
    addToCart: number;
    checkout: number;
    purchase: number;
}

const AnalyticsSchema = new Schema<IAnalytics>(
    {
        timeRange: { type: String, required: true },
        productView: { type: Number, required: true },
        addToCart: { type: Number, required: true },
        checkout: { type: Number, required: true },
        purchase: { type: Number, required: true },
    },
    { timestamps: true }
);

const Analytics = models.SalesCategory || model<IAnalytics>('SalesCategory', AnalyticsSchema);

export default Analytics;
