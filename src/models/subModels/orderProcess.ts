import { Schema, model, models, Document } from 'mongoose';

interface IOrderMetrics extends Document {
    month: string;
    orderRunning: number;
    onProcess: number;
}

const OrderMetricsSchema = new Schema<IOrderMetrics>(
    {
        month: { type: String, required: true },
        orderRunning: { type: Number, required: true },
        onProcess: { type: Number, required: true },
    },
    { timestamps: true }
);

const OrderStat = models.OrderStat || model<IOrderMetrics>('OrderStat', OrderMetricsSchema);

export default OrderStat;
